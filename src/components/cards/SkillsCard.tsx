import type { Theme } from "../../data/chapters"
import type { skills } from "../../data/resume"
import { palette } from "../../styles/palette"
import { Eyebrow } from "./CardText"

type SkillGroup = typeof skills.groups[number]

/** A group of skills, each shown as a segmented stat bar. */
export function SkillsCard({
  group,
  theme,
}: {
  group: SkillGroup
  theme: Theme
}) {
  const color = theme[group.color]

  return (
    <div>
      <Eyebrow theme={theme}>{group.title}</Eyebrow>
      <div className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
        {group.skills.map((skill) => (
          <StatBar
            key={skill.name}
            label={skill.name}
            value={skill.level}
            color={color}
          />
        ))}
      </div>
    </div>
  )
}

const SEGMENTS = 10

/** A label, a bar of 10 blocks (like a game's HP bar) and the score. */
function StatBar({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  const filled = Math.round((value / 100) * SEGMENTS)

  return (
    <div className="flex items-center" style={{ gap: 12 }}>
      <span
        className="shrink-0"
        style={{
          width: 160,
          fontSize: 18,
          fontWeight: 500,
          color: palette.ink,
        }}
      >
        {label}
      </span>
      <div
        className="flex min-w-0 flex-1"
        style={{ gap: 2, padding: 2, background: palette.outline }}
      >
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: 12,
              background: i < filled ? color : palette.paper,
              boxShadow:
                i < filled ? "inset 0 3px 0 rgba(255,255,255,0.35)" : undefined,
            }}
          />
        ))}
      </div>
      <span
        className="font-pixel shrink-0"
        style={{
          width: 28,
          fontSize: 9,
          color: palette.inkSoft,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  )
}
