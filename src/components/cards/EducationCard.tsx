import type { Theme } from "../../data/chapters"
import { palette } from "../../styles/palette"
import { PixelTag } from "../PixelBox"
import { CardSubtitle, CardTitle, Eyebrow } from "./CardText"

type School = {
  level: string
  degree: string
  school: string
  location: string
  years: string
  details?: string
  award?: string
}

/** One degree or diploma. */
export function EducationCard({
  school,
  theme,
}: {
  school: School
  theme: Theme
}) {
  const where = [school.school, school.location, school.years]
    .filter(Boolean)
    .join(" · ")

  return (
    <div>
      <Eyebrow theme={theme}>{school.level}</Eyebrow>
      <CardTitle theme={theme}>{school.degree}</CardTitle>
      <CardSubtitle theme={theme}>{where}</CardSubtitle>

      {school.details && (
        <div style={{ fontSize: 19, color: theme.text }}>{school.details}</div>
      )}
      {school.award && (
        <PixelTag
          bg={palette.honey}
          outline={palette.outline}
          style={{ display: "inline-block" }}
        >
          <div
            style={{
              padding: "4px 12px",
              fontSize: 18,
              fontWeight: 600,
              color: palette.outline,
            }}
          >
            ★ {school.award}
          </div>
        </PixelTag>
      )}
    </div>
  )
}
