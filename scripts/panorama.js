import { CubeTextureLoader, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function panorama() {
  const WIDTH = 500,
    HEIGHT = 500,
    container = document.querySelector('#panorama')

  let renderer,
    camera,
    scene,
    controls

  function initRender() {
    renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    container.appendChild(renderer.domElement)
  }

  function initScene() {
    scene = new Scene()
  }

  function initCamera() {
    camera = new PerspectiveCamera(
      45,
      WIDTH / HEIGHT,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 100)
    camera.lookAt(scene.position)
  }

  function initControls() {
    controls = new OrbitControls(camera, renderer.domElement)
  }

  function initModel() {
    let urls = [
      '/textures/home.right.jpg',
      '/textures/home.left.jpg',
      '/textures/home.top.jpg',
      '/textures/home.bottom.jpg',
      '/textures/home.front.jpg',
      '/textures/home.back.jpg',
    ]

    let cubeTexture = new CubeTextureLoader().load(urls)
    scene.background = cubeTexture
  }

  function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  function draw() {
    initRender()
    initScene()
    initCamera()
    initModel()
    
    render()
  }

  draw()
  initControls()
}

export default panorama
