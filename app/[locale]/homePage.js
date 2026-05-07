'use client'
import Hero from "./components/home/Hero";
import { useTranslations } from "next-intl";
import WhyGTC from "./components/home/WhyGTC";
import Markets from "./components/home/Markets";
import SecurityFund from "./components/home/SecurityFund";
import StatCounter from "./components/home/StatCounter";
import { useParams } from "next/navigation";
import ClientsNetwork from "./components/home/ClientsNetwork";
import ClientPayments from "./components/home/ClientPayments";
import LiquiditySolutions from "./components/home/LiquiditySolutions";
import TradingPlatform from "./components/home/TradingPlatform";
import { useEffect } from "react";

import TradingOptionsSection from "./components/home/TradingOptionsSection";

function scrollToHashId(id, behavior = "smooth") {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior, block: "start" });
  }
}


 
export default function HomePage() {
  const t = useTranslations("home"); 

  const router = useParams();
  const { locale } = router;

  // Dynamically handle value based on locale
  const dynamicValue = locale === "zh" || locale === "zh-tw" ? 1350 : 750;
  

  useEffect(() => {
    const id = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    if (!id) return;
    const timeoutId = window.setTimeout(() => scrollToHashId(id), 150);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const statsOne = [
    { value: 985000, description: t("hero.fact_desc1"), prepend: "+" },
    { value: 27000, description: t("hero.fact_desc2"), symbol: "", prepend: "+", },
    { value: 20, description: t("hero.fact_desc3"), prepend: "+", },
    {
      value: dynamicValue, // Dynamically set based on locale
      description: t("hero.fact_desc4"),
      bold: t("hero.fact_no4"),
      symbol: t("hero.fact_syn1"),
      prepend: true,
    },

  ];


  return (

      <>

        <Hero />
   
        <WhyGTC />
        <div id="liquidity-solutions" className="scroll-mt-36">
          <LiquiditySolutions />
        </div>
       
        <div id="account-types" className="scroll-mt-36">
          <TradingPlatform />
        </div>
        <div id="markets" className="scroll-mt-36">
          <Markets />
        </div>
        <ClientsNetwork />
        <div id="payment-methods" className="scroll-mt-36">
          <ClientPayments />
        </div>   
        {/* <CompanyNews/> */}
      </>
  
  );
}
