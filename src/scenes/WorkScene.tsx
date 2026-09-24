import { c } from "./colors"
import { PixelScene, Rect } from "./pixel"
import {
  BigPlant,
  FLOOR_Y,
  Glow,
  Room,
  SleepingCat,
  SmallPlant,
  Window,
} from "./props"

// Chapter 2 — the home office: a wide window full of sky, a desk covered in
// lofi clutter (computer, lamp, sketches, tea), a mood board and a cat on
// the windowsill.

const STICKY_NOTES = [
  [24, 34, c.pink],
  [36, 32, c.honey],
  [48, 35, c.leafLight],
  [28, 48, c.skyLight],
  [42, 47, c.peach],
] as const

export function WorkScene() {
  return (
    <PixelScene>
      <Room wall={c.cream} stripe={c.creamShade} panel={c.sandShade} />

      <Window x={140} y={14} w={150} h={70} sky="day" />
      <SleepingCat x={246} y={74} />
      <SmallPlant x={150} y={74} />

      {/* Mood board */}
      <Rect x={20} y={28} w={44} h={34} c={c.woodDeep} />
      <Rect x={21} y={29} w={42} h={32} c="#d8b07a" />
      {STICKY_NOTES.map(([x, y, color], i) => (
        <g key={i}>
          <Rect x={x} y={y} w={10} h={10} c={color} />
          <Rect x={x + 4} y={y + 1} w={2} h={2} c={c.rose} />
          <Rect x={x + 2} y={y + 5} w={6} h={1} c={c.outline} opacity={0.25} />
        </g>
      ))}

      {/* Wall clock */}
      <Rect x={104} y={22} w={14} h={14} c={c.woodDeep} />
      <Rect x={105} y={23} w={12} h={12} c={c.white} />
      <Rect x={110} y={25} w={2} h={5} c={c.outline} />
      <Rect x={110} y={29} w={4} h={2} c={c.outline} />

      <Desk />
      <BigPlant x={10} y={FLOOR_Y - 19} />
    </PixelScene>
  )
}

function Desk() {
  return (
    <g>
      {/* Lamp with its warm glow */}
      <Glow cx={158} cy={82} r={22} />
      <Rect x={150} y={78} w={14} h={4} c={c.honey} />
      <Rect x={152} y={76} w={10} h={2} c={c.honeyDark} />
      <Rect x={162} y={80} w={2} h={10} c={c.woodDeep} />
      <Rect x={163} y={90} w={2} h={9} c={c.woodDeep} />
      <Rect x={159} y={98} w={10} h={2} c={c.woodDeep} />

      {/* Computer showing a design in progress */}
      <Rect x={186} y={70} w={44} h={30} c={c.outline} />
      <Rect x={188} y={72} w={40} h={24} c={c.white} />
      <Rect x={190} y={74} w={20} h={3} c={c.leaf} />
      <Rect x={190} y={79} w={11} h={14} c={c.pink} />
      <Rect x={203} y={79} w={11} h={14} c={c.skyLight} />
      <Rect x={216} y={79} w={10} h={14} c={c.honey} />
      <Rect x={200} y={96} w={16} h={4} c={c.outline} />

      {/* Keyboard, sketchbook, tea and books */}
      <Rect x={190} y={98} w={30} h={2} c="#e9e1d2" />
      <Rect x={234} y={95} w={18} h={5} c={c.white} />
      <Rect x={236} y={96} w={10} h={1} c={c.lilac} />
      <Rect x={258} y={93} w={6} h={7} c={c.white} />
      <Rect x={259} y={94} w={4} h={2} c={c.leaf} />
      <Rect x={264} y={95} w={2} h={3} c={c.white} />
      <Rect x={272} y={96} w={16} h={4} c={c.teal} />
      <Rect x={274} y={92} w={14} h={4} c={c.rose} />
      <Rect x={273} y={88} w={12} h={4} c={c.honey} />

      {/* Desk top, legs and drawers */}
      <Rect x={140} y={100} w={160} h={4} c={c.woodLight} />
      <Rect x={140} y={104} w={160} h={1} c={c.woodDeep} />
      <Rect x={144} y={105} w={4} h={23} c={c.woodDark} />
      <Rect x={262} y={105} w={34} h={23} c={c.woodDark} />
      <Rect x={264} y={108} w={30} h={8} c={c.wood} />
      <Rect x={264} y={118} w={30} h={8} c={c.wood} />
      <Rect x={277} y={111} w={4} h={2} c={c.honey} />
      <Rect x={277} y={121} w={4} h={2} c={c.honey} />
    </g>
  )
}
