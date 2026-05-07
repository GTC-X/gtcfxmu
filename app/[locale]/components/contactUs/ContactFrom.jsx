"use client";

import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Link from "next-intl/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import useCountriesDetails from "@/context/useCountriesDetails";
import { useLocationDetail } from "@/context/useLocationDetail";
import axios from "axios";


const getBaseInitialValues = () => ({
  registration_status: "",
  query_type: "General Query",
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  country: "",
  ticket_type: "",
  complaint_type: "",
  trading_complaint_type: "",
  promotion_bonus_type: "",
  trade_account: "",
  transaction_ids: "",
  trade_order_ids: "",
  date_time_incident: "",
  deposit_amount: "",
  subject: "",
  message: "",
  attachment: null,

});

const getValidationSchema = (t, t2) =>
  Yup.lazy((values) => {
    const base = {
      registration_status: Yup.string().required(t("error.registrationStatus") || "Registration status is required"),
      query_type: Yup.string().required(t("error.queryType") || "Query type is required"),
      email: Yup.string().email(t("error.invalidEmail") || "Invalid email").required(t("error.email") || "Email is required"),
      first_name: Yup.string().min(2, t("error.min") || "At least 2 letters").required(t("error.firstName") || "First name is required"),
      last_name: Yup.string().min(2, t("error.min") || "At least 2 letters").required(t("error.lastName") || "Last name is required"),
      phone: Yup.string().required(t2("error.phone") || "Phone is required"),
      country: Yup.string().required(t2("error.country") || "Country is required"),
      subject: Yup.string().required(t("error.subject") || "Subject is required"),
      message: Yup.string().required(t("error.message") || "Description is required"),
   
    };
    // Ticket type required only when Query type is General Query
    if (values.query_type === "General Query") {
      base.ticket_type = Yup.string().required(t("error.ticketType") || "Ticket type is required");
    }

    const ticket = values.ticket_type;

    if (ticket === "Promotions/Bonuses") {
      base.promotion_bonus_type = Yup.string().required(t("error.promotionBonusType") || "Promotion/Bonus type is required");
    }

    if (ticket === "Trading investigation") {
      base.trade_account = Yup.string().required(t("error.tradeAccount") || "Trade account is required");
      base.trade_order_ids = Yup.string().required(t("error.tradeOrderIds") || "Trade order(s) ID is required");
      base.date_time_incident = Yup.string().required(t("error.dateTimeIncident") || "Date and time of incident is required");
    }

    if (ticket === "Add account opening links" || ticket === "Partner / Client Transfer Request") {
      base.trade_account = Yup.string().required(t("error.tradeAccount") || "Trade account is required");
    }

    if (ticket === "KYC queries") {
      base.trade_account = Yup.string().required(t("error.tradeAccount") || "Trade account is required");
    }

    return Yup.object().shape(base);
  });

const inputClass = (touched, error) =>
  `block w-full bg-white border p-2 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 ${touched && error ? "border-red-600" : "border-gray-200"
  }`;

const selectClass = (touched, error) =>
  `w-full py-[10px] bg-white text-sm border px-3 ${touched && error ? "border-red-600" : "border-gray-200"}`;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("AE");
  const t = useTranslations("about.contact-us");
  const t2 = useTranslations("form");
  const locale = useLocale();
  const router = useRouter();

  const { countryList } = useCountriesDetails(locale);
  const { countryData } = useLocationDetail();

  const REGISTRATION_OPTIONS = useMemo(
    () => [
      { value: "", label: t("options.registration.select") },
      { value: "Registered", label: t("options.registration.registered") },
      { value: "Not Registered", label: t("options.registration.notRegistered") },
    ],
    [t]
  );

  const QUERY_TYPE_OPTIONS = useMemo(
    () => [
      { value: "", label: t("options.queryType.select") || "Select query type" },
      { value: "General Query", label: t("options.queryType.general") || "General Query" },
      { value: "Compliance Query", label: t("options.queryType.compliance") || "Compliance Query" },
    ],
    [t]
  );

  const TICKET_TYPES = useMemo(
    () => [
      { value: "", label: t("options.ticketType.select") },
      { value: "Account/Registration", label: t("options.ticketType.accountRegistration") },
      { value: "Deposits", label: t("options.ticketType.deposits") },
      { value: "Withdrawals", label: t("options.ticketType.withdrawals") },
      { value: "Trading account queries", label: t("options.ticketType.tradingAccountQueries") },
      { value: "Add account opening links", label: t("options.ticketType.accountOpeningLinks") },
      { value: "Partner / Client Transfer Request", label: t("options.ticketType.partnerClientTransfer") },
      { value: "Promotions/Bonuses", label: t("options.ticketType.promotionsBonuses") },
      { value: "Trading investigation", label: t("options.ticketType.tradingInvestigation") },
      // { value: "Complaint", label: t("options.ticketType.complaint") },
      { value: "KYC queries", label: t("options.ticketType.kycQueries") },
      { value: "Other", label: t("options.ticketType.other") },
    ],
    [t]
  );


  const PROMOTION_BONUS_TYPES = useMemo(
    () => [
      { value: "", label: t("options.promotionBonusType.select") },
      { value: "Issue", label: t("options.promotionBonusType.issue") },
      { value: "Request", label: t("options.promotionBonusType.request") },
    ],
    [t]
  );

  const formik = useFormik({
    initialValues: getBaseInitialValues(),
    validationSchema: getValidationSchema(t, t2),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Build attachment base64 for support email / Zapier (flat payload)
        let attachmentBase64 = null;
        if (values.attachment?.size > 0) {
          attachmentBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result;
              const base64 = dataUrl?.includes(",") ? dataUrl.split(",")[1] : dataUrl;
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(values.attachment);
          });
        }

        // Build files array for Salesforce: [{ fileName, contentType, base64Data }]
        const files = [];
        if (values.attachment?.size > 0) {
          files.push({
            fileName: values.attachment.name,
            contentType: values.attachment.type || "application/octet-stream",
            base64Data: attachmentBase64,
          });
        }

        // Dynamic fields (only include if filled) – sent inside additionalFields for Salesforce
        const additionalFields = {};
        if (values.complaint_type) additionalFields.complaintType = values.complaint_type;
        if (values.trading_complaint_type) additionalFields.tradingComplaintType = values.trading_complaint_type;
        if (values.promotion_bonus_type) additionalFields.promotionBonusType = values.promotion_bonus_type;
        if (values.trade_account) additionalFields.tradingAccount = values.trade_account;
        if (values.transaction_ids) additionalFields.transactionId = values.transaction_ids;
        if (values.trade_order_ids) additionalFields.tradeOrderIds = values.trade_order_ids;
        if (values.date_time_incident) additionalFields.dateTimeIncident = values.date_time_incident;
        if (values.deposit_amount) additionalFields.depositAmount = values.deposit_amount;
        if (values.query_type) additionalFields.queryType = values.query_type;

        // For Compliance Query we don't have a ticket type selection; send query type as ticketType
        const ticketTypeValue = values.query_type === "Compliance Query" ? "Compliance Query" : values.ticket_type;

        // Payload in exact Salesforce Contact Us API structure
        const salesforcePayload = {
          email: values.email,
          firstName: values.first_name,
          lastName: values.last_name,
          phone: values.phone,
          country: values.country,
          ticketType: ticketTypeValue,
          subject: values.subject,
          description: values.message,
          registeredClient: values.registration_status,
          additionalFields,
          query_type: values.query_type,
          files,
       
        };

        // Legacy flat payload for send-support-email and Zapier
        const supportPayload = {
          ...values,
          attachment_name: values.attachment?.name || null,
          attachment_base64: attachmentBase64,
        };
        delete supportPayload.attachment;

        // 1) Submit to Salesforce (required for success)
        const res = await fetch("/api/sales-force-with-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(salesforcePayload),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.status === "error") {
          throw new Error(data.message || "Failed to submit to Salesforce");
        }

        // 2) Also send support email and to Zapier (non-blocking)
        try {
          await fetch("/api/send-support-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(supportPayload),
          });
        } catch (_) { }

        toast.success(t2("submitted_success"));
        formik.resetForm({ values: getBaseInitialValues() });
        router.push(`/${locale}/thank-you`);
      } catch (error) {
        console.error(error);
        toast.error(error?.message || t2("otp_error") || "An error occurred.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (countryData?.country) {
      const matched = countryList.find((c) => c.code === countryData.country);
      if (matched) {
        formik.setFieldValue("country", matched.nameInEnglish);
        setCountryCode(matched.code);
      }
    }
  }, [countryData?.country, countryList]);

  const ticketType = formik.values.ticket_type;
  const complaintType = formik.values.complaint_type;
  const showDepositDisclaimer =
    ticketType === "Deposits";
  const showWithdrawalDisclaimer =
    ticketType === "Withdrawals";

  const showTradeAccount =
    ([
      "Account/Registration",
      "Deposits",
      "Withdrawals",
      "Trading account queries",
      "Add account opening links",
      "Partner / Client Transfer Request",
      "Promotions/Bonuses",
      "Trading investigation",
      "KYC queries",
      "Other",
    ].includes(ticketType) ||
      (ticketType === "Complaint" && complaintType));
  const tradeAccountRequired =
    ["Add account opening links", "Partner / Client Transfer Request", "Trading investigation", "KYC queries"].includes(ticketType) ||
    (ticketType === "Complaint" && ["Trading Issues", "Deposits / Withdrawals"].includes(complaintType));

  const showTransactionIds = ticketType === "Deposits" || ticketType === "Withdrawals" || (ticketType === "Complaint" && complaintType === "Deposits / Withdrawals");
  const showTradeOrderIds = ticketType === "Trading investigation" || (ticketType === "Complaint" && complaintType === "Trading Issues");
  const showDateTimeIncident = ticketType === "Trading investigation" || (ticketType === "Complaint" && complaintType === "Trading Issues");
  const showPromotionBonusType = ticketType === "Promotions/Bonuses";
  const showDepositAmount = ticketType === "Promotions/Bonuses";
  const showTradingComplaintType = ticketType === "Complaint" && complaintType === "Trading Issues";


  return (
    <div className="p-4 md:p-8 border border-gray-300 bg-gray-100">
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6">
          {/* Two-column layout (fixed left/right) */}
          <div className="max-w-6xl text-left">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Are you a registered client? */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                    {t("form.registrationStatus") || "Are you a registered client?"} *
                  </label>
                  <select
                    name="registration_status"
                    className={selectClass(
                      formik.touched.registration_status,
                      formik.errors.registration_status
                    )}
                    value={formik.values.registration_status}
                    onChange={(e) => {
                      formik.handleChange(e);
                      const status = e.target.value;
                      if (status === "Not Registered") {
                        formik.setFieldValue("ticket_type", "Lead");
                        formik.setFieldValue("complaint_type", "");
                        formik.setFieldValue("trading_complaint_type", "");
                        formik.setFieldValue("promotion_bonus_type", "");
                      } else {
                        formik.setFieldValue("ticket_type", "");
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    {REGISTRATION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.registration_status &&
                    formik.errors.registration_status && (
                      <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">
                        {formik.errors.registration_status}
                      </p>
                    )}
                </div>

                {/* Query type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                    {t("form.queryType") || "Query type"} *
                  </label>
                  <select
                    name="query_type"
                    className={selectClass(
                      formik.touched.query_type,
                      formik.errors.query_type
                    )}
                    value={formik.values.query_type}
                    onChange={(e) => {
                      formik.handleChange(e);
                      const q = e.target.value;
                      if (q === "Compliance Query") {
                        formik.setFieldValue("ticket_type", "");
                        formik.setFieldValue("complaint_type", "");
                        formik.setFieldValue("trading_complaint_type", "");
                        formik.setFieldValue("promotion_bonus_type", "");
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    {QUERY_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.query_type && formik.errors.query_type && (
                    <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">
                      {formik.errors.query_type}
                    </p>
                  )}
                </div>

                {/* Ticket type */}
                {formik.values.query_type === "General Query" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                      {t("form.ticketType") || "Ticket type"} *
                    </label>
                    <select
                      name="ticket_type"
                      className={selectClass(
                        formik.touched.ticket_type,
                        formik.errors.ticket_type
                      )}
                      value={formik.values.ticket_type}
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldValue("complaint_type", "");
                        formik.setFieldValue("trading_complaint_type", "");
                        formik.setFieldValue("promotion_bonus_type", "");
                      }}
                      onBlur={formik.handleBlur}
                    >
                      {TICKET_TYPES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {formik.touched.ticket_type &&
                      formik.errors.ticket_type && (
                        <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">
                          {formik.errors.ticket_type}
                        </p>
                      )}
                  </div>
                )}

                {formik.values.query_type === "Compliance Query" && (
                  <div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                        {t("form.tradeAccount") || "Trade account"} {tradeAccountRequired ? "*" : ""}
                      </label>
                      <input
                        type="text"
                        name="trade_account"
                        placeholder={t("form.tradeAccount") || "Trade account"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.trade_account}
                        className={inputClass(formik.touched.trade_account, formik.errors.trade_account)}
                      />
                      {formik.touched.trade_account && formik.errors.trade_account && (
                        <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.trade_account}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Dynamic fields */}
                {(showPromotionBonusType ||
                  showTransactionIds ||
                  showTradeOrderIds ||
                  showTradeAccount ||
                  showDateTimeIncident ||
                  showDepositAmount) && (
                    <div className="">
                      {showTradeAccount && (
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                            {t("form.tradeAccount") || "Trade account"} {tradeAccountRequired ? "*" : ""}
                          </label>
                          <input
                            type="text"
                            name="trade_account"
                            placeholder={t("form.tradeAccount") || "Trade account"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.trade_account}
                            className={inputClass(formik.touched.trade_account, formik.errors.trade_account)}
                          />
                          {formik.touched.trade_account && formik.errors.trade_account && (
                            <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.trade_account}</p>
                          )}
                        </div>
                      )}
                      {showTransactionIds && (
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                            {t("form.transactionIds") || "Transaction ID(s)"}
                          </label>
                          <input
                            type="text"
                            name="transaction_ids"
                            placeholder={t("form.transactionIds") || "Transaction ID(s)"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.transaction_ids}
                            className={inputClass(false, false)}
                          />
                        </div>
                      )}

                      {showTradeOrderIds && (
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                            {t("form.tradeOrderIds") || "Trade order(s) ID"} *
                          </label>
                          <input
                            type="text"
                            name="trade_order_ids"
                            placeholder={t("form.tradeOrderIds") || "Trade order(s) ID"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.trade_order_ids}
                            className={inputClass(
                              formik.touched.trade_order_ids,
                              formik.errors.trade_order_ids
                            )}
                          />
                          {formik.touched.trade_order_ids &&
                            formik.errors.trade_order_ids && (
                              <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">
                                {formik.errors.trade_order_ids}
                              </p>
                            )}
                        </div>
                      )}

                      {showDateTimeIncident && (
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                            {t("form.dateTimeIncident") || "Date and time of incident"} *
                          </label>
                          <input
                            type="text"
                            name="date_time_incident"
                            placeholder="e.g. 2024-01-15 14:30"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date_time_incident}
                            className={inputClass(
                              formik.touched.date_time_incident,
                              formik.errors.date_time_incident
                            )}
                          />
                          {formik.touched.date_time_incident &&
                            formik.errors.date_time_incident && (
                              <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">
                                {formik.errors.date_time_incident}
                              </p>
                            )}
                        </div>
                      )}

                      {showPromotionBonusType && (
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                            {t("form.promotionBonusType") || "Promotion/Bonus type"} *
                          </label>
                          <select
                            name="promotion_bonus_type"
                            className={selectClass(
                              formik.touched.promotion_bonus_type,
                              formik.errors.promotion_bonus_type
                            )}
                            value={formik.values.promotion_bonus_type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            {PROMOTION_BONUS_TYPES.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          {formik.touched.promotion_bonus_type &&
                            formik.errors.promotion_bonus_type && (
                              <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">
                                {formik.errors.promotion_bonus_type}
                              </p>
                            )}
                        </div>
                      )}

                      {showDepositAmount && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                            {t("form.depositAmount") || "Deposit amount"}
                          </label>
                          <input
                            type="text"
                            name="deposit_amount"
                            placeholder={t("form.depositAmount") || "Deposit amount"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.deposit_amount}
                            className={inputClass(false, false)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                    {t("form.subject") || "Subject"} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder={t("form.subject") || "Subject"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subject}
                    className={inputClass(formik.touched.subject, formik.errors.subject)}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.subject}</p>
                  )}
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                    {t("form.first-name")} *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder={t("form.first-name")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                    className={inputClass(formik.touched.first_name, formik.errors.first_name)}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.first_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                    {t("form.last-name")} *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder={t("form.last-name")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                    className={inputClass(formik.touched.last_name, formik.errors.last_name)}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.last_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                    {t("form.email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("form.email")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={inputClass(formik.touched.email, formik.errors.email)}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                    {t("form.phone") || "Phone number"} *
                  </label>
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={countryCode}
                    value={formik.values.phone}
                    onChange={(phone) => formik.setFieldValue("phone", phone)}
                    onBlur={() => formik.setFieldTouched("phone", true)}
                    className={`w-full px-4 py-2 border ${formik.touched.phone && formik.errors.phone
                      ? "border-red-600"
                      : "border-gray-200"
                      } bg-white`}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.phone}</p>
                  )}
                </div>




                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                    {t2("country") || "Country"} *
                  </label>
                  <select
                    className={selectClass(formik.touched.country, formik.errors.country)}
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled hidden>
                      {t2("CountryPlace")}
                    </option>
                    {countryList.map((country, index) => (
                      <option key={index} value={country.nameInEnglish}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.country && formik.errors.country && (
                    <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Full-width fields */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                  {t("form.ticketDescription") || "Ticket description"} *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder={t("form.message") || "Detailed explanation of your case..."}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  className={inputClass(formik.touched.message, formik.errors.message)}
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-600 text-xs mt-1 rtl:text-right ltr:text-left">{formik.errors.message}</p>
                )}
              </div>

              {showDepositDisclaimer && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                  {t("messages.depositDisclaimer")}
                </div>
              )}

              {showWithdrawalDisclaimer && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                  {t("messages.withdrawalDisclaimer")}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ltr:text-left rtl:text-right">
                  {t("form.attachment") || "Attachment"} {t("form.optional") || "optional"}
                </label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx"
                  onChange={(e) =>
                    formik.setFieldValue("attachment", e.target.files?.[0] ?? null)
                  }
                  onBlur={() => formik.setFieldTouched("attachment", true)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white"
                />
                <p className="text-xs text-gray-500 mt-1 ltr:text-left rtl:text-right">
                  {t("form.file") || "Screenshots, receipts, logs, or supporting documents."}
                </p>
              </div>
            </div>
          </div>

      

          <div className="mt-6 flex flex-col items-center justify-end gap-x-6">
            <button
              disabled={loading || !formik.values.captchaToken}
              type="submit"
              className="bg-primary text-white text-xl w-[120px] h-[50px] rounded"
            >
              {loading ? t("form.sending") : t("form.submit")}
            </button>
            <p className="inline px-3 text-[11px] text-primary pt-5">
              {t2("terms")}{" "}
              <Link
                href="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/pdf-files/Vanuatu.pdf"
                target="_blank"
                className="underline text-secondary underline]"
              >
                {t2("termText2")}
              </Link>{" "}
              {t2("termText3")}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
