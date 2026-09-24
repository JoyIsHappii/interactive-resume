import { c } from "./colors"
import { PixelScene, Rect, Tiles } from "./pixel"
import {
  BigPlant,
  Curtains,
  FLOOR_Y,
  Glow,
  Room,
  SmallPlant,
  Window,
} from "./props"

// Chapter 5 — the tea kitchen: a tiled splashback, a shelf of jars (each one
// a "power"), a counter with a whistling kettle and matcha bowls, and a
// pendant lamp.

const JARS = [c.leaf, c.pink, c.honey, c.teal, c.orange, c.lilac]

export function SkillsScene() {
  return (
    <PixelScene>
      <Room wall={c.lavender} stripe={c.lavenderShade} panel={c.sandShade} />

      <Window x={22} y={22} w={46} h={48} sky="day" />
      <Curtains
        x={22}
        y={22}
        w={46}
        h={48}
        color={c.honey}
        shade={c.honeyDark}
      />

      {/* Tiled splashback behind the counter */}
      <Tiles
        x={150}
        y={64}
        w={150}
        h={36}
        tile={c.white}
        grout={c.lavenderShade}
        size={6}
      />

      {/* Shelf of jars */}
      <Rect x={156} y={50} w={136} h={3} c={c.woodLight} />
      <Rect x={156} y={53} w={136} h={1} c={c.woodDeep} />
      {JARS.map((color, i) => (
        <g key={color}>
          <Rect x={162 + i * 18} y={36} w={12} h={14} c={c.outline} />
          <Rect x={163 + i * 18} y={37} w={10} h={12} c={c.skyPale} />
          <Rect x={163 + i * 18} y={42} w={10} h={7} c={color} />
          <Rect x={162 + i * 18} y={34} w={12} h={3} c={c.woodDark} />
          <Rect x={164 + i * 18} y={39} w={2} h={2} c={c.white} />
        </g>
      ))}

      {/* Pendant lamp */}
      <Rect x={222} y={3} w={1} h={18} c={c.outline} />
      <Rect x={216} y={21} w={13} h={4} c={c.teal} />
      <Rect x={214} y={25} w={17} h={2} c={c.tealDark} />
      <Glow cx={222} cy={32} r={20} />

      <Counter />
      <BigPlant x={128} y={FLOOR_Y - 19} />
    </PixelScene>
  )
}

function Counter() {
  return (
    <g>
      {/* Kettle with steam */}
      <Rect
        x={170}
        y={80}
        w={2}
        h={4}
        c={c.white}
        opacity={0.7}
        className="smoke"
      />
      <Rect x={164} y={86} w={18} h={14} c={c.roseDark} />
      <Rect x={165} y={87} w={16} h={12} c={c.rose} />
      <Rect x={169} y={83} w={8} h={3} c={c.outline} />
      <Rect x={181} y={90} w={5} h={2} c={c.roseDark} />
      <Rect x={166} y={88} w={3} h={3} c={c.white} opacity={0.5} />

      {/* Matcha bowls and a whisk */}
      {[200, 216].map((x) => (
        <g key={x}>
          <Rect x={x} y={94} w={12} h={6} c={c.white} />
          <Rect x={x + 1} y={94} w={10} h={2} c={c.leaf} />
          <Rect x={x + 2} y={100} w={8} h={1} c={c.creamShade} />
        </g>
      ))}
      <Rect x={234} y={92} w={4} h={8} c={c.woodLight} />

      {/* Teapot */}
      <Rect x={252} y={88} w={16} h={12} c={c.tealDark} />
      <Rect x={253} y={89} w={14} h={10} c={c.teal} />
      <Rect x={257} y={85} w={6} h={3} c={c.tealDark} />
      <Rect x={268} y={91} w={4} h={2} c={c.tealDark} />
      <SmallPlant x={280} y={90} />

      {/* Worktop and cupboards */}
      <Rect x={150} y={100} w={150} h={4} c={c.creamShade} />
      <Rect x={150} y={104} w={150} h={1} c={c.woodDeep} />
      <Rect x={150} y={105} w={150} h={23} c={c.leafDark} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Rect x={154 + i * 36} y={108} w={32} h={18} c={c.leaf} />
          <Rect x={168 + i * 36} y={110} w={4} h={2} c={c.honey} />
        </g>
      ))}
    </g>
  )
}
