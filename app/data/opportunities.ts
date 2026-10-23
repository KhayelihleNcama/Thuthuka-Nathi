export type Opportunity = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  skills: string[];
  description: string;
};

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Shop Assistant",
    company: "Umlazi Retail",
    location: "Umlazi",
    type: "Part-time",
    pay: "R4,500/month",
    skills: [
      "Customer service",
      "Cash handling",
      "Stock counting",
    ],
    description:
      "Help customers, handle basic payments and keep track of stock.",
  },
  {
    id: 2,
    title: "Junior Admin Assistant",
    company: "Local Business Hub",
    location: "Durban",
    type: "Entry-level",
    pay: "R5,500/month",
    skills: [
      "Communication",
      "Spreadsheets (Excel)",
      "Numeracy",
    ],
    description:
      "Support the team with data entry, spreadsheets and customer communication.",
  },
  {
    id: 3,
    title: "Community Tutor",
    company: "Youth Learning Centre",
    location: "Umlazi",
    type: "Part-time",
    pay: "R3,500/month",
    skills: [
      "Teaching and mentoring",
      "Communication",
    ],
    description:
      "Help school learners with homework and basic academic support.",
  },
  {
    id: 4,
    title: "Stock Assistant",
    company: "KwaZulu Logistics",
    location: "Durban",
    type: "Entry-level",
    pay: "R5,000/month",
    skills: [
      "Stock counting",
      "Numeracy",
      "Self-directed learning",
    ],
    description:
      "Assist with stock counts, receiving goods and keeping inventory records.",
  },
];