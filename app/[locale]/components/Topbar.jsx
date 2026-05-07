import React from 'react';
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Link from "next-intl/link";
import { MdOutlineLogin } from "react-icons/md";
import Language from "./Language";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const TopBar = ({ currentLanguage, isAr, href }) => {
  const t = useTranslations("navigation");
  const router = useRouter();
  const locale = useLocale();

  // Define base links for different regions
  const baseLink =
    'https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww';

  const baseLink2 =
    'https://mygtcportal.com';

  const newClientPortalLink = `${baseLink2}/`;
  const accountLink = `${baseLink}`;
  const registerLink = `${baseLink}`;

  return (
    <section className="hidden lg:block border-b border-gray-200 bg-neutral-gradient text-white" id="register1">
      <div className="container flex flex-row justify-between items-center">
        {/* Contact Info */}
        <div className="content-top flex flex-row gap-2">
          <p className="text-[14px] font-[400] flex items-center gap-4 py-3">
           <Link href="tel:+2304672000" className="flex items-center gap-2 hover:text-secondary text-sm">
              <BsTelephoneFill /> +230 467 2000
            </Link>
            <span className="h-4 border-l border-white"></span>
            <Link href="mailto:support@gtcfx.com" className="flex items-center gap-2 hover:text-secondary text-sm">
              <MdEmail /> support@gtcfx.com
            </Link>
            <span className="h-4 border-l border-white"></span>
          
          </p>
        </div>

      </div>
    </section>
  );
};

export default TopBar;
