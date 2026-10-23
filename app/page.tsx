"use client";

import { useState } from "react";

// Each skill has keywords we look for in Thandi's story
const SKILL_RULES = [
  { skill: "Customer service", keywords: ["stall", "shop", "customer", "sell", "sold", "cashier"] },
  { skill: "Cash handling", keywords: ["cash", "money", "change", "stall", "till", "cashier"] },
  { skill: "Stock counting", keywords: ["stock", "count", "stall", "shelf", "inventory"] },
  { skill: "Numeracy", keywords: ["maths", "math", "numbers", "count", "excel", "tutor"] },
  { skill: "Teaching and mentoring", keywords: ["tutor", "taught", "teach", "kids", "children", "homework"] },
  { skill: "Spreadsheets (Excel)", keywords: ["excel", "spreadsheet"] },
  { skill: "Self-directed learning", keywords: ["youtube", "online", "taught myself", "self-taught", "learned"] },
  { skill: "Communication", keywords: ["customer", "kids", "tutor", "explain", "talk"] },
];

export default function Home() {
  const [story, setStory] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function findSkills() {
    const text = story.toLowerCase();
    const found = SKILL_RULES.filter((rule) =>
      rule.keywords.some((word) => text.includes(word))
    ).map((rule) => rule.skill);
    setSkills(found);
    setDone(true);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 bg-white p-6 text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold">Proof: your skills, verified.</h1>
      <p className="text-sm opacity-80">
        Tell us what you have done. Helping at a stall, tutoring, learning online:
        it all counts.
      </p>

      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Example: I helped at my aunt's stall and tutored two kids in maths."
        rows={5}
        className="rounded-lg border border-gray-400 bg-transparent p-3"
      />

      <button
        onClick={findSkills}
        disabled={story.trim().length === 0}
        className="rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white disabled:opacity-40"
      >
        Find my skills
      </button>

      {done && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">Your skills</h2>
          {skills.length === 0 ? (
            <p className="text-sm opacity-80">
              We could not find skills yet. Try adding more detail about what you did.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-teal-100 px-3 py-1 text-sm text-teal-900"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}