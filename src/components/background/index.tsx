import { h, Component } from 'preact'
import * as THREE from 'three'

import * as styles from './background.scss'
import * as smoke from '@assets/Smoke-Element.png'

export default class Background extends Component<{}, {}> {
  static COLOR = 0x102030
  static LIGHT_COLOR = 0xffffff
  static PARTICLE_COUNT = 150
  static CAMERA_FOV = 75
  static CAMERA_NEAR = 1
  static CAMERA_FAR = 1000
  static CAMERA_Z = 1000
  static MATERIAL_COLOR = 0xffffff
  static PLANE_SIZE = 300
  static LATERAL_RANGE = 500
  static AZIMUTH_RANGE = 1000
  static ROTATION_INCREMENT = 0.1

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
    this.cubeSineDriver = 0
    this.clock = new THREE.Clock()
    this.smokeParticles = []
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
    const smokeTexture = new THREE.TextureLoader().load(smoke)
    const smokeMaterial = new THREE.MeshLambertMaterial({color: Background.MATERIAL_COLOR, map: smokeTexture, transparent: true})
    const smokeGeometry = new THREE.PlaneGeometry(300,300)
    for (let count = 0; count < 150; count++) {
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
    this.smokeParticles.forEach(particle => particle.rotation.z += (this.delta * Background.ROTATION_INCREMENT), this)
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
    this.initializeScene()
    this.generateLight()
    this.generateParticles()
    this.animate()
  }
}
