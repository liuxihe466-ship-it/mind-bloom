import type { PlantType, GrowthStage } from '../types'
import { STAGE_NAMES } from '../types'

interface PlantViewProps {
  type: PlantType
  stage: GrowthStage
  name: string
}

export default function PlantView({ type, stage, name }: PlantViewProps) {
  return (
    <div className="flex flex-col items-center" style={{ animation: 'float 6s ease-in-out infinite' }}>
      {/* 植物 SVG */}
      <div
        className="relative"
        style={{ animation: 'glow-pulse 4s ease-in-out infinite' }}
      >
        <svg viewBox="0 0 200 260" className="w-48 h-60">
          {/* 地面光晕 */}
          <ellipse cx="100" cy="240" rx={40 + stage * 8} ry="8" fill="rgba(196,181,253,0.15)" />

          {/* 根据阶段渲染不同的植物 */}
          {stage === 0 && <SeedSVG />}
          {stage === 1 && <SproutSVG type={type} />}
          {stage === 2 && <SeedlingSVG type={type} />}
          {stage === 3 && <GrowingSVG type={type} />}
          {stage === 4 && <BuddingSVG type={type} />}
          {stage === 5 && <BloomingSVG type={type} />}
        </svg>
      </div>

      {/* 植物名和阶段 */}
      <div className="mt-2 text-center">
        <p className="text-lavender text-lg font-serif tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
          {name}
        </p>
        <p className="text-text-muted text-xs mt-0.5">
          {STAGE_NAMES[stage]}
        </p>
      </div>
    </div>
  )
}

/* ---------- 各阶段 SVG 组件 ---------- */

function SeedSVG() {
  return (
    <g>
      {/* 土壤 */}
      <ellipse cx="100" cy="230" rx="35" ry="10" fill="#2d1f4e" />
      {/* 种子 */}
      <ellipse cx="100" cy="220" rx="8" ry="6" fill="#c4b5fd" opacity="0.8">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </ellipse>
    </g>
  )
}

function SproutSVG({ type }: { type: PlantType }) {
  const color = getPlantColor(type)
  return (
    <g>
      <ellipse cx="100" cy="230" rx="35" ry="10" fill="#2d1f4e" />
      {/* 茎 */}
      <line x1="100" y1="230" x2="100" y2="200" stroke={color.stem} strokeWidth="2.5" strokeLinecap="round" />
      {/* 两片小叶子 */}
      <ellipse cx="92" cy="205" rx="8" ry="4" fill={color.leaf} opacity="0.8" transform="rotate(-30 92 205)" />
      <ellipse cx="108" cy="208" rx="7" ry="3.5" fill={color.leaf} opacity="0.7" transform="rotate(25 108 208)" />
    </g>
  )
}

function SeedlingSVG({ type }: { type: PlantType }) {
  const color = getPlantColor(type)
  return (
    <g>
      <ellipse cx="100" cy="230" rx="35" ry="10" fill="#2d1f4e" />
      <line x1="100" y1="230" x2="100" y2="175" stroke={color.stem} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="86" cy="195" rx="14" ry="6" fill={color.leaf} opacity="0.8" transform="rotate(-35 86 195)" />
      <ellipse cx="114" cy="200" rx="12" ry="5" fill={color.leaf} opacity="0.7" transform="rotate(30 114 200)" />
      <ellipse cx="90" cy="180" rx="10" ry="4.5" fill={color.leaf} opacity="0.6" transform="rotate(-20 90 180)" />
    </g>
  )
}

function GrowingSVG({ type }: { type: PlantType }) {
  const color = getPlantColor(type)
  return (
    <g>
      <ellipse cx="100" cy="230" rx="35" ry="10" fill="#2d1f4e" />
      {/* 主干 */}
      <path d="M100 230 Q98 190 100 140" stroke={color.stem} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* 分枝 */}
      <path d="M100 180 Q80 165 70 170" stroke={color.stem} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M100 165 Q120 150 130 155" stroke={color.stem} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 叶子 */}
      <ellipse cx="65" cy="167" rx="16" ry="7" fill={color.leaf} opacity="0.8" transform="rotate(-40 65 167)" />
      <ellipse cx="135" cy="152" rx="14" ry="6" fill={color.leaf} opacity="0.7" transform="rotate(35 135 152)" />
      <ellipse cx="95" cy="145" rx="12" ry="5" fill={color.leaf} opacity="0.6" transform="rotate(-15 95 145)" />
      <ellipse cx="108" cy="150" rx="10" ry="4.5" fill={color.leaf} opacity="0.65" transform="rotate(20 108 150)" />
    </g>
  )
}

function BuddingSVG({ type }: { type: PlantType }) {
  const color = getPlantColor(type)
  return (
    <g>
      <ellipse cx="100" cy="230" rx="35" ry="10" fill="#2d1f4e" />
      <path d="M100 230 Q97 180 100 120" stroke={color.stem} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M100 175 Q75 155 65 162" stroke={color.stem} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M100 155 Q125 135 135 142" stroke={color.stem} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M100 140 Q82 125 75 130" stroke={color.stem} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 叶子 */}
      <ellipse cx="60" cy="158" rx="18" ry="7" fill={color.leaf} opacity="0.8" transform="rotate(-40 60 158)" />
      <ellipse cx="140" cy="138" rx="16" ry="6.5" fill={color.leaf} opacity="0.7" transform="rotate(35 140 138)" />
      <ellipse cx="70" cy="127" rx="14" ry="5.5" fill={color.leaf} opacity="0.6" transform="rotate(-25 70 127)" />
      {/* 花苞 */}
      <circle cx="100" cy="115" r="8" fill={color.bud} opacity="0.7">
        <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="78" cy="128" r="5" fill={color.bud} opacity="0.5" />
      <circle cx="133" cy="137" r="5.5" fill={color.bud} opacity="0.5" />
    </g>
  )
}

function BloomingSVG({ type }: { type: PlantType }) {
  const color = getPlantColor(type)
  return (
    <g>
      <ellipse cx="100" cy="230" rx="40" ry="10" fill="#2d1f4e" />
      <path d="M100 230 Q96 170 100 100" stroke={color.stem} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 180 Q70 155 58 165" stroke={color.stem} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M100 160 Q130 135 142 145" stroke={color.stem} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M100 140 Q75 120 65 128" stroke={color.stem} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M100 125 Q118 108 128 115" stroke={color.stem} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 叶子 */}
      <ellipse cx="53" cy="162" rx="18" ry="7" fill={color.leaf} opacity="0.7" transform="rotate(-40 53 162)" />
      <ellipse cx="147" cy="142" rx="16" ry="6.5" fill={color.leaf} opacity="0.6" transform="rotate(35 147 142)" />
      <ellipse cx="60" cy="125" rx="14" ry="5.5" fill={color.leaf} opacity="0.5" transform="rotate(-25 60 125)" />
      {/* 盛开的花朵 */}
      <Flower cx={100} cy={90} size={18} color={color.flower} />
      <Flower cx={55} cy={160} size={11} color={color.flower} />
      <Flower cx={145} cy={140} size={12} color={color.flower} />
      <Flower cx={62} cy={122} size={10} color={color.flower} />
      <Flower cx={130} cy={112} size={11} color={color.flower} />
      {/* 光效 */}
      <circle cx="100" cy="90" r="30" fill={color.flower} opacity="0.08">
        <animate attributeName="r" values="28;35;28" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}

function Flower({ cx, cy, size, color }: { cx: number; cy: number; size: number; color: string }) {
  const petals = 5
  return (
    <g>
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals
        const rad = (angle * Math.PI) / 180
        const px = cx + Math.cos(rad) * size * 0.5
        const py = cy + Math.sin(rad) * size * 0.5
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={size * 0.45}
            ry={size * 0.25}
            fill={color}
            opacity="0.75"
            transform={`rotate(${angle} ${px} ${py})`}
          />
        )
      })}
      <circle cx={cx} cy={cy} r={size * 0.18} fill="#fde68a" opacity="0.9" />
    </g>
  )
}

function getPlantColor(type: PlantType) {
  const colors: Record<PlantType, { stem: string; leaf: string; bud: string; flower: string }> = {
    cherry: { stem: '#6b5b7b', leaf: '#4a7c59', bud: '#f9a8d4', flower: '#f472b6' },
    lotus: { stem: '#5b7b6b', leaf: '#3d8b6e', bud: '#fda4af', flower: '#fb7185' },
    wisteria: { stem: '#6b5b7b', leaf: '#4a6b5a', bud: '#c4b5fd', flower: '#a78bfa' },
    ginkgo: { stem: '#7b6b5b', leaf: '#7bab5b', bud: '#fde68a', flower: '#fbbf24' },
  }
  return colors[type]
}
