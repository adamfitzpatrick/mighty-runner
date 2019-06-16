const fs = require('fs')
const path = require('path')
const yargs = require('yargs')

if (!yargs.argv.container && !yargs.argv.component) {
  throw new Error('no component or container name provided')
}

const container = yargs.argv.container && yargs.argv.container.replace(/^[a-z]/, a => a.toUpperCase())
const component = yargs.argv.component && yargs.argv.component.replace(/^[a-z]/, a => a.toUpperCase())

let thing = yargs.argv.component
if (container) {
  thing = container
}
const lower = thing.replace(/^[A-Z]/, a => a.toLowerCase()).replace(/[A-Z]/g, a => `-${a.toLowerCase()}`)
thing = thing.replace(/^[a-z]/, a => a.toUpperCase()).replace(/-([A-Za-z0-9])/g, a => a.slice(1).toUpperCase())
scssClass = thing.replace(/^[A-Z]/, a => a.toLowerCase())

const thingTs = `import { h } from 'preact'

import * as styles from './${lower}.scss'

interface Props {}

export default function ${thing} (props: Props) {
  return <div>${thing}</div>
}
`

const indexTs = `export { default } from './${lower}'
`

const scss = `.${scssClass} {
  display: block;
}
`

const scssD = `export const ${scssClass}: string
`

let dest = path.resolve(process.cwd(), 'src', 'components', lower)
if (container) {
  dest = path.resolve(process.cwd(), 'src', 'containers', lower)
}

fs.mkdirSync(dest)
fs.writeFileSync(path.resolve(dest, `${lower}.tsx`), thingTs)
fs.writeFileSync(path.resolve(dest, 'index.ts'), indexTs)
fs.writeFileSync(path.resolve(dest, `${lower}.scss`), scss)
fs.writeFileSync(path.resolve(dest, `${lower}.scss.d.ts`), scssD)
