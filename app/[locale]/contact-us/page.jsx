import { createTranslator } from "next-intl";
import React from "react";
import ContactUsPage from "../pages/ContactUsPage";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "contact-us");


  return {
    title: t("metaData.contactUs.title"),
    description: t("metaData.contactUs.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <ContactUsPage />;
};

export default Page;
