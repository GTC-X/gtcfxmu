"use client";

import { NextIntlClientProvider } from "next-intl";
 import { useLanguageHook } from "./hook";
import FallbackLoader from "./components/LoadingSpinner";
import { Suspense, useEffect, useState } from "react";
 import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import HeaderWrapper from "./components/HeaderWrapper";
 

const LayoutWrapper = ({ children, currentLanguage, locale, messages }) => {
  const { translation, loading } = useLanguageHook({ locale, messages });
  const pathName = usePathname(); // Access the router

  // Remove locale prefix from pathname for consistent checking
  const pathnameWithoutLocale = pathName?.replace(`/${locale}`, "") || pathName;

  // Ensure the router and path-related logic runs only after mounting
  const isStaticPath = pathnameWithoutLocale?.includes("static");
  const isMitradePath = pathnameWithoutLocale?.includes("invest-trade-gold");
  const isInvestGTC = pathnameWithoutLocale?.includes("invest-with-gtc");
  const isGtcGoPage = pathnameWithoutLocale?.includes("gtc-go-app"); // ⬅️ our LP check
  const ignoreMissingTranslations = process.env.NEXT_PUBLIC_IGNORE_MISSING_TRANSLATION === 'true';

  useEffect(() => {
    const referrerUrl = document.referrer;

    if (referrerUrl) {
      localStorage.setItem('user_referrer', referrerUrl);
    }
  }, []);

  // Ensure translation is available before rendering
  if (!translation) {
    return <FallbackLoader />;
  }

  return (
    <Suspense fallback={<FallbackLoader />}>
      <NextIntlClientProvider locale={locale} messages={translation}
        onError={(error) => {
          if (ignoreMissingTranslations && error.code === 'MISSING_MESSAGE') {
            return; // Ignore the error
          }
          throw error;
        }}
      >
        {loading && <FallbackLoader />}
        {!isStaticPath && !isMitradePath && !isInvestGTC && <HeaderWrapper currentLanguage={currentLanguage} />}
        {children}
        <ToastContainer autoClose={3000} />

        {/* <FacebookPixelEvents /> */}

        {!isStaticPath && <Footer />}
        {/* {!isStaticPath && (isGtcGoPage||isMitradePath||isInvestGTC) && <GtcGoFooter />} */}
      </NextIntlClientProvider>
    </Suspense>
  );
};

export default LayoutWrapper;
