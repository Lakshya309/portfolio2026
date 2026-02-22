"use client";
import VideoHero from "../components/VideoHero";
import Philosophy from "../components/sections/Philosophy";
import TechExperienceMarquee from "../components/TextExperienceMarquee";
import Services from "../components/sections/Services"
// Components
import CreativeNav from "../components/CreativeNav";
import BlackBgProvider from "../components/BlackBgProvider";

export default function PortfolioPage() {
  return (
    <div className="bg-tea_green selection:bg-light_bronze selection:text-cornsilk">
      <CreativeNav />
      <VideoHero />
      <BlackBgProvider>
        <Philosophy />
        <TechExperienceMarquee />
      </BlackBgProvider>
      <Services />
    </div>
  );
}