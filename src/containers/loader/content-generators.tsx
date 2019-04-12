const constantLeaders = [ '#', '$', '&', '@', '!' ]

const keywords = [
  'ochre',
  'terminal',
  'sikorsky',
  'malthus',
  'static',
  'mutable',
  'chiron',
  'chiral',
  'anterior',
  'inferior',
  'cyber',
  'cyberware',
  'furball',
  'ugly',
  'roger',
  'squamous',
  'rugose',
  'vindigo'
]

export function randomInteger (exclusiveMax: number, min?: number): number {
  min = min || 0
  return Math.floor(Math.random() * (exclusiveMax - min)) + min
}

export function randomKeyword (): string {
  return keywords[this.randomInteger(keywords.length)]
}

export function randomKeywords (wordCount: number): string[] {
  return new Array(this.randomInteger(wordCount, 1)).fill(null)
    .map(() => this.randomKeyword())
}

export function constantGenerator (wordCount: number): string {
  const leader = constantLeaders[randomInteger(constantLeaders.length)]
  const words: string[] = this.randomKeywords(wordCount)
  return `${leader}_${words.join('-')}`
}

export function infoGenerator (wordCount: number): string {
  return this.randomKeywords(wordCount).join(' ')
}
