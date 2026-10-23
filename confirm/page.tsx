"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "proof-verified";

export default function ConfirmPage() {
  const [skill, setSkill] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSkill(params.get("skill") ?? "");
  }, []);

  function confirm() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const list: string[] = saved ? JSON.parse(saved) : [];
      if (!list.includes(skill)) list.push(skill);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // storage unavailable: still show the thank-you for the demo
    }
    setConfirmed(true);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 bg-white p-6 text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold">Confirm a skill</h1>

      {!skill ? (
        <p>This link is missing a skill. Ask the person to send it again.</p>
      ) : confirmed ? (
        <div className="rounded-lg bg-green-600 p-4 text-white">
          <p className="font-semibold">Thank you! ✓</p>
          <p className="text-sm">You confirmed: {skill}</p>
        </div>
      ) : (
        <>
          <p>
            Someone you know says they have this skill:{" "}
            <strong>{skill}</strong>.
          </p>
          <p className="text-sm opacity-80">
            Only confirm it if you have seen them do it.
          </p>
          <button
            onClick={confirm}
            className="rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white"
          >
            Yes, I can confirm this
          </button>
        </>
      )}
    </main>
  );
}