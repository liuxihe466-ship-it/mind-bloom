import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES } from '../utils/categories'
import { getRandomQuote } from '../utils/quotes'
import BreathingGuide from './BreathingGuide'

interface RecordModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (record: { category: string; description: string; amount?: number }) => void
}

type ModalStep = 'breathe' | 'category' | 'detail' | 'success'

export default function RecordModal({ open, onClose, onSubmit }: RecordModalProps) {
  const [step, setStep] = useState<ModalStep>('breathe')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [quote, setQuote] = useState('')

  const category = CATEGORIES.find((c) => c.id === selectedCategory)

  const handleSubmit = () => {
    if (!selectedCategory) return
    onSubmit({
      category: selectedCategory,
      description: description || category?.name || '',
      amount: amount ? parseFloat(amount) : undefined,
    })
    setQuote(getRandomQuote())
    setStep('success')
  }

  const handleClose = () => {
    setStep('breathe')
    setSelectedCategory(null)
    setDescription('')
    setAmount('')
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40">
      {/* Breathing guide (first step) */}
      {step === 'breathe' && (
        <BreathingGuide
          onComplete={() => setStep('category')}
          onSkip={() => setStep('category')}
        />
      )}

      {/* Category / Detail / Success steps */}
      {step !== 'breathe' && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-40">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-[430px] bg-gradient-to-b from-[#1a1040] to-[#0f0a1e] rounded-t-3xl border-t border-x border-white/10 p-6 pb-10 max-h-[85dvh] overflow-y-auto"
          >
            <AnimatePresence mode="wait">
              {/* 选择类别 */}
              {step === 'category' && (
                <motion.div
                  key="category"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <h3
                    className="text-xl text-lavender mb-1 tracking-wider"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    你克服了什么？
                  </h3>
                  <p className="text-text-muted text-sm mb-5">选择一个类别</p>

                  <div className="grid grid-cols-4 gap-3">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id)
                          setStep('detail')
                        }}
                        className="glass flex flex-col items-center gap-1.5 py-3 px-2 hover:bg-white/10 active:scale-95 transition-all"
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs text-text-secondary">{cat.name}</span>
                      </button>
                    ))}
                  </div>

                  <button onClick={handleClose} className="w-full mt-5 text-text-muted text-sm py-2">
                    取消
                  </button>
                </motion.div>
              )}

              {/* 填写详情 */}
              {step === 'detail' && (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-2xl">{category?.icon}</span>
                    <h3
                      className="text-xl text-lavender tracking-wider"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {category?.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-text-muted text-xs mb-1.5 block">发生了什么？（选填）</label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="例如：忍住了没买那双鞋"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-lavender/40"
                      />
                    </div>

                    {category?.isMoney && (
                      <div>
                        <label className="text-text-muted text-xs mb-1.5 block">省下了多少钱？（选填）</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">¥</span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-lavender/40"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-lavender/80 to-mist/80 text-white font-medium tracking-wider active:scale-[0.98] transition-transform"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    记录这次胜利
                  </button>
                  <button
                    onClick={() => setStep('category')}
                    className="w-full mt-2 text-text-muted text-sm py-2"
                  >
                    返回
                  </button>
                </motion.div>
              )}

              {/* 成功 */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="text-5xl mb-4"
                  >
                    🌱
                  </motion.div>
                  <h3
                    className="text-xl text-lavender mb-3 tracking-wider"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    你的植物获得了肥料！
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-[280px] mx-auto mb-6"
                     style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    「{quote}」
                  </p>
                  {amount && (
                    <p className="text-gold text-sm mb-4">
                      这次省下了 ¥{parseFloat(amount).toFixed(2)}
                    </p>
                  )}
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 rounded-xl glass text-lavender text-sm tracking-wider hover:bg-white/10 transition-colors"
                  >
                    继续前行
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  )
}
