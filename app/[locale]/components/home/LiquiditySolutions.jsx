import React from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import LiquidityCarousel from "./LiquidityCarousel";
import { useTranslations } from "next-intl";
import TechnologyCarousel from "./TechnologyCarousel";
import BridgeCarousel from "./BridgeCarousel";
import Link from "next-intl/link";


const LiquiditySolutions = () => {
  const t = useTranslations("home.liquidity_provider");

  // Define tab keys (static, language-independent)
  const tabKeys = ["liquidity", "technology", "bridge"];

  // Define tab titles dynamically from translations
  const tabs = tabKeys.map((key) => t(`tab.${key}.title`));

  // Use tabKeys for rendering content
  const renderTabContent = (tabKey) => {
    switch (tabKey) {
      case "liquidity":
        return <LiquidityCarousel />;
      case "technology":
        return <TechnologyCarousel />;
      case "bridge":
        return <BridgeCarousel />;
      default:
        return null;
    }
  };

  return (
    <section className="py-10 lg:py-[70px] bg-[#ECF3FD] bg-[url('/platform-bg.png')] bg-cover bg-center bg-blend-multiply text-center">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-6">
          <h2 className="HeadingH2 font-medium mb-5 text-center">{t("heading")}</h2>
          <p className="text-accent md:text-base text-sm 2xl:text-[17px] text-center max-w-6xl mx-auto">
            {t("desc")}
          </p>
        </div>

        {/* Tabs */}
        <Tab.Group>
          <Tab.List className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            {tabs.map((tab, index) => (
              <Tab
                key={tabKeys[index]} // Use the static key instead of translated title
                className={({ selected }) =>
                  clsx(
                    "px-4 py-2 border",
                    selected
                      ? "bg-gradient-to-r from-[#243586] from-10% via-[#222e73] via-30% to-[#141b43] to-90% text-white"
                      : "border-gray-400 text-gray-700"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {tabKeys.map((tabKey, index) => (
              <Tab.Panel key={tabKey}>{renderTabContent(tabKey)}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

 
      </div>
    </section>
  );
};

export default LiquiditySolutions;
