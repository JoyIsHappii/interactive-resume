import type { Chapter } from "../data/chapters"
import { chapters } from "../data/chapters"
import { profile } from "../data/resume"
import { palette } from "../styles/palette"
import { PixelTag } from "./PixelBox"

type HudProps = {
  chapter: Chapter
  chapterIndex: number
  slideIndex: number
  slideCount: number
  onMenuClick: () => void
}

/**
 * The game-style status bar across the top (hidden on the title screen):
 * your name, which room you're in, a block per slide, a heart per chapter
 * visited and the Menu button.
 */
export function Hud({
  chapter,
  chapterIndex,
  slideIndex,
  slideCount,
  onMenuClick,
}: HudProps) {
  const theme = chapter.theme
  const storyLength = chapters.length - 1

  return (
    <div
      className="absolute top-0 left-0 right-0 z-20 pointer-events-none flex items-center gap-4 px-4"
      style={{
        height: 50,
        background: palette.outline,
        borderBottom: `3px solid ${theme.accent}`,
      }}
    >
      {/* Name */}
      <div className="shrink-0">
        <div
          className="font-pixel"
          style={{ fontSize: 10, color: palette.cream }}
        >
          {profile.name}
        </div>
        <div
          className="hidden sm:block"
          style={{ fontSize: 13, color: "#c9b8a8", marginTop: 2 }}
        >
          {profile.tagline}
        </div>
      </div>

      {/* Where we are + one block per slide */}
      <div
        className="flex items-center gap-3 min-w-0"
        style={{ paddingLeft: 16, borderLeft: "3px solid #5a4444" }}
      >
        <div
          className="hidden md:block shrink-0"
          style={{ fontSize: 15, color: "#c9b8a8" }}
        >
          <span
            className="font-pixel"
            style={{ fontSize: 9, color: theme.accent, marginRight: 8 }}
          >
            {chapter.tag}
          </span>
          {chapter.room}
        </div>
        <div className="flex items-center shrink-0" style={{ gap: 3 }}>
          {Array.from({ length: slideCount }, (_, i) => (
            <div
              key={i}
              style={{
                width: i === slideIndex ? 12 : 6,
                height: 6,
                background: i <= slideIndex ? theme.accent : "#5a4444",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* One heart per chapter visited */}
      <div
        className="hidden sm:flex items-center gap-1 shrink-0"
        aria-label={`Chapter ${chapterIndex} of ${storyLength}`}
      >
        {Array.from({ length: storyLength }, (_, i) => (
          <span
            key={i}
            className="font-pixel"
            style={{
              fontSize: 11,
              lineHeight: 1,
              color: i < chapterIndex ? "#ff6b8a" : "#5a4444",
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* Menu button */}
      <button
        className="pixel-button pointer-events-auto shrink-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          onMenuClick()
        }}
      >
        <PixelTag bg={theme.accent} outline={palette.cream}>
          <div
            className="font-pixel"
            style={{ fontSize: 9, color: palette.cream, padding: "6px 10px" }}
          >
            Menu
          </div>
        </PixelTag>
      </button>
    </div>
  )
}
