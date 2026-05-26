import { useState, useCallback } from 'react'
import type { UserData, OvercomeRecord, GrowthStage } from '../types'
import { GROWTH_PER_LEVEL } from '../types'

const STORAGE_KEY = 'mind-bloom-data'

function loadData(): UserData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveData(data: UserData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useLocalData() {
  const [data, setData] = useState<UserData | null>(loadData)

  const initUser = useCallback((plantType: UserData['plantType'], plantName: string) => {
    const newData: UserData = {
      plantType,
      plantName,
      records: [],
      createdAt: Date.now(),
    }
    saveData(newData)
    setData(newData)
  }, [])

  const addRecord = useCallback((record: Omit<OvercomeRecord, 'id' | 'createdAt'>) => {
    setData((prev) => {
      if (!prev) return prev
      const newRecord: OvercomeRecord = {
        ...record,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      }
      const updated = { ...prev, records: [...prev.records, newRecord] }
      saveData(updated)
      return updated
    })
  }, [])

  const totalCount = data?.records.length ?? 0
  const stage = Math.min(Math.floor(totalCount / GROWTH_PER_LEVEL), 5) as GrowthStage
  const progressInStage = stage < 5 ? totalCount % GROWTH_PER_LEVEL : GROWTH_PER_LEVEL
  const totalSaved = data?.records.reduce((sum, r) => sum + (r.amount ?? 0), 0) ?? 0

  // 连续天数计算
  const streak = (() => {
    if (!data || data.records.length === 0) return 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let days = 0
    let checkDate = new Date(today)

    while (true) {
      const dayStart = checkDate.getTime()
      const dayEnd = dayStart + 86400000
      const hasRecord = data.records.some(
        (r) => r.createdAt >= dayStart && r.createdAt < dayEnd
      )
      if (!hasRecord) break
      days++
      checkDate.setDate(checkDate.getDate() - 1)
    }
    return days
  })()

  return {
    data,
    isNew: !data,
    initUser,
    addRecord,
    totalCount,
    stage,
    progressInStage,
    totalSaved,
    streak,
  }
}
