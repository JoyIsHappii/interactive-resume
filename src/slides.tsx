// Turns the content in data/resume.ts into the slides shown in each chapter.
//
// A slide is either:
//   • { text }  – a message typed out letter by letter in the dialog box, or
//   • { card }  – a bigger panel with details, like a job or a skill list.

import type { ReactNode } from "react"
import type { Chapter } from "./data/chapters"
import {
  contact,
  education,
  intro,
  projects,
  skills,
  work,
} from "./data/resume"
import { BadgesCard } from "./components/cards/BadgesCard"
import { ContactInfoCard, FindMeCard } from "./components/cards/ContactCards"
import { EducationCard } from "./components/cards/EducationCard"
import { JobCard } from "./components/cards/JobCard"
import { ProjectCard } from "./components/cards/ProjectCard"
import { SkillsCard } from "./components/cards/SkillsCard"

export type Slide = { text: string } | { card: ReactNode }

function textSlides(messages: string[]): Slide[] {
  return messages.map((text) => ({ text }))
}

export function getSlides(chapter: Chapter): Slide[] {
  const theme = chapter.theme

  switch (chapter.id) {
    case "intro":
      return [
        ...textSlides(intro.messages),
        { card: <ContactInfoCard theme={theme} /> },
      ]

    case "work":
      return [
        ...textSlides(work.messages),
        ...work.jobs.map((job, i) => ({
          card: (
            <JobCard
              job={job}
              number={i + 1}
              total={work.jobs.length}
              theme={theme}
            />
          ),
        })),
      ]

    case "projects":
      return [
        ...textSlides(projects.messages),
        ...projects.list.map((project) => ({
          card: <ProjectCard project={project} theme={theme} />,
        })),
      ]

    case "education":
      return [
        ...textSlides(education.messages),
        ...education.schools.map((school) => ({
          card: <EducationCard school={school} theme={theme} />,
        })),
      ]

    case "skills":
      return [
        ...textSlides(skills.messages),
        ...skills.groups.map((group) => ({
          card: <SkillsCard group={group} theme={theme} />,
        })),
        { card: <BadgesCard theme={theme} /> },
      ]

    case "contact":
      return [
        ...textSlides(contact.messages),
        { card: <FindMeCard theme={theme} /> },
      ]

    // The title screen has no slides — it shows the start menu instead.
    default:
      return []
  }
}
