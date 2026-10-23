"use client";

import { useState } from "react";

type SkillVerificationProps = {
  skill: string;
  onVerified: (skill: string) => void;
};

export default function SkillVerification({
  skill,
  onVerified,
}: SkillVerificationProps) {
  const [answer, setAnswer] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const checkAnswer = () => {
    setError("");

    if (skill === "Cash handling") {
      if (answer.trim().toLowerCase() === "25") {
        setVerified(true);
        onVerified(skill);
      } else {
        setError("Not quite. Try again.");
      }

      return;
    }

    if (answer.trim().length > 0) {
      setVerified(true);
      onVerified(skill);
    } else {
      setError("Please enter an answer.");
    }
  };

  if (verified) {
    return (
      <div className="rounded-2xl border border-[#CDE5D9] bg-[#F2F8F4] p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#006B4F]">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#006B4F] text-[10px] text-white">
            ✓
          </span>
          Demo skill verified
        </div>
        <div className="mt-3 text-lg font-black tracking-tight text-[#14251D]">
          {skill}
        </div>
        <p className="mt-2 text-sm leading-6 text-[#53625A]">
          Challenge complete. This demo badge is saved for this session.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#DCE8E0] bg-[#FBFCFB] p-5">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF5EF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#006B4F]">
        Quick skill challenge
      </div>
      <h3 className="mt-3 text-lg font-black tracking-tight text-[#14251D]">
        {skill}
      </h3>

      {skill === "Cash handling" ? (
        <>
          <p className="mt-3 text-sm leading-6 text-[#53625A]">
            A customer buys 3 items at R25 each and pays with R100. How much
            change should they receive?
          </p>
          <input
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="mt-4 w-full rounded-xl border border-[#DCE8E0] bg-white px-4 py-3 text-sm text-[#14251D] outline-none transition placeholder:text-[#9AA69F] focus:border-[#00805E] focus:ring-4 focus:ring-[#00805E]/10"
          />
        </>
      ) : (
        <>
          <p className="mt-3 text-sm leading-6 text-[#53625A]">
            Complete this short practical challenge to verify this skill.
          </p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your response"
            className="mt-4 w-full rounded-xl border border-[#DCE8E0] bg-white px-4 py-3 text-sm text-[#14251D] outline-none transition placeholder:text-[#9AA69F] focus:border-[#00805E] focus:ring-4 focus:ring-[#00805E]/10"
          />
        </>
      )}

      {error && (
        <p
          className="mt-3 rounded-xl bg-[#FFF1F0] px-3 py-2 text-sm font-medium text-[#B42318]"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        onClick={checkAnswer}
        className="mt-4 w-full rounded-xl bg-[#006B4F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#005941] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00805E]/20"
      >
        Submit challenge <span aria-hidden="true">→</span>
      </button>
      <p className="mt-3 text-center text-[11px] leading-5 text-[#89958E]">
        Demo only · Verification is not a formal qualification.
      </p>
    </div>
  );
}
