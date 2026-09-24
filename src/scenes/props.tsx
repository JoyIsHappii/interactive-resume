// Furniture and decorations shared by the scenes: the room shell, windows,
// curtains, plants, a sleeping cat, bookshelves, lamps, trees and more.
// All sizes are in game pixels (the scene is 320 × 180).

import { useId, type ReactNode } from "react"
import { c } from "./colors"
import { Disc, Rect, Sprite, Stripes } from "./pixel"

/** The y position where walls meet the floor in every indoor room. */
export const FLOOR_Y = 128

// ─── Room shell: wallpaper, panelling and a wooden floor ─────────────────────

type RoomProps = {
  wall: string // wallpaper colour
  stripe: string // wallpaper stripe colour
  panel: string // colour of the wooden panels on the lower wall
  children?: ReactNode
}

export function Room({ wall, stripe, panel, children }: RoomProps) {
  return (
    <g>
      {/* Wallpaper */}
      <Stripes
        x={0}
        y={0}
        w={320}
        h={110}
        base={wall}
        stripe={stripe}
        every={12}
        width={2}
      />
      <Rect x={0} y={0} w={320} h={3} c={c.woodDark} />

      {/* Chair rail, panelling and skirting board */}
      <Rect x={0} y={108} w={320} h={3} c={c.woodLight} />
      <Rect x={0} y={111} w={320} h={1} c={c.woodDark} />
      <Stripes
        x={0}
        y={112}
        w={320}
        h={14}
        base={panel}
        stripe={c.woodDark}
        every={24}
      />
      <Rect x={0} y={112} w={320} h={1} c={c.white} opacity={0.35} />
      <Rect x={0} y={126} w={320} h={2} c={c.woodDeep} />

      <WoodFloor />
      {children}
    </g>
  )
}

function WoodFloor() {
  const planks = []
  for (let row = 0; row < 11; row++) {
    const y = FLOOR_Y + row * 5
    planks.push(
      <Rect
        key={`p${row}`}
        x={0}
        y={y}
        w={320}
        h={4}
        c={row % 2 ? "#cfa06e" : "#d8ad7c"}
      />,
    )
    planks.push(
      <Rect key={`s${row}`} x={0} y={y + 4} w={320} h={1} c="#a8784c" />,
    )
    // Joins between planks, staggered on each row
    for (let x = (row * 37) % 60; x < 320; x += 60) {
      planks.push(
        <Rect key={`j${row}-${x}`} x={x} y={y} w={1} h={4} c="#b98a5a" />,
      )
    }
  }
  return <g>{planks}</g>
}

// ─── Windows and curtains ────────────────────────────────────────────────────

type Sky = "day" | "sunset" | "night"

type WindowProps = { x: number; y: number; w: number; h: number; sky: Sky }

export function Window({ x, y, w, h, sky }: WindowProps) {
  const clipId = "w" + useId().replace(/[^a-zA-Z0-9]/g, "")
  const gx = x + 3
  const gy = y + 3
  const gw = w - 6
  const gh = h - 6

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={gx} y={gy} width={gw} height={gh} />
        </clipPath>
      </defs>

      {/* Frame */}
      <Rect x={x - 1} y={y - 1} w={w + 2} h={h + 2} c={c.woodDeep} />
      <Rect x={x} y={y} w={w} h={h} c={c.woodLight} />

      {/* Sky seen through the glass */}
      <g clipPath={`url(#${clipId})`}>
        {sky === "day" && (
          <>
            <Rect x={gx} y={gy} w={gw} h={gh} c={c.skyPale} />
            <Rect
              x={gx}
              y={gy}
              w={gw}
              h={Math.round(gh * 0.65)}
              c={c.skyLight}
            />
            <Rect x={gx} y={gy} w={gw} h={Math.round(gh * 0.35)} c={c.sky} />
            <Cloud x={gx + 6} y={gy + 8} />
            <Cloud x={gx + gw - 30} y={gy + gh * 0.45} />
          </>
        )}
        {sky === "sunset" && (
          <>
            <Rect x={gx} y={gy} w={gw} h={gh} c={c.dusk7} />
            <Rect x={gx} y={gy} w={gw} h={Math.round(gh * 0.75)} c={c.dusk6} />
            <Rect x={gx} y={gy} w={gw} h={Math.round(gh * 0.5)} c={c.dusk5} />
            <Rect x={gx} y={gy} w={gw} h={Math.round(gh * 0.25)} c={c.dusk4} />
            <Disc cx={gx + gw * 0.6} cy={gy + gh} r={10} c={c.glow} />
          </>
        )}
        {sky === "night" && (
          <>
            <Rect x={gx} y={gy} w={gw} h={gh} c={c.dusk1} />
            <Rect x={gx} y={gy} w={gw} h={Math.round(gh * 0.5)} c={c.night} />
            <Disc cx={gx + gw - 10} cy={gy + 9} r={5} c={c.glow} />
          </>
        )}

        {/* Glass shine */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Rect
            key={i}
            x={gx + 6 + i * 2}
            y={gy + gh - 8 - i * 3}
            w={2}
            h={3}
            c={c.white}
            opacity={0.35}
          />
        ))}
      </g>

      {/* Window bars */}
      <Rect x={x + Math.floor(w / 2) - 1} y={y} w={2} h={h} c={c.woodLight} />
      <Rect x={x} y={y + Math.floor(h / 2) - 1} w={w} h={2} c={c.woodLight} />

      {/* Sill */}
      <Rect x={x - 4} y={y + h} w={w + 8} h={3} c={c.woodLight} />
      <Rect x={x - 4} y={y + h + 3} w={w + 8} h={1} c={c.woodDeep} />
    </g>
  )
}

type CurtainsProps = {
  x: number
  y: number
  w: number
  h: number
  color: string
  shade: string
}

/** A pair of curtains hanging either side of a window at (x, y, w, h). */
export function Curtains({ x, y, w, h, color, shade }: CurtainsProps) {
  const drop = h + 10
  return (
    <g>
      <Rect x={x - 12} y={y - 5} w={w + 24} h={2} c={c.woodDeep} />
      {[x - 10, x + w - 2].map((left) => (
        <g key={left}>
          <Rect x={left} y={y - 3} w={12} h={drop} c={color} />
          <Rect x={left + 3} y={y - 3} w={1} h={drop} c={shade} />
          <Rect x={left + 8} y={y - 3} w={1} h={drop} c={shade} />
          {/* Tie-back */}
          <Rect x={left} y={y + h * 0.55} w={12} h={2} c={shade} />
        </g>
      ))}
    </g>
  )
}

// ─── Sprites ─────────────────────────────────────────────────────────────────

// prettier-ignore
const CLOUD = [
  '..........WWWWW.............',
  '.......WWWWWWWWWW...........',
  '......WWWWWWWWWWWWW..WWWW...',
  '...WWWWWWWWWWWWWWWWWWWWWWWW.',
  '..WWWWWWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWW',
  'SSSSSSSSSSSSSSSSSSSSSSSSSSSS',
  '.SSSSSSSSSSSSSSSSSSSSSSSSSS.',
]

export function Cloud({ x, y }: { x: number; y: number }) {
  return (
    <Sprite x={x} y={y} rows={CLOUD} colors={{ W: c.white, S: c.cloudShade }} />
  )
}

const PLANT_COLORS = {
  L: c.leafLight,
  G: c.leaf,
  D: c.leafDark,
  O: c.woodDeep,
  P: c.orange,
  p: "#c8683a",
  H: "#f7a878",
}

// prettier-ignore
const BIG_PLANT = [
  '......DD........',
  '....DDGGD..DD...',
  '...DGGLGGDDGGD..',
  '..DGGLLGGDGLGGD.',
  '.DGGLGGGDGGLLGGD',
  '.DGLGGGDGGGGLGGD',
  'DGGGGDDGGDGGGGD.',
  'DGLGGD.DGGDGGLGD',
  '.DGGD..DGLLGD.D.',
  '..DD..DGGGGD....',
  '.....DDGDDGD....',
  '....D..DD..DD...',
  '...OOOOOOOOOO...',
  '...OPHPPPPPpO...',
  '...OPHPPPPPpO...',
  '....OPPPPPpO....',
  '....OPPPPPpO....',
  '.....OPPPpO.....',
  '.....OOOOOO.....',
]

// prettier-ignore
const SMALL_PLANT = [
  '..G..G..',
  '.GLG.LG.',
  'GLGDGLGD',
  '.DGGGGD.',
  '..DDDD..',
  '.OOOOOO.',
  '.OPHPpO.',
  '.OPPPpO.',
  '..OPpO..',
  '..OOOO..',
]

/** A leafy potted plant. `x, y` is its top-left corner. */
export function BigPlant({ x, y }: { x: number; y: number }) {
  return <Sprite x={x} y={y} rows={BIG_PLANT} colors={PLANT_COLORS} />
}

export function SmallPlant({ x, y }: { x: number; y: number }) {
  return <Sprite x={x} y={y} rows={SMALL_PLANT} colors={PLANT_COLORS} />
}

// prettier-ignore
const CAT = [
  '..............O...O...',
  '.............OGO.OGO..',
  '......OOOOOOOOGGOGGGO.',
  '....OOWWWWWWWGGGGGGGGO',
  '...OWWWWBBWWWWWGOGGOGO',
  '..OWWWWBBBWWWWWGGGGGPO',
  '.OWWWWWWWWWWWWWWWWWWO.',
  'OGGOWWWWWWWWWWWWWWWO..',
  'OGGOOOOOOOOOOOOOOOO...',
  '.OO...................',
]

/** A calico cat, fast asleep (it breathes slowly). */
export function SleepingCat({ x, y }: { x: number; y: number }) {
  return (
    <Sprite
      x={x}
      y={y}
      rows={CAT}
      colors={{
        O: c.outline,
        W: c.white,
        G: c.orange,
        B: "#6b4a3a",
        P: c.pink,
      }}
      className="cat-breathe"
    />
  )
}

// prettier-ignore
const TUFT = [
  '.G...G.',
  '.GL.LG.',
  'GLGLGLG',
]

export function GrassTuft({ x, y }: { x: number; y: number }) {
  return (
    <Sprite
      x={x}
      y={y}
      rows={TUFT}
      colors={{ G: c.grassDark, L: c.grassLight }}
    />
  )
}

// prettier-ignore
const FLOWER = [
  '.P.',
  'PYP',
  '.P.',
  '.G.',
  'GG.',
  '.G.',
]

export function Flower({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <Sprite
      x={x}
      y={y}
      rows={FLOWER}
      colors={{ P: color, Y: c.honey, G: c.leafDark }}
    />
  )
}

// ─── Furniture ───────────────────────────────────────────────────────────────

/** A standing lamp. `x` is the pole; it stands on the floor. */
export function FloorLamp({ x }: { x: number }) {
  return (
    <g>
      <Glow cx={x + 1} cy={82} r={18} />
      {/* Shade */}
      {[8, 10, 12, 14].map((width, i) => (
        <Rect
          key={i}
          x={x + 1 - width / 2}
          y={72 + i * 3}
          w={width}
          h={3}
          c={i === 3 ? c.honeyDark : c.honey}
        />
      ))}
      <Rect x={x} y={84} w={2} h={FLOOR_Y - 84} c={c.woodDeep} />
      <Rect x={x - 4} y={FLOOR_Y - 2} w={10} h={2} c={c.woodDeep} />
    </g>
  )
}

/** A soft pool of lamp light. */
export function Glow({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g className="lamp-flicker">
      <Disc cx={cx} cy={cy} r={r} c={c.glowSoft} />
    </g>
  )
}

const BOOK_COLORS = [
  c.rose,
  c.leaf,
  c.honey,
  c.teal,
  c.orange,
  c.lilac,
  c.pink,
  "#6d8fd1",
]

/** A bookshelf full of books, standing with its top-left corner at (x, y). */
export function Bookshelf({
  x,
  y,
  w,
  h,
}: {
  x: number
  y: number
  w: number
  h: number
}) {
  const shelfHeight = 22
  const shelves = Math.floor((h - 4) / shelfHeight)
  const parts: ReactNode[] = []

  for (let s = 0; s < shelves; s++) {
    const bottom = y + 3 + (s + 1) * shelfHeight
    let bx = x + 4
    let i = s * 3
    while (bx < x + w - 7) {
      const width = 3 + ((i * 7) % 3)
      const height = 13 + ((i * 5) % 6)
      const color = BOOK_COLORS[i % BOOK_COLORS.length]
      parts.push(
        <Rect
          key={`${s}-${i}`}
          x={bx}
          y={bottom - height}
          w={width}
          h={height}
          c={color}
        />,
      )
      parts.push(
        <Rect
          key={`${s}-${i}b`}
          x={bx}
          y={bottom - height + 3}
          w={width}
          h={1}
          c={c.white}
          opacity={0.4}
        />,
      )
      bx += width + 1
      i++
      if (i % 9 === 4) bx += 6 // a little gap now and then
    }
    parts.push(
      <Rect
        key={`shelf${s}`}
        x={x + 2}
        y={bottom}
        w={w - 4}
        h={3}
        c={c.woodLight}
      />,
    )
  }

  return (
    <g>
      <Rect x={x} y={y} w={w} h={h} c={c.woodDeep} />
      <Rect x={x + 2} y={y + 2} w={w - 4} h={h - 2} c={c.woodDark} />
      {parts}
    </g>
  )
}

/** A picture frame on the wall; put the picture inside as children. */
export function Frame({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number
  y: number
  w: number
  h: number
  children?: ReactNode
}) {
  return (
    <g>
      <Rect x={x} y={y} w={w} h={h} c={c.woodDeep} />
      <Rect x={x + 1} y={y + 1} w={w - 2} h={h - 2} c={c.woodLight} />
      <Rect x={x + 3} y={y + 3} w={w - 6} h={h - 6} c={c.white} />
      {children}
    </g>
  )
}

/** An oval rug lying on the floor. */
export function Rug({
  cx,
  y,
  halfWidth,
  color,
  border,
}: {
  cx: number
  y: number
  halfWidth: number
  color: string
  border: string
}) {
  const rows = [0.7, 0.9, 1, 1, 0.9, 0.7]
  return (
    <g>
      {rows.map((scale, i) => {
        const half = Math.round(halfWidth * scale)
        return (
          <g key={i}>
            <Rect x={cx - half} y={y + i * 2} w={half * 2} h={2} c={border} />
            {i > 0 && i < rows.length - 1 && (
              <Rect
                x={cx - half + 4}
                y={y + i * 2}
                w={half * 2 - 8}
                h={2}
                c={color}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}

// ─── Outdoors ────────────────────────────────────────────────────────────────

/** A big round-topped tree standing on `base`. */
export function Tree({
  x,
  base,
  size = 1,
}: {
  x: number
  base: number
  size?: number
}) {
  const s = (n: number) => Math.round(n * size)
  const clusters = [
    [0, -62, 18],
    [-15, -50, 13],
    [15, -52, 14],
    [-8, -76, 12],
    [10, -78, 11],
  ]

  return (
    <g>
      {/* Trunk and branches */}
      <Rect x={x - s(3)} y={base - s(56)} w={s(7)} h={s(56)} c={c.woodDark} />
      <Rect x={x - s(3)} y={base - s(56)} w={s(2)} h={s(56)} c={c.wood} />
      <Rect x={x - s(6)} y={base - 3} w={s(13)} h={3} c={c.woodDark} />

      {/* Leaves: dark underneath, lighter on top-left where the sun hits */}
      {clusters.map(([dx, dy, r], i) => (
        <Disc
          key={`d${i}`}
          cx={x + s(dx)}
          cy={base + s(dy)}
          r={s(r)}
          c={c.leafDeep}
        />
      ))}
      {clusters.map(([dx, dy, r], i) => (
        <Disc
          key={`m${i}`}
          cx={x + s(dx) - 1}
          cy={base + s(dy) - 2}
          r={s(r) - 2}
          c={c.leaf}
        />
      ))}
      {clusters.map(([dx, dy, r], i) => (
        <Disc
          key={`l${i}`}
          cx={x + s(dx) - s(r * 0.35)}
          cy={base + s(dy) - s(r * 0.4)}
          r={Math.max(2, s(r * 0.3))}
          c={c.leafLight}
        />
      ))}
    </g>
  )
}

/** Tiny twinkling stars at the given [x, y] positions. */
export function Stars({ points }: { points: number[][] }) {
  return (
    <g>
      {points.map(([x, y], i) => (
        <Rect
          key={i}
          x={x}
          y={y}
          w={1}
          h={1}
          c={c.white}
          className={`twinkle twinkle-${i % 3}`}
        />
      ))}
    </g>
  )
}
