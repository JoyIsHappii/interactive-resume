import { c } from "./colors"
import { PixelScene, Rect } from "./pixel"
import {
  BigPlant,
  Curtains,
  FLOOR_Y,
  FloorLamp,
  Frame,
  Room,
  Rug,
  SleepingCat,
  SmallPlant,
  Window,
} from "./props"

// Chapter 1 — the living room: a sunny window with pink curtains, family
// photos, a green sofa with a cat curled up on it and a warm floor lamp.

export function IntroScene() {
  return (
    <PixelScene>
      <Room wall={c.mint} stripe={c.mintShade} panel={c.sandShade} />

      <Window x={150} y={20} w={76} h={60} sky="day" />
      <Curtains x={150} y={20} w={76} h={60} color={c.pink} shade={c.rose} />
      <SmallPlant x={156} y={70} />
      <SmallPlant x={208} y={70} />

      {/* Photos on the wall */}
      <Frame x={22} y={28} w={24} h={18}>
        <Rect x={25} y={31} w={18} h={7} c={c.sky} />
        <Rect x={25} y={38} w={18} h={5} c={c.leaf} />
      </Frame>
      <Frame x={50} y={22} w={16} h={22}>
        <Rect x={53} y={25} w={10} h={16} c={c.pink} />
        <Rect x={56} y={29} w={4} h={4} c={c.honey} />
      </Frame>
      <Frame x={34} y={52} w={14} h={14}>
        <Rect x={37} y={55} w={8} h={8} c={c.teal} />
      </Frame>

      <Rug cx={120} y={136} halfWidth={44} color={c.honey} border={c.orange} />
      <FloorLamp x={136} />
      <SideTable />
      <Sofa />
      <SleepingCat x={248} y={96} />
      <BigPlant x={14} y={FLOOR_Y - 19} />
    </PixelScene>
  )
}

function Sofa() {
  return (
    <g>
      {/* Back */}
      <Rect x={232} y={92} w={60} h={16} c={c.leafDark} />
      <Rect x={234} y={93} w={56} h={14} c={c.leaf} />
      {/* Cushions */}
      <Rect x={236} y={97} w={10} h={9} c={c.pink} />
      <Rect x={278} y={97} w={10} h={9} c={c.honey} />
      {/* Seat */}
      <Rect x={226} y={106} w={72} h={16} c={c.leafDark} />
      <Rect x={228} y={107} w={68} h={6} c={c.leafLight} />
      <Rect x={228} y={113} w={68} h={8} c={c.leaf} />
      {/* Arms */}
      <Rect x={222} y={100} w={10} h={22} c={c.leafDark} />
      <Rect x={223} y={101} w={8} h={4} c={c.leafLight} />
      <Rect x={292} y={100} w={10} h={22} c={c.leafDark} />
      <Rect x={293} y={101} w={8} h={4} c={c.leafLight} />
      {/* Legs */}
      <Rect x={226} y={122} w={3} h={6} c={c.woodDeep} />
      <Rect x={295} y={122} w={3} h={6} c={c.woodDeep} />
    </g>
  )
}

function SideTable() {
  return (
    <g>
      <Rect x={198} y={106} w={20} h={3} c={c.woodLight} />
      <Rect x={200} y={109} w={2} h={19} c={c.woodDark} />
      <Rect x={214} y={109} w={2} h={19} c={c.woodDark} />
      {/* Mug and a book */}
      <Rect x={202} y={101} w={5} h={5} c={c.white} />
      <Rect x={207} y={102} w={1} h={3} c={c.white} />
      <Rect x={210} y={103} w={7} h={3} c={c.teal} />
    </g>
  )
}
