import { FeaturesSection } from "@/components/landing-page/FeaturesSection";
import { FooterBanner } from "@/components/landing-page/FooterBanner";
import FooterComponent from "@/components/landing-page/FooterComponent";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import PriceCard from "@/components/landing-page/PriceCard";
import { Pricing } from "@/components/landing-page/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero/>
        <FeaturesSection/>
        <Pricing/>
        <PriceCard/>
        <FooterBanner/>
      </main>
    </>
  );
}