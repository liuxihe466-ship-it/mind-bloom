export type PlantType = 'cherry' | 'lotus' | 'wisteria' | 'ginkgo'

export type GrowthStage = 0 | 1 | 2 | 3 | 4 | 5
// 0=种子 1=发芽 2=幼苗 3=成长 4=含苞 5=盛开

export interface DesireCategory {
  id: string
  name: string
  icon: string
  isMoney: boolean // 是否与消费相关
}

export interface OvercomeRecord {
  id: string
  category: string
  description: string
  amount?: number // 省下的金额
  createdAt: number
}

export interface UserData {
  plantType: PlantType
  plantName: string
  records: OvercomeRecord[]
  createdAt: number
}

export const GROWTH_PER_LEVEL = 3 // 每3次升一级

export const STAGE_NAMES: Record<GrowthStage, string> = {
  0: '种子',
  1: '发芽',
  2: '幼苗',
  3: '成长',
  4: '含苞',
  5: '盛开',
}
