import { storyChapters, titleChapter } from "../data/chapters"
import { profile } from "../data/resume"
import { palette } from "../styles/palette"
import { PixelBox, PixelTag } from "./PixelBox"

type TitleScreenProps = {
  onStart: () => void
  onPickChapter: (chapterIndex: number) => void
}

/**
 * The start screen, laid out like a 90s game: your name as the logo at the
 * top, the scene in the middle and the start menu at the bottom.
 */
export function TitleScreen({ onStart, onPickChapter }: TitleScreenProps) {
  const theme = titleChapter.theme

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-between"
      style={{ padding: "6vh 16px 20px" }}
    >
      {/* Logo */}
      <div className="text-center">
        <div
          className="font-pixel"
          style={{
            fontSize: 9,
            color: palette.cream,
            letterSpacing: 2,
            marginBottom: 14,
            opacity: 0.85,
          }}
        >
          ★ An interactive resume ★
        </div>
        <div
          className="font-pixel"
          style={{
            fontSize: "clamp(26px, 5vw, 48px)",
            color: palette.honey,
            lineHeight: 1.2,
            textShadow: `3px 3px 0 ${palette.rose}, 6px 6px 0 ${palette.outline}`,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            fontSize: 19,
            fontWeight: 600,
            color: palette.cream,
            marginTop: 14,
            textShadow: `2px 2px 0 ${palette.outline}`,
          }}
        >
          {profile.tagline}
        </div>
      </div>

      {/* Start menu */}
      <div className="w-full pointer-events-auto" style={{ maxWidth: 520 }}>
        <PixelBox color={theme.border} bg={theme.panel}>
          <div style={{ padding: 16 }}>
            <button
              onClick={onStart}
              className="pixel-button w-full cursor-pointer"
            >
              <PixelTag bg={palette.matchaDark} outline={palette.outline}>
                <div
                  className="font-pixel blink-slow"
                  style={{
                    fontSize: 12,
                    color: palette.cream,
                    padding: "14px 16px",
                  }}
                >
                  ▶ Press start
                </div>
              </PixelTag>
            </button>

            <div
              className="font-pixel"
              style={{
                fontSize: 8,
                color: theme.muted,
                margin: "16px 0 4px 18px",
              }}
            >
              Or jump to a room
            </div>

            <div className="grid grid-cols-2">
              {storyChapters.map((chapter, i) => (
                <button
                  key={chapter.id}
                  onClick={() => onPickChapter(i + 1)}
                  className="menu-choice text-left cursor-pointer whitespace-nowrap"
                  style={{ padding: "4px 4px 4px 18px", color: theme.text }}
                >
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: 10,
                      color: chapter.theme.accent,
                      marginRight: 6,
                    }}
                  >
                    {chapter.tag}
                  </span>
                  <span
                    className="text-[15px] sm:text-[17px]"
                    style={{ fontWeight: 600 }}
                  >
                    {chapter.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </PixelBox>
      </div>
    </div>
  )
}
