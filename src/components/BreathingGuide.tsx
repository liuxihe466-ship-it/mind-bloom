import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BreathingGuideProps {
  onComplete: () => void
  onSkip: () => void
}

export default function BreathingGuide({ onComplete, onSkip }: BreathingGuideProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [cycle, setCycle] = useState(0)
  const totalCycles = 3 // 3次呼吸循环

  const nextPhase = useCallback(() => {
    setPhase((p) => {
      if (p === 'inhale') return 'hold'
      if (p === 'hold') return 'exhale'
      // exhale complete = one cycle done
      setCycle((c) => c + 1)
      return 'inhale'
    })
  }, [])

  useEffect(() => {
    if (cycle >= totalCycles) {
      onComplete()
      return
    }
    const durations = { inhale: 4000, hold: 2000, exhale: 4000 }
    const timer = setTimeout(nextPhase, durations[phase])
    return () => clearTimeout(timer)
  }, [phase, cycle, nextPhase, onComplete])

  const phaseText = { inhale: '吸气...', hold: '屏住...', exhale: '呼气...' }
  const scale = { inhale: 1.4, hold: 1.4, exhale: 1 }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-deep/90 backdrop-blur-md">
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-lavender text-lg mb-8 tracking-widest"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {phaseText[phase]}
        </motion.p>
      </AnimatePresence>

      {/* 呼吸圆环 */}
      <motion.div
        animate={{ scale: scale[phase] }}
        transition={{ duration: phase === 'hold' ? 0.3 : phase === 'inhale' ? 4 : 4, ease: 'easeInOut' }}
        className="w-32 h-32 rounded-full border-2 border-lavender/40 flex items-center justify-center"
        style={{ boxShadow: '0 0 40px rgba(196,181,253,0.2), inset 0 0 30px rgba(196,181,253,0.1)' }}
      >
        <motion.div
          animate={{ scale: scale[phase] * 0.6 }}
          transition={{ duration: phase === 'hold' ? 0.3 : 4, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-lavender/20"
          style={{ boxShadow: '0 0 20px rgba(196,181,253,0.3)' }}
        />
      </motion.div>

      {/* 进度点 */}
      <div className="flex gap-2 mt-10">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              i < cycle ? 'bg-lavender' : i === cycle ? 'bg-lavender/50' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <button
        onClick={onSkip}
        className="mt-8 text-text-muted text-sm hover:text-text-secondary transition-colors"
      >
        跳过 &rarr;
      </button>
    </div>
  )
}
