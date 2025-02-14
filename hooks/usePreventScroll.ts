"use client";

import { useEffect } from "react";

export function usePreventScroll(prevent: boolean) {
  useEffect(() => {
    if (prevent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [prevent]);
}
