"use client";

type IntelligenceSummaryProps = {
  skills: string[];
  verifiedSkills: string[];
};

export default function IntelligenceSummary({
  skills,
  verifiedSkills,
}: IntelligenceSummaryProps) {
  const verifiedCount = skills.filter((skill) =>
    verifiedSkills.includes(skill)
  ).length;
  const verificationRate = skills.length
    ? Math.round((verifiedCount / skills.length) * 100)
    : 0;
  const remainingSkills = skills.length - verifiedCount;

  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 overflow-hidden rounded-[24px] border border-[#DCE8E0] bg-white shadow-[0_12px_32px_rgba(20,37,29,0.05)]">
      <div className="flex flex-col gap-4 border-b border-[#E7EEE9] bg-[#F4F8F5] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#006B4F] ring-1 ring-[#DCE8E0]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00A878]" />
            Profile snapshot
          </div>
          <h2 className="mt-3 text-xl font-black tracking-tight text-[#14251D]">
            Your progress so far
          </h2>
          <p className="mt-1 text-sm text-[#64736B]">
            {verifiedCount === 0
              ? "Verify a skill to build a stronger profile."
              : `${verifiedCount} of ${skills.length} skills have been verified.`}
          </p>
        </div>

        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#006B4F] text-white">
          <span className="text-xl font-black leading-none">{verificationRate}%</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wide text-[#C5E6D8]">
            verified
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 sm:p-6">
        <div className="rounded-2xl border border-[#E7EEE9] bg-[#FBFCFB] p-4">
          <div className="text-2xl font-black tracking-tight text-[#14251D]">
            {skills.length.toString().padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs font-medium text-[#718078]">Skills found</div>
        </div>

        <div className="rounded-2xl border border-[#E7EEE9] bg-[#FBFCFB] p-4">
          <div className="text-2xl font-black tracking-tight text-[#007A59]">
            {verifiedCount.toString().padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs font-medium text-[#718078]">Verified</div>
        </div>

        <div className="col-span-2 rounded-2xl border border-[#E7EEE9] bg-[#FBFCFB] p-4 sm:col-span-1">
          <div className="flex items-center justify-between text-xs font-semibold text-[#53625A]">
            <span>Profile progress</span>
            <span>{verificationRate}%</span>
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-[#E4ECE7]"
            role="progressbar"
            aria-label="Verified skills progress"
            aria-valuenow={verificationRate}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-[#00A878] transition-all"
              style={{ width: `${verificationRate}%` }}
            />
          </div>
        </div>
      </div>

      {remainingSkills > 0 && (
        <div className="mx-5 mb-5 flex items-start gap-3 rounded-2xl bg-[#F2F7F3] p-4 text-sm text-[#53625A] sm:mx-6 sm:mb-6">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#007A59]">
            →
          </span>
          <p className="leading-6">
            <span className="font-bold text-[#14251D]">Next step:</span>{" "}
            verify {remainingSkills} more skill{remainingSkills !== 1 ? "s" : ""} to
            strengthen your profile.
          </p>
        </div>
      )}
    </section>
  );
}
