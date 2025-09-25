type Props = { seed: string; size?: number }

export function Avatar({ seed, size = 40 }: Props) {
  const initials =
    seed
      .split(/\s+/)
      .map((s) => s[0]?.toUpperCase() || '')
      .slice(0, 2)
      .join('') || 'U'
  const bg = `hsl(${(seed.length * 47) % 360} 70% 45%)`
  return (
    <div
      aria-label={seed}
      className="inline-flex select-none items-center justify-center rounded-full text-white"
      style={{ width: size, height: size, background: bg }}
    >
      <span className="text-sm font-semibold">{initials}</span>
    </div>
  )
}
