import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

export const AppLanguage = {
  English: "en",
  Arabic: "ar",
  Chinese: "zh",
  Melayu: "ms",
  Turkish:"tr",
  Hindi: "hi",
  Indonasian: "id",
  French: "fr",
  Spanish: "es",
  Vitenam: "vi",
  Russian: "ru",
  Italian: "it",
  korean: "ko",
  Pashto: "ps",
  Farsi: "fa",
  Urdu:"ur",
  Thailand:"th",
  português:"pt",
  Philippines:"tl",
  Chinese_Traditional:"zh-tw"
};

// Mapping of locale variants to their proper 2-letter codes
const localeRedirectMap = {
  "ar-ae": "ar",
  "ar-sa": "ar",
  "ar-eg": "ar",
  "ar-iq": "ar",
  "ar-jo": "ar",
  "ar-kw": "ar",
  "ar-lb": "ar",
  "ar-ly": "ar",
  "ar-ma": "ar",
  "ar-om": "ar",
  "ar-qa": "ar",
  "ar-sy": "ar",
  "ar-tn": "ar",
  "ar-ye": "ar",
  "ar-dz": "ar",
  "ar-bh": "ar",
  "zh-hans": "zh",
  "zh-cn": "zh",
  "zh-hans-cn": "zh",
  "zh-sg": "zh",
  "zh-hans-sg": "zh",
  "en-us": "en",
  "en-gb": "en",
  "en-au": "en",
  "en-ca": "en",
  "en-nz": "en",
  "en-ie": "en",
  "en-za": "en",
  "es-es": "es",
  "es-mx": "es",
  "es-ar": "es",
  "es-co": "es",
  "es-cl": "es",
  "es-pe": "es",
  "es-ve": "es",
  "pt-br": "pt",
  "pt-pt": "pt",
  "fr-fr": "fr",
  "fr-ca": "fr",
  "fr-be": "fr",
  "fr-ch": "fr",
  "it-it": "it",
  "it-ch": "it",
  "ru-ru": "ru",
  "ru-ua": "ru",
  "ru-kz": "ru",
  "ko-kr": "ko",
  "hi-in": "hi",
  "id-id": "id",
  "ms-my": "ms",
  "ms-sg": "ms",
  "tr-tr": "tr",
  "vi-vn": "vi",
  "th-th": "th",
  "fa-ir": "fa",
  "ur-pk": "ur",
  "ur-in": "ur",
  "ps-af": "ps",
  "tl-ph": "tl",
  "zh-TW": "zh-tw",  // Handle uppercase variant (zh-TW -> zh-tw)
};

const intlMiddleware = createMiddleware({
   // A list of all locales that are supported
   locales: ["en", "ar", "zh","zh-tw","ms","tr","ur","hi","id","fr","es","pt","vi","fa","tl","th","ru","ko","ps","it"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
  localeDetection: false,
});

// Valid locales for checking if redirect is needed
const validLocales = ["en", "ar", "zh", "zh-tw", "ms", "tr", "ur", "hi", "id", "fr", "es", "pt", "vi", "fa", "tl", "th", "ru", "ko", "ps", "it"];

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Explicitly rewrite root to default locale so the document is always found (fixes 404 on Vercel)
  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    const response = NextResponse.rewrite(url); 
    response.headers.set("x-pathname", "/");
    return response;
  }
  
  // Check if the path starts with a locale variant that needs redirecting
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  
  if (!firstSegment) {
    const response = intlMiddleware(request);
    // Set custom header with pathname for alternate links generation
    response.headers.set("x-pathname", pathname);
    return response;
  }
  
  const firstSegmentLower = firstSegment.toLowerCase();
  
  // Check if it's in the redirect map first (check both original case and lowercase)
  const targetLocale = localeRedirectMap[firstSegment] || localeRedirectMap[firstSegmentLower];
  
  if (targetLocale && firstSegment !== targetLocale) {
    // Redirect if the segment is different from the target locale
    // This handles cases like zh-TW -> zh-tw (same locale, different case)
    const restOfPath = pathSegments.slice(1).join("/");
    const newPath = `/${targetLocale}${restOfPath ? `/${restOfPath}` : ""}${request.nextUrl.search}`;
    
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }
  
  // Otherwise, use the next-intl middleware
  const response = intlMiddleware(request);
  // Set custom header with pathname for alternate links generation
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // API, _next, static pages, and any pathnames with a dot (e.g. favicon.ico)
  matcher: [
    "/((?!api|_next|_vercel|lp-static|media|.*\\..*).*)"  // Exclude static/media paths
  ],
};