import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { on } from './utils'

async function loadingModels() {
  const W = 500,
    H = 500,
    container = document.getElementById('model')
  
  let scene, camera, renderer, controls, texture, gltf

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

  controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render )
  controls.target.set(0, 0.01, 0.1)
  controls.maxDistance = 2
  controls.minDistance = 0.1
  controls.update()

  const rgbeLoader = new RGBELoader().setPath('textures/equirectangular/')
  const gltfLoader = new GLTFLoader().setPath('models/gltf/')

  try {
    [texture, gltf] = await Promise.all([
      rgbeLoader.loadAsync('royal_esplanade_1k.hdr'),
      gltfLoader.loadAsync('AnisotropyBarnLamp.glb')
    ])
  } catch (err) {
    console.error(err);
  }

  texture.mapping = THREE.EquirectangularReflectionMapping
  
  scene.background = texture
  scene.backgroundBlurriness = 0.5
  scene.environment = texture

  scene.add(gltf.scene)
  render()

  // on(window, 'resize', onWindowResize)

  // function onWindowResize() {
  //   camera.aspect = W / H
  //   camera.updateProjectionMatrix()
  //   renderer.setSize(W, H)
  //   render()
  // }

  function render() {
    renderer.render(scene, camera)
  }
}

export default loadingModels
