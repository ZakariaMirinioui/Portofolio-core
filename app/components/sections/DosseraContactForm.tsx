"use client";

import { useState } from "react";
import { Slide } from "../../animation/Slide";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { trackDemoRequested, trackContactFormSubmitted } from "../../lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

export default function DosseraContactForm() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
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

      setFormState("success");
      setFormData({
        name: "",
        email: "",
        organization: "",
        role: "",
        phone: "",
        message: "",
        honeypot: "",
      });
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  if (formState === "success") {
    return (
      <Slide delay={0.5}>
        <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8 text-center">
          <BiCheckCircle className="text-4xl dark:text-green-400 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-incognito font-bold tracking-tight mb-2">
            Thank You!
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-md mx-auto mb-6">
            Your demo request has been received. Our team will review your inquiry and get back to you within 24 hours.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md dark:bg-zinc-800 bg-zinc-200 dark:text-white text-zinc-900 font-medium border dark:border-zinc-700 border-zinc-300 hover:dark:border-zinc-500 hover:border-zinc-400 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </Slide>
    );
  }

  return (
    <Slide delay={0.5}>
      <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8">
        <h2 className="text-2xl font-incognito font-bold tracking-tight mb-2">
          Request a Demo
        </h2>
        <p className="dark:text-zinc-400 text-zinc-600 mb-6">
          Interested in Dossera JAMS for your institution? Fill out the form below and we&apos;ll schedule a personalized demonstration.
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
                Full Name <span className="text-red-500">*</span>
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
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-md dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:placeholder-zinc-500 placeholder-zinc-400"
                placeholder="you@organization.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="organization" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                Organization <span className="text-red-500">*</span>
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
                placeholder="Court, law firm, or institution name"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                Your Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="">Select your role</option>
                <option value="magistrate">Magistrate / Judge</option>
                <option value="clerk">Clerk / Registrar</option>
                <option value="lawyer">Lawyer / Legal Advisor</option>
                <option value="it-director">IT Director</option>
                <option value="admin">Administrator</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-1">
              Phone (optional)
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
              Message <span className="text-red-500">*</span>
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
              placeholder="Tell us about your institution, current challenges, and what you'd like to achieve with Dossera JAMS..."
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
                Sending...
              </>
            ) : (
              "Request Demo"
            )}
          </button>

          <p className="text-xs dark:text-zinc-500 text-zinc-500 text-center">
            By submitting, you agree to be contacted about Dossera JAMS. We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </Slide>
  );
}