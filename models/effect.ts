export interface Effect {
  id: string
  name: string
  description: string
  target: string[]
  tagetField?: string
  active: boolean
  value: number
}
