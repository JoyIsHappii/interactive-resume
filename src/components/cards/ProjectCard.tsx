import type { Theme } from "../../data/chapters"
import type { projects } from "../../data/resume"
import { BulletList } from "./BulletList"
import { CardSubtitle, CardTitle, Eyebrow } from "./CardText"

type Project = typeof projects.list[number]

/** One project from your portfolio. */
export function ProjectCard({
  project,
  theme,
}: {
  project: Project
  theme: Theme
}) {
  return (
    <div>
      <Eyebrow theme={theme}>Project</Eyebrow>
      <CardTitle theme={theme}>{project.name}</CardTitle>
      <CardSubtitle theme={theme}>Role: {project.role}</CardSubtitle>
      <BulletList items={project.highlights} theme={theme} />
    </div>
  )
}
