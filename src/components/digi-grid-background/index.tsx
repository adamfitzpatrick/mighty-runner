import { h, Component } from 'preact'
import classnames from 'classnames'
import * as THREE from 'three'

import * as flynn from '@assets/images/melodium_flynn.png'
import { callExpression } from '@babel/types';
import LandGenerator from './land-generator';

interface DigiGridProps {
  clear?: boolean
}

export default class DigiGridBackground extends Component<DigiGridProps, {}> {
  static LAND_WIDTH = 10
  static LAND_DEPTH = 10
  static LAND_RESOLUTION = 100
  static LAND_GENERATOR_FREQS = [ 1/8, 1/2, 1 ]
  static LAND_GENERATOR_AMPS = [ 4, 2, 1 ]
  static CAMERA_Z = 20
  static CAMERA_Y = 3
  static LOOK_Z = -1

  scene: THREE.Scene
  camera: THREE.Camera
  renderer: THREE.WebGLRenderer
  landGenerator: LandGenerator
  glLand: THREE.Mesh
  lines: THREE.LineSegments

  constructor(props: DigiGridProps) {
    super(props)
    this.landGenerator = new LandGenerator(
      DigiGridBackground.LAND_GENERATOR_FREQS,
      DigiGridBackground.LAND_GENERATOR_AMPS
    )
    this.initialize()
    this.lighting()
    this.generateLand()
    this.animate()
  }

  initialize () {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
    this.camera.position.x = 0
    this.camera.position.z = DigiGridBackground.CAMERA_Z
    this.camera.position.y = DigiGridBackground.CAMERA_Y
    this.camera.lookAt(new THREE.Vector3(0, 0, DigiGridBackground.LOOK_Z))
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
  }

  lighting () {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.lookAt(new THREE.Vector3(0, 0, 0))
    directionalLight.position.x = -20

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

    this.scene.add(directionalLight)
    this.scene.add(ambientLight)
  }

  landParametric = (u: number, v: number, target: THREE.Vector3) => {
    const y = this.landGenerator.calculateHeight(u * DigiGridBackground.LAND_WIDTH, v * DigiGridBackground.LAND_DEPTH)
    const x = u * DigiGridBackground.LAND_WIDTH;
    const z = v * DigiGridBackground.LAND_DEPTH;
    target.set( x, y, z );
  };

  generateLand () {
    let geometry = new THREE.ParametricGeometry(
      this.landParametric,
      DigiGridBackground.LAND_RESOLUTION,
      DigiGridBackground.LAND_RESOLUTION
    )
    geometry.center()
    var material = new THREE.MeshLambertMaterial( { color: 0x0000ff, side: THREE.DoubleSide } )
    this.glLand = new THREE.Mesh( geometry, material )
    this.scene.add(this.glLand)
  }

  animate = () => {
    this.glLand.rotateY(0.005)
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera);
  }

  render () {
    return (
      <span />
    )
  }
}
