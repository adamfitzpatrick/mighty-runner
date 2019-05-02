import { h, Component } from 'preact'
import * as THREE from 'three'
import { inject, observer } from 'mobx-preact'

import * as styles from './digi-grid-background.scss'
import { AppState, AppStateProps, appState } from '@state/app-state-store'

interface WebGLWindow extends Window {
  WebGLRenderingContext: boolean
}

interface Props extends AppStateProps {}

@inject('appState')
@observer
export default class Background extends Component<Props, {}> {
  static CAMERA_POSITION_X = 0
  static CAMERA_POSITION_Y = 0
  static CAMERA_POSITION_Z = 10
  static AMBIENT_COLOR = 0x102030

  private scene: THREE.Scene
  private camera: THREE.Camera
  private renderer: THREE.WebGLRenderer
  private ground: THREE.Mesh
  private logo: THREE.Mesh
  private spotlight: THREE.SpotLight
  private frontLight: THREE.DirectionalLight
  private ambientLight: THREE.AmbientLight
  private accentLight: THREE.DirectionalLight
  private time: number = 0
  private drivingFunction: () => void
  private stopAnimator = false

  render () {
    if (this.props.appState!.currentState === 'LOADED') {
      this.drivingFunction = this.homePosition
    }
    return (
      <div className={styles.digiGrid}>
        <button onClick={this.changeState}>CHANGE</button>
        <div id='digibackground' />
      </div>
    )
  }

  changeState = () => {
    console.log('change')
    this.props.appState!.currentState = 'LOADED'
  }

  componentDidMount () {
    this.runGl()
  }

  private runGl = () => {
    if (this.compatibilityCheck()) {
      this.initialize()
      this.setCamera()
      this.makeGeometry()
      this.initializeLighting()
      document.getElementById('digibackground')!.appendChild(this.renderer.domElement)
      this.drivingFunction = this.loadingCamera
      this.animate()
    }
  }

  private compatibilityCheck = (): boolean => {
    try {
      const canvas = document.createElement('canvas')
      return !! ((window as WebGLWindow).WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
    } catch (e) {
      return false
    }
  }

  private initialize = () => {
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x102030, .1)
    this.scene.background = new THREE.Color(0x102030)
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', this.onWindowResize)
    this.renderer.sortObjects = false
  }

  private setCamera = () => {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
    this.camera.position.x = Background.CAMERA_POSITION_X
    this.camera.position.y = Background.CAMERA_POSITION_Y
    this.camera.position.z = Background.CAMERA_POSITION_Z
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  private makeGeometry () {
    const logoGeo = new THREE.CylinderBufferGeometry(1, 1, 0.5, 40, 1)
    const logoMat = new THREE.MeshStandardMaterial({ color: 0xa7231a })
    this.logo = new THREE.Mesh(logoGeo, logoMat)
    this.logo.position.z = 0.25
    this.logo.rotation.x = Math.PI / 2
    this.logo.castShadow = true
    this.scene.add(this.logo)

    const groundGeo = new THREE.PlaneBufferGeometry(30, 100)
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x102030 })
    this.ground = new THREE.Mesh(groundGeo, groundMat)
    this.ground.receiveShadow = true
    this.scene.add(this.ground)
  }

  private onWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private initializeLighting = () => {
    this.spotlight = new THREE.SpotLight(0xffffff, 5)
    this.spotlight.position.set(0, 0, 4)
    this.spotlight.castShadow = true
    this.spotlight.shadow.mapSize.width = 1024
    this.spotlight.shadow.mapSize.height = 1024
    this.spotlight.shadow.camera.near = 3
    this.spotlight.shadow.camera.far = 200
    this.spotlight.target = this.logo
    this.scene.add(this.spotlight)

    this.frontLight = new THREE.DirectionalLight(0xffffff, 1)
    this.frontLight.position.set(0, 0, 10)
    this.frontLight.target = this.logo
    this.scene.add(this.frontLight)

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    this.scene.add(this.ambientLight)

    this.accentLight = new THREE.DirectionalLight(0xffffff, 0)
    this.accentLight.position.set(-6, 6, 10)
    this.accentLight.target = this.logo
    this.scene.add(this.accentLight)
  }

  private loadingCamera = () => {
    const x = 10 * Math.sin(this.time * 0.005)
    const y = 15 * Math.cos(this.time * 0.005)
    this.spotlight.position.set(x, y, 4)
    this.time++
  }

  private configureHomeLighting = () => {
    this.accentLight.intensity += 0.1
    this.frontLight.intensity -= this.frontLight.intensity <= 0 ? 0 : 0.1 / 3
  }

  private lightsAreHome = () => {
    return this.accentLight.intensity >= 3 && this.frontLight.intensity <= 0
  }

  private spotlightIsHome = () => {
    return Math.abs(this.spotlight.position.y - 6) < 0.1 && Math.abs(this.spotlight.position.x - 6) < 0.1
  }

  private homePosition = () => {
    if (this.spotlightIsHome() && this.lightsAreHome()) {
      this.stopAnimator = true
      return
    } else if (this.spotlightIsHome()) {
      this.spotlight.position.set(6, 6, 4)
    }
    const p = 0.5
    const y = (6 - this.spotlight.position.y) * p + this.spotlight.position.y
    const x = (6 - this.spotlight.position.x) * p + this.spotlight.position.x
    this.spotlight.position.set(x, y, 4)
    this.configureHomeLighting()
  }

  private animate = () => {
    this.drivingFunction()
    this.renderer.render(this.scene, this.camera)
    if (!this.stopAnimator) {
      requestAnimationFrame(this.animate)
    }
  }
}
