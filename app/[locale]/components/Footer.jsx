"use client";
import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
 import CopyRight from "./CopyRight";
import Link from "next-intl/link";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useRouter } from "next-intl/client";
import {
  BiLogoFacebookCircle,
  BiLogoYoutube,
  BiLogoLinkedinSquare,
  BiLogoInstagramAlt,
  BiLogoTelegram,
  BiLogoTiktok,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  const t = useTranslations("footerLink");
  const t2 = useTranslations("home.hero");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

  // Add a check to see if the pathname is not the home page
  const isNotHomePage = pathname !== `/${locale}` && pathname !== "/";

  const emailLink =
    locale === "fa" ? "support.tr@gtcfx.com" : "support@gtcfx.com";

  const socialMediaIcons = [
    {
      icon: BiLogoFacebookCircle,
      link: "https://www.facebook.com/GTCFXGlobalTradeCapital",
    },
    {
      icon: BiLogoInstagramAlt,
      link: "https://www.instagram.com/gtcfxofficial/",
    },
    { icon: FaXTwitter, link: "https://x.com/GTC_fx" },
    {
      icon: BiLogoYoutube,
      link: "https://www.youtube.com/channel/UCnKWakjm1b9Bm63xgwNFXHA",
    },
    {
      icon: BiLogoLinkedinSquare,
      link: "https://linkedin.com/company/gtcfx-official",
    },
    { icon: BiLogoTiktok, link: "https://www.tiktok.com/@gtcgroup_official" },
    { icon: BiLogoTelegram, link: "https://t.me/gtc_vip_signal" },
  ];

  // Footer sections - first 4 columns
  const footerSections = [
    {
      title: t("link.label"),
      links: [
        {
          name: t("link.menu1"),
          link: "/about-us",
        },
        {
          name: t("link.menu6"),
          link: "/why-gtc-group",
        },

        {
          name: t("link.menu5"),
          link: "/global-presence",
        },
        {
          name: t("link.menu3"),
          link: "/awards",
        },

        {
          name: t("link.menu11"),
          link: "/company-news",
        },
        {
          name: t("link.menu12"),
          link: "/blogs",
        },
        {
          name: t("link.menu8"),
          link: "/careers",
        },
        {
          name: t("link.menu9"),
          link: "/contact-us",
        },
      ],
    },
    {
      title: t("rules.label"),
      links: [
        {
          name: t("rules.menu1"),
          link: "/forex",
        },
        {
          name: t("rules.menu2"),
          link: "/precious-metals",
        },
        {
          name: t("rules.menu3"),
          link: "/stock",
        },
        {
          name: t("rules.menu4"),
          link: "/cfd-energy",
        },
        {
          name: t("rules.menu5"),
          link: "/commodities",
        }
      ],
    },
    {
      title: t("rules.label2"),
      links: [
        {
          name: t("rules.menu6"),
          link: "/mt4-platform",
        },
        {
          name: t("rules.menu7"),
          link: "/mt5-platform",
        },

        {
          name: t("rules.menu9"),
          link: "/download-app",
        },
        {
          name: t("link.menu2"),
          link: "/regulations",
        },

        {
          name: t("link.menu10"),
          link: "/glossary-faqs",
        },

        {
          name: t("link.menu7"),
          link: "/restricted-countries",
        },
        {
          name: t("update.menu10"),
          link: "/legal-policies-client-agreements",
        },
      ],
    },
    {
      title: t("update.label"),
      links: [
        {
          name: t("update.menu1"),
          link: "/liquidity-technology",
        },
        {
          name: t("update.menu2"),
          link: "/copy-trading",
        },
        {
          name: t("update.menu3"),
          link: "/pamm-account",
        },
        {
          name: t("update.menu4"),
          link: "/mam-account",
        },
        {
          name: t("update.menu9"),
          link: "/vps-hosting-services",
        }

      ],
    }, ,
  ];

  const contact = [
    {
      title: t("contact.label"),
      links: [
        {
          text: t("contact.num"),
          label: t("contact.menu1"),
          icon: BsTelephoneFill,
        },
        {
          text: emailLink,
          label: t("contact.menu2"),
          icon: MdEmail,
        },
        {
          text: "393526",
          label: t("contact.menu3"),
          icon: FaEnvelopeOpenText,
        },
        {
          text: "24/7",
          label: t("contact.menu4"),
          icon: AiFillClockCircle,
        },
      ],
    },
  ];

  return (
    <>
      <div
        className={`pb-10 z-30 py-2 md:pt-14 xl:pt-16 md:pb-8 xl:pb-10 relative overflow-hidden ${isNotHomePage ? "mt-16" : ""
          }`}
        style={{
          background: "linear-gradient(to bottom, #293B93, #0D122D)",
        }}
      >
       
   
        {/* Disclaimers Section */}
        <div className="container mx-auto px-3  border-opacity-20 relative z-10">
          <div className="text-xs text-white text-opacity-70 space-y-3 leading-5">
            <p>This website is owned and operated by GTC Global Trading Ltd, a private limited company incorporated under the laws of the Autonomous Island of Anjouan, Union of the Comoros, with company number 16283. GTC Global Trading Ltd holds licence number AOFA No. L16283/GTC issued by the Anjouan Offshore Finance Authority.</p>
            <p>
             Registered Address: Boulevard de Coalancanthe, Mutsamudu, Anjouan, Union of the Comoros. <br></br>
Physical Address: Ketevan Tsamebuli Avenue 24, Office 42, Tbilisi, 0103, Georgia.

            </p>
            <p>Risk Warning: Trading foreign exchange, Contracts for Difference (CFDs), and other derivative products involves a high level of risk and may not be suitable for all investors. These products are leveraged instruments and may result in the loss of all invested capital, and in certain circumstances losses may exceed the initial amount invested. You do not own or have any rights to the underlying assets. Before engaging in any trading activity, you should carefully consider your investment objectives, financial situation, level of experience, and risk tolerance. You should not trade with funds that you cannot afford to lose. The information on this website does not constitute investment advice, financial advice, tax advice, or a recommendation to buy or sell any financial product. If you are uncertain, you should seek advice from an independent financial, legal, or tax advisor.</p>
            <p>
              Restricted Jurisdictions: GTC Global Trading Ltd DOES NOT provide services to residents of the United States, Japan, or any jurisdiction where the provision, distribution, or use of such services would be contrary to applicable laws or regulations. It is the responsibility of each visitor and client to ensure that accessing this website and using the services is permitted under the laws of their country of residence or incorporation.
            </p>
            <p>GTC Financial Group Disclaimer: Each entity within the GTC Financial Group operates as a separate and independent legal entity. The financial products and services described on this website are provided solely by the relevant contracting entity, and no other entity within the group shall be responsible for such products or services unless expressly stated otherwise.</p>
            <p>Nothing on this website should be interpreted as a solicitation, offer, or recommendation in any jurisdiction where such activity would be unlawful.</p>
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  );
};

export default Footer;
