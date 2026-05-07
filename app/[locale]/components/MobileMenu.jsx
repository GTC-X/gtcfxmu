import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLogin } from "react-icons/md";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next-intl/client";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useTranslations } from "next-intl";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePermPhoneMsg } from "react-icons/md";

export default function MobileMenu(props) {
  const { navigationData, href, onNavigateHomeSection } = props;
  const router = useRouter();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const t = useTranslations("navigation");
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setOpen(false);
    },
  });

  return (
    <Popover className="" ref={ref}>
      <Popover.Button
        className="inline-flex items-center border border-[#ccc] rounded-none p-1 bg-primary text-white"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <GiHamburgerMenu size={"22px"} />
      </Popover.Button>

      <Transition
        as={Fragment}
        show={open}
        enter="transform transition duration-300 ease-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition duration-200 ease-in"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Popover.Panel
          className="fixed h-full top-0 left-0 z-50 w-90% max-w-sm bg-white overflow-y-auto"
          style={{ width: "92%" }}
        >
          <div className="flex flex-row items-center justify-between p-4 border-b border-gray-300 ">
            <p className="flex flex-row gap-2 justify-start items-center text-lg">
              <GiHamburgerMenu size={"22px"} />
              Menu
            </p>
            <button
              className="text-primary text-2xl"
              onClick={() => setOpen(false)} // Close the popover when the icon is clicked
            >
              <RxCross2 />
            </button>
          </div>
 
          <ul className="menu p-0 text-accent">
             <Link
              href="/contact-us"
              className="bg-gradient-to-r from-[#263788] via-[#101638] to-[#263788] hover:from-[#B68756] hover:via-[#995F22] hover:to-[#995F22]  text-white border border-white border-opacity-30 px-3 py-3 hover:opacity-90 transition-opacity mt-2 text-[15px] 3xl:text-base flex flex-row gap-2 items-center"
            >
              <MdOutlinePermPhoneMsg size={22} /> {t("about.thirdcolumn.option3")}
            </Link>
            {navigationData?.map((item, index) => (
              <li key={index}>
                {item?.sectionId && onNavigateHomeSection ? (
                  <button
                    type="button"
                    className="block w-full text-left rounded-none border-b py-4 text-sm text-accent hover:bg-primary hover:text-white px-4"
                    onClick={() => {
                      onNavigateHomeSection(item.sectionId);
                      setOpen(false);
                    }}
                  >
                    {item?.title}
                  </button>
                ) : (
                  <details>
                    <summary className="rounded-none border-b py-4 text-sm text-accent hover:bg-primary hover:text-white">
                      {item?.title}
                    </summary>
                    {item?.links?.map((row, rowIndex) => (
                      <Fragment key={rowIndex}>
                        {row?.title && (
                          <h3
                            className={`flex gap-2 items-center underline text-[15px] 2xl:text-[19px] border-b 3xl:text-xl text-secondary px-4 py-4 `}
                          >
                            <p className="text-primary text-base">{row.icon}</p>
                            {row.title}
                          </h3>
                        )}
                        {row?.items?.map((value) => {
                          if (!value?.locale?.includes(locale)) {
                            return null;
                          }
                          return (
                            <button
                              key={index}
                              className="block px-9 w-full text-left border-b py-4 text-accent bg-white hover:bg-primary hover:text-white"
                              onClick={() => {
                                router.push(value?.href, { locale: locale });
                                setOpen(false);
                              }}
                            >
                              {value?.label}
                            </button>
                          );
                        })}
                      </Fragment>
                    ))}
                  </details>
                )}
              </li>
            ))}
            
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
