const path = require('path')

module.exports = {
  cdnResources: {
    css: [
      { href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { href: 'https://fonts.googleapis.com/css?family=Lato|Major+Mono+Display|Cutive+Mono' }
    ],
    js: [{
      src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/103/three.min.js',
      integrity: 'sha256-T4lfPbatZLyNhpEgCvtmXmlhOUq0HZHkDX4cMlQWExA=',
      crossorigin: 'anonymous'
    }, {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js',
      integrity: 'sha256-wtnfrDHx0iOJYp1fQkoK7fWaUDAysStI8W7pCHTEPrc',
      crossorigin: 'anonymous'
    }]
  },
  preload: []
}
