"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight, BiLogoLinkedinSquare } from "react-icons/bi";
import { Slide } from "../../animation/Slide";
import type { TestimonialType } from "@/types";
import { trackEvent } from "../../lib/analytics";

type Props = {
  testimonials: TestimonialType[];
  autoPlay?: boolean;
  interval?: number;
};

export default function TestimonialsCarousel({ 
  testimonials, 
  autoPlay = true,
  interval = 5000 
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length, interval]);

  // Handle manual navigation
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial._id} className="w-full flex-shrink-0 px-4">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={goToPrevious}
            aria-label="Previous testimonial"
            className="p-2 rounded-full dark:bg-primary-bg bg-zinc-100 dark:text-white text-zinc-900 hover:dark:bg-zinc-800 hover:bg-zinc-200 transition-colors"
          >
            <BiChevronLeft className="text-xl" />
          </button>
          <div className="flex gap-1.5" role="tablist" aria-label="Testimonial slides">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "dark:bg-primary-color bg-secondary-color w-6"
                    : "dark:bg-zinc-500 bg-zinc-400"
                }`}
              />
            ))}
          </div>
          <button
            onClick={goToNext}
            aria-label="Next testimonial"
            className="p-2 rounded-full dark:bg-primary-bg bg-zinc-100 dark:text-white text-zinc-900 hover:dark:bg-zinc-800 hover:bg-zinc-200 transition-colors"
          >
            <BiChevronRight className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialType }) {
  return (
    <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-xl p-8 text-center max-w-3xl mx-auto">
      {/* Stars */}
      {testimonial.rating && (
        <div className="flex items-center justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-lg ${
                star <= (testimonial.rating || 0)
                  ? "text-amber-400"
                  : "dark:text-zinc-600 text-zinc-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      )}

      {/* Quote */}
      <p className="dark:text-zinc-300 text-zinc-700 leading-relaxed italic mb-6 text-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center justify-center gap-4">
        {testimonial.authorImage?.image ? (
          <Image
            src={testimonial.authorImage.image}
            width={56}
            height={56}
            alt={testimonial.authorName || "Client"}
            className="rounded-full border-2 dark:border-primary-color border-secondary-color"
          />
        ) : (
          <div className="w-14 h-14 rounded-full dark:bg-zinc-800 bg-zinc-200 flex items-center justify-center border-2 dark:border-primary-color border-secondary-color">
            <span className="text-xl font-bold dark:text-primary-color text-secondary-color">
              {testimonial.authorName?.charAt(0) || "C"}
            </span>
          </div>
        )}

        <div className="text-left">
          <div className="font-incognito font-semibold dark:text-white text-zinc-900">
            {testimonial.isAnonymous ? "Anonymous Client" : testimonial.authorName}
          </div>
          <div className="text-sm dark:text-zinc-400 text-zinc-600">
            {testimonial.authorRole}
            {testimonial.authorOrganization && (
              <> — {testimonial.authorOrganization}</>
            )}
          </div>
          {testimonial.authorLinkedIn && (
            <a
              href={testimonial.authorLinkedIn}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackEvent("github_link_clicked", { 
                repo: "linkedin-profile",
                source_page: window.location.pathname 
              })}
              className="inline-flex items-center gap-1 text-xs dark:text-primary-color text-secondary-color hover:underline mt-1"
            >
              <BiLogoLinkedinSquare className="text-sm" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}