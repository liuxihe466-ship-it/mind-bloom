import type { PlantType } from '../types'

export interface PlantInfo {
  type: PlantType
  name: string
  nameEn: string
  description: string
  icon: string
}

export const PLANTS: PlantInfo[] = [
  {
    type: 'cherry',
    name: '樱花',
    nameEn: 'Cherry Blossom',
    description: '在寂静中绽放，短暂而永恒',
    icon: '🌸',
  },
  {
    type: 'lotus',
    name: '莲花',
    nameEn: 'Lotus',
    description: '出淤泥而不染，濯清涟而不妖',
    icon: '🪷',
  },
  {
    type: 'wisteria',
    name: '紫藤',
    nameEn: 'Wisteria',
    description: '垂落如瀑，紫色的梦境',
    icon: '💜',
  },
  {
    type: 'ginkgo',
    name: '银杏',
    nameEn: 'Ginkgo',
    description: '亿年不变的生命之树',
    icon: '🍂',
  },
]
