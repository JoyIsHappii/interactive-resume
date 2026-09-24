import type { CSSProperties, ReactNode } from "react"

type PixelBoxProps = {
  color: string // outline colour
  bg: string // background colour
  children: ReactNode
  tab?: ReactNode // something that pokes out of the box, e.g. a name tag
  style?: CSSProperties
}

/**
 * A 16-bit style window: dark outline with stepped pixel corners, a light
 * bevel along the top edge and a hard, blocky shadow.
 */
export function PixelBox({ color, bg, children, tab, style }: PixelBoxProps) {
  return (
    <div className="relative pixel-shadow" style={style}>
      <div className="pixel-corners" style={{ background: color, padding: 3 }}>
        <div
          className="pixel-corners-sm"
          style={{
            background: bg,
            boxShadow:
              "inset 0 3px 0 rgba(255,255,255,0.8), inset 0 -3px 0 rgba(59,42,42,0.1)",
          }}
        >
          {children}
        </div>
      </div>
      {tab}
    </div>
  )
}

/** A small solid label with pixel corners, e.g. a name tag or badge. */
export function PixelTag({
  bg,
  outline,
  children,
  style,
}: {
  bg: string
  outline: string
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      className="pixel-corners-sm"
      style={{ background: outline, padding: 3, ...style }}
    >
      <div
        className="pixel-corners-sm"
        style={{
          background: bg,
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)",
        }}
      >
        {children}
      </div>
    </div>
  )
}
