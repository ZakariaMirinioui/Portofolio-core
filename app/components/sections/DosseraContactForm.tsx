"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Slide } from "../../animation/Slide";
import { STATIC_MICRO_CORNER } from "../decor/circuitStatics";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { trackDemoRequested, trackContactFormSubmitted } from "../../lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DosseraContactForm() {
  const t = useTranslations("dossera.contactForm");
  const tDossera = useTranslations("dossera");
  const tApi = useTranslations("contactApi");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    phone: "",
    message: "",
    honeypot: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () =>
    setFormData({
      name: "",
      email: "",
      organization: "",
      role: "",
      phone: "",
      message: "",
      honeypot: "",
    });

  const validate = (): string | null => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.organization.trim() ||
      !formData.message.trim()
    ) {
      return tApi("requiredFields");
    }
    if (!EMAIL_RE.test(formData.email)) {
      return tApi("invalidEmail");
    }
    if (
      formData.name.length > 100 ||
      formData.organization.length > 200 ||
      formData.message.length > 5000
    ) {
      return tApi("maxLength");
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    // Honeypot: real users never see this field, so pretend success for bots.
    if (formData.honeypot) {
      resetForm();
      setFormState("success");
      return;
    }

    const validationError = validate();
    if (validationError) {
      setFormState("error");
      setErrorMessage(validationError);
      return;
    }

    if (!CONTACT_ENDPOINT) {
      setFormState("error");
      setErrorMessage(tApi("serverError"));
      return;
    }

    try {
      const { honeypot: _honeypot, ...payload } = formData;
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
          _subject: `Dossera JAMS - Demo Request from ${formData.name}`,
        }),
      });

      let data: Record<string, any> = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        const remoteMessage =
          data?.error ||
          (Array.isArray(data?.errors) && data.errors[0]?.message);
        if (res.status === 429) {
          throw new Error(tApi("rateLimited"));
        }
        throw new Error(remoteMessage || tApi("serverError"));
      }

      // Track demo request
      trackDemoRequested({
        source: "dossera-page",
        organization: formData.organization,
      });
      trackContactFormSubmitted({
        form_type: "dossera-demo-request",
        source_page: window.location.pathname,
      });

      resetForm();
      setFormState("success");
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error ? error.message : tApi("serverError")
      );
    }
  };

  if (formState === "success") {
    return (
      <Slide delay={0.5}>
        <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8 text-center">
          <BiCheckCircle className="text-4xl dark:text-green-400 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-incognito font-bold tracking-tight mb-2">
            {t("success")}
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-md mx-auto mb-6">
            {t("successDescription")}
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md dark:bg-zinc-800 bg-zinc-200 dark:text-white text-zinc-900 font-medium border dark:border-zinc-700 border-zinc-300 hover:dark:border-zinc-500 hover:border-zinc-400 transition-colors"
          >
            {t("anotherRequest")}
          </button>
        </div>
      </Slide>
    );
  }

  return (
    <Slide delay={0.5}>
      <div
        data-formcc=""
        className="relative dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8"
      >
        <span
          aria-hidden="true"
          className="z-cc left-0 top-0 h-16 w-16 hidden md:block"
          dangerouslySetInnerHTML={{ __html: STATIC_MICRO_CORNER }}
        />
          <h2 className="text-2xl font-incognito font-bold tracking-tight mb-2">
            {t("title")}
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 mb-6">
            {t("description")}
          </p>

        {formState === "error" && (
          <div className="flex items-center gap-2 p-4 rounded-md dark:bg-red-900/20 bg-red-50 dark:text-red-400 text-red-700 border dark:border-red-800 border-red-200 mb-6">
            <BiErrorCircle className="text-lg flex-shrink-0" />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot - hidden from real users */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
               <label htmlFor="name" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                 {t("fields.name")} <span className="text-red-500">*</span>
               </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full px-4 py-2.5 rounded-md dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:placeholder-zinc-500 placeholder-zinc-400"
                 placeholder={tDossera("contactFormPlaceholders.name")}
              />
            </div>
            <div>
               <label htmlFor="email" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                 {t("fields.email")} <span className="text-red-500">*</span>
               </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-md dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:placeholder-zinc-500 placeholder-zinc-400"
                 placeholder={tDossera("contactFormPlaceholders.email")}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
               <label htmlFor="organization" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                 {t("fields.organization")} <span className="text-red-500">*</span>
               </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                maxLength={200}
                className="w-full px-4 py-2.5 rounded-md dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:placeholder-zinc-500 placeholder-zinc-400"
                 placeholder={tDossera("contactFormPlaceholders.organization")}
              />
            </div>
            <div>
               <label htmlFor="role" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                 {t("fields.role")}
               </label>
               <select
                 id="role"
                 name="role"
                 value={formData.role}
                 onChange={handleChange}
                 className="w-full px-4 py-2.5 rounded-md dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
               >
                 <option value="">{tDossera("contactFormPlaceholders.role")}</option>
                 <option value="magistrate">{t("roles.magistrate")}</option>
                 <option value="clerk">{t("roles.clerk")}</option>
                 <option value="lawyer">{t("roles.lawyer")}</option>
                 <option value="it-director">{t("roles.itDirector")}</option>
                 <option value="admin">{t("roles.admin")}</option>
                 <option value="other">{t("roles.other")}</option>
               </select>
            </div>
          </div>

          <div>
             <label htmlFor="phone" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
               {t("fields.phone")}
             </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:placeholder-zinc-500 placeholder-zinc-400"
              placeholder="+212 6XX-XXXXXX"
            />
          </div>

          <div>
             <label htmlFor="message" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
               {t("fields.message")} <span className="text-red-500">*</span>
             </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              maxLength={5000}
              className="w-full px-4 py-2.5 rounded-md dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:placeholder-zinc-500 placeholder-zinc-400 resize-none"
               placeholder={tDossera("contactFormPlaceholders.message")}
            />
          </div>

          <button
            type="submit"
            disabled={formState === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === "submitting" ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                 {t("submitting")}
              </>
            ) : (
               t("submit")
            )}
          </button>

           <p className="text-xs dark:text-zinc-500 text-zinc-500 text-center">
             {t("privacy")}
           </p>
        </form>
      </div>
    </Slide>
  );
}