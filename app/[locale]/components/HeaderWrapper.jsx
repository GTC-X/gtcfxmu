"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Header from "./Header";

// All pages where the main header should NOT appear
const HIDE_HEADER_ON = ["/gtc-go-app"];

export default function HeaderWrapper({ currentLanguage }) {
  const pathname = usePathname();
  const locale = useLocale();

  // Remove locale prefix from pathname for consistent checking
  const pathnameWithoutLocale = pathname?.replace(`/${locale}`, "") || pathname;

  // If route starts with hidden path → do NOT show main header
  if (pathnameWithoutLocale && HIDE_HEADER_ON.some((p) => pathnameWithoutLocale.includes(p))) {
    return null;
  }

  return <Header currentLanguage={currentLanguage} />;
}

