import { c } from "./colors"
import { Bands, Dither, Disc, Hill, PixelScene, Rect } from "./pixel"
import { BigPlant, Cloud, Flower, GrassTuft, SleepingCat } from "./props"

// Chapter 6 — the front garden at golden hour: the café-style front of the
// house with a striped awning, a picket fence, a mailbox with its flag up,
// flowers and a string of fairy lights.

const FLOWERS = [
  [8, c.pink],
  [16, c.honey],
  [26, c.white],
  [36, c.rose],
  [46, c.pink],
  [136, c.honey],
  [148, c.white],
] as const
const TUFTS = [
  [30, 150],
  [70, 164],
  [120, 146],
  [170, 160],
  [214, 150],
  [256, 166],
  [300, 152],
]
const LIGHTS = [8, 22, 36, 50, 64, 78, 92, 106, 120, 134, 148, 162, 176]

export function ContactScene() {
  return (
    <PixelScene>
      {/* Golden-hour sky */}
      <Bands
        bands={[
          [c.dusk3, 16],
          [c.dusk4, 16],
          [c.dusk5, 18],
          [c.dusk6, 20],
          [c.dusk7, 110],
        ]}
      />
      <Dither x={0} y={16} w={320} h={2} a={c.dusk3} b={c.dusk4} />
      <Dither x={0} y={32} w={320} h={2} a={c.dusk4} b={c.dusk5} />
      <Dither x={0} y={50} w={320} h={2} a={c.dusk5} b={c.dusk6} />
      <Dither x={0} y={70} w={320} h={2} a={c.dusk6} b={c.dusk7} />
      <Disc cx={120} cy={96} r={18} c={c.glow} />
      <Cloud x={24} y={30} />
      <Cloud x={150} y={20} />

      {/* Hills */}
      <Hill
        cx={60}
        base={114}
        halfWidth={110}
        height={34}
        c={c.mountainFar}
        shape="peak"
      />
      <Hill
        cx={200}
        base={114}
        halfWidth={90}
        height={24}
        c={c.mountain}
        shape="peak"
      />
      <Hill cx={90} base={128} halfWidth={130} height={30} c={c.grassLight} />
      <Rect x={0} y={114} w={320} h={14} c={c.grassLight} />

      <FairyLights />
      <HouseFront />
      <Fence />
      {FLOWERS.map(([x, color]) => (
        <Flower key={x} x={x} y={120} color={color} />
      ))}
      <Mailbox />

      {/* Lawn and stepping stones */}
      <Rect x={0} y={128} w={320} h={52} c={c.grass} />
      <Dither x={0} y={128} w={320} h={2} a={c.grass} b={c.grassDark} />
      {[0, 1, 2].map((i) => (
        <Rect
          key={i}
          x={236 - i * 10}
          y={134 + i * 12}
          w={16}
          h={5}
          c={c.creamShade}
        />
      ))}
      {TUFTS.map(([x, y], i) => (
        <GrassTuft key={i} x={x} y={y} />
      ))}
    </PixelScene>
  )
}

function HouseFront() {
  return (
    <g>
      {/* Wall with wooden siding */}
      <Rect x={196} y={48} w={124} h={80} c={c.cream} />
      {Array.from({ length: 13 }, (_, i) => (
        <Rect key={i} x={196} y={52 + i * 6} w={124} h={1} c={c.creamShade} />
      ))}
      <Rect x={196} y={48} w={2} h={80} c={c.woodDeep} />

      {/* Striped awning */}
      {Array.from({ length: 12 }, (_, i) => (
        <Rect
          key={i}
          x={192 + i * 11}
          y={40}
          w={11}
          h={10}
          c={i % 2 ? c.white : c.rose}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <Rect
          key={`s${i}`}
          x={193 + i * 11}
          y={50}
          w={9}
          h={3}
          c={i % 2 ? c.white : c.rose}
        />
      ))}
      <Rect x={192} y={38} w={128} h={2} c={c.woodDeep} />

      {/* Door with a round window */}
      <Rect x={214} y={78} w={26} h={50} c={c.woodDeep} />
      <Rect x={216} y={80} w={22} h={48} c={c.tealDark} />
      <Disc cx={227} cy={92} r={5} c={c.glow} />
      <Rect x={234} y={104} w={2} h={3} c={c.honey} />
      <Rect x={210} y={126} w={34} h={2} c="#9a8cc0" />

      {/* Glowing shop window with shelves */}
      <g className="lamp-flicker">
        <Rect x={250} y={64} w={60} h={40} c={c.woodDeep} />
        <Rect x={252} y={66} w={56} h={36} c={c.glow} />
      </g>
      <Rect x={252} y={82} w={56} h={2} c={c.woodDark} />
      <Rect x={256} y={76} w={6} h={6} c={c.leaf} />
      <Rect x={266} y={77} w={8} h={5} c={c.rose} />
      <Rect x={280} y={74} w={5} h={8} c={c.teal} />
      <Rect x={258} y={94} w={10} h={8} c={c.honeyDark} />
      <Rect x={274} y={96} w={12} h={6} c={c.white} />
      <Rect x={250} y={104} w={60} h={4} c={c.woodLight} />
      <SleepingCat x={260} y={94} />

      {/* Lantern */}
      <Rect x={244} y={68} w={4} h={6} c={c.honey} className="lamp-flicker" />
      <Rect x={244} y={66} w={4} h={2} c={c.outline} />

      {/* Potted plant by the door */}
      <BigPlant x={194} y={109} />
    </g>
  )
}

function Fence() {
  return (
    <g>
      <Rect x={0} y={110} w={196} h={2} c={c.white} />
      <Rect x={0} y={120} w={196} h={2} c={c.white} />
      {Array.from({ length: 25 }, (_, i) => (
        <g key={i}>
          <Rect x={i * 8 + 2} y={106} w={4} h={22} c={c.white} />
          <Rect x={i * 8 + 3} y={104} w={2} h={2} c={c.white} />
          <Rect x={i * 8 + 5} y={106} w={1} h={22} c={c.creamShade} />
        </g>
      ))}
    </g>
  )
}

/** A mailbox with its flag up — there's mail waiting! */
function Mailbox() {
  return (
    <g>
      <Rect x={170} y={96} w={18} h={12} c={c.roseDark} />
      <Rect x={171} y={97} w={16} h={10} c={c.rose} />
      <Rect x={172} y={98} w={6} h={2} c={c.white} opacity={0.5} />
      <Rect x={188} y={92} w={2} h={10} c={c.woodDeep} />
      <Rect x={190} y={92} w={5} h={4} c={c.honey} className="wave" />
      <Rect x={177} y={108} w={4} h={20} c={c.woodDark} />
    </g>
  )
}

function FairyLights() {
  return (
    <g>
      {LIGHTS.map((x, i) => {
        const y = 60 + Math.round(Math.sin(i * 0.9) * 3)
        return (
          <g key={x}>
            <Rect x={x} y={y} w={14} h={1} c={c.woodDeep} />
            <Rect
              x={x + 6}
              y={y + 1}
              w={2}
              h={2}
              c={i % 2 ? c.honey : c.white}
              className={`twinkle twinkle-${i % 3}`}
            />
          </g>
        )
      })}
    </g>
  )
}
