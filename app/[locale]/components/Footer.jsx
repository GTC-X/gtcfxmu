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
        {/* White curve - U-shaped indentation: white band dips in center, curves up on sides */}
        <div className="absolute top-[-60px] left-0 w-full pointer-events-none overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1255"
            height="113"
            viewBox="0 0 1255 113"
            fill="none"
            className="mx-auto w-full"
          >
            <path
              d="M1219 0C1238.88 8.6653e-06 1255 16.1178 1255 36C1255 78.5259 1220.53 113 1178 113H77C34.4741 113 0 78.5259 0 36C8.37589e-07 16.1178 16.1178 0 36 0H1219Z"
              fill="white"
            />
          </svg>
        </div>
        {/* Logo and App Download Section */}
        <div className="container mx-auto px-3 border-white border-opacity-20 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 md:gap-8 py-2 sm:py-0">
            {/* Logo Section */}
            <div className="flex flex-col items-center lg:items-start">
              <Link href="/" locale={locale} aria-label="GTCFX">
                <Image
                  src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/footer-logo.webp"
                  width={150}
                  height={53}
                  alt="GTCFX official logo"
                  className=""
                  priority
                />
              </Link>
            </div>

            <div className="flex flex-row justify-center">
              <Image
                src="/footer/iso9001_icon.png"
                className="h-22 w-22"
                width={80}
                height={100}
                alt="iso icon"
              />
              <Image
                src="/footer/iso26000_icon.png"
                className="h-22 w-22"
                width={80}
                height={100}
                alt="iso icon"
              />
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-row gap-4">
              <a
                href="https://apps.apple.com/ae/app/gtc-go/id6753007277"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#B68756] via-[#995F22] to-[#995F22] hover:from-[#263788] hover:via-[#101638] hover:to-[#263788] border border-white border-opacity-30 rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
                aria-label="Download on the App Store"
              >
                <svg
                  className="w-8 h-8 mr-2 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left text-white">
                  <div className="text-[10px] leading-tight">
                    Download on the
                  </div>
                  <div className="text-sm font-semibold leading-tight">
                    App Store
                  </div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/search?q=GTC%20Go&c=apps&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#B68756] via-[#995F22] to-[#995F22] border border-white border-opacity-30 hover:from-[#263788] hover:via-[#101638] hover:to-[#263788]  rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
                aria-label="Get it on Google Play"
              >
                <svg
                  className="w-8 h-8 mr-2 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left text-white">
                  <div className="text-[10px] leading-tight">GET IT ON</div>
                  <div className="text-sm font-semibold leading-tight">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimers Section */}
        <div className="container mx-auto px-3 border-t border-white border-opacity-20 pt-8 relative z-10">
          <div className="text-xs text-white text-opacity-70 space-y-3 leading-5">
            <p>{t("footerNotice.firstPara")}</p>
            <p>
              <span className="text-secondary">
                {t("footerNotice.gtc_group_heading1")}
              </span>
              {t("footerNotice.gtc_group_para1")}
            </p>
            <p>{t("footerNotice.gtc_multi_trading_para")}</p>
            <p>
              <span className="text-secondary">
                {t("footerNotice.gtc_global_pty_heading")}
              </span>
              {t("footerNotice.gtc_global_pty_para")}
            </p>
            <p>{t("footerNotice.eightPara")}</p>
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  );
};

export default Footer;
