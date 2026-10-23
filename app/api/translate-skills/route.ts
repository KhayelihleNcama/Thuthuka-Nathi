import { NextResponse } from "next/server";

const SKILLS = [
  "Customer service",
  "Cash handling",
  "Stock counting",
  "Numeracy",
  "Teaching and mentoring",
  "Spreadsheets (Excel)",
  "Self-directed learning",
  "Communication",
];

const SKILL_KEYWORDS: Record<string, string[]> = {
  "Customer service": ["stall", "shop", "customer", "sell", "sold", "cashier"],
  "Cash handling": ["cash", "money", "change", "stall", "till", "cashier"],
  "Stock counting": ["stock", "count", "stall", "shelf", "inventory"],
  Numeracy: ["maths", "math", "numbers", "count", "excel", "tutor"],
  "Teaching and mentoring": ["tutor", "taught", "teach", "kids", "children", "homework"],
  "Spreadsheets (Excel)": ["excel", "spreadsheet"],
  "Self-directed learning": ["youtube", "online", "taught myself", "self-taught", "learned"],
  Communication: ["customer", "kids", "tutor", "explain", "talk"],
};

function findKeywordSkills(story: string) {
  const text = story.toLowerCase();
  return SKILLS.filter((skill) =>
    SKILL_KEYWORDS[skill].some((keyword) => text.includes(keyword))
  ).slice(0, 3);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const story =
      typeof body.story === "string" ? body.story.trim() : "";

    if (!story || story.length > 1000) {
      return NextResponse.json(
        { error: "Please provide a valid story." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn("GROQ_API_KEY is missing; using keyword skill matching.");

      return NextResponse.json({
        skills: findKeywordSkills(story),
        source: "fallback",
      });
    }

    let response: Response;
    try {
      response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          signal: AbortSignal.timeout(15_000),
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            temperature: 0,
            max_tokens: 200,
            response_format: {
              type: "json_object",
            },
            messages: [
              {
                role: "system",
                content: `
You identify skills from a young person's informal experience.

The person may write in English, isiZulu, isiXhosa or Sesotho.

You may ONLY choose skills from this exact list:

${SKILLS.join(", ")}

Choose 1 to 3 skills that are clearly supported by the person's story.

Never invent a skill.
Never rename a skill.
Never return a skill outside the list.

Return ONLY JSON:

{"skills":["Customer service","Cash handling"]}

If no skills match, return:

{"skills":[]}
                `.trim(),
              },
              {
                role: "user",
                content: story,
              },
            ],
          }),
        }
      );
    } catch (error) {
      console.error("GROQ REQUEST ERROR:", error);
      return NextResponse.json({
        skills: findKeywordSkills(story),
        source: "fallback",
      });
    }

    if (!response.ok) {
      const errorText = await response.text();

      console.error("GROQ ERROR:", response.status, errorText);

      return NextResponse.json({
        skills: findKeywordSkills(story),
        source: "fallback",
      });
    }

    const data = await response.json();

    const text =
      data?.choices?.[0]?.message?.content ?? '{"skills":[]}';

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("Invalid JSON from Groq:", text);

      return NextResponse.json({
        skills: findKeywordSkills(story),
        source: "fallback",
      });
    }

    const returnedSkills =
      typeof parsed === "object" &&
      parsed !== null &&
      "skills" in parsed &&
      Array.isArray((parsed as { skills: unknown }).skills)
        ? (parsed as { skills: unknown[] }).skills
        : [];

    const skills = returnedSkills
      .filter(
        (skill): skill is string =>
          typeof skill === "string" && SKILLS.includes(skill)
      )
      .slice(0, 3);

    return NextResponse.json({
      skills,
      source: "ai",
    });
  } catch (error) {
    console.error("TRANSLATE SKILLS ERROR:", error);

    return NextResponse.json(
      {
        skills: [],
        source: "fallback",
        error: "Server error",
      },
      { status: 500 }
    );
  }
}