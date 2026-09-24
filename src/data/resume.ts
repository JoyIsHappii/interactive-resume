// ═════════════════════════════════════════════════════════════════════════════
//  YOUR RESUME CONTENT
//
//  Every word a visitor reads lives in this file. To update your resume,
//  change the text below and save — the preview updates by itself.
//
//  Tips:
//  • Write normally (not in capitals) — headings are capitalised for you.
//  • "\n" inside a message starts a new line in the dialog box.
//  • To add another job / project / skill, copy an existing { ... } block,
//    paste it below, and change the text. Keep the comma between blocks.
// ═════════════════════════════════════════════════════════════════════════════

// ─── About you ───────────────────────────────────────────────────────────────

export const profile = {
  name: "Joy Kosol",
  tagline: "UX/UI Designer · Web Developer · Project Designer",
  // The name shown on every dialog box, like a character in a game.
  speakerName: "Joy",
};

// ─── Contact details ─────────────────────────────────────────────────────────
// Shown at the end of chapter 1 and in the last chapter.
// Set `url` to null for things that aren't links (like your city).

export const contactLinks = [
  {
    icon: "✉",
    label: "Email",
    value: "joy.is.happii@gmail.com",
    url: "mailto:joy.is.happii@gmail.com",
  },
  {
    icon: "◆",
    label: "LinkedIn",
    value: "linkedin.com/in/joykosol",
    url: "https://www.linkedin.com/in/joykosol/",
  },
  {
    icon: "★",
    label: "Portfolio",
    value: "joyishappii-portfolio.netlify.app",
    url: "https://joyishappii-portfolio.netlify.app",
  },
  { icon: "♦", label: "Location", value: "Vancouver, BC, Canada", url: null },
];

// ─── Chapter 1: Who am I? ────────────────────────────────────────────────────

export const intro = {
  messages: [
    "Hello! I'm Joy Kosol.",
    "UX/UI designer\nLocation: Vancouver, BC\nStatus: leveling up!",
    "Origin story:\nI started as an architect and project designer,\nthen found my true calling in UX!",
    "Current quest:\nStudying web design in Vancouver\nso I can design and build.\nFinal boss: full-stack!",
  ],
};

// ─── Chapter 2: My journey (work history) ────────────────────────────────────

export const work = {
  messages: ["Work history unlocked!\nCome see where my adventures took me…"],
  jobs: [
    {
      title: "Graphic + Web Design Intern",
      company: "Iter Innovandi",
      location: "Remote, Montreal, Canada",
      years: "2024–2025",
      highlights: [
        "Built UI kits and design systems",
        "Designed responsive interfaces",
        "Figma + Adobe Creative Suite",
      ],
    },
    {
      title: "Architect + Graphic Designer",
      company: "Freelance",
      location: "Thailand",
      years: "2020–2023",
      highlights: [
        "Branding and design solutions",
        "Residential architecture projects",
        "Logos, signage and video",
      ],
    },
    {
      title: "Project Design Manager",
      company: "Chulalongkorn Hospital",
      location: "Bangkok, Thailand", // empty text is simply left out
      years: "2018–2023",
      highlights: [
        "Led multidisciplinary teams",
        "Bridged medical and engineering needs",
        "Managed budgets and quality control",
      ],
    },
  ],
};

// ─── Chapter 3: My creations (projects) ──────────────────────────────────────

export const projects = {
  messages: ["Quest log unlocked!\nHere are some projects I'm proud of."],
  list: [
    {
      name: "7VAN BJJ Website",
      role: "UX/UI Designer",
      highlights: [
        "Responsive website redesign",
        "User research and testing",
        "★ Best UI/UX Project Award",
      ],
    },

    {
      name: "Weather ForeCAT",
      role: "UX/UI Designer · Web Developer",
      highlights: [
        "Cat-themed weather dashboard",
        "Forecasts, favorites, and air-quality data",
        "Responsive UI with API integrations",
      ],
    },

    {
      name: "COVID-19 ICU Monitoring System",
      role: "Project Manager",
      highlights: [
        "Real-time negative pressure room monitoring system",
        "Designed for healthcare environments",
        "Interface for non-technical staff",
      ],
    },
  ],
};

// ─── Chapter 4: My studies (education) ───────────────────────────────────────
// Each entry can have a `details` line, an `award` line, or both.

export const education = {
  messages: ["Skill tree unlocked!\nHere's how I built my craft…"],

  schools: [
    {
      level: "Current Quest",
      degree: "Web Development Diploma",
      school: "CICCC",
      location: "Vancouver",
      years: "2026–2027",
      details:
        "HTML · CSS · JavaScript · React · Next.js · Astro · Databases · Git",
    },
    {
      level: "Previous Quest",
      degree: "UI/UX Design Advanced Diploma",
      school: "CICCC",
      location: "Vancouver",
      years: "2023–2025",
      details:
        "UX research · Wireframing · Prototyping · Usability testing · Figma",
      award: "Best UI/UX Project Award",
    },
    {
      level: "Foundation",
      degree: "Master of Architecture",
      school: "Chulalongkorn University",
      location: "Bangkok",
      years: "2017–2018",
      details: "Design · Project Management · Construction Management",
    },
    {
      level: "Origin",
      degree: "Bachelor of Architecture",
      school: "Chulalongkorn University",
      location: "Bangkok",
      years: "2012–2017",
      award: "Second Class Honors",
    },
  ],
};

// ─── Chapter 5: My powers (skills) ───────────────────────────────────────────
// `level` is a score out of 100 and sets how full the bar is.
// `color` picks a colour from the chapter theme: 'accent' or 'highlight'.

export const skills = {
  messages: ["Status screen:\nJoy's skill stats!"],

  groups: [
    {
      title: "UX + Interaction",
      color: "accent",
      skills: [
        { name: "Wireframing", level: 92 },
        { name: "Prototyping", level: 92 },
        { name: "User research", level: 85 },
        { name: "Usability testing", level: 82 },
        { name: "Design systems", level: 88 },
        { name: "Information architecture", level: 86 },
      ],
    },

    {
      title: "Web Development",
      color: "accent",
      skills: [
        { name: "HTML / CSS", level: 88 },
        { name: "JavaScript", level: 76 },
        { name: "Astro", level: 78 },
        { name: "React", level: 74 },
        { name: "Next.js", level: 74 },
        { name: "TypeScript", level: 70 },
        { name: "Tailwind CSS", level: 80 },
        { name: "Databases", level: 68 },
        { name: "Node.js / Express", level: 65 },
        { name: "Git / GitHub", level: 78 },
      ],
    },

    {
      title: "Tools + Powers",
      color: "accent",
      skills: [
        { name: "Figma", level: 96 },
        { name: "Adobe Creative Suite", level: 88 },
        { name: "AutoCAD / Revit", level: 90 },
        { name: "Webflow / Framer", level: 75 },
        { name: "Project management", level: 94 },
        { name: "Collaboration", level: 92 },
      ],
    },
  ] as const,
  // Certificates and licences, shown after the skill bars.
  badges: [
    { icon: "★", name: "HCI: Foundations of UX", issuer: "IXDF 2025" },
    { icon: "★", name: "Interaction Design", issuer: "IXDF 2025" },
    { icon: "★", name: "Mobile UI Design", issuer: "IXDF 2025" },
    { icon: "★", name: "Gamification UX", issuer: "IXDF 2025" },
    { icon: "◆", name: "Licensed Architect", issuer: "ACT 2018" },
  ],
};

// ─── Chapter 6: Find me (the ending) ─────────────────────────────────────────

export const contact = {
  messages: [
    "Quest complete!\nYou reached the end — thanks for visiting! ★",
    "I'm always open to new quests and collaborations.\nSend me a message!",
  ],
};
