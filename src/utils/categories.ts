import type { DesireCategory } from '../types'

export const CATEGORIES: DesireCategory[] = [
  { id: 'spending', name: '冲动消费', icon: '💸', isMoney: true },
  { id: 'phone', name: '刷手机', icon: '📱', isMoney: false },
  { id: 'food', name: '垃圾食品', icon: '🍟', isMoney: true },
  { id: 'shopping', name: '网购', icon: '🛒', isMoney: true },
  { id: 'procrastination', name: '拖延', icon: '⏰', isMoney: false },
  { id: 'gaming', name: '游戏沉迷', icon: '🎮', isMoney: false },
  { id: 'social', name: '社交媒体', icon: '💬', isMoney: false },
  { id: 'other', name: '其他', icon: '✨', isMoney: false },
]
