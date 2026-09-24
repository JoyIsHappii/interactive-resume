import type { ReactNode } from "react"

type SpriteProps = {
  x: number
  y: number
  rows: string[] // one string per row, one letter per pixel ("." = see-through)
  colors: Record<string, string> // what colour each letter means
  className?: string // e.g. an animation class
  flip?: boolean // mirror left ↔ right
}

/**
 * Draws pixel art from a grid of letters, e.g.
 *   rows={['.GG.', 'GGGG']}  colors={{ G: '#6fb050' }}
 */
export function Sprite({ x, y, rows, colors, className, flip }: SpriteProps) {
  const width = Math.max(...rows.map((row) => row.length))
  const rects: ReactNode[] = []

  rows.forEach((row, rowIndex) => {
    // Join neighbouring pixels of the same colour into one strip.
    let start = 0
    for (let i = 1; i <= row.length; i++) {
      if (i < row.length && row[i] === row[start]) continue
      const color = colors[row[start]]
      if (color) {
        const left = flip ? width - i : start
        rects.push(
          <rect
            key={`${rowIndex}-${start}`}
            x={left}
            y={rowIndex}
            width={i - start}
            height={1}
            fill={color}
          />,
        )
      }
      start = i
    }
  })

  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>{rects}</g>
    </g>
  )
}
