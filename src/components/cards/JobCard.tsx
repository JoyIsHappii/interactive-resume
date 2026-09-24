import type { Theme } from "../../data/chapters"
import type { work } from "../../data/resume"
import { BulletList } from "./BulletList"
import { CardSubtitle, CardTitle, Eyebrow } from "./CardText"

type Job = typeof work.jobs[number]

type JobCardProps = {
  job: Job
  number: number // which job this is, starting at 1
  total: number // how many jobs there are
  theme: Theme
}

/** One job from your work history. */
export function JobCard({ job, number, total, theme }: JobCardProps) {
  // e.g. "Iter Innovandi · Remote · 2024–2025" (empty parts are skipped)
  const details = [job.company, job.location, job.years]
    .filter(Boolean)
    .join(" · ")

  return (
    <div>
      <Eyebrow theme={theme}>
        Job {number} of {total}
      </Eyebrow>
      <CardTitle theme={theme}>{job.title}</CardTitle>
      <CardSubtitle theme={theme}>{details}</CardSubtitle>
      <BulletList items={job.highlights} theme={theme} />
    </div>
  )
}
