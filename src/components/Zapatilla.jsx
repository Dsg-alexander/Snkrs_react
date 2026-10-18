// Ilustración de zapatilla (se usa cuando un producto no tiene imagen o la URL falla).
const TINTA = '#17133A'

export default function Zapatilla({ color = '#4429F2', acento = '#FFFFFF', className, titulo = 'Zapatilla' }) {
  return (
    <svg
      viewBox="0 0 420 240" className={className} role="img" aria-label={titulo}
      fill="none" strokeLinejoin="round" strokeLinecap="round"
    >
      <ellipse cx="212" cy="222" rx="176" ry="9" fill={TINTA} opacity=".12" />
      <path d="M30 170H392V180C392 196 380 204 360 204H62C42 204 30 196 30 180Z" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <path d="M46 193H376" stroke={TINTA} strokeWidth="3" opacity=".22" />
      <path
        d="M40 170L38 96C38 80 46 74 60 72L108 66C118 65 124 70 128 78L136 60C138 54 146 52 152 56L214 100C240 118 300 122 344 146C372 160 390 164 392 170Z"
        fill={color} stroke={TINTA} strokeWidth="4"
      />
      <path d="M300 126C336 134 372 152 392 170H334C334 150 322 136 300 126Z" fill={acento} stroke={TINTA} strokeWidth="4" />
      <path d="M92 152C150 152 196 130 246 140" stroke={acento} strokeWidth="12" />
      <path d="M92 152C150 152 196 130 246 140" stroke={TINTA} strokeWidth="2" opacity=".35" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${167 + i * 14} ${60 + i * 10}l-10 13`} stroke={TINTA} strokeWidth="5" />
      ))}
    </svg>
  )
}
