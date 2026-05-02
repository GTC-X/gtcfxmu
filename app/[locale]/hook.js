import axios from "axios";
import { useEffect, useState } from "react";
import { deepMergeMessages } from "@/helpers/mergeMessages";
import enMessages from "../../messages/en.json";

export const useLanguageHook = ({ locale, messages }) => {
  // Initialize with messages immediately to prevent flash of translation keys
  const [translation, settranslation] = useState(messages);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (locale == "en" || locale == "zh" || locale == "ar") {
      settranslation(messages);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/messages/${locale}.json`
      )
      .then((res) => {
        settranslation(deepMergeMessages(enMessages, res?.data ?? {}));
        setLoading(false);
      })
      .catch(() => {
        settranslation(messages);
        setLoading(false);
      });
  }, [locale, messages]);

  return {
    translation,
    loading,
  };
};
