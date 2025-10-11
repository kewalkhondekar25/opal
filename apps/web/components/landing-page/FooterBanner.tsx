"use client";

import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import FooterComponent from "./FooterComponent";

export function FooterBanner() {
  return (
    <section className="h-screen">
      <div 
        className="hidden
        sm:h-[40rem] sm:flex sm:items-center sm:justify-center">
        <TextHoverEffect text="OPAL" />
      </div>
      <FooterComponent/>
    </section>
  );
}
