// components/JapanBackpackerSpots.tsx
"use client";

type Spot = {
  city: string;
  highlights: string;
  region: string;
  bestTime: string;
  idealStay: string;
  quickTip: string;
};

const SPOTS: Spot[] = [
  {
    city: "Tokyo (Shinjuku & Asakusa)",
    highlights:
      "Shinjuku's neon, Asakusa's temples, ramen shops open till dawn.",
    region: "Kanto",
    bestTime: "Mar–May, Sep–Nov",
    idealStay: "4–5 days",
    quickTip:
      "Base near a JR/metro interchange to cut transfers; late-night ramen = prime backpacker fuel."
  },
  {
    city: "Kyoto",
    highlights:
      "Golden shrines, tea houses, bamboo groves—slower and more reflective.",
    region: "Kansai",
    bestTime: "Mar–May (blossom), Nov (fall colors)",
    idealStay: "3–4 days",
    quickTip:
      "Start temples early to dodge crowds; rent a bike for Arashiyama and riverside paths."
  },
  {
    city: "Osaka",
    highlights:
      "Street-food capital. Try takoyaki and okonomiyaki.",
    region: "Kansai",
    bestTime: "Year-round; best weather Mar–May & Oct–Nov",
    idealStay: "2–3 days",
    quickTip:
      "Sleep near Namba/Shinsaibashi for cheap eats and late subways; bring cash for food stalls."
  },
  {
    city: "Nara",
    highlights:
      "Bowing deer and historic temples you'll remember.",
    region: "Kansai (day trip from Kyoto/Osaka)",
    bestTime: "Mar–May, Oct–Nov",
    idealStay: "½–1 day",
    quickTip:
      "Arrive early for Todai-ji before the tour buses; don't overfeed deer biscuits (they're persistent!)."
  },
  {
    city: "Hiroshima",
    highlights:
      "Powerful Peace Park, plus layered okonomiyaki.",
    region: "Chugoku",
    bestTime: "Mar–May, Sep–Nov",
    idealStay: "1–2 days (+Miyajima)",
    quickTip:
      "Pair with Miyajima for the floating torii at sunset; book hostels near Hondori for walkability."
  },
  {
    city: "Nikko",
    highlights:
      "Easy Tokyo day trip with waterfalls and ornate shrines.",
    region: "Kanto (day trip from Tokyo)",
    bestTime: "Oct–Nov (foliage), Apr–Jun",
    idealStay: "1 day",
    quickTip:
      "Grab an early limited-express; add Lake Chuzenji/Kegon Falls if you want nature + shrines."
  },
  {
    city: "Hokkaido",
    highlights:
      "Wide-open trails, onsens, and stunning hikes.",
    region: "Hokkaido",
    bestTime: "Jun–Sep (hiking), Dec–Feb (snow)",
    idealStay: "5–7 days",
    quickTip:
      "Consider a regional rail/bus pass; pack layers—weather swings fast in the north."
  }
];

export default function JapanBackpackerSpots() {
  return (
    <section aria-labelledby="bp-spots" className="w-full mt-10 mb-10">
      <h2 id="bp-spots" className="text-2xl font-semibold mb-4">
        Backpacker Hotspots at a Glance
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 pr-4 font-semibold">Destination</th>
              <th className="py-3 pr-4 font-semibold">Why Go</th>
              <th className="py-3 pr-4 font-semibold">Region</th>
              <th className="py-3 pr-4 font-semibold">Best Time</th>
              <th className="py-3 pr-4 font-semibold">Ideal Stay</th>
              <th className="py-3 pr-4 font-semibold">Quick Tip</th>
            </tr>
          </thead>
          <tbody>
            {SPOTS.map((s) => (
              <tr key={s.city} className="border-b align-top">
                <td className="py-3 pr-4 font-medium">{s.city}</td>
                <td className="py-3 pr-4">{s.highlights}</td>
                <td className="py-3 pr-4">{s.region}</td>
                <td className="py-3 pr-4">{s.bestTime}</td>
                <td className="py-3 pr-4">{s.idealStay}</td>
                <td className="py-3 pr-4">{s.quickTip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm opacity-80">
        Tip: combine Kyoto + Osaka on the same base if you're tight on time—Kansai trains make it easy.
      </p>
    </section>
  );
}

