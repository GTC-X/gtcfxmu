"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next-intl/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next-intl/client";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Language = (props) => {
  const { currentLanguage } = props;
  const locale = useLocale();
  const pathname = usePathname();
  const isAr = pathname.includes("/ar");
  const router = useRouter();
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Helper function to get flag path from locale code
  const getFlagPath = (localeCode) => {
    const flagMap = {
      "en": "/en.webp",
      "ar": "/ar.webp",
      "zh": "/zh-hans.webp",
      "zh-tw": "/zh-TW.webp",
      "fr": "/fr-FR.webp",
      "es": "/es-ES.webp",
      "vi": "/vi-VN.webp",
      "hi": "/hi-IN.webp",
      "it": "/it-IT.webp",
      "tr": "/tr-TR.webp",
      "id": "/id-ID.webp",
      "ml": "/ml_IN.webp",
      "ps": "/ps-AF.webp",
      "ru": "/ru_RU.webp",
      "ko": "/ko-KR.webp",
      "fa": "/fa-IR.webp",
      "tl": "/tl-PH.webp",
      "pt": "/pt-PT.webp",
      "th": "/th-TH.webp",
      "ur": "/ur-PK.webp",
      "ms": "/ms-MY.webp",
    };
    return flagMap[localeCode] || "/en.webp";
  };

  const languages = [
    { code: "en", label: "English", flagSrc: "/en.webp" },
    { code: "ar", label: "العربية", flagSrc: "/ar.webp" },
    { code: "zh", label: "中文", flagSrc: "/zh-hans.webp" },
    { code: "zh-tw", label: "台灣", flagSrc: "/zh-TW.webp" },
    { code: "es", label: "Español", flagSrc: "/es-ES.webp" },
    { code: "it", label: "Italian", flagSrc: "/it-IT.webp" },
    { code: "fa", label: "فارسی", flagSrc: "/fa-IR.webp" },
    { code: "tl", label: "Filipino", flagSrc: "/tl-PH.webp" },
    { code: "fr", label: "Français", flagSrc: "/fr-FR.webp" },
    { code: "vi", label: "Tiếng Việt", flagSrc: "/vi-VN.webp" },
    { code: "hi", label: "हिंदी", flagSrc: "/hi-IN.webp" },
    { code: "ms", label: "Melayu", flagSrc: "/ms-MY.webp" },
    { code: "tr", label: "Türk", flagSrc: "/tr-TR.webp" },
    { code: "id", label: "Bahasa", flagSrc: "/id-ID.webp" },
    { code: "ps", label: "پښتو", flagSrc: "/ps-AF.webp" },
    { code: "ru", label: "Русский", flagSrc: "/ru_RU.webp" },
     { code: "ko", label: "한국어", flagSrc: "/ko-KR.webp" },
    { code: "pt", label: "Português", flagSrc: "/pt-PT.webp" },
    { code: "th", label: "แบบไทย", flagSrc: "/th-TH.webp" },
    { code: "ur", label: "اردو", flagSrc: "/ur-PK.webp" },

    // Add more languages as needed
  ];

  return (
    <div className="dropdown dropdown-hover z-50 relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-white text-primary border border-gray-200 px-2 py-[6px] text-sm flex justify-start items-center gap-2 cursor-pointer capitalize"
      >
        <Image
          src={getFlagPath(locale)}
          width={28}
          height={16}
          alt={locale.toLowerCase()}
        />
        {dropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {dropdownOpen && (
        <ul
          tabIndex={0}
          className={`dropdown-content z-[99] pt-1 mt-1 language-setting menu shadow bg-white border border-gray-300 absolute rounded-none md:w-[310px] flex flex-row gap-1 text-sm ltr:right-0 rtl:left-0 ${currentLanguage?.direction == "rtl" ? "arabic" : ""}`}
        >
          {languages.map((language) => (
            <li key={language.code}>
              <Link
                href={
                  pathnameWithoutLocale === "" ? "/" : pathnameWithoutLocale
                }
                locale={language.code}
                className="language px-2"
              >
                <Image
                  src={language.flagSrc}
                  width={16}
                  height={8}
                  alt={language.label}
                />
                {language.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Language;