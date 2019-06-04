import { h, Component } from 'preact'
import * as THREE from 'three'
import { inject, observer } from 'mobx-preact'

import { AppStateProps, AppState } from '@state/app-state-store'
import * as styles from './background.scss'
import { Vector2 } from 'three';

interface WebGLWindow extends Window {
  WebGLRenderingContext: boolean
}

interface Props extends AppStateProps {}

@inject('appState')
@observer
export default class Background extends Component<Props, {}> {
  static viewportCoords = (vw: number, vh: number): THREE.Vector2 => {
    const maxHeight = Background.CAMERA_POSITION_Z * Math.tan(Background.CAMERA_FOV * Math.PI / 360)
    const ratio = window.innerHeight / 2 / maxHeight // pixels per threejs unit at z = 0
    const maxWidth = window.innerWidth / ratio / 2
    return new THREE.Vector2((vw - 50) / 50 * maxWidth, -1 * (vh - 50) / 50 * maxHeight)
  }

  static viewportDistance = (vw: number, vh: number): THREE.Vector2 => {
    const maxVector = Background.viewportCoords(100, 100)
    return new THREE.Vector2(vw / 50 * maxVector.x, -1 * vh / 50 * maxVector.y)
  }

  static AMBIENT_COLOR = 0x102030
  static LIGHT_COLOR = 0xffffff

  static CAMERA_POSITION_X = 0
  static CAMERA_POSITION_Y = 0
  static CAMERA_POSITION_Z = 10
  static CAMERA_FOV = 45
  static CAMERA_NEAR = 1
  static CAMERA_FAR = 2000

  static STAGE_CENTER = new THREE.Vector3(0, 0, 0)

  static SPOTLIGHT_BASE_INTENSITY = 5
  static SPOTLIGHT_ORBITAL_RANGE = Background.viewportCoords(150, -50)
  static SPOTLIGHT_ORBITAL_FREQUENCY = 0.005
  static SPOTLIGHT_POSITION = Background.viewportCoords(130, 10)
  static SPOTLIGHT_POSITION_Z = 4
  static SPOTLIGHT_POSITION_HOME_SPEED = 0.5
  static AMBIENT_BASE_INTENSITY = 4
  static ACCENT_BASE_INTENSITY = 3
  static ACCENT_POSITION = Background.viewportCoords(-10, -10)

  private scene: THREE.Scene
  private camera: THREE.Camera
  private renderer: THREE.WebGLRenderer
  private mat: THREE.Mesh
  private spotlight: THREE.SpotLight
  private ambientLight: THREE.AmbientLight
  private accentLight: THREE.DirectionalLight
  private time: number = 0
  private drivingFunction: () => void
  private stopAnimator = false

  constructor () {
    super()
    this.drivingFunction = this.loadingDriver
  }

  render () {
    if (this.props.appState!.currentState === AppState.LOADING_COMPLETE) {
      this.drivingFunction = this.homeDriver
    }
    return (
      <div className={styles.digiGrid}>
        <div id='digibackground' />
      </div>
    )
  }

  componentDidMount () {
    this.runGl()
  }

  private runGl = () => {
    if (this.compatibilityCheck()) {
      return this.loadDependencies().then(this.initialize)
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

  private loadDependencies = async () => {
    /* Future pre-loaded dependencies can be added here. */
  }

  private initialize = () => {
    this.setScene()
    this.setRenderer()
    this.setCamera()
    this.makeGeometry()
    this.initializeLighting()
    document.getElementById('digibackground')!.appendChild(this.renderer.domElement)
    this.animate()
    // TODO Remove this
    setTimeout(() => this.props.appState!.currentState = AppState.LOADING_COMPLETE, 1000)
  }

  private setScene = () => {
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(Background.AMBIENT_COLOR, .1)
    this.scene.background = new THREE.Color(Background.AMBIENT_COLOR)
  }

  private setRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', this.onWindowResize)
    this.renderer.sortObjects = false
  }

  private onWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private setCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      Background.CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      Background.CAMERA_NEAR,
      Background.CAMERA_FAR
    )
    this.camera.position.x = Background.CAMERA_POSITION_X
    this.camera.position.y = Background.CAMERA_POSITION_Y
    this.camera.position.z = Background.CAMERA_POSITION_Z
    this.camera.lookAt(Background.STAGE_CENTER)
  }

  private makeGeometry () {
    const size = Background.viewportDistance(100, 100)
    const matGeometry = new THREE.PlaneBufferGeometry(size.x, size.y)
    const matMaterial = new THREE.MeshStandardMaterial({ color: Background.AMBIENT_COLOR })
    this.mat = new THREE.Mesh(matGeometry, matMaterial)
    this.scene.add(this.mat)
  }

  private initializeLighting = () => {
    this.spotlight = new THREE.SpotLight(Background.LIGHT_COLOR, Background.SPOTLIGHT_BASE_INTENSITY)
    this.spotlight.lookAt(Background.STAGE_CENTER)
    this.scene.add(this.spotlight)

    this.ambientLight = new THREE.AmbientLight(
      Background.LIGHT_COLOR,
      Background.AMBIENT_BASE_INTENSITY
    )
    this.scene.add(this.ambientLight)

    this.accentLight = new THREE.DirectionalLight(
      Background.LIGHT_COLOR,
      Background.ACCENT_BASE_INTENSITY / 3
    )
    const accentPosition = Background.ACCENT_POSITION
    this.accentLight.position.set(accentPosition.x, accentPosition.y, Background.CAMERA_POSITION_Z)
    this.accentLight.lookAt(Background.STAGE_CENTER)
    this.scene.add(this.accentLight)
  }

  private accentLightIsHome = () => {
    return this.accentLight.intensity >= Background.ACCENT_BASE_INTENSITY
  }

  private incrementAccentLightHome = () => {
    if (!this.accentLightIsHome()) {
      this.accentLight.intensity += 0.1
    }
  }

  private spotlightIsHome = () => {
    const home = Background.SPOTLIGHT_POSITION
    return Math.abs(this.spotlight.position.y - home.y) < 0.1 &&
      Math.abs(this.spotlight.position.x - home.x) < 0.1
  }

  private incrementSpotlightHome = () => {
    const p = Background.SPOTLIGHT_POSITION_HOME_SPEED
    const h = Background.SPOTLIGHT_POSITION
    const y = (h.y - this.spotlight.position.y) * p + this.spotlight.position.y
    const x = (h.x - this.spotlight.position.x) * p + this.spotlight.position.x
    this.spotlight.position.set(x, y, Background.SPOTLIGHT_POSITION_Z)
  }

  private loadingDriver = () => {
    const range = Background.SPOTLIGHT_ORBITAL_RANGE
    const x = range.x * Math.sin(this.time * Background.SPOTLIGHT_ORBITAL_FREQUENCY)
    const y = range.y * Math.cos(this.time * Background.SPOTLIGHT_ORBITAL_FREQUENCY)
    this.spotlight.position.set(x, y, 4)
    this.time++
  }

  private homeDriver = () => {
    this.incrementSpotlightHome()
    this.incrementAccentLightHome()
    if (this.spotlightIsHome() && this.accentLightIsHome()) {
      this.stopAnimator = true
    }
  }

  private animate = () => {
    this.drivingFunction()
    this.renderer.render(this.scene, this.camera)
    if (!this.stopAnimator) {
      requestAnimationFrame(this.animate)
    }
  }
}
