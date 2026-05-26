import { useState } from 'react'
import { motion } from 'framer-motion'
import PlantView from '../components/PlantView'
import ProgressRing from '../components/ProgressRing'
import RecordModal from '../components/RecordModal'
import type { GrowthStage, UserData } from '../types'

interface MainPageProps {
  data: UserData
  stage: GrowthStage
  progressInStage: number
  totalCount: number
  totalSaved: number
  streak: number
  onAddRecord: (record: { category: string; description: string; amount?: number }) => void
  onShowJournal: () => void
}

export default function MainPage({
  data,
  stage,
  progressInStage,
  totalCount,
  totalSaved,
  streak,
  onAddRecord,
  onShowJournal,
}: MainPageProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-dvh flex flex-col relative z-10 px-5 pt-8 pb-6">
      {/* 顶部 Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-4"
      >
        <h1
          className="text-lg text-lavender/60 tracking-[0.3em]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          心植
        </h1>
      </motion.div>

      {/* 植物展示区 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex items-center justify-center py-4"
      >
        <PlantView type={data.plantType} stage={stage} name={data.plantName} />
      </motion.div>

      {/* 进度环 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4"
      >
        <ProgressRing stage={stage} progressInStage={progressInStage} totalCount={totalCount} />
      </motion.div>

      {/* 统计数据 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-3 mb-5"
      >
        <div className="glass px-3 py-3 text-center">
          <p className="text-lg text-white font-light">{totalCount}</p>
          <p className="text-[10px] text-text-muted mt-0.5">克服次数</p>
        </div>
        <div className="glass px-3 py-3 text-center">
          <p className="text-lg text-gold font-light">
            {totalSaved > 0 ? `¥${totalSaved.toFixed(0)}` : '-'}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">累计省下</p>
        </div>
        <div className="glass px-3 py-3 text-center">
          <p className="text-lg text-mist font-light">{streak}</p>
          <p className="text-[10px] text-text-muted mt-0.5">连续天数</p>
        </div>
      </motion.div>

      {/* 核心按钮 */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setModalOpen(true)}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-lavender/70 to-mist/70 text-white text-base tracking-widest shadow-[0_4px_30px_rgba(196,181,253,0.25)] active:shadow-[0_2px_15px_rgba(196,181,253,0.15)] transition-shadow"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        我克服了一个欲望
      </motion.button>

      {/* 日志入口 */}
      <button
        onClick={onShowJournal}
        className="mt-3 text-text-muted text-xs tracking-wider hover:text-text-secondary transition-colors"
      >
        查看成长日志 &rarr;
      </button>

      {/* 记录弹窗 */}
      <RecordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(record) => {
          onAddRecord(record)
          setModalOpen(false)
        }}
      />
    </div>
  )
}
