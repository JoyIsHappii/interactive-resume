import type { Theme } from "../../data/chapters"

/** A list of short points, each starting with a little ▸ arrow. */
export function BulletList({ items, theme }: { items: string[]; theme: Theme }) {
  return (
    <ul className="flex flex-col" style={{ gap: 6 }}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-baseline"
          style={{ gap: 10, fontSize: 19, color: theme.text }}
        >
          <span
            className="shrink-0"
            style={{ color: theme.accent, fontSize: 14 }}
          >
            ▸
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
