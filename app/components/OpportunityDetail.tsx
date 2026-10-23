"use client";

import { Opportunity } from "../data/opportunities";

type OpportunityDetailProps = {
  opportunity: Opportunity;
  skills: string[];
  verifiedSkills: string[];
  onClose: () => void;
};

export default function OpportunityDetail({
  opportunity,
  skills,
  verifiedSkills,
  onClose,
}: OpportunityDetailProps) {
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

  const score = Math.round(
    skillMatch * 50 +
      verificationScore * 30 +
      skillMatch * 20
  );

  const totalApplicationCost =
    opportunity.transportCost + opportunity.dataCost;

  const worthApplying =
    score >= 60 && totalApplicationCost <= 50;

  return (
    <div className="modal-backdrop fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="opportunity-detail-title"
        className="modal-panel mx-auto my-8 max-w-2xl rounded-3xl bg-white shadow-2xl"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Proof Opportunity
            </p>

            <h2
              id="opportunity-detail-title"
              className="mt-1 text-2xl font-bold text-gray-900"
            >
              {opportunity.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-700/20"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 p-6">

          {/* Basic information */}
          <div>
            <p className="font-semibold text-gray-900">
              {opportunity.company}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {opportunity.location} · {opportunity.type}
            </p>

            <p className="mt-2 font-semibold text-gray-900">
              {opportunity.pay}
            </p>
          </div>

          {/* Match score */}
          <div className="rounded-2xl bg-green-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-700">
                  YOUR MATCH
                </p>

                <p className="mt-1 text-3xl font-bold text-green-900">
                  {score}%
                </p>
              </div>

              <div className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-green-800">
                {score >= 70
                  ? "Strong match"
                  : score >= 50
                    ? "Good match"
                    : "Skills to build"}
              </div>
            </div>

            <p className="mt-3 text-sm text-green-800">
              Your match is based on your skills and the skills
              you've verified with Proof.
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-900">
              About the opportunity
            </h3>

            <p className="mt-2 text-gray-600">
              {opportunity.description}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-bold text-gray-900">
              Why you match
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {matchedSkills.map((skill) => {
                const verified =
                  verifiedMatchedSkills.includes(skill);

                return (
                  <span
                    key={skill}
                    className={`rounded-full px-3 py-2 text-sm font-medium ${
                      verified
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {verified ? "✓ " : ""}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Skill gap */}
          {missingSkills.length > 0 && (
            <div className="rounded-2xl bg-amber-50 p-5">
              <h3 className="font-bold text-amber-900">
                Skills you could strengthen
              </h3>

              <p className="mt-1 text-sm text-amber-800">
                Improving these skills could make you a stronger
                candidate:
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white px-3 py-2 text-sm font-medium text-amber-900"
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Application cost */}
          <div>
            <h3 className="font-bold text-gray-900">
              Cost to apply
            </h3>

            <div className="mt-3 divide-y rounded-2xl border border-gray-200">
              <div className="flex justify-between p-4">
                <span className="text-gray-600">
                  Estimated transport
                </span>

                <span className="font-semibold">
                  R{opportunity.transportCost}
                </span>
              </div>

              <div className="flex justify-between p-4">
                <span className="text-gray-600">
                  Estimated data
                </span>

                <span className="font-semibold">
                  R{opportunity.dataCost}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 p-4">
                <span className="font-bold">
                  Estimated total
                </span>

                <span className="font-bold text-green-700">
                  R{totalApplicationCost}
                </span>
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Demo estimate — actual costs may vary.
            </p>
          </div>

          {/* Recommendation */}
          <div
            className={`rounded-2xl p-5 ${
              worthApplying
                ? "bg-green-50"
                : "bg-gray-100"
            }`}
          >
            <p
              className={`text-sm font-semibold uppercase tracking-wide ${
                worthApplying
                  ? "text-green-700"
                  : "text-gray-600"
              }`}
            >
              Proof recommendation
            </p>

            <h3
              className={`mt-1 text-2xl font-bold ${
                worthApplying
                  ? "text-green-900"
                  : "text-gray-900"
              }`}
            >
              {worthApplying
                ? "Worth applying"
                : "Consider strengthening your profile"}
            </h3>

            <p className="mt-2 text-sm text-gray-700">
              {worthApplying
                ? "Your skills are a strong enough match and the estimated cost of applying is relatively low."
                : "You may improve your chances by strengthening or verifying more of the required skills first."}
            </p>
          </div>

          {/* Apply */}
          <button
            onClick={() =>
              alert(
                `Demo application started for ${opportunity.title}`
              )
            }
            className="w-full rounded-2xl bg-green-700 px-6 py-4 text-lg font-bold text-white transition hover:bg-green-800"
          >
            Apply for this opportunity
          </button>

        </div>
      </div>
    </div>
  );
}