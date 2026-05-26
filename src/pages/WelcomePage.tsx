import { useState } from 'react'
import { motion } from 'framer-motion'
import { PLANTS } from '../utils/plants'
import type { PlantType } from '../types'

interface WelcomePageProps {
  onComplete: (plantType: PlantType, plantName: string) => void
}

export default function WelcomePage({ onComplete }: WelcomePageProps) {
  const [step, setStep] = useState<'intro' | 'select' | 'name'>('intro')
  const [selectedPlant, setSelectedPlant] = useState<PlantType | null>(null)
  const [plantName, setPlantName] = useState('')

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 relative z-10">
      {step === 'intro' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1
              className="text-3xl text-lavender tracking-[0.2em] mb-4"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              心植
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed max-w-[260px] mx-auto mb-2">
              每一次克制欲望
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-[260px] mx-auto">
              都是对内心花园的浇灌
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => setStep('select')}
            className="mt-12 px-8 py-3 rounded-full glass text-lavender text-sm tracking-widest hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            种下一颗种子
          </motion.button>
        </motion.div>
      )}

      {step === 'select' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center"
        >
          <h2
            className="text-xl text-lavender tracking-wider mb-2"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            选择你的种子
          </h2>
          <p className="text-text-muted text-sm mb-8">它将陪伴你成长</p>

          <div className="grid grid-cols-2 gap-3">
            {PLANTS.map((plant) => (
              <motion.button
                key={plant.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedPlant(plant.type)}
                className={`glass p-5 text-center transition-all ${
                  selectedPlant === plant.type
                    ? 'border-lavender/50 bg-lavender/10 shadow-[0_0_20px_rgba(196,181,253,0.15)]'
                    : 'hover:bg-white/8'
                }`}
              >
                <span className="text-3xl block mb-2">{plant.icon}</span>
                <p className="text-sm text-text-primary">{plant.name}</p>
                <p className="text-xs text-text-muted mt-1">{plant.nameEn}</p>
                <p className="text-[11px] text-text-muted mt-2 leading-relaxed"
                   style={{ fontFamily: 'var(--font-sans)' }}>
                  {plant.description}
                </p>
              </motion.button>
            ))}
          </div>

          {selectedPlant && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setStep('name')}
              className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-lavender/60 to-mist/60 text-white text-sm tracking-wider active:scale-[0.97] transition-transform"
            >
              选好了
            </motion.button>
          )}
        </motion.div>
      )}

      {step === 'name' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center"
        >
          <span className="text-4xl block mb-4">
            {PLANTS.find((p) => p.type === selectedPlant)?.icon}
          </span>
          <h2
            className="text-xl text-lavender tracking-wider mb-2"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            给它取个名字吧
          </h2>
          <p className="text-text-muted text-sm mb-6">它将见证你每一次的成长</p>

          <input
            type="text"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            placeholder="例如：小星、希望、静心..."
            maxLength={10}
            className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-center text-base text-white placeholder:text-white/20 focus:outline-none focus:border-lavender/40 tracking-wider"
            style={{ fontFamily: 'var(--font-sans)' }}
          />

          <button
            onClick={() => {
              if (selectedPlant && plantName.trim()) {
                onComplete(selectedPlant, plantName.trim())
              }
            }}
            disabled={!plantName.trim()}
            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-lavender/60 to-mist/60 text-white text-sm tracking-wider disabled:opacity-30 active:scale-[0.97] transition-all"
          >
            开始旅程
          </button>
        </motion.div>
      )}
    </div>
  )
}
