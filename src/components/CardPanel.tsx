import type { ReactNode } from "react"
import type { Chapter } from "../data/chapters"
import { palette } from "../styles/palette"
import { PixelBox, PixelTag } from "./PixelBox"

type CardPanelProps = {
  chapter: Chapter
  slideIndex: number
  slideCount: number
  children: ReactNode
}

/**
 * The big window that shows a detail slide. On wide screens it sits to the
 * right, so Joy stands beside it as if presenting it.
 */
export function CardPanel({
  chapter,
  slideIndex,
  slideCount,
  children,
}: CardPanelProps) {
  const theme = chapter.theme

  return (
    <div
      className="absolute z-10 pointer-events-auto flex items-start justify-center py-2 px-4 sm:items-center lg:justify-end lg:pr-[6%]"
      style={{ top: 60, left: 0, right: 0, bottom: 84 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full" style={{ maxWidth: 580 }}>
        <PixelBox color={theme.border} bg={theme.panel}>
          {/* Header: chapter icon, title, room and page counter */}
          <div
            className="flex items-center gap-3"
            style={{
              padding: "14px 18px 10px",
              borderBottom: `3px dashed ${palette.paper}`,
            }}
          >
            <PixelTag bg={theme.accent} outline={palette.outline}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 30,
                  height: 30,
                  color: palette.cream,
                  fontSize: 16,
                }}
              >
                {chapter.icon}
              </div>
            </PixelTag>
            <div>
              <div
                className="font-pixel"
                style={{ fontSize: 9, color: theme.accent }}
              >
                {chapter.tag} · {chapter.title}
              </div>
              <div style={{ fontSize: 15, color: theme.muted, marginTop: 2 }}>
                {chapter.room}
              </div>
            </div>
            <div className="flex-1" />
            <div
              className="font-pixel"
              style={{ fontSize: 9, color: theme.muted }}
            >
              {slideIndex + 1}/{slideCount}
            </div>
          </div>

          {/* The card itself (scrolls if it's too tall) */}
          <div
            style={{
              padding: "18px 22px",
              overflowY: "auto",
              maxHeight: "min(400px, 52dvh)",
            }}
          >
            {children}
          </div>
        </PixelBox>
      </div>
    </div>
  )
}
