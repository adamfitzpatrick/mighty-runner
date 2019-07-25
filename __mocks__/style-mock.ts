const handler = {
  get: (target: any, prop: string) => prop
}
const mock = new Proxy({}, handler)

module.exports = mock
