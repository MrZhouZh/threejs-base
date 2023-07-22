import { BackSide, BoxGeometry, CylinderGeometry, Mesh, MeshPhongMaterial, PerspectiveCamera, PointLight, RepeatWrapping, Scene, TextureLoader, WebGLRenderer } from 'three'

function timeMachine() {
  const WIDTH = 500,
    HEIGHT = 500,
    container = document.querySelector('#timeMachine')

  let renderer,
    camera,
    scene,
    light,
    tunnel,
    stormTexture,
    H = 0

  function initRender() {
    renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    container.appendChild(renderer.domElement)
  }

  function initCamera() {
    camera = new PerspectiveCamera(
      45,
      WIDTH / HEIGHT,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 500)
    camera.lookAt(scene.position)
  }
  
  function initScene() {
    scene = new Scene()
  }
  
  function initLight() {
    light = new PointLight(0xffffff)
    light.position.set(0, 0, 500)
    scene.add(light)
  }
  
  function initModel() {
    const textureLoader = new TextureLoader()

    textureLoader.load('/textures/storm.jpeg', function(texture) {
      stormTexture = texture

      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.repeat.set(1, 2)

      const geometry = new CylinderGeometry(30, 50, 1000, 32, 32, true)
      const material = new MeshPhongMaterial({
        transparent: true,
        alphaMap: texture,
        side: BackSide,
      })

      tunnel = new Mesh(geometry, material)
      tunnel.rotation.x = -Math.PI / 2
      
      scene.add(tunnel)
    })

    // textureLoader.load('/textures/metal.png', texture => {
    //   texture.wrapS = texture.wrapT = RepeatWrapping
    //   texture.repeat.set(10, 10)

    //   const geometry = new BoxGeometry(30, 2, 30)
    //   const material = new MeshPhongMaterial({ map: texture })
    //   const cube = new Mesh(geometry, material)
    //   cube.position.y = -20
    //   cube.position.z = 460

    //   scene.add(cube)
    // })
  }

  function render() {
    renderer.render(scene, camera)

    H += 0.002
    if (H > 1) { H = 0 }

    if (tunnel) {
      tunnel.material.color.setHSL(H, 0.5, 0.5)
      tunnel.rotation.y += 0.01

      stormTexture.offset.y += 0.01
    }
    requestAnimationFrame(render)
  }

  function draw() {
    initRender()
    initScene()
    initCamera()
    initLight()
    initModel()

    render()
  }

  draw()
}

export default timeMachine
