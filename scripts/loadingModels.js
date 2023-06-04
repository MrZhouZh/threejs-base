import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function loadingModels() {
  const W = 500,
    H = 500,
    container = document.getElementById('model')
  
  let scene, camera, renderer, controls

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#f6eedc')

  camera = new THREE.PerspectiveCamera(
    75,
    W / H,
    0.1,
    1000
  )
  camera.position.set(-0.35, -0.2, 0.35)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(W, H)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.35
  container.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  loader.load(
    '/models/gltf/AnisotropyBarnLamp.glb',
    function(gltf) {
      scene.add(gltf.scene)
      render()
    },
    undefined,
    function(err) {
      console.error(err)
    }
  )

  controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render )
  controls.target.set(0, 0.01, 0.1)
  controls.maxDistance = 2
  controls.minDistance = 0.1
  controls.update()

  function render() {
    renderer.render(scene, camera)
  }
}

export default loadingModels
