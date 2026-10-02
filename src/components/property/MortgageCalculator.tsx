"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface MortgageCalculatorProps {
  propertyPrice: number;
  currency?: string;
}

const loanTermOptions = [5, 10, 15, 20, 25] as const;

export default function MortgageCalculator({
  propertyPrice,
  currency = "AED",
}: MortgageCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [loanTermYears, setLoanTermYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState(4.5);

  const computed = useMemo(() => {
    const downPaymentAmount = (propertyPrice * downPaymentPct) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      // M = P[r(1+r)^n] / [(1+r)^n - 1]
      const factor = Math.pow(1 + monthlyRate, numberOfPayments);
      monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalPayment,
    };
  }, [propertyPrice, downPaymentPct, loanTermYears, interestRate]);

  const principalPct =
    computed.totalPayment > 0
      ? (computed.loanAmount / computed.totalPayment) * 100
      : 50;
  return (
    <div className="bg-white rounded-xl shadow-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Calculator className="w-5 h-5 text-brand-gold" />
        <h3 className="font-display text-xl font-bold text-brand-navy">
          Mortgage Calculator
        </h3>
      </div>

      {/* Down Payment Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-brand-navy">
            Down Payment
          </label>
          <span className="text-sm font-semibold text-brand-navy">
            {downPaymentPct}%{" "}
            <span className="text-brand-slate font-normal">
              ({formatPrice(computed.downPaymentAmount, currency, "total")})
            </span>
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={60}
          step={1}
          value={downPaymentPct}
          onChange={(e) => setDownPaymentPct(Number(e.target.value))}
          className="w-full h-2 bg-brand-cream rounded-full appearance-none cursor-pointer accent-brand-gold
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:shadow-gold
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-brand-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-xs text-brand-slate">
          <span>20%</span>
          <span>60%</span>
        </div>
      </div>

      {/* Interest Rate Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-brand-navy">
            Interest Rate
          </label>
          <span className="text-sm font-semibold text-brand-navy">
            {interestRate.toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min={2.5}
          max={8}
          step={0.1}
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-2 bg-brand-cream rounded-full appearance-none cursor-pointer accent-brand-gold
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:shadow-gold
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-brand-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-xs text-brand-slate">
          <span>2.5%</span>
          <span>8.0%</span>
        </div>
      </div>

      {/* Loan Term Pill Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-navy">
          Loan Term (Years)
        </label>
        <div className="flex gap-2">
          {loanTermOptions.map((term) => (
            <button
              key={term}
              onClick={() => setLoanTermYears(term)}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                loanTermYears === term
                  ? "bg-brand-navy text-white shadow-md"
                  : "bg-brand-cream text-brand-navy hover:bg-brand-cream-200"
              )}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Monthly Payment (hero stat) */}
      <div className="text-center space-y-1">
        <p className="text-sm text-brand-slate">Estimated Monthly Payment</p>
        <p className="text-3xl font-display font-bold text-brand-gold">
          {formatPrice(Math.round(computed.monthlyPayment), currency, "total")}
          <span className="text-base font-sans font-normal text-brand-slate">
            /mo
          </span>
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center gap-6">
        <div
          className="w-28 h-28 rounded-full relative"
          style={{
            background: `conic-gradient(#0A1628 0deg ${principalPct * 3.6}deg, #C9A84C ${principalPct * 3.6}deg 360deg)`,
          }}
        >
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <span className="text-xs text-brand-slate font-medium text-center leading-tight">
              {loanTermYears} yr
              <br />
              term
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-navy" />
            <div>
              <p className="text-xs text-brand-slate">Principal</p>
              <p className="text-sm font-semibold text-brand-navy">
                {formatPrice(Math.round(computed.loanAmount), currency, "total")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-gold" />
            <div>
              <p className="text-xs text-brand-slate">Total Interest</p>
              <p className="text-sm font-semibold text-brand-navy">
                {formatPrice(Math.round(computed.totalInterest), currency, "total")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-cream rounded-lg p-3 text-center">
          <p className="text-xs text-brand-slate mb-0.5">Loan Amount</p>
          <p className="text-sm font-semibold text-brand-navy">
            {formatPrice(Math.round(computed.loanAmount), currency, "total")}
          </p>
        </div>
        <div className="bg-brand-cream rounded-lg p-3 text-center">
          <p className="text-xs text-brand-slate mb-0.5">Total Payment</p>
          <p className="text-sm font-semibold text-brand-navy">
            {formatPrice(Math.round(computed.totalPayment), currency, "total")}
          </p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/contact?inquiry=mortgage"
        className="group flex items-center justify-center gap-2 w-full py-3 bg-brand-gold text-white font-semibold rounded-lg hover:bg-brand-gold-400 transition-colors duration-200"
      >
        Apply for Pre-Approval
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
