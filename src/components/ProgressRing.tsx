import type { GrowthStage } from '../types'
import { GROWTH_PER_LEVEL, STAGE_NAMES } from '../types'

interface ProgressRingProps {
  stage: GrowthStage
  progressInStage: number
  totalCount: number
}

export default function ProgressRing({ stage, progressInStage, totalCount }: ProgressRingProps) {
  const progress = stage >= 5 ? 1 : progressInStage / GROWTH_PER_LEVEL
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)
  const nextStage = Math.min(stage + 1, 5) as GrowthStage

  return (
    <div className="glass px-5 py-4 flex items-center gap-4">
      {/* 进度环 */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#a5b4fc" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-light text-white">{totalCount}</span>
          <span className="text-[9px] text-text-muted">次</span>
        </div>
      </div>

      {/* 文字信息 */}
      <div className="flex-1 min-w-0">
        <p className="text-text-secondary text-xs">当前阶段</p>
        <p className="text-lavender text-base tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
          {STAGE_NAMES[stage]}
        </p>
        {stage < 5 ? (
          <p className="text-text-muted text-xs mt-1">
            再克服 {GROWTH_PER_LEVEL - progressInStage} 次 → {STAGE_NAMES[nextStage]}
          </p>
        ) : (
          <p className="text-gold text-xs mt-1">已达到最高阶段！</p>
        )}
      </div>
    </div>
  )
}
