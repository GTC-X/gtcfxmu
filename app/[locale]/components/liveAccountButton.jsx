import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const LiveAccountButton = ({ hoverStyle, link }) => {
  const t = useTranslations("home.hero");
  const locale = useLocale(); // Get the current locale

  // Define lists of countries
  const europeanCountries = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'];
  
  const baseLink =
    'https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww';

  const finalLink = link || baseLink;

  return (
    <Link
  href='https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww'
  target="_blank"
  className={`text-sm 3xl:text-xl px-8 py-3 text-center hover:bg-gradient-to-r hover:from-secondary hover:to-[#b68756] rounded-md md:w-auto w-[300px] md:m-0 mx-auto transition-colors duration-500 ${hoverStyle || 'text-primary bg-neutral-gradient  hover:bg-gradient-to-r hover:from-secondary hover:to-[#b68756]'}`}
>
  {t("liveAccount")}
</Link>
  );
};

export default LiveAccountButton;
