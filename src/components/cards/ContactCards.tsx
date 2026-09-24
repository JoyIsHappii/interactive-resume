import type { Theme } from "../../data/chapters"
import { contactLinks } from "../../data/resume"
import { palette } from "../../styles/palette"
import { PixelTag } from "../PixelBox"
import { Eyebrow } from "./CardText"

// Two ways of showing the same contact details from resume.ts.

type ContactLink = typeof contactLinks[number]

/** Compact version at the end of chapter 1: icon + value on one line. */
export function ContactInfoCard({ theme }: { theme: Theme }) {
  return (
    <div>
      <Eyebrow theme={theme}>Say hello</Eyebrow>
      <div className="flex flex-col" style={{ gap: 8 }}>
        {contactLinks.map((item) => (
          <div
            key={item.label}
            className="flex items-center"
            style={{ gap: 12 }}
          >
            <ContactIcon item={item} theme={theme} />
            <ContactValue item={item} theme={theme} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Detailed version in the final chapter: a small label above each value. */
export function FindMeCard({ theme }: { theme: Theme }) {
  return (
    <div>
      <Eyebrow theme={theme}>Find me at</Eyebrow>
      <div className="flex flex-col" style={{ gap: 10 }}>
        {contactLinks.map((item) => (
          <div
            key={item.label}
            className="flex items-center"
            style={{ gap: 12 }}
          >
            <ContactIcon item={item} theme={theme} />
            <div className="min-w-0">
              <div
                className="font-pixel"
                style={{ fontSize: 8, color: theme.muted, marginBottom: 2 }}
              >
                {item.label}
              </div>
              <ContactValue item={item} theme={theme} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactIcon({ item, theme }: { item: ContactLink; theme: Theme }) {
  return (
    <PixelTag bg={theme.accent} outline={palette.outline}>
      <div
        className="flex items-center justify-center"
        style={{ width: 28, height: 28, color: palette.cream, fontSize: 14 }}
      >
        {item.icon}
      </div>
    </PixelTag>
  )
}

/** A link if the item has a url, plain text otherwise. */
function ContactValue({ item, theme }: { item: ContactLink; theme: Theme }) {
  if (!item.url) {
    return <span style={{ fontSize: 19, color: theme.text }}>{item.value}</span>
  }
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: 19,
        fontWeight: 600,
        color: theme.highlight,
        textDecoration: "underline",
        textDecorationColor: theme.accent,
        textDecorationThickness: 2,
        textUnderlineOffset: 4,
        wordBreak: "break-all",
      }}
    >
      {item.value}
    </a>
  )
}
