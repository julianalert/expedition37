// components/KosherItalyTable.tsx
"use client";

type KosherPlace = {
  city: string;
  name: string;
  type: string;
  highlights: string;
  supervision: string;
  link: string;
};

const PLACES: KosherPlace[] = [
  {
    city: "Canazei (Dolomites)",
    name: "My Kosher Hotel",
    type: "Hotel",
    highlights:
      "Italy's only fully kosher 4-star hotel. Glatt kosher dining, Mikveh, Shabbat elevator, and alpine views.",
    supervision: "Rabbi Menachem Lazar",
    link: "https://www.mykosherhotel.it/#CANAZEI"
  },
  {
    city: "Rome",
    name: "Ba'Ghetto",
    type: "Restaurant",
    highlights:
      "Flagship kosher restaurant in the Jewish Quarter. Try artichokes alla giudia and fresh pasta.",
    supervision: "Rome Rabbinate",
    link: "https://baghetto.com/en/"
  },
  {
    city: "Rome",
    name: "Yotvata",
    type: "Dairy Restaurant",
    highlights:
      "Cozy kosher dairy spot with pasta, pizza, and homemade desserts.",
    supervision: "Rome Rabbinate",
    link: "https://www.facebook.com/yotvataroma/"
  },
  {
    city: "Milan",
    name: "Ba'Ghetto Milan",
    type: "Restaurant",
    highlights:
      "Modern Mediterranean and Roman-Jewish cuisine near the city center.",
    supervision: "Milan Rabbinate",
    link: "https://baghetto.com/en/"
  },
  {
    city: "Venice",
    name: "Ba'Ghetto Venice",
    type: "Restaurant",
    highlights:
      "Located near the Ghetto Nuovo; serves fish and pasta with kosher wine list.",
    supervision: "Venice Rabbinate",
    link: "https://baghetto.com/en/"
  },
  {
    city: "Venice",
    name: "Gam Gam",
    type: "Restaurant",
    highlights:
      "Chabad-run kosher restaurant by the canal. Warm, communal vibe with traditional dishes.",
    supervision: "Chabad of Venice",
    link: "https://www.jewishvenice.org/"
  },
  {
    city: "Tuscany",
    name: "Terra di Seta Winery",
    type: "Kosher Winery",
    highlights:
      "Organic kosher Chianti Classico near Siena. Family-run, open for tastings and tours.",
    supervision: "OU / OK Kosher",
    link: "https://terradiseta.com/en/"
  },
  {
    city: "Tuscany",
    name: "Cantina Giuliano",
    type: "Kosher Winery & Restaurant",
    highlights:
      "Israeli–Tuscan couple producing boutique kosher wines and local dishes in a countryside setting.",
    supervision: "Rabbi A. Guetta (Florence)",
    link: "https://cantinagiuliano.com/"
  }
];

export default function KosherItalyTable() {
  return (
    <section
      aria-labelledby="kosher-italy-table"
      className="w-full mt-10 mb-10 max-w-5xl mx-auto"
    >
      <h2 id="kosher-italy-table" className="text-2xl font-semibold mb-4">
        Kosher Places to Eat, Stay, and Visit Across Italy
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3 pr-4 font-semibold">City</th>
              <th className="py-3 pr-4 font-semibold">Name</th>
              <th className="py-3 pr-4 font-semibold">Type</th>
              <th className="py-3 pr-4 font-semibold">Highlights</th>
              <th className="py-3 pr-4 font-semibold">Supervision</th>
              <th className="py-3 pr-4 font-semibold">Link</th>
            </tr>
          </thead>
          <tbody>
            {PLACES.map((p) => (
              <tr key={p.name} className="border-b align-top">
                <td className="py-3 pr-4">{p.city}</td>
                <td className="py-3 pr-4 font-medium">{p.name}</td>
                <td className="py-3 pr-4">{p.type}</td>
                <td className="py-3 pr-4">{p.highlights}</td>
                <td className="py-3 pr-4">{p.supervision}</td>
                <td className="py-3 pr-4">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm opacity-80">
        Planning your trip? Visit{" "}
        <a
          href="https://www.trydetour.com/italy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          trydetour.com/italy
        </a>{" "}
        for local guides, best times to go, and travel filters to build your own
        kosher itinerary.
      </p>
    </section>
  );
}

