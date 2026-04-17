const ITEMS = [
  'El Ritual de lo Intencional',
  'Pequeños detalles, grandes momentos',
  'Origen Puro',
  'Café de Especialidad',
  'Desde la semilla hasta la taza',
  'Tostado con propósito',
]

export default function Marquee() {
  // Doubled for seamless loop — translateX(-50%) returns to start
  const track = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-red py-[0.85rem] overflow-hidden">
      <div className="inline-flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-fraunces italic text-[1rem] text-off-white/[0.85] px-8">{item}</span>
            <span className="font-fraunces text-[1rem] text-off-white/30">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
