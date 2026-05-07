import React from "react";
import CopyRight from "./CopyRight";

const Footer = () => {
  return (
    <>
      <div
        className={`pb-10 z-30 py-2 md:pt-14 xl:pt-16 md:pb-8 xl:pb-10 relative overflow-hidden`}
        style={{
          background: "linear-gradient(to bottom, #293B93, #0D122D)",
        }}
      >
        {/* Disclaimers Section */}
        <div className="container mx-auto px-3 border-opacity-20 relative z-10">
          <div className="text-xs text-white text-opacity-70 space-y-3 leading-5">
            <p>
              This website is owned and operated by GTC Global Ltd, a company
              incorporated in Mauritius with Company Number C188049, holding a
              Global Business Licence, and authorised and regulated by the
              Financial Services Commission, Mauritius (FSC) as an Investment
              Dealer (Full Service Dealer, excluding Underwriting) / SEC-2.1B,
              Licence No. GB22200292, pursuant to Section 29 of the Securities
              Act 2005, Rule 4 of the Securities (Licensing) Rules 2007, and the
              Financial Services (Consolidated Licensing and Fees) Rules 2008.
            </p>
            <p>
              Registered Office: Ground Floor, The Catalyst, Silicon Avenue, 40
              Cybercity, 72201 Ebene, Republic of Mauritius. <br />
              Principal Place of Business: Ground Floor, The Catalyst, Silicon
              Avenue, 40 Cybercity, 72201 Ebene, Republic of Mauritius.
            </p>
            <p>
              Risk Warning: Trading foreign exchange, Contracts for Difference
              (CFDs), and other derivative products involves a high level of risk
              and may not be suitable for all investors. These products may be
              traded on margin or leverage, which can amplify both profits and
              losses. You may lose all of your invested capital and, where
              applicable, losses may exceed the amount initially invested. You DO
              NOT own or have any rights to the underlying assets when trading
              CFDs. Past performance is not a reliable indicator of future
              results. Before trading, you should carefully consider your
              investment objectives, financial situation, level of experience,
              and risk tolerance. You should not trade with funds that you cannot
              afford to lose. The information on this website is provided for
              general information only and does not constitute investment advice,
              financial advice, tax advice, legal advice, or a recommendation,
              solicitation, or offer to buy or sell any financial product. If you
              are uncertain, you should seek advice from an independent financial,
              legal, or tax advisor.
            </p>
            <p>
              Restricted Jurisdictions: GTC Global Ltd DOES NOT provide services
              to residents of the United States, Japan, or any jurisdiction where
              the provision, distribution, or use of such services would be
              contrary to applicable laws or regulations. It is the responsibility
              of each visitor and client to ensure that accessing this website and
              using the services is permitted under the laws and regulations
              applicable to their country of residence, citizenship, incorporation,
              or location.
            </p>
            <p>
              GTC Financial Group Disclaimer: Each entity within the GTC Financial
              Group operates as a separate and independent legal entity. Unless
              expressly stated otherwise in the applicable client agreement, the
              financial products and services described on this website are
              provided solely by GTC Global Ltd, and no other entity within the
              GTC Financial Group shall be responsible for such products, services,
              obligations, liabilities, or client relationships.
            </p>
            <p>
              Nothing on this website should be interpreted as a solicitation,
              offer, recommendation, or promotion in any jurisdiction where such
              activity would be unlawful.
            </p>
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  );
};

export default Footer;