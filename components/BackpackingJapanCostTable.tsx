// components/BackpackingJapanCostTable.tsx
"use client";
import { useMemo, useState } from "react";

type CostRowKey = "accommodation" | "food" | "transport" | "extras";

type Tier = {
  label: "Shoestring" | "Moderate" | "Comfortable";
  daily: Record<CostRowKey, number>; // USD per day
};

const TIERS: Tier[] = [
  {
    label: "Shoestring",
    daily: {
      accommodation: 20,
      food: 10,
      transport: 10,
      extras: 5,
    },
  },
  {
    label: "Moderate",
    daily: {
      accommodation: 30,
      food: 20,
      transport: 20,
      extras: 10,
    },
  },
  {
    label: "Comfortable",
    daily: {
      accommodation: 50,
      food: 30,
      transport: 30,
      extras: 20,
    },
  },
];

const ROW_LABELS: Record<CostRowKey, string> = {
  accommodation: "Accommodation",
  food: "Food",
  transport: "Transport",
  extras: "Extras",
};

type Currency = "USD" | "JPY";

const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  JPY: "¥",
};

// Rough example rates — update before publish if needed.
const USD_TO_JPY = 150; // 1 USD ≈ 150 JPY (edit to current)

function convert(amountUSD: number, currency: Currency) {
  if (currency === "USD") return amountUSD;
  return Math.round(amountUSD * USD_TO_JPY);
}

export default function BackpackingJapanCostTable() {
  const [currency, setCurrency] = useState<Currency>("USD");

  const totals = useMemo(() => {
    return TIERS.map((tier) => {
      const sumUSD =
        tier.daily.accommodation +
        tier.daily.food +
        tier.daily.transport +
        tier.daily.extras;
      return sumUSD;
    });
  }, []);

  return (
    <section aria-labelledby="budget-table-title" className="w-full mt-10 mb-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 id="budget-table-title" className="text-2xl font-semibold">
          Backpacking Japan — Daily Cost Breakdown
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">Currency</span>
          <div className="inline-flex rounded-lg border overflow-hidden">
            {(["USD", "JPY"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 text-sm ${
                  currency === c ? "bg-black text-white" : "bg-white"
                }`}
                aria-pressed={currency === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 pr-4 font-semibold">Budget style</th>
              <th className="py-3 pr-4 font-semibold">Accommodation</th>
              <th className="py-3 pr-4 font-semibold">Food</th>
              <th className="py-3 pr-4 font-semibold">Transport</th>
              <th className="py-3 pr-4 font-semibold">Extras</th>
              <th className="py-3 pr-4 font-semibold">Daily total</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((tier, i) => {
              const totalUSD = totals[i];
              return (
                <tr key={tier.label} className="border-b align-top">
                  <td className="py-3 pr-4 font-medium">{tier.label}</td>
                  <td className="py-3 pr-4">
                    {CURRENCY_SYMBOL[currency]}
                    {convert(tier.daily.accommodation, currency)}
                  </td>
                  <td className="py-3 pr-4">
                    {CURRENCY_SYMBOL[currency]}
                    {convert(tier.daily.food, currency)}
                  </td>
                  <td className="py-3 pr-4">
                    {CURRENCY_SYMBOL[currency]}
                    {convert(tier.daily.transport, currency)}
                  </td>
                  <td className="py-3 pr-4">
                    {CURRENCY_SYMBOL[currency]}
                    {convert(tier.daily.extras, currency)}
                  </td>
                  <td className="py-3 pr-4 font-semibold">
                    {CURRENCY_SYMBOL[currency]}
                    {convert(totalUSD, currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-sm opacity-80">
        Notes: numbers are daily estimates for backpackers. Update the exchange
        rate in code before publishing. Transport varies with Rail Pass vs.
        buses; food can be lower using convenience stores (7-Eleven, Lawson,
        FamilyMart).
      </p>
    </section>
  );
}

