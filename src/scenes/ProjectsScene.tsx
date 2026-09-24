import { c } from "./colors"
import { PixelScene, Rect } from "./pixel"
import { BigPlant, FLOOR_Y, Room, Rug, SmallPlant, Window } from "./props"

// Chapter 3 — the design studio: a corkboard of app wireframes, colour
// swatches, an easel with a sunset painting, a hanging plant and a shelf
// of paint pots.

const SWATCHES = [c.rose, c.pink, c.honey, c.leaf, c.teal, c.lilac]
const PAINT_POTS = [c.rose, c.honey, c.teal, c.lilac]

export function ProjectsScene() {
  return (
    <PixelScene>
      <Room wall={c.peach} stripe={c.peachShade} panel={c.sandShade} />

      <Window x={20} y={20} w={46} h={50} sky="day" />
      <WireframeBoard />

      {/* Colour swatch cards */}
      {SWATCHES.map((color, i) => (
        <g key={color}>
          <Rect x={232 + i * 11} y={24} w={9} h={14} c={c.white} />
          <Rect x={233 + i * 11} y={25} w={7} h={8} c={color} />
        </g>
      ))}

      {/* Shelf with paint pots and a plant */}
      <Rect x={232} y={62} w={66} h={3} c={c.woodLight} />
      <Rect x={232} y={65} w={66} h={1} c={c.woodDeep} />
      {PAINT_POTS.map((color, i) => (
        <g key={color}>
          <Rect x={236 + i * 10} y={54} w={7} h={8} c={c.white} />
          <Rect x={236 + i * 10} y={54} w={7} h={3} c={color} />
        </g>
      ))}
      <SmallPlant x={282} y={52} />

      <HangingPlant x={124} />
      <Rug cx={200} y={136} halfWidth={50} color={c.skyLight} border={c.teal} />
      <Easel />
      <BigPlant x={266} y={FLOOR_Y - 19} />
    </PixelScene>
  )
}

/** A corkboard pinned with three app wireframes. */
function WireframeBoard() {
  const papers = [
    [148, c.pink],
    [172, c.leafLight],
    [196, c.honey],
  ] as const
  return (
    <g>
      <Rect x={142} y={22} w={80} h={50} c={c.woodDeep} />
      <Rect x={144} y={24} w={76} h={46} c="#d8b07a" />
      {papers.map(([x, color]) => (
        <g key={x}>
          <Rect x={x} y={28} w={20} h={38} c={c.white} />
          <Rect x={x + 8} y={27} w={3} h={3} c={c.rose} />
          <Rect x={x + 2} y={32} w={12} h={2} c={c.outline} opacity={0.3} />
          <Rect x={x + 2} y={36} w={16} h={12} c={color} />
          <Rect x={x + 2} y={50} w={16} h={1} c={c.outline} opacity={0.25} />
          <Rect x={x + 2} y={53} w={10} h={1} c={c.outline} opacity={0.25} />
          <Rect x={x + 2} y={58} w={9} h={4} c={c.rose} />
        </g>
      ))}
    </g>
  )
}

function HangingPlant({ x }: { x: number }) {
  return (
    <g className="sway">
      <Rect x={x + 7} y={3} w={1} h={28} c={c.woodDeep} />
      <Rect x={x + 2} y={31} w={11} h={7} c={c.white} />
      <Rect x={x + 3} y={36} w={9} h={2} c={c.creamShade} />
      <Rect x={x} y={27} w={15} h={4} c={c.leaf} />
      <Rect x={x - 2} y={30} w={4} h={10} c={c.leafDark} />
      <Rect x={x + 13} y={30} w={3} h={14} c={c.leaf} />
      <Rect x={x + 1} y={25} w={5} h={2} c={c.leafLight} />
    </g>
  )
}

/** A wooden easel holding a sunset painting. */
function Easel() {
  return (
    <g>
      {/* Legs */}
      <Rect x={194} y={64} w={3} h={64} c={c.woodDark} />
      <Rect x={214} y={64} w={3} h={64} c={c.woodDark} />
      <Rect x={204} y={58} w={3} h={70} c={c.wood} />
      {/* Canvas */}
      <Rect x={184} y={66} w={42} h={32} c={c.woodDeep} />
      <Rect x={186} y={68} w={38} h={28} c={c.dusk6} />
      <Rect x={186} y={68} w={38} h={8} c={c.dusk4} />
      <Rect x={186} y={76} w={38} h={6} c={c.dusk5} />
      <Rect x={200} y={80} w={10} h={6} c={c.glow} />
      <Rect x={186} y={86} w={38} h={10} c={c.leaf} />
      {/* Ledge */}
      <Rect x={182} y={98} w={46} h={3} c={c.woodDark} />
      {/* Stool with a paint palette */}
      <Rect x={236} y={112} w={20} h={3} c={c.woodLight} />
      <Rect x={238} y={115} w={2} h={13} c={c.woodDark} />
      <Rect x={252} y={115} w={2} h={13} c={c.woodDark} />
      <Rect x={239} y={108} w={14} h={4} c={c.woodLight} />
      <Rect x={241} y={109} w={2} h={2} c={c.rose} />
      <Rect x={245} y={109} w={2} h={2} c={c.teal} />
      <Rect x={249} y={109} w={2} h={2} c={c.honey} />
    </g>
  )
}
