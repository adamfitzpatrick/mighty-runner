import { h, Component } from 'preact'
import Match from 'preact-router/match'
import classnames from 'classnames'
import * as THREE from 'three'

import LandGenerator from './land-generator'

import * as styles from './digi-grid-background.scss'

interface WebGLWindow extends Window {
  WebGLRenderingContext: boolean
}

class SpeedVector extends THREE.Vector3 {
  speed: number

  constructor (x: number, y: number, z: number, speed: number) {
    super(x, y, z)
    this.speed = speed
  }
}

interface State {
  glReady: boolean
}

export default class DigiGridBackground extends Component<{}, State> {
  static RENDER_DELAY = 0
  static BASE_WIDTH = 375
  static WIDTH_POWER = 0.5
  static LAND_WIDTH = 10
  static LAND_DEPTH = 15
  static LAND_RESOLUTION = 150
  static LAND_GENERATOR_FREQS = [ 1/2, 1 ]
  static LAND_GENERATOR_AMPS = [ 0.5, 0.1 ]
  static CAMERA_X = 0
  static CAMERA_Z = 10
  static CAMERA_Y = 3
  static LOOK_Z = -5
  static STAR_SIZE = 0.06
  static MIN_STAR_SPEED = 0.005
  static MAX_STAR_SPEED = 0.01
  static TRAIL_TRANSPARENCIES = [
    0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1
  ]

  private scene: THREE.Scene
  private camera: THREE.Camera
  private renderer: THREE.WebGLRenderer
  private landGenerator: LandGenerator
  private glLandGroup: THREE.Group
  private stars: SpeedVector[]
  private starPoints: THREE.Points[]

  static getScaledWidth = () => {
    return Math.pow(
      window.innerWidth / DigiGridBackground.BASE_WIDTH,
      DigiGridBackground.WIDTH_POWER
    ) * DigiGridBackground.LAND_WIDTH
  }

  state = {
    glReady: false
  }

  constructor () {
    super()
    this.setupDelayedGl()
  }

  render () {
    return (
      <div className={styles.digiGrid}>
        <div id='digibackground' className={classnames(
          styles.glContainer,
          { [styles.glContainerVisible]: this.state.glReady }
        )} />
        <Match path='/characters'>
          { this.renderObscurer }
        </Match>
      </div>
    )
  }

  private renderObscurer = ({ matches }: { matches: boolean }) => {
    return matches ? <div className={styles.obscured} /> : null
  }

  private setupDelayedGl () {
    setTimeout(this.runGl, DigiGridBackground.RENDER_DELAY)
  }

  private runGl = () => {
    if (this.compatibilityCheck()) {
      this.landGenerator = new LandGenerator(
        DigiGridBackground.LAND_GENERATOR_FREQS,
        DigiGridBackground.LAND_GENERATOR_AMPS
      )
      this.initialize()
      this.setCamera()
      this.lighting()
      this.generateLand()
      this.initializeStars()
      this.animate()
      document.getElementById('digibackground')!.appendChild(this.renderer.domElement)
      this.setState({ glReady: true })
    }
  }

  private compatibilityCheck = (): boolean => {
    try {
      var canvas = document.createElement('canvas');
      return !! ((window as WebGLWindow).WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  private initialize = () => {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x102030)
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', this.onWindowResize)
    this.renderer.sortObjects = false
  }

  private setCamera = () => {
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
    this.camera.position.x = DigiGridBackground.CAMERA_X
    this.camera.position.z = DigiGridBackground.CAMERA_Z
    this.camera.position.y = DigiGridBackground.CAMERA_Y
    this.camera.lookAt(new THREE.Vector3(0, 0, DigiGridBackground.LOOK_Z))
  }

  private onWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private lighting = () => {
    // No lighting is required for this render
  }

  private landParametric = (u: number, v: number, target: THREE.Vector3) => {
    const widthFactor = Math.pow(window.innerWidth / 375, 0.5)
    const y = this.landGenerator.calculateHeight(
      u * DigiGridBackground.getScaledWidth(),
      v * DigiGridBackground.LAND_DEPTH
    )
    const x = u * DigiGridBackground.getScaledWidth()
    const z = v * DigiGridBackground.LAND_DEPTH
    target.set( x, y, z );
  };

  private generateLand = () => {
    const geometry = new THREE.ParametricGeometry(
      this.landParametric,
      DigiGridBackground.LAND_RESOLUTION,
      DigiGridBackground.LAND_RESOLUTION
    )

    geometry.center()
    this.glLandGroup = new THREE.Group()

    const dimMaterial = new THREE.PointsMaterial({ color: 0x0000ff, size: 0.1, transparent: true, opacity: 0.2 })
    this.glLandGroup.add(new THREE.Points(geometry, dimMaterial))
    const brightMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 })
    this.glLandGroup.add(new THREE.Points(geometry, brightMaterial))

    this.scene.add(this.glLandGroup)
  }

  private initializeStars = () => {
    const geometry = this.initializeStarPositions()
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: DigiGridBackground.STAR_SIZE })
    this.starPoints = [ new THREE.Points(geometry, material) ]
    this.initializeStarTrails(geometry)
    this.starPoints.forEach(points => this.scene.add(points))
  }

  private initializeStarPositions = () => {
    this.stars = new Array(30).fill(null).map(() => {
      const x = THREE.Math.randFloat(
        -1 * DigiGridBackground.getScaledWidth() / 4,
        DigiGridBackground.getScaledWidth() / 4
      )
      const y = THREE.Math.randFloat(0, DigiGridBackground.getScaledWidth() / 2)
      const z = THREE.Math.randFloatSpread(DigiGridBackground.LAND_DEPTH / 3)
      return new SpeedVector(x, y, z, THREE.Math.randFloat(DigiGridBackground.MIN_STAR_SPEED, DigiGridBackground.MAX_STAR_SPEED))
    })
    const geometry = new THREE.Geometry()
    geometry.vertices = this.stars
    return geometry
  }

  private initializeStarTrails = (geometry: THREE.Geometry) => {
    DigiGridBackground.TRAIL_TRANSPARENCIES.forEach((trail, index) => {
      const trailMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: DigiGridBackground.STAR_SIZE,
        transparent: true,
        opacity: trail
      })
      const points = new THREE.Points(geometry, trailMaterial)
      points.position.y -= DigiGridBackground.STAR_SIZE * index / 2
      this.starPoints.push(points)
    })
  }

  private renderStars = () => {
    this.stars.forEach(star => {
      star.y += star.speed
      if (star.y > DigiGridBackground.LAND_WIDTH / 2) {
        star.y = 0
      }
    })
    const geometry = new THREE.Geometry()
    geometry.vertices = this.stars
    this.starPoints.forEach(points => points.geometry = geometry)
  }

  private animate = () => {
    this.renderStars()
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera);
  }
}
