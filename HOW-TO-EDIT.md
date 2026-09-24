# How to edit your interactive resume

The site plays like a 90s game. The title screen shows your cabin in the hills
at dusk, and each chapter of your story is a room inside the house.

## The one file you'll use most

**`src/data/resume.ts`** holds every word on the site: your name, jobs, projects,
education, skills and contact links. Change the text, save, and the preview
updates by itself.

- To **add a job**, copy one `{ title: ..., highlights: [...] },` block, paste it
  below the last one, and change the text. The "Job 1 of 3" counter updates
  automatically. Projects, schools, skills and badges work the same way.
- To **change a skill bar**, change its `level` (0–100). The bar has 10 blocks.
- `\n` inside a message starts a new line in the dialog box.

## How the pixel art works

Every scene is painted on a tiny **320 × 180 "game screen"** and then scaled up
to fill the browser, just like an old console. All positions in the scene
files are in these big game pixels:

```
x: 0 ─────────────────────────────── 320
y: 0   (top of the wall)
   …
   128 (where the wall meets the floor)
   180 (bottom of the screen)
```

So `<Rect x={20} y={30} w={10} h={5} c={c.rose} />` paints a pink block
10 game pixels wide, 20 in from the left and 30 down from the top.

Because everything uses the same pixel grid, the rooms keep their proportions
on every screen size. Your avatar stands at the same spot in every room.

Characters and plants are drawn as **letter grids**:

```ts
const colors = { G: '#6fb050', P: '#f08a4b' }  // G = green, P = pot
const plant = [
  '.GG.',
  'GGGG',
  '.PP.',
]
```

Each letter is one pixel, and `.` is see-through.

## Where everything lives

```
src/
├── data/
│   ├── resume.ts        ← all your resume text (start here)
│   └── chapters.ts      ← chapter names, rooms, icons and accent colours
├── styles/palette.ts    ← colours of the boxes and text
│
├── App.tsx              ← the "brain": which chapter/slide you're on
├── slides.tsx           ← turns resume.ts into the slides of each chapter
│
├── scenes/              ← the pixel-art rooms
│   ├── pixel.tsx        ← the drawing kit (Rect, Disc, Hill, Sprite…) and scaling
│   ├── props.tsx        ← shared furniture: room walls/floor, windows, plants, cat…
│   ├── colors.ts        ← the colour palette for all scenes
│   ├── TitleScene.tsx   (cabin in the hills at dusk)
│   ├── IntroScene.tsx   (living room)
│   ├── WorkScene.tsx    (home office)
│   ├── ProjectsScene.tsx (design studio)
│   ├── EducationScene.tsx (reading nook)
│   ├── SkillsScene.tsx  (tea kitchen)
│   └── ContactScene.tsx (front garden)
│
├── components/          ← pieces of the screen
│   ├── JoySprite.tsx    ← your avatar (a 42 × 63 letter grid)
│   ├── Sprite.tsx       ← draws any letter-grid pixel art
│   ├── TitleScreen.tsx  ← logo + "Press start" menu
│   ├── Hud.tsx          ← top status bar
│   ├── ChapterMenu.tsx  ← the Menu pop-up
│   ├── DialogBox.tsx    ← box at the bottom with typed-out messages
│   ├── CardPanel.tsx    ← window for detail slides
│   ├── PixelBox.tsx     ← the retro window with pixel corners
│   └── cards/           ← layout of each detail slide (job, project, skills…)
│
├── hooks/useTypewriter.ts ← the letter-by-letter typing effect
├── utils/sounds.ts        ← the bleeps
└── index.css              ← fonts, pixel corners and little animations
```

## Common changes

| I want to…                      | Open                           | Change                               |
| ------------------------------- | ------------------------------ | ------------------------------------ |
| Update my resume text           | `src/data/resume.ts`           | the text in quotes                   |
| Rename a chapter or room        | `src/data/chapters.ts`         | `title` or `room`                    |
| Change a room's accent colour   | `src/data/chapters.ts`         | the colour inside `roomTheme(...)`   |
| Change a room's wallpaper       | `src/scenes/<Room>Scene.tsx`   | `wall` / `stripe` on `<Room>`        |
| Move furniture                  | `src/scenes/<Room>Scene.tsx`   | its `x` / `y` numbers                |
| Change a colour in every scene  | `src/scenes/colors.ts`         | the hex code                         |
| Move where Joy stands           | `src/scenes/pixel.tsx`         | `AVATAR_X` / `AVATAR_Y`              |
| Recolour my avatar              | `src/components/JoySprite.tsx` | the hex codes in `COLORS`            |
| Make text type faster or slower | `src/hooks/useTypewriter.ts`   | `msPerLetter = 34` (lower = faster)  |

## If something breaks

A red error screen usually means a typo, most often a missing comma between
`{ ... }` blocks or a missing quote. Undo your last change (Cmd+Z) and save.
