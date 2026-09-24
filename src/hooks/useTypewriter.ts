import { useCallback, useEffect, useRef, useState } from "react"
import { sounds } from "../utils/sounds"

/**
 * Reveals `text` one letter at a time, like dialog in an old RPG.
 *
 * Returns:
 * - `displayed` – the part of the text that has appeared so far
 * - `done`      – true once the whole text is showing
 * - `skip`      – call this to show the whole text immediately
 */
export function useTypewriter(text: string, msPerLetter = 34) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const letterCount = useRef(0)

  function stopTimer() {
    if (timer.current) clearInterval(timer.current)
  }

  const skip = useCallback(() => {
    stopTimer()
    setDisplayed(text)
    setDone(true)
  }, [text])

  // Restart the animation whenever the text changes.
  useEffect(() => {
    setDisplayed("")
    setDone(false)
    letterCount.current = 0
    stopTimer()

    if (!text) {
      setDone(true)
      return
    }

    timer.current = setInterval(
      () => {
        letterCount.current++
        const newLetter = text[letterCount.current - 1]

        // Click on every second letter, but stay quiet for spaces and line breaks.
        if (
          letterCount.current % 2 === 0 &&
          newLetter !== " " &&
          newLetter !== "\n"
        ) {
          sounds.tick()
        }

        setDisplayed(text.slice(0, letterCount.current))

        if (letterCount.current >= text.length) {
          stopTimer()
          setDone(true)
        }
      },
      msPerLetter,
    )

    return stopTimer
  }, [text, msPerLetter])

  return { displayed, done, skip }
}
