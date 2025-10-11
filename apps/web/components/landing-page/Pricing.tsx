"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "../ui/lamp";
import PriceCard from "./PriceCard";
import { price } from "@/lib/price";

export function Pricing() {

    const cards = Array.from({ length: 2 }, (_, i) => i + 1);

    return (
        <section>
            <LampContainer className="relative">
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-neutral-300 to-neutral-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Price Plans That <br /> Fit You Best
                </motion.h1>
            </LampContainer>
        </section>
    );
}
