import { c } from "./colors"
import { PixelScene, Rect } from "./pixel"
import {
  Bookshelf,
  Curtains,
  FloorLamp,
  Frame,
  Room,
  Rug,
  SleepingCat,
  Window,
} from "./props"

// Chapter 4 — the reading nook: tall bookshelves, a sunset window, a framed
// diploma, a cosy armchair (with the cat, of course) and a reading lamp.

export function EducationScene() {
  return (
    <PixelScene>
      <Room wall={c.sand} stripe={c.sandShade} panel="#c99a6a" />

      <Bookshelf x={8} y={20} w={58} h={108} />
      <Bookshelf x={258} y={20} w={54} h={108} />

      <Window x={150} y={22} w={60} h={56} sky="sunset" />
      <Curtains
        x={150}
        y={22}
        w={60}
        h={56}
        color={c.rose}
        shade={c.roseDark}
      />

      {/* Diploma */}
      <Frame x={110} y={30} w={24} h={18}>
        <Rect x={114} y={34} w={16} h={1} c={c.outline} opacity={0.4} />
        <Rect x={114} y={37} w={12} h={1} c={c.outline} opacity={0.4} />
        <Rect x={124} y={40} w={4} h={4} c={c.rose} />
      </Frame>

      <Rug
        cx={186}
        y={136}
        halfWidth={46}
        color={c.leafLight}
        border={c.leafDark}
      />

      {/* A pile of books on the floor */}
      <Rect x={140} y={122} w={18} h={6} c={c.teal} />
      <Rect x={142} y={117} w={15} h={5} c={c.rose} />
      <Rect x={141} y={113} w={13} h={4} c={c.honey} />

      <FloorLamp x={238} />
      <Armchair />
      <SleepingCat x={196} y={96} />
    </PixelScene>
  )
}

function Armchair() {
  const fabric = c.orange
  const dark = "#c0612e"
  return (
    <g>
      <Rect x={190} y={84} w={36} h={24} c={dark} />
      <Rect x={192} y={86} w={32} h={20} c={fabric} />
      <Rect x={186} y={104} w={44} h={18} c={dark} />
      <Rect x={188} y={105} w={40} h={5} c="#f6a36d" />
      <Rect x={188} y={110} w={40} h={11} c={fabric} />
      <Rect x={184} y={96} w={8} h={26} c={dark} />
      <Rect x={224} y={96} w={8} h={26} c={dark} />
      <Rect x={188} y={122} w={3} h={6} c={c.woodDeep} />
      <Rect x={225} y={122} w={3} h={6} c={c.woodDeep} />
    </g>
  )
}
