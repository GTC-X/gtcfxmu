"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next-intl/link";
import { useLocale, useTranslations } from "next-intl";
import MobileMenu from "./MobileMenu";
import { useRouter } from "next-intl/client";
import { useParams, usePathname } from "next/navigation";
import { useDetectClickOutside } from "react-detect-click-outside";
import LanguageMobile from "./LanguageMobile";
import TopBar from "./Topbar";

const NavItem = ({
  title,
  links,
  href,
  locale,
  description,
  id,
  show,
  setShow,
  sectionId,
  onSectionNavigate,
}) => {
  const [arrow, setArrow] = useState("down");
  const router = useRouter();
  const urlLocale = useLocale();
  const pathname = usePathname();
  const isAr = pathname.includes("/ar");
  const pathnameWithoutLocale = pathname.replace(`/${urlLocale}`, "");
  const innerActive = links?.some((single) => {
    return single?.items?.some((x) => x?.href === pathnameWithoutLocale);
  });
  const activeClass =
    pathnameWithoutLocale == href || innerActive
      ? "text-secondary"
      : "text-primary";

  const isExternal = (href = "") => /^https?:\/\//i.test(href);
  return (
    <li className={`${activeClass} clickable hover:text-secondary `}>
      <div
        className="flex justify-center items-center"
        // onMouseEnter={() => {
        //   setShowMenu("!block");
        //   setArrow("up");
        // }}
        // onMouseLeave={() => {
        //   setShowMenu("hidden");
        //   setArrow("down");
        // }}
        onClick={() => {
          if (sectionId && onSectionNavigate) {
            onSectionNavigate(sectionId);
            setArrow("up");
            return;
          }
          setShow(show == id ? "" : id);
          setArrow("up");
          // router.push(href, { locale: locale });
        }}
      >
        <button
          className={`block cursor-pointer py-6  ${
            isAr ? "pr-2 lg:pr-5 pl-2 lg:pl-5" : "pl-2 lg:pl-4 lg:pr-4"
          }  lg:py-5 text-[sm] lg:text-[15px] 3xl:text-lg`}
        >
          {title}
        </button>
      </div>
    </li>
  );
};

const Header = ({currentLanguage}) => {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [show, setShow] = useState("");
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");
  const [href, setHref] = useState([
    {
      href: "/",
      locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
    },
  ]);
  const isAr = pathname.includes("/ar");
  const navigationData = [
    {
      title: "Invest",
      locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
      description: t("about.des"),
      id: 1,
      sectionId: "liquidity-solutions",
    },
    {
      title: "Account Types",
      href: "#",
      locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
      description: t("account.des"),
      id: 2,
      sectionId: "account-types",
    },
    {
      title: "Smart Trading",
      href: "#",
      locale: "en,ar,zh,zh,it,tr,fr,es,pt,ur,hi,vi,id,fa,fa,tl,th,ko,,ja,ms,ru,ps",
      description: t("trading.des"),
      id: 3,
      sectionId: "smart-trading",
    },
    {
      title: "Market Overview",
      href: "#",
      locale: "en,ar,zh,th,ko,,ja,ms,ru,ps,pt,tr,",
      description: t("partner.des"),
      id: 4,
      sectionId: "markets",
    },
    {
      title: "Payment Methods",
      href: "#",
      locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
      description: t("technology.des"),
      id: 5,
      sectionId: "payment-methods",
    },
  ];
  const extractHrefsAndLocales = (data) => {
    if (data?.length > 0 && pathnameWithoutLocale != "/") {
      const extractedData = [];
      data.forEach((item) => {
        const { href, locale, links } = item;

        if (href && locale) {
          extractedData.push({ href, locale });
        } else if (href) {
          extractedData.push({ href, locale: null });
        }

        links?.forEach((link) => {
          link.items?.forEach((subItem) => {
            const { href, locale } = subItem;
            if (href && locale) {
              extractedData.push({ href, locale });
            } else if (href) {
              extractedData.push({ href, locale: null });
            }
          });
        });
      });
      setHref(extractedData?.filter((x) => x?.href == pathnameWithoutLocale));
      return extractedData;
    }
  };

  useEffect(() => {
    if (pathname == "/") {
      setHref([
        {
          href: "/",
          locale: "en,ar,zh,it,tr,fr,es,hi,vi,id,fa",
        },
      ]);
      return;
    }
    if (params?.slug) {
      setHref([
        {
          href: `${params?.slug?.[0]}/${params?.slug?.[1]}/${params?.slug?.[2]}`,
          locale: "en,ar",
        },
      ]);
      return;
    }
    if (navigationData) {
      extractHrefsAndLocales(navigationData);
    }
  }, [pathname]);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setShow("");
    },
  });

  const isHomePath =
    pathnameWithoutLocale === "" || pathnameWithoutLocale === "/";

  const navigateToHomeSection = (sectionId) => {
    setShow("");
    if (isHomePath) {
      window.history.replaceState(null, "", `#${sectionId}`);
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    router.push(`/#${sectionId}`, { locale });
  };

  return (
    <>
    <TopBar currentLanguage={currentLanguage} /> {/* Use the TopBar component */}

      <div className="header py-2 sticky top-0 z-[40] bg-white border-b border-gray-200 shadow-sm">
  <nav className="container">
    <div className="flex items-center justify-between">
      <Image
        src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/logo-2024-new.webp"
        width={200}
        height={72}
        alt="GTCFX"
        className="lg:w-[200px] lg:h-[72px] md:w-[120px] md:h-[53px] w-[130px] h-[47px] cursor-pointer"
        onClick={() => router.push("/", { locale })}
      />

      {/* ✅ make this take full remaining width */}
      <div className="hidden lg:flex flex-1 justify-end items-center" ref={ref}>
        <ul className="flex items-center">
          {navigationData.map((item, index) => (
            <NavItem
              key={index}
              id={item?.id}
              title={item.title}
              href={item.href}
              locale={locale}
              links={item.links}
              description={item.description}
              sideImage={item.sideImage}
              show={show}
              setShow={setShow}
              sectionId={item.sectionId}
              onSectionNavigate={navigateToHomeSection}
            />
          ))}

        </ul>
      </div>

      <div className="lg:hidden flex gap-2 items-center">
        <LanguageMobile href={href} />
        <MobileMenu
          navigationData={navigationData}
          href={href}
          onNavigateHomeSection={navigateToHomeSection}
        />
      </div>
    </div>
  </nav>
</div>
    </>
  );
};

export default Header;
