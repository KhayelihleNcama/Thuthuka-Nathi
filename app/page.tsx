"use client";

import { useEffect, useState } from "react";
import Matches from "./matches";

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

const STORAGE_KEY = "proof-verified";

export default function Home() {
  const [story, setStory] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [verified, setVerified] = useState<string[]>([]);

  // Load verified skills, and update live when the confirm page saves one
  useEffect(() => {
    function load() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setVerified(saved ? JSON.parse(saved) : []);
      } catch {
        setVerified([]);
      }
    }
    load();
    window.addEventListener("storage", load);
    window.addEventListener("focus", load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("focus", load);
    };
  }, []);

  function findSkills() {
    const text = story.toLowerCase();
    const found = SKILL_RULES.filter((rule) =>
      rule.keywords.some((word) => text.includes(word))
    ).map((rule) => rule.skill);
    setSkills(found);
    setDone(true);
  }

  function confirmLink(skill: string) {
    return `${window.location.origin}/confirm?skill=${encodeURIComponent(skill)}`;
  }

  function askOnWhatsApp(skill: string) {
    const message = `Hi! Can you confirm that I have this skill: ${skill}? Tap here: ${confirmLink(skill)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
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
            <ul className="flex flex-col gap-3">
              {skills.map((s) => {
                const isVerified = verified.includes(s);
                return (
                  <li
                    key={s}
                    className="flex flex-col gap-2 rounded-lg border border-gray-400 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{s}</span>
                      {isVerified && (
                        <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    {!isVerified && (
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <button
                          onClick={() => askOnWhatsApp(s)}
                          className="rounded-lg bg-teal-600 px-3 py-2 font-semibold text-white"
                        >
                          Ask someone to confirm
                        </button>
                        <a
                          href={`/confirm?skill=${encodeURIComponent(s)}`}
                          target="_blank"
                          className="underline opacity-70"
                        >
                          Open link (demo)
                        </a>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
            {done && skills.length > 0 && (
        <Matches skills={skills} verified={verified} />
      )}
    </main>
  );
}