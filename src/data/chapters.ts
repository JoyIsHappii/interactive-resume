// ═════════════════════════════════════════════════════════════════════════════
//  CHAPTERS + COLOURS
//
//  The story is split into chapters, played in the order listed below.
//  The first entry is the title screen. Each chapter is a room in Joy's house
//  with its own accent colour. Shared colours live in src/styles/palette.ts.
//  The words inside each chapter live in `resume.ts`.
// ═════════════════════════════════════════════════════════════════════════════

import { palette } from "../styles/palette"

export type ChapterId = "title" | "intro" | "work" | "projects" | "education" | "skills" | "contact"

/** The colours used by the boxes and text of one chapter. */
export type Theme = {
  border: string // box borders and the name tag
  panel: string // background of the dialog boxes
  text: string // normal body text
  muted: string // small, less important text
  accent: string // this room's colour: headings, bullets, progress dots
  highlight: string // strongest text, such as job titles and links
}

export type Chapter = {
  id: ChapterId
  tag: string // short label, e.g. "Ch.1"
  title: string // name shown in the menus and panel headers
  room: string // which room of the house this chapter is set in
  icon: string // symbol shown on the name tag
  theme: Theme
}

// Every room shares the same cream paper and brown ink; only the accent changes.
function roomTheme(accent: string): Theme {
  return {
    border: palette.outline,
    panel: palette.cream,
    text: palette.ink,
    muted: palette.inkSoft,
    accent,
    highlight: palette.ink,
  }
}

export const chapters: Chapter[] = [
  {
    id: "title",
    tag: "",
    title: "Title screen",
    room: "Outside",
    icon: "⌂",
    theme: roomTheme(palette.matchaDark),
  },
  {
    id: "intro",
    tag: "Ch.1",
    title: "Who am I?",
    room: "Living room",
    icon: "♥",
    theme: roomTheme(palette.rose),
  },
  {
    id: "work",
    tag: "Ch.2",
    title: "My journey",
    room: "Home office",
    icon: "✎",
    theme: roomTheme(palette.matchaDark),
  },
  {
    id: "projects",
    tag: "Ch.3",
    title: "My creations",
    room: "Design studio",
    icon: "✿",
    theme: roomTheme(palette.terracottaDark),
  },
  {
    id: "education",
    tag: "Ch.4",
    title: "My studies",
    room: "Reading nook",
    icon: "✦",
    theme: roomTheme("#8a5a3a"),
  },
  {
    id: "skills",
    tag: "Ch.5",
    title: "My powers",
    room: "Tea kitchen",
    icon: "★",
    theme: roomTheme(palette.teal),
  },
  {
    id: "contact",
    tag: "Ch.6",
    title: "Find me",
    room: "Front garden",
    icon: "✉",
    theme: roomTheme(palette.rose),
  },
]

export const titleChapter = chapters[0]

/** Every chapter except the title screen — the ones listed in the menus. */
export const storyChapters = chapters.slice(1)

/** Text used in the chapter menus, e.g. "Ch.1 Who am I?" */
export function menuLabel(chapter: Chapter) {
  return `${chapter.tag} ${chapter.title}`
}
