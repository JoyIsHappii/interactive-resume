import { c } from "./colors"
import { Bands, Dither, Hill, PixelScene, Rect } from "./pixel"
import { Flower, GrassTuft, Stars, Tree } from "./props"

// Title screen — Joy's little cabin in the hills at dusk: a banded sunset sky,
// purple mountains, big round trees, glowing windows and fireflies.

const STARS = [
  [12, 8],
  [40, 16],
  [66, 6],
  [96, 22],
  [128, 10],
  [190, 14],
  [226, 6],
  [252, 20],
  [284, 10],
  [306, 26],
  [150, 30],
  [20, 34],
]
const FIREFLIES = [
  [60, 118],
  [104, 132],
  [218, 124],
  [262, 138],
  [34, 146],
  [292, 150],
]
const TUFTS = [
  [20, 150],
  [58, 162],
  [96, 146],
  [140, 170],
  [186, 154],
  [230, 166],
  [270, 148],
  [300, 164],
]

export function TitleScene() {
  return (
    <PixelScene showAvatar={false} focus={0.5}>
      {/* Sky: bands from night-blue down to warm peach, blended with dithering */}
      <Bands
        bands={[
          [c.night, 22],
          [c.dusk1, 14],
          [c.dusk2, 12],
          [c.dusk3, 10],
          [c.dusk4, 10],
          [c.dusk5, 10],
          [c.dusk6, 10],
          [c.dusk7, 92],
        ]}
      />
      <Dither x={0} y={22} w={320} h={2} a={c.night} b={c.dusk1} />
      <Dither x={0} y={36} w={320} h={2} a={c.dusk1} b={c.dusk2} />
      <Dither x={0} y={48} w={320} h={2} a={c.dusk2} b={c.dusk3} />
      <Dither x={0} y={58} w={320} h={2} a={c.dusk3} b={c.dusk4} />
      <Dither x={0} y={68} w={320} h={2} a={c.dusk4} b={c.dusk5} />
      <Dither x={0} y={78} w={320} h={2} a={c.dusk5} b={c.dusk6} />
      <Stars points={STARS} />

      {/* Moon */}
      <Rect x={262} y={30} w={8} h={10} c={c.glow} />
      <Rect x={260} y={32} w={12} h={6} c={c.glow} />
      <Rect x={266} y={32} w={4} h={4} c={c.white} opacity={0.5} />

      {/* Mountains, far then near */}
      <Hill
        cx={40}
        base={110}
        halfWidth={70}
        height={46}
        c={c.mountainFar}
        shape="peak"
      />
      <Hill
        cx={250}
        base={110}
        halfWidth={90}
        height={52}
        c={c.mountainFar}
        shape="peak"
      />
      <Hill
        cx={150}
        base={112}
        halfWidth={80}
        height={36}
        c={c.mountain}
        shape="peak"
      />
      <Hill
        cx={300}
        base={116}
        halfWidth={60}
        height={34}
        c={c.mountain}
        shape="peak"
      />

      {/* Rolling green hills */}
      <Hill cx={60} base={180} halfWidth={140} height={80} c={c.grass} />
      <Hill cx={270} base={180} halfWidth={130} height={74} c={c.grassDark} />
      <Rect x={0} y={130} w={320} h={50} c={c.grass} />
      <Dither x={0} y={128} w={320} h={2} a={c.grass} b={c.grassLight} />

      <Cabin />
      <Tree x={40} base={128} />
      <Tree x={282} base={130} size={1.1} />
      <Tree x={236} base={112} size={0.6} />

      {/* Stone steps down to the meadow */}
      {[0, 1, 2].map((i) => (
        <Rect
          key={i}
          x={150 - i * 2}
          y={102 + i * 5}
          w={20 + i * 4}
          h={4}
          c={i % 2 ? c.mountainFar : "#9a8cc0"}
        />
      ))}

      {TUFTS.map(([x, y], i) => (
        <GrassTuft key={i} x={x} y={y} />
      ))}
      <Flower x={116} y={112} color={c.pink} />
      <Flower x={196} y={116} color={c.white} />
      <Flower x={206} y={120} color={c.honey} />

      {/* Fireflies */}
      {FIREFLIES.map(([x, y], i) => (
        <Rect
          key={i}
          x={x}
          y={y}
          w={2}
          h={2}
          c="#fff6a8"
          className={`firefly twinkle-${i % 3}`}
        />
      ))}
    </PixelScene>
  )
}

function Cabin() {
  return (
    <g>
      {/* Stone base */}
      <Rect x={124} y={96} w={72} h={6} c="#8f82b5" />
      <Rect x={124} y={96} w={72} h={1} c="#b2a6d6" />
      {/* Chimney with a puff of smoke */}
      <Rect x={178} y={50} w={8} h={16} c={c.woodDeep} />
      <Rect
        x={179}
        y={40}
        w={3}
        h={3}
        c={c.white}
        opacity={0.5}
        className="smoke"
      />
      {/* Stepped roof with striped edge */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Rect
          key={i}
          x={146 - i * 4}
          y={52 + i * 3}
          w={28 + i * 8}
          h={3}
          c={i % 2 ? c.roseDark : c.rose}
        />
      ))}
      {/* Log walls */}
      <Rect x={128} y={73} w={64} h={23} c={c.woodDark} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Rect key={i} x={128} y={75 + i * 4} w={64} h={1} c={c.woodDeep} />
      ))}
      {/* Door */}
      <Rect x={154} y={80} w={12} h={16} c={c.woodDeep} />
      <Rect x={155} y={81} w={10} h={15} c="#6e4a8a" />
      <Rect x={162} y={88} w={2} h={2} c={c.honey} />
      {/* Glowing windows */}
      {[134, 174].map((x) => (
        <g key={x} className="lamp-flicker">
          <Rect x={x - 2} y={77} w={16} h={14} c={c.glowSoft} />
          <Rect x={x} y={79} w={12} h={10} c={c.woodDeep} />
          <Rect x={x + 1} y={80} w={10} h={8} c={c.glow} />
          <Rect x={x + 5} y={80} w={1} h={8} c={c.woodDeep} />
        </g>
      ))}
      {/* Lantern by the door */}
      <Rect x={148} y={80} w={3} h={4} c={c.honey} className="lamp-flicker" />
    </g>
  )
}
