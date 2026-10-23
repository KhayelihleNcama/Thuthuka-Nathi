"use client";

import { useState } from "react";
import SkillVerification from "./components/SkillVerification";
import OpportunityMatches from "./components/OpportunityMatches";
import IntelligenceSummary from "./components/IntelligenceSummary";

export default function Home() {
  const [story, setStory] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [source, setSource] = useState<"ai" | "fallback" | null>(null);
  const [error, setError] = useState("");

  function handleVerified(skill: string) {
    setVerifiedSkills((current) =>
      current.includes(skill) ? current : [...current, skill]
    );
    setSelectedSkill(null);
  }

  async function translateSkills() {
    if (!story.trim()) {
      setError("Tell us about something you've done.");
      return;
    }

    setLoading(true);
    setError("");
    setSkills([]);
    setHasSearched(false);
    setSource(null);

    try {
      const response = await fetch("/api/translate-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ story: story.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setSkills(Array.isArray(data.skills) ? data.skills : []);
      setSource(data.source);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8F5] text-[#14251D]">
      {/* Top navigation */}
      <header className="border-b border-[#E3E8E3] bg-[#F7F8F5]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006B4F] text-sm font-black tracking-tight text-white">
              TN
            </div>

            <div>
              <p className="text-lg font-black tracking-tight">Thuthuka Nathi</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718078]">
                Your skills. Your next step.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#CDE5D9] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#006B4F] sm:px-4">
            <span className="h-2 w-2 rounded-full bg-[#00A878]" />
            Interactive demo
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* LEFT */}
          <section className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E3F3ED] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#006B4F]">
              <span className="h-2 w-2 rounded-full bg-[#00A878]" />
              Youth skills · Work readiness
            </div>

            <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Your experience is
              <span className="text-[#00805E]"> your starting point.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#607068]">
              Turn everyday experience into skills you can share with
              employers. No CV or formal work history needed to get started.
            </p>

            {/* Story input */}
            <div className="mt-9 rounded-[28px] border border-[#DDE5DF] bg-white p-2 shadow-[0_20px_60px_rgba(20,37,29,0.08)]">
              <div className="rounded-[22px] bg-[#FAFBFA] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold">Start with your story</p>
                    <p className="mt-1 text-sm text-[#7A8780]">
                      English, isiZulu, isiXhosa or Sesotho
                    </p>
                  </div>

                  <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#E5F3EE] text-[#007A59] sm:flex">
                    ✦
                  </div>
                </div>

                <textarea
                  value={story}
                  onChange={(e) => {
                    setStory(e.target.value);
                    setError("");
                  }}
                  maxLength={1000}
                  rows={7}
                  placeholder="For example: I helped my aunt at her stall, served customers, counted money and checked the stock."
                  className="mt-5 w-full resize-none rounded-2xl border border-[#DDE5DF] bg-white p-4 text-[15px] leading-7 text-[#14251D] outline-none transition placeholder:text-[#A2ADA6] focus:border-[#00805E] focus:ring-4 focus:ring-[#00805E]/10"
                />

                <div className="mt-3 flex items-center justify-between text-xs text-[#89958E]">
                  <span>A few details help us spot your skills.</span>
                  <span>{story.length}/1000</span>
                </div>

                {error && (
                  <div className="mt-4 rounded-xl bg-[#FFF1F0] px-4 py-3 text-sm font-medium text-[#B42318]">
                    {error}
                  </div>
                )}

                <button
                  onClick={translateSkills}
                  disabled={loading || !story.trim()}
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#006B4F] px-5 py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,107,79,0.22)] transition hover:bg-[#005941] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Finding your skills...
                    </>
                  ) : (
                    <>
                      Find my skills
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Demo prompt */}
            {!skills.length && !loading && (
              <button
                onClick={() =>
                  setStory(
                    "I helped my aunt at her stall. I served customers, counted the money and checked how much stock was left."
                  )
                }
                className="mt-4 flex w-full items-start gap-3 rounded-2xl border border-[#DDE5DF] bg-white p-4 text-left transition hover:border-[#AFCFC2] hover:shadow-sm"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F4EF] text-[#007A59]">
                  ✦
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#007A59]">
                    See how the demo works
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#435149]">
                    “I helped my aunt at her stall, served customers, counted
                    money and checked stock.”
                  </p>
                </div>
              </button>
            )}
          </section>

          {/* RIGHT / EXPLANATION */}
          <aside className="lg:pt-16">
            {!skills.length && !hasSearched ? (
              <div className="overflow-hidden rounded-[28px] border border-[#DDE5DF] bg-[#14251D] p-6 text-white shadow-[0_20px_60px_rgba(20,37,29,0.12)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ED6BE]">
                  Your journey
                </p>

                <h2 className="mt-4 text-2xl font-black tracking-tight">
                  Small experiences can open big doors.
                </h2>

                <div className="mt-7 space-y-5">
                  <Step
                    number="01"
                    title="Tell us what you've done"
                    text="No CV or formal work history required."
                  />

                  <Step
                    number="02"
                    title="Discover your skills"
                    text="AI or keyword matching turns your story into recognised skills."
                  />

                  <Step
                    number="03"
                    title="Take your next step"
                    text="Build confidence and explore opportunities that fit."
                  />
                </div>

                <div className="mt-8 rounded-2xl bg-white/10 p-4">
                  <p className="text-sm leading-6 text-[#D4E4DD]">
                    <span className="font-bold text-white">The mission:</span>{" "}
                    Thuthuka Nathi helps make skills from everyday life visible
                    and valued.
                  </p>
                </div>
              </div>
            ) : !skills.length ? (
              <div className="rounded-[28px] border border-[#DDE5DF] bg-white p-6 shadow-[0_20px_60px_rgba(20,37,29,0.08)]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00805E]">
                  Your results
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  No skills found yet
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#607068]">
                  Try adding more detail about what you did, such as who you
                  helped, what tools you used, or what tasks you completed.
                </p>
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setSource(null);
                  }}
                  className="mt-5 w-full rounded-2xl bg-[#006B4F] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#005941]"
                >
                  ← Edit my story
                </button>
              </div>
            ) : (
              <div className="rounded-[28px] border border-[#DDE5DF] bg-white p-6 shadow-[0_20px_60px_rgba(20,37,29,0.08)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00805E]">
                      Your results
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight">
                      Skills found
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4F4EE] text-[#00805E]">
                    ✓
                  </div>
                </div>

                {source && (
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#EAF7F2] px-3 py-1.5 text-xs font-bold text-[#007A59]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00A878]" />
                    {source === "ai" ? "AI matched" : "Keyword matched"}
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  {skills.map((skill) => {
                    const isVerified = verifiedSkills.includes(skill);

                    return (
                      <div key={skill}>
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E1E8E3] bg-[#FAFBFA] p-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DDF2EA] text-sm font-bold text-[#007A59]">
                              ✓
                            </span>
                            <div>
                              <p className="text-sm font-bold">{skill}</p>
                              <p className="mt-1 text-xs text-[#718078]">
                                {isVerified ? "Verified" : "Based on your experience"}
                              </p>
                            </div>
                          </div>
                          {!isVerified && (
                            <button
                              onClick={() => setSelectedSkill(skill)}
                              className="shrink-0 rounded-xl bg-[#006B4F] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#005941]"
                            >
                              Verify
                            </button>
                          )}
                        </div>
                        {selectedSkill === skill && (
                          <div className="mt-3">
                            <SkillVerification
                              skill={skill}
                              onVerified={handleVerified}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {skills.length > 0 && (
                  <IntelligenceSummary
                    skills={skills}
                    verifiedSkills={verifiedSkills}
                  />
                )}

                {skills.length > 0 && (
                  <OpportunityMatches
                    skills={skills}
                    verifiedSkills={verifiedSkills}
                  />
                )}

                <button
                  onClick={() => console.log("Skills:", skills)}
                  className="mt-6 w-full rounded-2xl bg-[#006B4F] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#005941]"
                >
                  Continue to profile →
                </button>

                <button
                  onClick={() => {
                    setSkills([]);
                    setHasSearched(false);
                    setSource(null);
                  }}
                  className="mt-3 w-full py-2 text-sm font-semibold text-[#718078] hover:text-[#14251D]"
                >
                  ← Edit my story
                </button>
              </div>
            )}
          </aside>
        </div>
        <footer className="mt-12 border-t border-[#E3E8E3] pt-5 text-center text-xs leading-5 text-[#718078]">
          Demo prototype · Opportunities and travel costs shown are examples,
          not live listings.
        </footer>
      </div>
    </main>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2B4A3D] text-xs font-black text-[#9BE0C8]">
        {number}
      </div>

      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#AFC1B9]">{text}</p>
      </div>
    </div>
  );
}