"use client";
import Hero from "../components/Hero";
import Philosophy from "../components/sections/Philosophy";
import TechExperienceMarquee from "../components/TextExperienceMarquee";
import Services from "../components/sections/Services"
import ProjectSection from "../components/sections/ProjectSection";
// Components
import NewNav from "../components/NewNav";
import BlackBgProvider from "../components/BlackBgProvider";

export default function PortfolioPage() {
  return (
    <div className="bg-tea_green selection:bg-light_bronze selection:text-cornsilk">
      <NewNav />
      <Hero />
      <BlackBgProvider>
        <Philosophy />
        <TechExperienceMarquee />
        <ProjectSection />
      </BlackBgProvider>
      <Services />
    </div>
  );
}