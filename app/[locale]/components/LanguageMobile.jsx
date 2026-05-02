import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLogin } from "react-icons/md";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import { useRouter } from "next-intl/client";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useTranslations } from "next-intl";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function LanguageMobile(props) {
  const pathname = usePathname();
  const locale = useLocale();

  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");
  const [open, setOpen] = useState(false);
  const t = useTranslations("navigation");
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setOpen(false);
    },
  });

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
    { code: "fr", label: "Français", flagSrc: "/fr-FR.webp" },
    { code: "es", label: "Español", flagSrc: "/es-ES.webp" },
    { code: "vi", label: "Tiếng Việt", flagSrc: "/vi-VN.webp" },
    { code: "hi", label: "हिंदी", flagSrc: "/hi-IN.webp" },
    { code: "it", label: "Italian", flagSrc: "/it-IT.webp" },
    { code: "tr", label: "Türk", flagSrc: "/tr-TR.webp" },
    { code: "id", label: "Bahasa", flagSrc: "/id-ID.webp" },
    { code: "ml", label: "മലയാളം", flagSrc: "/ml_IN.webp" },
    { code: "ps", label: "پښتو", flagSrc: "/ps-AF.webp" },
    { code: "ru", label: "Русский", flagSrc: "/ru_RU.webp" },
    { code: "ko", label: "한국어", flagSrc: "/ko-KR.webp" },
    { code: "fa", label: "فارسی", flagSrc: "/fa-IR.webp" },
    { code: "tl", label: "Filipino", flagSrc: "/tl-PH.webp" },
    { code: "pt", label: "Português", flagSrc: "/pt-PT.webp" },
    { code: "th", label: "แบบไทย", flagSrc: "/th-TH.webp" },
    { code: "ur", label: "اردو", flagSrc: "/ur-PK.webp" },
   
    // Add more languages as needed
  ];
  return (
    <Popover className="" ref={ref}>
      <Popover.Button
        // className="inline-flex items-center border border-[#ccc] rounded-none p-1 bg-primary text-white"
        className="bg-white text-primary border border-gray-200 p-[4px] text-sm flex justify-start items-center gap-2 cursor-pointer capitalize"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img
          src={getFlagPath(locale)}
          className="h-[22px] w-[32px]"
          alt={locale.toLowerCase()}
        />
        {<FaAngleDown />}
      </Popover.Button>

      <Transition
        as={Fragment}
        show={open}
        enter="transform transition duration-300 ease-out"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition duration-200 ease-in"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <Popover.Panel
          className="fixed h-full top-0 right-0 z-50 w-90% max-w-sm bg-white overflow-y-auto"
          style={{ width: "60%" }}
        >
          <div className="flex flex-row items-center justify-between p-4 border-b border-gray-300 ">
            <button
              className="text-primary text-2xl"
              onClick={() => setOpen(false)} // Close the popover when the icon is clicked
            >
              <RxCross2 />
            </button>
            <Image
              src={getFlagPath(locale)}
              width={28}
              height={16}
              alt={locale.toLowerCase()}
            />
          </div>

          <ul className=" p-0 text-accent">
            {languages.map((language) => (
              <li key={language.code} className="p-2 border-b">
                <Link
                  href={
                    pathnameWithoutLocale === "" ? "/" : pathnameWithoutLocale
                  }
                  locale={language.code}
                  className="flex gap-2  items-center"
                >
                  <div>
                    <Image
                      src={language.flagSrc}
                      width={16}
                      height={8}
                      alt={language.label}
                    />
                  </div>
                  <span>{language.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
