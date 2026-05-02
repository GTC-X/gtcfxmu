import { createTranslator } from "next-intl";
import "aos/dist/aos.css";
import HomePage from "./homePage";

import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale);

  return {
    title: t("metaData.home.title"),
    description: t("metaData.home.des"),
    alternates: {
      canonical: url,
    },
  };
}
 
export default function Home() {
  
  return (
    <>
     <HomePage/>
    </> 
  );
}
