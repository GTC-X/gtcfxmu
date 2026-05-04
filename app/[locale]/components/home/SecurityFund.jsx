import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next-intl/link";

const SecurityFund = () => {
  const path = usePathname();
  const isAr = path.includes('/ar');

  const t = useTranslations("home.security_of_funds");
  return (
    <section className="securityFund py-3 pb-5 text-white  border-t border-b border-gray-600 border-opacity-10 shadow-3xl bg-gradient-to-r from-[#293794] to-[#000021]">
      <div className="container">
        <div className="flex flex-row justify-start items-start gap-1">
          <div className="basis-1/6 relative h-10 md:h-16 w-full justify-start">
  <Image
    src="/icons-new/securty.webp"
    alt="Security icon representing safe CFD trading on GTCFX"
    fill
    className="object-contain"
    sizes="(max-width: 768px) 40px, (max-width: 1200px) 64px, 80px"
    loading="lazy"
  />
</div>
          <div className="basis-5/6 content">
            <h2 className={`text-white md:text-lg text-xl font-regular mb-2 ltr:text-left rtl:text-right`}>
              {t("title")}
            </h2>
            <p className={`text text-white md:text-sm text-xs text-left ltr:text-left rtl:text-right`}>
            GTCFX has secured an insurance policy from the Financial Commission, offering protection for clients’ funds up to €20,000.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 

export default SecurityFund;
