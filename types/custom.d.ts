declare module '*.svg' {
  const content: string;
  export = content;
}

declare module '*.png' {
  const content: string;
  export = content;
}

declare module '*.jpg' {
  const content: string;
  export = content;
}

declare module 'classnames'

declare module 'mobx-preact'

interface InputEvent extends Event {
  target: HTMLInputElement
}
