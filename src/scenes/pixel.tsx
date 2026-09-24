// ═════════════════════════════════════════════════════════════════════════════
//  PIXEL-ART DRAWING KIT
//
//  Every scene is painted on a small 320 × 180 "game screen" and then scaled
//  up to fill the browser, just like a 90s console. Because everything is
//  measured in these big game pixels, the rooms keep the same proportions on
//  a phone, a laptop or a huge monitor.
//
//  Coordinates: x goes 0 → 320 (left → right), y goes 0 → 180 (top → bottom).
// ═════════════════════════════════════════════════════════════════════════════

import { useEffect, useId, useState, type ReactNode } from "react"
import { Avatar } from "../components/JoySprite"

export const SCENE_WIDTH = 320
export const SCENE_HEIGHT = 180

/** Where Joy stands in every room (top-left corner of the sprite). */
export const AVATAR_X = 76
export const AVATAR_Y = 73

// ─── The scene frame ─────────────────────────────────────────────────────────

type PixelSceneProps = {
  children: ReactNode
  foreground?: ReactNode // things drawn in front of Joy
  showAvatar?: boolean
  // Which part of the scene to keep in view when the screen is narrower than
  // the scene (e.g. phones): 0 = left edge, 0.5 = middle, 1 = right edge.
  focus?: number
}

/** Draws a scene and scales it up to cover the whole screen with crisp pixels. */
export function PixelScene({
  children,
  foreground,
  showAvatar = true,
  focus = 0.3,
}: PixelSceneProps) {
  const viewBox = useCoverViewBox(focus)

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={viewBox}
      shapeRendering="crispEdges"
    >
      {children}
      {showAvatar && <Avatar x={AVATAR_X} y={AVATAR_Y} />}
      {foreground}
    </svg>
  )
}

/**
 * Works out which part of the 320 × 180 scene fits the screen, so it fills
 * it without stretching (like CSS `object-fit: cover`).
 */
function useCoverViewBox(focus: number) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const screenAspect = size.width / size.height
  const sceneAspect = SCENE_WIDTH / SCENE_HEIGHT

  if (screenAspect > sceneAspect) {
    // Wider than the scene: show the full width, trim a little top and bottom.
    const visibleHeight = SCENE_WIDTH / screenAspect
    const top = (SCENE_HEIGHT - visibleHeight) * 0.6
    return `0 ${top} ${SCENE_WIDTH} ${visibleHeight}`
  }

  // Narrower than the scene: show the full height, trim the sides.
  const visibleWidth = SCENE_HEIGHT * screenAspect
  const left = (SCENE_WIDTH - visibleWidth) * focus
  return `${left} 0 ${visibleWidth} ${SCENE_HEIGHT}`
}

// ─── Basic shapes ────────────────────────────────────────────────────────────

type RectProps = {
  x: number
  y: number
  w: number
  h: number
  c: string
  className?: string
  opacity?: number
}

/** A filled rectangle. The building block of everything. */
export function Rect({ x, y, w, h, c, className, opacity }: RectProps) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={c}
      className={className}
      opacity={opacity}
    />
  )
}

/** A pixel-art circle (drawn row by row, so the edge is stepped). */
export function Disc({
  cx,
  cy,
  r,
  c,
  className,
}: {
  cx: number
  cy: number
  r: number
  c: string
  className?: string
}) {
  const rows = []
  for (let dy = -r; dy < r; dy++) {
    const half = Math.round(Math.sqrt(r * r - (dy + 0.5) * (dy + 0.5)))
    if (half > 0)
      rows.push(
        <rect
          key={dy}
          x={cx - half}
          y={cy + dy}
          width={half * 2}
          height={1}
          fill={c}
        />,
      )
  }
  return <g className={className}>{rows}</g>
}

type HillProps = {
  cx: number // middle of the hill
  base: number // y of the bottom edge
  halfWidth: number
  height: number
  c: string
  shape?: "round" | "peak" // round hill or pointy mountain
  step?: number // bigger steps look chunkier
}

/** A hill or mountain built from stacked strips, for that stepped 8-bit edge. */
export function Hill({
  cx,
  base,
  halfWidth,
  height,
  c,
  shape = "round",
  step = 2,
}: HillProps) {
  const rows = []
  for (let y = 0; y < height; y += step) {
    const t = (y + step) / height // 0 at the top → 1 at the bottom
    const half = Math.round(halfWidth * (shape === "round" ? Math.sqrt(t) : t))
    rows.push(
      <rect
        key={y}
        x={cx - half}
        y={base - height + y}
        width={half * 2}
        height={step}
        fill={c}
      />,
    )
  }
  return <g>{rows}</g>
}

/** Horizontal colour bands from top to bottom — the classic retro sky. */
export function Bands({
  y = 0,
  bands,
}: {
  y?: number
  bands: [color: string, height: number][]
}) {
  let top = y
  return (
    <g>
      {bands.map(([color, height], i) => {
        const rect = (
          <rect
            key={i}
            x={0}
            y={top}
            width={SCENE_WIDTH}
            height={height}
            fill={color}
          />
        )
        top += height
        return rect
      })}
    </g>
  )
}

// ─── Repeating patterns ──────────────────────────────────────────────────────

type PatternProps = { x: number; y: number; w: number; h: number }

/** A checkerboard of two colours — used to blend bands like old games did. */
export function Dither({
  x,
  y,
  w,
  h,
  a,
  b,
}: PatternProps & { a: string; b: string }) {
  const id = usePatternId()
  return (
    <g>
      <defs>
        <pattern id={id} width={2} height={2} patternUnits="userSpaceOnUse">
          <rect width={2} height={2} fill={a} />
          <rect width={1} height={1} fill={b} />
          <rect x={1} y={1} width={1} height={1} fill={b} />
        </pattern>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} />
    </g>
  )
}

/** Vertical stripes, e.g. wallpaper. */
export function Stripes({
  x,
  y,
  w,
  h,
  base,
  stripe,
  every,
  width = 1,
}: PatternProps & {
  base: string
  stripe: string
  every: number
  width?: number
}) {
  const id = usePatternId()
  return (
    <g>
      <defs>
        <pattern id={id} width={every} height={1} patternUnits="userSpaceOnUse">
          <rect width={every} height={1} fill={base} />
          <rect width={width} height={1} fill={stripe} />
        </pattern>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} />
    </g>
  )
}

/** A grid of tiles with grout lines, e.g. a kitchen splashback. */
export function Tiles({
  x,
  y,
  w,
  h,
  tile,
  grout,
  size,
}: PatternProps & { tile: string; grout: string; size: number }) {
  const id = usePatternId()
  return (
    <g>
      <defs>
        <pattern
          id={id}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <rect width={size} height={size} fill={grout} />
          <rect width={size - 1} height={size - 1} fill={tile} />
        </pattern>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} />
    </g>
  )
}

function usePatternId() {
  return "p" + useId().replace(/[^a-zA-Z0-9]/g, "")
}

// Sprites (pixel art drawn with letters) live in components/Sprite.tsx.
export { Sprite } from "../components/Sprite"
