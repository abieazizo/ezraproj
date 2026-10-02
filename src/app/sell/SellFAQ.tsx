"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does it typically take to sell a property in Dubai?",
    answer:
      "The average time to sell a property through Shefa Real Estate is approximately 30 days, compared to the market average of 60-90 days. This faster turnaround is achieved through our targeted marketing strategy, pre-qualified buyer network, and proactive pricing approach. However, timelines can vary depending on the property type, location, pricing, and current market conditions.",
  },
  {
    question: "What fees and costs are involved in selling a property?",
    answer:
      "The primary costs for sellers in Dubai include the agency commission (typically 2% of the sale price), the DLD transfer fee (2% of the sale price, as the standard 4% is typically split between buyer and seller), and the NOC (No Objection Certificate) fee from the developer, which ranges from AED 500 to AED 5,000. There is no capital gains tax in Dubai. Shefa provides a detailed cost breakdown before you list so there are no surprises.",
  },
  {
    question: "How do you determine the right listing price for my property?",
    answer:
      "Our certified valuers conduct a comprehensive Comparative Market Analysis (CMA) that evaluates recent comparable sales in your building and community, current active listings (your competition), market absorption rates, and your property's unique features and condition. We combine this data with our proprietary analytics to recommend an optimal listing price that maximizes your return while ensuring a timely sale.",
  },
  {
    question: "Can I sell my property if I still have an outstanding mortgage?",
    answer:
      "Yes, selling a mortgaged property in Dubai is common and well-established. The process involves obtaining a liability letter from your bank, settling the outstanding balance (often from the buyer's payment), and clearing the mortgage before the final DLD transfer. Shefa's transaction managers coordinate directly with your bank and the buyer's bank to ensure a smooth concurrent process. We also work with specialized mortgage buyout services if needed.",
  },
  {
    question: "What marketing do you provide for my property?",
    answer:
      "Our comprehensive marketing package includes professional photography and videography, 360-degree virtual tours, drone footage (for villas and penthouses), listing syndication across 30+ local and international property portals including Bayut, Property Finder, and Dubizzle, targeted social media campaigns on Instagram, Facebook, and LinkedIn, email marketing to our qualified buyer database of over 15,000 registered contacts, and premium placement on the Shefa Real Estate website. For luxury properties, we also offer bespoke brochure design and private showcase events.",
  },
];

export default function SellFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-semibold text-brand-navy pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-brand-gold flex-shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <p className="px-5 pb-5 text-brand-slate leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
