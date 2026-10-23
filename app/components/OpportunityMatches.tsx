"use client";

import { opportunities } from "../data/opportunities";

type OpportunityMatchesProps = {
  skills: string[];
  verifiedSkills: string[];
};

export default function OpportunityMatches({
  skills,
  verifiedSkills,
}: OpportunityMatchesProps) {
  const matches = opportunities
    .map((opportunity) => {
      const matchedSkills = opportunity.skills.filter((skill) =>
        skills.includes(skill)
      );
      const verifiedMatchedSkills = opportunity.skills.filter((skill) =>
        verifiedSkills.includes(skill)
      );
      const missingSkills = opportunity.skills.filter(
        (skill) => !skills.includes(skill)
      );

      const skillMatch =
        opportunity.skills.length > 0
          ? matchedSkills.length / opportunity.skills.length
          : 0;
      const verificationScore =
        matchedSkills.length > 0
          ? verifiedMatchedSkills.length / matchedSkills.length
          : 0;
      const coverageScore =
        opportunity.skills.length > 0
          ? matchedSkills.length / opportunity.skills.length
          : 0;
      const score = Math.round(
        skillMatch * 50 + verificationScore * 30 + coverageScore * 20
      );

      return {
        ...opportunity,
        matchedSkills,
        verifiedMatchedSkills,
        missingSkills,
        score,
      };
    })
    .filter((opportunity) => opportunity.score > 0)
    .sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    return (
      <div className="mt-8 rounded-[24px] border border-[#DCE8E0] bg-white p-6">
        <h2 className="text-xl font-black tracking-tight text-[#14251D]">
          Your opportunities
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#64736B]">
          Add some skills to discover opportunities that match your experience.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-8 border-t border-[#E7EEE9] pt-8">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#007A59]">
            Matched to your skills
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-[#14251D]">
            Opportunities for you
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#64736B]">
            Sample listings ranked by your experience and verified skills.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#F1F6F3] px-3 py-1.5 text-xs font-bold text-[#53625A]">
          {matches.length} matches
        </span>
      </div>

      <div className="space-y-4">
        {matches.map((opportunity) => (
          <article
            key={opportunity.id}
            className="overflow-hidden rounded-[22px] border border-[#DCE8E0] bg-white shadow-[0_8px_24px_rgba(20,37,29,0.04)] transition hover:border-[#B9D5C7] hover:shadow-[0_12px_30px_rgba(20,37,29,0.08)]"
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#F1F6F3] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#53625A]">
                      {opportunity.type}
                    </span>
                    <span className="text-xs text-[#718078]">
                      {opportunity.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-[#14251D] sm:text-xl">
                    {opportunity.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#718078]">
                    {opportunity.company}
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl bg-[#EAF5EF] px-3 py-2 text-center">
                  <div className="text-xl font-black leading-none text-[#006B4F]">
                    {opportunity.score}%
                  </div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-wide text-[#547365]">
                    match
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#53625A]">
                {opportunity.description}
              </p>

              <div className="mt-5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#718078]">
                  Skills that match
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {opportunity.matchedSkills.map((skill) => {
                    const verified =
                      opportunity.verifiedMatchedSkills.includes(skill);

                    return (
                      <span
                        key={skill}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          verified
                            ? "bg-[#E4F4EC] text-[#006B4F]"
                            : "bg-[#F2F4F2] text-[#53625A]"
                        }`}
                      >
                        {verified ? "✓ " : "• "}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {opportunity.missingSkills.length > 0 && (
                <div className="mt-4 rounded-2xl bg-[#FBF7ED] p-4">
                  <h4 className="text-xs font-bold text-[#725A28]">
                    Build toward a stronger match
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-[#806A3B]">
                    Adding these skills could improve your fit:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {opportunity.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[#725A28]"
                      >
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-4 border-t border-[#E9EFEB] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-[#14251D]">
                    {opportunity.pay}
                  </p>
                  <p className="mt-1 text-xs text-[#718078]">
                    Listed by {opportunity.company}
                  </p>
                </div>
                <button
                  className="rounded-xl bg-[#006B4F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#005941] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00805E]/20 sm:px-5"
                  onClick={() =>
                    alert(`Demo: ${opportunity.title} at ${opportunity.company}`)
                  }
                >
                  View demo opportunity <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
