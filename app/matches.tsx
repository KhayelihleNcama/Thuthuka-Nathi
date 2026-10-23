"use client";

type Opportunity = {
  id: number;
  title: string;
  employer: string;
  area: string;
  type: string;
  required: string[];
  taxi: number; // rand, return trip (estimate)
  dataMb: number; // data needed to apply (estimate)
};

// Sample data for the prototype
const OPPORTUNITIES: Opportunity[] = [
  { id: 1, title: "Spaza shop assistant", employer: "Sample Spaza Group", area: "Umlazi", type: "Job", required: ["Customer service", "Cash handling", "Stock counting"], taxi: 30, dataMb: 5 },
  { id: 2, title: "Maths tutor (afternoons)", employer: "Sample Learning Hub", area: "Chatsworth", type: "Micro-internship", required: ["Teaching and mentoring", "Numeracy", "Communication"], taxi: 40, dataMb: 10 },
  { id: 3, title: "Admin assistant (learnership)", employer: "Sample Skills Academy", area: "Durban CBD", type: "Learnership", required: ["Spreadsheets (Excel)", "Communication", "Self-directed learning"], taxi: 50, dataMb: 25 },
  { id: 4, title: "Retail cashier", employer: "Sample Retail Store", area: "Pinetown", type: "Job", required: ["Cash handling", "Customer service", "Numeracy"], taxi: 45, dataMb: 8 },
  { id: 5, title: "Stock controller trainee", employer: "Sample Wholesale", area: "Springfield", type: "Learnership", required: ["Stock counting", "Numeracy", "Spreadsheets (Excel)"], taxi: 40, dataMb: 15 },
  { id: 6, title: "After-school homework helper", employer: "Sample Community Centre", area: "KwaMashu", type: "Micro-internship", required: ["Teaching and mentoring", "Communication"], taxi: 25, dataMb: 5 },
  { id: 7, title: "Data capturer (entry level)", employer: "Sample Data Services", area: "Umhlanga", type: "Job", required: ["Spreadsheets (Excel)", "Numeracy", "Self-directed learning"], taxi: 60, dataMb: 20 },
  { id: 8, title: "Market stall assistant", employer: "Sample Market Traders", area: "Warwick", type: "Job", required: ["Customer service", "Cash handling"], taxi: 30, dataMb: 5 },
];

const RAND_PER_MB = 0.1; // rough data cost estimate

type Props = { skills: string[]; verified: string[] };

export default function Matches({ skills, verified }: Props) {
  const scored = OPPORTUNITIES.map((o) => {
    const have = o.required.filter((r) => skills.includes(r));
    const verifiedCount = o.required.filter((r) => verified.includes(r)).length;
    const missing = o.required.filter((r) => !skills.includes(r));
    const score = Math.round((have.length / o.required.length) * 100);
    const cost = o.taxi + Math.round(o.dataMb * RAND_PER_MB);
    return { ...o, score, verifiedCount, missing, cost };
  })
    .filter((o) => o.score > 0)
    .sort((a, b) => b.score - a.score || b.verifiedCount - a.verifiedCount);

  // Skills gap: which missing skill appears most in the matches?
  const gapCount: Record<string, number> = {};
  scored.forEach((o) => o.missing.forEach((m) => (gapCount[m] = (gapCount[m] || 0) + 1)));
  const topGap = Object.entries(gapCount).sort((a, b) => b[1] - a[1])[0];

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Opportunities for you</h2>
      <p className="text-xs opacity-70">
        Sample opportunities. Costs are estimates (taxi return plus data).
      </p>

      {scored.length === 0 && (
        <p className="text-sm opacity-80">No matches yet. Add more detail to your story.</p>
      )}

      {scored.map((o) => (
        <div key={o.id} className="flex flex-col gap-2 rounded-lg border border-gray-400 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{o.title}</p>
              <p className="text-sm opacity-80">
                {o.employer} · {o.area} · {o.type}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                o.score >= 80 ? "bg-green-600" : o.score >= 50 ? "bg-teal-600" : "bg-gray-500"
              }`}
            >
              {o.score}% match
            </span>
          </div>

          <p className="text-sm">
            Cost to apply: <strong>about R{o.cost}</strong>{" "}
            <span className="opacity-70">(R{o.taxi} taxi + ~{o.dataMb}MB data)</span>
          </p>

          {o.verifiedCount > 0 && (
            <p className="text-xs font-semibold text-green-600">
              ✓ {o.verifiedCount} verified skill{o.verifiedCount > 1 ? "s" : ""} match
            </p>
          )}

          {o.missing.length > 0 && (
            <p className="text-xs opacity-70">Missing: {o.missing.join(", ")}</p>
          )}
        </div>
      ))}

      {topGap && (
        <div className="rounded-lg bg-teal-100 p-3 text-sm text-teal-900">
          <strong>Skills gap tip:</strong> adding <strong>{topGap[0]}</strong> would improve{" "}
          {topGap[1]} of your matches.
        </div>
      )}
    </section>
  );
}