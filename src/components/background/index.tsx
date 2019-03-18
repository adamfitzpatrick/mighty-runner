import { h, Component } from 'preact'
import * as THREE from 'three'

import * as styles from './background.scss'
import * as smoke from '@assets/smoke-256x128.png'

export default class Background extends Component<{}, {}> {
  static COLOR = 0x102030
  static LIGHT_COLOR = 0xffffff
  static SMOKE_COLOR = 0x14283d
  static PARTICLE_COUNT = 20
  static CAMERA_FOV = 75
  static CAMERA_NEAR = 1
  static CAMERA_FAR = 1000
  static CAMERA_Z = 1000
  static MATERIAL_COLOR = 0xffffff
  static PLANE_SIZE = 400
  static LATERAL_RANGE = 500
  static AZIMUTH_RANGE = 1000
  static MOVEMENT_RATE = 0.1

  webGLAvailable = false
  cubeSineDriver: number
  clock: THREE.Clock
  delta: number
  scene: THREE.Scene
  camera: THREE.Camera
  light: THREE.DirectionalLight
  renderer: THREE.WebGLRenderer
  smokeParticles: THREE.Mesh[]

  constructor () {
    super()
    this.checkForWebGL()
    if (this.webGLAvailable) {
      this.cubeSineDriver = 0
      this.clock = new THREE.Clock()
      this.smokeParticles = []
    }
  }

  checkForWebGL () {
    const canvas = document.createElement('canvas')
    this.webGLAvailable = !!(( (window as any).WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) ))
  }

  initializeScene () {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(Background.COLOR)
    this.camera = new THREE.PerspectiveCamera(
      Background.CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      Background.CAMERA_NEAR,
      Background.CAMERA_FAR
    )
    this.camera.position.z = Background.CAMERA_Z
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.getElementById('background').appendChild(this.renderer.domElement)
  }

  generateLight () {
    this.light = new THREE.DirectionalLight(Background.LIGHT_COLOR, 1);
    this.light.position.set(0,0,1);
    this.scene.add(this.light);
  }

  generateMesh (smokeGeometry: THREE.PlaneGeometry, smokeMaterial: THREE.MeshLambertMaterial): THREE.Mesh {
    return new THREE.Mesh(smokeGeometry, smokeMaterial)
  }

  generateParticles () {
    THREE.ImageUtils.crossOrigin = ''
    const smokeTexture = new THREE.TextureLoader().load(smoke) // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png')
    const smokeMaterial = new THREE.MeshLambertMaterial({color: Background.SMOKE_COLOR, map: smokeTexture, transparent: true })
    const smokeGeometry = new THREE.PlaneGeometry(Background.PLANE_SIZE, Background.PLANE_SIZE)
    for (let count = 0; count < Background.PARTICLE_COUNT; count++) {
      var particle = this.generateMesh(smokeGeometry, smokeMaterial);
      particle.position.set(
        (Math.random() - 0.5) * Background.LATERAL_RANGE,
        (Math.random() - 0.5) * Background.LATERAL_RANGE,
        (Math.random() - 0.1) * Background.AZIMUTH_RANGE
      )
      particle.rotation.z = Math.random() * 360;
      this.scene.add(particle);
      this.smokeParticles.push(particle);
    }
  }

  renderSmoke = () => {
    this.renderer.render(this.scene, this.camera);
  }

  evolveSmoke = () => {
    this.smokeParticles.forEach(particle => {
      particle.rotation.z += (this.delta * Background.MOVEMENT_RATE)
      particle.position.x += (this.delta * Background.MOVEMENT_RATE)
      particle.position.y += (this.delta * Background.MOVEMENT_RATE)
    }, this)
  }

  animate = () => {
    this.delta = this.clock.getDelta()
    this.evolveSmoke()
    this.renderSmoke()
    requestAnimationFrame(this.animate)
  }

  render () {
    return <div className={styles.background} id='background'/>
  }

  componentDidMount () {
    if (this.webGLAvailable) {
      this.initializeScene()
      this.generateLight()
      this.generateParticles()
      this.animate()
    }
  }
}
