// components/JapanEventsTable.tsx
"use client";

type Event = {
  name: string;
  date: string;
  location: string;
  info: string;
  url: string;
};

const EVENTS: Event[] = [
  {
    name: "Cherry Blossom Season (Hanami)",
    date: "Late March – Early April",
    location: "Nationwide (Tokyo, Kyoto, Osaka, etc.)",
    info: "Parks fill with picnics under blooming cherry trees — the ultimate spring backpacking vibe.",
    url: "https://www.japan.travel/en/uk/inspiration/hanami-cherry-blossom-festivals/"
  },
  {
    name: "Gion Matsuri",
    date: "July",
    location: "Kyoto",
    info: "Japan's most famous festival with giant floats parading through the city.",
    url: "https://www.japan.travel/en/uk/inspiration/kyotos-gion-matsuri/"
  },
  {
    name: "Fuji Rock Festival",
    date: "Late July",
    location: "Naeba Ski Resort, Niigata",
    info: "Japan's largest outdoor music festival — camping friendly, backpacker crowds.",
    url: "https://fujirock-eng.com/"
  },
  {
    name: "Awa Odori Dance Festival",
    date: "August 12–15",
    location: "Tokushima, Shikoku",
    info: "Tens of thousands dance through the streets in colorful yukata. Easy to join the crowd.",
    url: "https://www.awanavi.jp/english/"
  },
  {
    name: "Sapporo Snow Festival",
    date: "Early February",
    location: "Sapporo, Hokkaido",
    info: "Snow and ice sculptures, winter vibes — one of Japan's biggest events.",
    url: "https://www.snowfes.com/english/"
  },
  {
    name: "Takayama Spring Festival",
    date: "April 14–15",
    location: "Takayama, Gifu",
    info: "Ornate floats, puppets, and spring rituals in a historic mountain town.",
    url: "https://japantravel.navitime.com/en/area/jp/spot/02301-fes0000002/"
  },
  {
    name: "Nebuta Matsuri",
    date: "August 2–7",
    location: "Aomori",
    info: "Giant illuminated floats, drumming, and night parades. Very backpacker-friendly.",
    url: "https://www.nebuta.jp/"
  },
  {
    name: "Kishiwada Danjiri Festival",
    date: "Mid September",
    location: "Osaka Prefecture",
    info: "Huge wooden floats pulled at high speed — loud, energetic, and free to watch.",
    url: "https://osaka-info.jp/en/page/kishiwada-danjiri-festival"
  }
];

export default function JapanEventsTable() {
  return (
    <section aria-labelledby="events-table-title" className="w-full mt-10 mb-10">
      <h2 id="events-table-title" className="text-2xl font-semibold mb-4">
        Backpacker-Friendly Events in Japan
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 pr-4 font-semibold">Event</th>
              <th className="py-3 pr-4 font-semibold">Date</th>
              <th className="py-3 pr-4 font-semibold">Location</th>
              <th className="py-3 pr-4 font-semibold">Info</th>
              <th className="py-3 pr-4 font-semibold">Link</th>
            </tr>
          </thead>
          <tbody>
            {EVENTS.map((ev) => (
              <tr key={ev.name} className="border-b align-top">
                <td className="py-3 pr-4 font-medium">{ev.name}</td>
                <td className="py-3 pr-4">{ev.date}</td>
                <td className="py-3 pr-4">{ev.location}</td>
                <td className="py-3 pr-4">{ev.info}</td>
                <td className="py-3 pr-4">
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    Official site
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm opacity-80">
        Backpacking through Japan? Time your trip with one of these festivals or
        seasonal events for a truly unforgettable experience.
      </p>
    </section>
  );
}

