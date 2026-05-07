import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "next/image";

export default function TradingPlatform() {
  const t = useTranslations("home.accountType");

  const accountTypes = [
    {
      bgImage: "/stand.png", // Background Image
      iconSrc: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/standard.webp",
      heading: "STANDARD ACCOUNT (MetaTrade 5)",
    },
    {
      bgImage: "/ecn.png", // Background Image
      iconSrc: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/ecn.webp",
      heading: "ECN ACCOUNT (MetaTrade 5)"
    },
  ];

  return (
    <section className="py-10 lg:py-[70px] bg-[#fff] bg-[url('/line-bg.jpg')] bg-cover bg-center bg-blend-multiply text-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 md:gap-10">
          {/* Left Section - Asset Markets */}
          <div className="text-center md:text-left basis-full md:basis-2/4 border-b-2 md:border-none border-gray-200">
            <div className="flex flex-row items-center justify-center md:justify-start gap-3">
              <div className="relative w-32 md:w-full h-28 md:h-80">
                <Image
                  src="/assests.webp"
                  alt="8 Global Asset Markets available on GTCFX platform"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                />
              </div>
              <div className="md:w-[750px] ltr:md:ml-[-150px] rtl:md:mr-[-150px]">
                <h2 className="HeadingH2 md:text-4xl font-bold italic">
                  {t("assetNum")} <span className=" font-normal  md:text-3xl">{t("assetTit")}</span>
                </h2>
                <h2 className="HeadingH2 lg:text-[50px] md:my-6 text-secondary font-medium rtl:md:text-right ltr:md:text-left italic">
                  {t("assetMar")}
                </h2>
                <p className="text-xs md:text-sm rtl:md:text-right ltr:md:text-left">{t("AssetNam")}</p>
              </div>
            </div>
          </div>

          {/* Right Section - Account Types */}
          <div className="text-center basis-full md:basis-2/4">
            {/* Section Title */}
            <h2 className="HeadingH2 md:mb-5 font-medium">
              {t("heading")}
            </h2>
            <p className="text max-w-xl mx-auto mb-5">{t("desc")}</p>

            {/* Account Type Boxes with Background Images */}
            <div className="flex flex-row justify-center items-center gap-4 md:gap-4 md:mt-6">
              {accountTypes.map((account, index) => (
                <div
                  key={index}
                  className="w-[50%] h-[166px] md:w-56 md:h-56 flex flex-col items-center justify-center relative overflow-hidden gap-8"
                  style={{
                    backgroundImage: `url(${account.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h3 className="text-primary md:w-44 font-bold text-base">{account.heading}</h3> {/* Rendering the heading */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}