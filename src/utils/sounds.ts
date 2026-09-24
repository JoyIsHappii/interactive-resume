// Retro "bleep" sound effects, generated in the browser (no audio files needed).

/** Plays a single tone. `frequency` is the pitch in Hz, `duration` is in seconds. */
function beep(
  frequency: number,
  duration: number,
  volume = 0.12,
  wave: OscillatorType = "square",
) {
  try {
    const audio = new AudioContext()
    const oscillator = audio.createOscillator()
    const gain = audio.createGain()
    oscillator.connect(gain)
    gain.connect(audio.destination)

    oscillator.type = wave
    oscillator.frequency.value = frequency
    // Start at `volume` and fade out quickly, like an old game console.
    gain.gain.setValueAtTime(volume, audio.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration)

    oscillator.start()
    oscillator.stop(audio.currentTime + duration)
    setTimeout(() => audio.close(), duration * 1000 + 300)
  } catch {
    // Sound is blocked or not supported by this browser — just stay silent.
  }
}

export const sounds = {
  /** Tiny click while text is being typed out. */
  tick: () => beep(620, 0.015, 0.03),
  /** Moving on to the next slide. */
  advance: () => beep(880, 0.065, 0.09),
  /** Going back a slide. */
  back: () => beep(330, 0.08, 0.08, "triangle"),
  /** Picking something from a menu. */
  select: () => beep(1047, 0.055, 0.09),
  /** Short rising jingle when a new chapter starts. */
  fanfare: () => {
    const notes = [523, 659, 784, 1047] // C, E, G, high C
    notes.forEach((note, i) => setTimeout(() => beep(note, 0.1, 0.08), i * 80))
  },
}
