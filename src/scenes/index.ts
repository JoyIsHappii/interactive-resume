// Which background picture goes with which chapter.

import type { ComponentType } from "react"
import type { ChapterId } from "../data/chapters"
import { ContactScene } from "./ContactScene"
import { EducationScene } from "./EducationScene"
import { IntroScene } from "./IntroScene"
import { ProjectsScene } from "./ProjectsScene"
import { SkillsScene } from "./SkillsScene"
import { TitleScene } from "./TitleScene"
import { WorkScene } from "./WorkScene"

export const scenes: Record<ChapterId, ComponentType> = {
  title: TitleScene,
  intro: IntroScene,
  work: WorkScene,
  projects: ProjectsScene,
  education: EducationScene,
  skills: SkillsScene,
  contact: ContactScene,
}
