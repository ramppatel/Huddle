import React from "react";
import HeroSection from "../components/home/HeroSection";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HomeHero from "../components/home/HomeHero";

function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <HomeHero />
      <Footer />
    </>
  );
}

export default HomePage;
