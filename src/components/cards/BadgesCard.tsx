import type { Theme } from "../../data/chapters"
import { skills } from "../../data/resume"
import { palette } from "../../styles/palette"
import { PixelTag } from "../PixelBox"
import { Eyebrow } from "./CardText"

/** Your certificates and licences, shown like collected badges. */
export function BadgesCard({ theme }: { theme: Theme }) {
  return (
    <div>
      <Eyebrow theme={theme}>Badges earned</Eyebrow>
      <div className="flex flex-col" style={{ gap: 8 }}>
        {skills.badges.map((badge) => (
          <div
            key={badge.name}
            className="flex items-center"
            style={{ gap: 12 }}
          >
            <PixelTag bg={palette.honey} outline={palette.outline}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 26,
                  height: 26,
                  color: palette.outline,
                  fontSize: 14,
                }}
              >
                {badge.icon}
              </div>
            </PixelTag>
            <div>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  color: theme.text,
                  lineHeight: 1.1,
                }}
              >
                {badge.name}
              </div>
              <div style={{ fontSize: 15, color: theme.muted }}>
                {badge.issuer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
