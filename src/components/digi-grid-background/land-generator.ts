import OpenSimplexNoise from 'open-simplex-noise'
const openSimplex  = new OpenSimplexNoise(Date.now())

export default class LandGenerator {
  frequencies: number[]
  amplitudes: number[]

  constructor (frequencies: number[], amplitudes: number[]) {
    if (frequencies.length !== amplitudes.length) {
      throw new Error('Error: LandGenerator: frequency and amplitude arrays must be same length')
    }
    this.frequencies = frequencies
    this.amplitudes = amplitudes
  }

  calculateHeight (u: number, v: number): number {
    return this.frequencies.reduce((noise: number, frequency: number, index: number) => {
      return noise + openSimplex.noise2D(u * frequency, v * frequency) * this.amplitudes[index]
    }, 0)
  }
}
