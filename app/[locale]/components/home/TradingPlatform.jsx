import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "next/image";

export default function TradingPlatform() {

  const t = useTranslations("home.accountType");

  const accountTypes = [
    {
      bgImage: "/stand.png", // Background Image
      iconSrc: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/standard.webp",
      heading: t("standardAccount.heading"),
    },
    {
      bgImage: "/ecn.png", // Background Image
      iconSrc: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/ecn.webp",
      heading: t("ecnAccount.heading"),
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
            
                <p className="text-xs md:text-sm rtl:md:text-right ltr:md:text-left"> {t("AssetNam")} </p>
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
                  <Link href='/account-types' className="flex flex-col md:flex-row justify-start items-center hover:underline cursor-pointer gap-2 mb-5">
                    <div className="relative w-8 h-8 md:w-14 md:h-14">
                    <Image
                      src={account.iconSrc}
                      alt={`${account.title || "Trading account"} icon`}
                      fill
                      className="object-contain"
                      sizes="(max-width:768px) 32px, 56px"
                      loading="lazy"
                    />
                  </div>
                    <p className="text text-[14px] md:text-base line-clamp-2 font-semibold uppercase md:w-24 text-left">{account.heading}</p>
                    </Link>
                  <Link
                    href="/"
                    className="text-sm md:text-base text-secondary px-2 md:py-1 rounded-lg hover:text-primary transition mt-[-5px] md:mt-4 font-bold"
                  >
                      {t('view_more')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
