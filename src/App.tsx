// The main app: keeps track of which chapter and slide the visitor is on,
// and puts all the pieces of the screen together.
//
// Looking for the resume text? It's in src/data/resume.ts.

import { useEffect, useState } from "react"
import { chapters } from "./data/chapters"
import { getSlides } from "./slides"
import { scenes } from "./scenes"
import { useTypewriter } from "./hooks/useTypewriter"
import { sounds } from "./utils/sounds"
import { palette } from "./styles/palette"
import { CardPanel } from "./components/CardPanel"
import { ChapterMenu } from "./components/ChapterMenu"
import { CardNavBar, DialogBox } from "./components/DialogBox"
import { Hud } from "./components/Hud"
import { TitleScreen } from "./components/TitleScreen"

const TITLE_SCREEN = 0
const FIRST_CHAPTER = 1
const LAST_CHAPTER = chapters.length - 1

export default function App() {
  // ─── State ─────────────────────────────────────────────────────────────────
  const [chapterIndex, setChapterIndex] = useState(TITLE_SCREEN)
  const [slideIndex, setSlideIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [flash, setFlash] = useState(false) // soft fade between chapters

  // ─── Things worked out from the state ──────────────────────────────────────
  const chapter = chapters[chapterIndex]
  const isTitle = chapterIndex === TITLE_SCREEN
  const slides = getSlides(chapter)
  const slide = slides[slideIndex]
  const textSlide = slide && "text" in slide ? slide : null
  const cardSlide = slide && "card" in slide ? slide : null
  const isLastSlideInChapter = slideIndex === slides.length - 1
  const isEndOfGame = chapterIndex === LAST_CHAPTER && isLastSlideInChapter
  const canGoBack = !(chapterIndex === FIRST_CHAPTER && slideIndex === 0)
  const Scene = scenes[chapter.id]

  const typewriter = useTypewriter(textSlide ? textSlide.text : "")

  // ─── Navigation ────────────────────────────────────────────────────────────

  function goToChapter(index: number) {
    setFlash(true)
    setTimeout(() => setFlash(false), 450)
    sounds.fanfare()
    setChapterIndex(index)
    setSlideIndex(0)
    setMenuOpen(false)
  }

  function goNext() {
    if (isTitle) return

    // First click on a message that's still typing just shows the whole thing.
    if (textSlide && !typewriter.done) {
      sounds.advance()
      typewriter.skip()
      return
    }

    if (!isLastSlideInChapter) {
      sounds.advance()
      setSlideIndex((i) => i + 1)
    } else if (chapterIndex < LAST_CHAPTER) {
      goToChapter(chapterIndex + 1)
    } else {
      goToChapter(TITLE_SCREEN) // finished the last chapter: start over
    }
  }

  function goBack() {
    if (slideIndex > 0) {
      sounds.back()
      setSlideIndex((i) => i - 1)
    } else if (chapterIndex > TITLE_SCREEN) {
      goToChapter(chapterIndex - 1)
    }
  }

  // Keyboard: Space or Enter = next, Left arrow = back.
  // (No dependency list, so the listener is refreshed after every render
  // and always sees the current chapter and slide.)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault()
        goNext()
      }
      if (e.code === "ArrowLeft") goBack()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  })

  // ─── Screen ────────────────────────────────────────────────────────────────

  const navProps = {
    chapter,
    onBack: goBack,
    onNext: goNext,
    canGoBack,
    isLastSlideInChapter,
    isEndOfGame,
  }

  return (
    // Clicking anywhere on the screen moves the story forward.
    <div
      className="relative w-full h-dvh overflow-hidden"
      style={{ cursor: "default" }}
      onClick={isTitle ? undefined : goNext}
    >
      <Scene key={chapter.id} />

      {flash && (
        <div
          className="absolute inset-0 z-50 pointer-events-none"
          style={{
            background: palette.cream,
            animation: "fadeOut 0.45s ease-out forwards",
          }}
        />
      )}

      {!isTitle && (
        <Hud
          chapter={chapter}
          chapterIndex={chapterIndex}
          slideIndex={slideIndex}
          slideCount={slides.length}
          onMenuClick={() => {
            sounds.select()
            setMenuOpen((open) => !open)
          }}
        />
      )}

      {menuOpen && (
        <ChapterMenu
          onPickChapter={(index) => {
            sounds.select()
            goToChapter(index)
          }}
          onBackToTitle={() => {
            sounds.back()
            goToChapter(TITLE_SCREEN)
          }}
          onClose={() => setMenuOpen(false)}
        />
      )}

      {isTitle && (
        <div onClick={(e) => e.stopPropagation()}>
          <TitleScreen
            onStart={() => {
              sounds.fanfare()
              goToChapter(FIRST_CHAPTER)
            }}
            onPickChapter={(index) => {
              sounds.select()
              goToChapter(index)
            }}
          />
        </div>
      )}

      {cardSlide && (
        <CardPanel
          chapter={chapter}
          slideIndex={slideIndex}
          slideCount={slides.length}
        >
          {cardSlide.card}
        </CardPanel>
      )}

      {/* Box along the bottom of the screen */}
      {!isTitle && (
        <div
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-auto"
          onClick={cardSlide ? undefined : goNext}
        >
          <div className="mx-auto px-3 pb-4" style={{ maxWidth: 720 }}>
            {cardSlide ? (
              <CardNavBar {...navProps} />
            ) : (
              <DialogBox
                {...navProps}
                text={typewriter.displayed}
                isTyping={!typewriter.done}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
