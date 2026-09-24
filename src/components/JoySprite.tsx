import { Sprite } from "./Sprite"

// Joy's pixel-art avatar, drawn as a grid of letters (42 wide × 63 tall).
//
// Each letter is one pixel; COLORS says which colour it is. A dot "." is see-through.
// • To recolour something, change its hex code in COLORS (e.g. H = hair).
// • To edit the drawing, change letters in PIXELS. Keep every row the same length.

const COLORS: Record<string, string> = {
  O: "#010101", // outline
  H: "#643f2c", // hair
  B: "#2e1b0b", // dark brown (hair shadows)
  S: "#ffe9d1", // skin
  P: "#ea7b84", // pink (heart hair clip + blush)
  C: "#6c695a", // coat
  L: "#4a4a4a", // leggings
  D: "#363636", // dark grey (shadows)
  V: "#f9da96", // vanilla ice cream
  M: "#9aa359", // matcha ice cream
  W: "#7e582d", // waffle cone
  T: "#bcaa91", // coat cuff
}

// prettier-ignore
const PIXELS = [
  '...................OOOOOOOOO..............',
  '.................OOHHHHHHHHHOOO...........',
  '.............OOOOOHHHHHHHHHHHHHOO.........',
  '...........OOHHHOHHHHHHHHHHHHHHHOO........',
  '.........OOOHHHHHHHHHHHHHHHHHHHHHHOO......',
  '........OOHHHHHHHHHHHHHHHHHHHHHHHHHOO.....',
  '.......OOHHHHHHHHHHHHHHHHHHHHHHHHHHHO.....',
  '......OOHHHHHHHHHHHHHHHHHHHHHHPHHHHHHO....',
  '.....OOHHHHHHHHHHHHHHHHHHHHHHPPPHPPHHOO...',
  '.....OHHHHHHHHHHHHHHHHHHHHHHPPPPPPPPHHO...',
  '....OHHHHHHHHHHHHHHHHHHHHHHHPPPPPPPPHHO...',
  '....OHHHHHHHHHHHHHBHHHHHHHHHHPPPPPPHHHHO..',
  '...OHHHHHHHHHHHHHHOHHHHHHHHHHHPPPPHHHHHO..',
  '...OHHHHHHHHHHHHHHOHHHHHHHHHHHHPPHHHHHHO..',
  '..OOHHHHHHHHHHHHHHOHHHHHHHHHHHHHHHHHHHHOO.',
  '..OHHHHHHHHHHHHHHOSOHHHOHHHHHHHHHHHHHHHHO.',
  '.OHHHHHHHHHHHHHHHOSOHHHOHHOHHBHHHHHHHHHHO.',
  '.OHHHHHHHHHHHHHHOSSSOHHOOHOOHHOHHHHHHHHHO.',
  '.OHHHHHHHHHHHHHOOSSSSOHSOHSOHHSHHHHHHHHHO.',
  'OHHHHHHHHHHHHHOOSSSSSSOSSOSSOOSOHHHHHHHHO.',
  'OHHHHHHHHHHHHOOSSSSSSSSSSSSSSSSOHHHHHHHHO.',
  'OHHHHHHHHHHOOSSSSSSSSSSSSSSSSSSOHHHHHHHHO.',
  'OHHHHHHHHHOOSSSSSSSSSSSSSSSSSSSSOHHHHHHOO.',
  'OHHHHHHHOOSSSSOOOOSSSSSSOOOOSSSSSOHHHHHO..',
  'OHHHHHHOOSSSSOSSSSSSSSSSSSSSOSSSSOOHHHHO..',
  'OHHHHHOHOSSSSSSSSSSSSSSSSSSSSSSSSOHOHHHO..',
  'OHHHHOHHOSSPPPSSSSSOSOSOSSSPPPPSSOHOHHHHO.',
  'OHHHHOHHOSSPPPSSSSSSOSOSSSSPPPPSSOHOHHHHO.',
  'OHHHHOHHHOSSSSSSSSSSOOSSSSSSSSSSOBHOHHHHHO',
  '.OHHHOHHHOOSSSSSSSSOVMOSSSSSSSSOOHHOHHHHHO',
  '.OHHHHHHHHBOOOOOOSSOVMMOSOOOOOOBHHHOHHHHHO',
  '..OHHHHHHHHHHHOOOOOOVMMMOOOBHHHHHHHOHHHHHO',
  '...OOHHHHHHHHHOCCOVVOVMMOCCOOHHHHHHHHHHHO.',
  '.....OHHHHHHHOCCOOVVVMMMOOCCOHHHHHHHHHHO..',
  '.......BHHHHHOCCCOVVMMBBBLCCOHHHBHHBHHO...',
  '.......OHHHBHOBCCLBBBMVMMOCBLBHH.BH.BHO...',
  '.......OHHOBOCCOOOVVVVVMMOOCCOOH..O..OO...',
  '.......HHO.OOCCCCOVVMMMMMOCCCCOO......OO..',
  '......OOO..OCCCCCOVVMMMMOCCCCCCO..........',
  '..........OCCCCCCCOOOOOOOCCCCCCO..........',
  '..........OCCCCCCCOWWWWWOCCCCCCCO.........',
  '.........OCCCCOCCCOOOOOOCCCOCCCCO.........',
  '.........OCCCCOOOOOSSSSOCCCOCCCCCO........',
  '.........OCCCOOCCOSSSSSOCCCCOCCCCO........',
  '........OCCCBCCCCCOSSSSOCCCCOCCCCO........',
  '........OCCCCCCCCCOSSSBOCCCCOCCCCLO.......',
  '........OCCCCCCCCCCOOOOCCCCCOCCCCCO.......',
  '.........OCCCCCCCCCOOWOCCCCCCOCCCCO.......',
  '..........OCCCCCCCOCOWOCCCCCCOCCCCO.......',
  '..........OOCCCCOOCCCOCCCCCCCOCCCCO.......',
  '............OOOOCCCCCCCCCCCCCOCOOOO.......',
  '............OCCCCCCCCCCCCCCCCOOSSSO.......',
  '............OLLLLLLLLLLLLLLLLOTTTTO.......',
  '..............ODDDDO...ODDDDO.............',
  '..............OLLLLO...OLLLLO.............',
  '..............OLLLLO...OLLLLO.............',
  '..............OLLLLO...OLLLLO.............',
  '..............OLLLLO...OLLLLO.............',
  '..............OLLLLO...OLLLLO.............',
  '..............OLLLLO...OLLLLO.............',
  '..............OOOOOO...OOOOOO.............',
  '..............OCCCCO...OCCCCO.............',
  '..............OLLLLO...DLLLLO.............',
]

/** Joy, drawn inside a scene at game-pixel scale, gently breathing. */
export function Avatar({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {/* Shadow on the floor */}
      <rect
        x={x + 10}
        y={y + 62}
        width={22}
        height={2}
        fill="rgba(59, 42, 42, 0.25)"
      />
      <rect
        x={x + 13}
        y={y + 64}
        width={16}
        height={1}
        fill="rgba(59, 42, 42, 0.18)"
      />
      <Sprite x={x} y={y} rows={PIXELS} colors={COLORS} className="idle-bob" />
    </g>
  )
}
