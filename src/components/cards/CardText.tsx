import type { ReactNode } from "react"
import type { Theme } from "../../data/chapters"

// Shared text styles for the detail cards, so every card looks consistent.

/** Small title-font label above a heading, e.g. "Job 1 of 3". */
export function Eyebrow({
  theme,
  children,
}: {
  theme: Theme
  children: ReactNode
}) {
  return (
    <div
      className="font-pixel"
      style={{ fontSize: 9, color: theme.accent, marginBottom: 10 }}
    >
      {children}
    </div>
  )
}

/** The big heading of a card, e.g. a job title or degree. */
export function CardTitle({
  theme,
  children,
}: {
  theme: Theme
  children: ReactNode
}) {
  return (
    <div
      style={{
        fontSize: 26,
        fontWeight: 700,
        color: theme.highlight,
        lineHeight: 1.15,
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  )
}

/** A quieter line under the heading, e.g. "Company · City · Years". */
export function CardSubtitle({
  theme,
  children,
}: {
  theme: Theme
  children: ReactNode
}) {
  return (
    <div style={{ fontSize: 17, color: theme.muted, marginBottom: 14 }}>
      {children}
    </div>
  )
}
