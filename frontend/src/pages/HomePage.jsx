import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HomeHero from "../components/home/HomeHero";

function HomePage() {
  const location = useLocation();

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
