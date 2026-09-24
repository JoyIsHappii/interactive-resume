import type { MouseEvent } from "react"
import type { Chapter } from "../data/chapters"
import { profile } from "../data/resume"
import { palette } from "../styles/palette"
import { PixelBox, PixelTag } from "./PixelBox"

// The box along the bottom of the screen. It comes in two versions:
//   • DialogBox  – for text slides: name tag, typed-out message, Back/Next
//   • CardNavBar – for card slides: just the name tag and Back/Next
//                  (the card itself is shown by CardPanel)

type NavProps = {
  chapter: Chapter
  onBack: () => void
  onNext: () => void
  canGoBack: boolean
  isLastSlideInChapter: boolean
  isEndOfGame: boolean
}

type DialogBoxProps = NavProps & {
  text: string // the part of the message typed out so far
  isTyping: boolean
}

// A click on these boxes must not also count as a click on the page behind them.
function withoutBubbling(action: () => void) {
  return (e: MouseEvent) => {
    e.stopPropagation()
    action()
  }
}

function nextLabel({ isEndOfGame, isLastSlideInChapter }: NavProps) {
  if (isEndOfGame) return "Start over"
  if (isLastSlideInChapter) return "Next room ▶▶"
  return "Next ▶"
}

export function DialogBox(props: DialogBoxProps) {
  const { chapter, text, isTyping, onBack, canGoBack, isEndOfGame } = props
  const theme = chapter.theme

  return (
    <PixelBox
      color={theme.border}
      bg={theme.panel}
      tab={<NameTag chapter={chapter} />}
    >
      {/* Message, with a blinking block cursor while it's still typing */}
      <div style={{ padding: "26px 24px 4px", minHeight: 100 }}>
        <div
          style={{
            fontSize: 21,
            fontWeight: 500,
            color: theme.text,
            lineHeight: 1.45,
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
          {isTyping && (
            <span
              className="cursor"
              style={{ color: theme.accent, marginLeft: 2 }}
            >
              █
            </span>
          )}
        </div>
      </div>

      {/* Back / hint / Next */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "4px 18px 12px" }}
      >
        <NavButton
          onClick={withoutBubbling(onBack)}
          disabled={!canGoBack}
          color={theme.muted}
        >
          ◀ Back
        </NavButton>
        <div
          className="flex items-center gap-2"
          style={{ fontSize: 15, color: theme.muted }}
        >
          {!isTyping && (
            <span className="cursor" style={{ color: theme.accent }}>
              ▼
            </span>
          )}
          {isEndOfGame ? "The end" : "Click or press Space"}
        </div>
        <NavButton onClick={withoutBubbling(props.onNext)} color={theme.accent}>
          {nextLabel(props)}
        </NavButton>
      </div>
    </PixelBox>
  )
}

export function CardNavBar(props: NavProps) {
  const { chapter, onBack, canGoBack } = props
  const theme = chapter.theme

  return (
    <PixelBox
      color={theme.border}
      bg={theme.panel}
      tab={<NameTag chapter={chapter} />}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: "20px 18px 10px" }}
      >
        <NavButton
          onClick={withoutBubbling(onBack)}
          disabled={!canGoBack}
          color={theme.muted}
        >
          ◀ Back
        </NavButton>
        <NavButton onClick={withoutBubbling(props.onNext)} color={theme.accent}>
          {nextLabel(props)}
        </NavButton>
      </div>
    </PixelBox>
  )
}

/** The little tab with the speaker's name, sitting on top of the box. */
function NameTag({ chapter }: { chapter: Chapter }) {
  return (
    <PixelTag
      bg={chapter.theme.accent}
      outline={palette.outline}
      style={{ position: "absolute", top: -20, left: 16 }}
    >
      <div
        className="font-pixel flex items-center gap-2"
        style={{ fontSize: 10, color: palette.cream, padding: "6px 12px" }}
      >
        <span>{chapter.icon}</span>
        {profile.speakerName}
      </div>
    </PixelTag>
  )
}

type NavButtonProps = {
  onClick: (e: MouseEvent) => void
  disabled?: boolean
  color: string
  children: string
}

function NavButton({ onClick, disabled, color, children }: NavButtonProps) {
  return (
    <button
      className="font-pixel pixel-button cursor-pointer disabled:cursor-default disabled:opacity-30"
      style={{
        fontSize: 9,
        color,
        background: "none",
        border: "none",
        padding: "6px 4px",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
