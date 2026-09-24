import { storyChapters, titleChapter } from "../data/chapters"
import { palette } from "../styles/palette"
import { PixelBox } from "./PixelBox"

type ChapterMenuProps = {
  onPickChapter: (chapterIndex: number) => void
  onBackToTitle: () => void
  onClose: () => void
}

/** The pop-up opened by the Menu button, for jumping to any room. */
export function ChapterMenu({
  onPickChapter,
  onBackToTitle,
  onClose,
}: ChapterMenuProps) {
  const theme = titleChapter.theme

  return (
    <>
      {/* Invisible full-screen layer: clicking anywhere outside the menu closes it */}
      <div
        className="absolute inset-0 z-30"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      />

      <div
        className="absolute z-40 pointer-events-auto"
        style={{ top: 62, right: 12, width: 270 }}
        onClick={(e) => e.stopPropagation()}
      >
        <PixelBox color={theme.border} bg={theme.panel}>
          <div style={{ padding: 12 }}>
            <div
              className="font-pixel"
              style={{
                fontSize: 9,
                color: theme.muted,
                margin: "4px 0 8px 18px",
              }}
            >
              Rooms
            </div>

            {storyChapters.map((chapter, i) => (
              <button
                key={chapter.id}
                className="menu-choice block w-full text-left cursor-pointer"
                style={{ padding: "5px 10px 5px 18px", color: theme.text }}
                onClick={() => onPickChapter(i + 1)}
              >
                <span
                  className="font-pixel"
                  style={{
                    fontSize: 8,
                    color: chapter.theme.accent,
                    marginRight: 8,
                  }}
                >
                  {chapter.tag}
                </span>
                <span style={{ fontSize: 17, fontWeight: 600 }}>
                  {chapter.title}
                </span>
                <span
                  style={{ display: "block", fontSize: 14, color: theme.muted }}
                >
                  {chapter.room}
                </span>
              </button>
            ))}

            <div
              style={{
                height: 3,
                margin: "8px 10px",
                background: palette.paper,
              }}
            />

            <button
              className="menu-choice block w-full text-left cursor-pointer"
              style={{
                padding: "5px 10px 5px 18px",
                fontSize: 16,
                fontWeight: 600,
                color: theme.muted,
              }}
              onClick={onBackToTitle}
            >
              Back to the title screen
            </button>
          </div>
        </PixelBox>
      </div>
    </>
  )
}
