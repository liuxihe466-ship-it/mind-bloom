import { useState } from 'react'
import { motion } from 'framer-motion'
import type { OvercomeRecord } from '../types'
import { CATEGORIES } from '../utils/categories'

interface JournalPageProps {
  records: OvercomeRecord[]
  onBack: () => void
}

export default function JournalPage({ records, onBack }: JournalPageProps) {
  const [filter, setFilter] = useState<string | null>(null)

  const sorted = [...records].reverse()
  const filtered = filter ? sorted.filter((r) => r.category === filter) : sorted

  const formatDate = (ts: number) => {
    const d = new Date(ts)
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours().toString().padStart(2, '0')
    const min = d.getMinutes().toString().padStart(2, '0')
    return `${month}月${day}日 ${hour}:${min}`
  }

  const getCategoryInfo = (id: string) => CATEGORIES.find((c) => c.id === id)

  return (
    <div className="min-h-dvh relative z-10 px-5 pt-6 pb-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-text-muted p-1 mr-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1
          className="text-xl text-lavender tracking-wider"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          成长日志
        </h1>
      </div>

      {/* 筛选标签 */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter(null)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs transition-colors ${
            !filter ? 'bg-lavender/20 text-lavender border border-lavender/30' : 'glass text-text-muted'
          }`}
        >
          全部
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs transition-colors ${
              filter === cat.id ? 'bg-lavender/20 text-lavender border border-lavender/30' : 'glass text-text-muted'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* 时间线 */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-sm">还没有记录</p>
          <p className="text-text-muted text-xs mt-1">去克服一个欲望吧</p>
        </div>
      ) : (
        <div className="relative pl-6">
          {/* 时间线竖线 */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-lavender/30 via-mist/20 to-transparent" />

          {filtered.map((record, i) => {
            const cat = getCategoryInfo(record.category)
            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative mb-4"
              >
                {/* 时间线圆点 */}
                <div className="absolute -left-6 top-3 w-[15px] h-[15px] rounded-full bg-bg-deep border-2 border-lavender/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-lavender/60" />
                </div>

                <div className="glass p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat?.icon || '✨'}</span>
                      <div>
                        <p className="text-sm text-text-primary">
                          {record.description || cat?.name || '克服了欲望'}
                        </p>
                        <p className="text-[11px] text-text-muted mt-0.5">
                          {formatDate(record.createdAt)}
                        </p>
                      </div>
                    </div>
                    {record.amount && (
                      <span className="text-gold text-xs flex-shrink-0">
                        省 ¥{record.amount.toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
