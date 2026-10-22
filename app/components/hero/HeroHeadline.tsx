"use client";

import { useEffect, useState } from "react";

export default function HeroHeadline() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <h1
      className={`font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } transition-all duration-700 ease-out`}
    >
      Full Stack Developer & Digital Solutions Architect — Building enterprise-grade applications for judicial and secure logistics sectors
    </h1>
  );
}