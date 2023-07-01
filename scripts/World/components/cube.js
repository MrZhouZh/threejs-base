import {
  BoxGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  // MeshStandardMaterial,
  TextureLoader,
} from 'three'

function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(
    '/textures/uv-test-bw.png'
  )

  texture.anisotropy = 16

  console.log('texture...', texture);
  // create a default (white) Basic material
  // const material = new MeshBasicMaterial()
  // create a "standard" material
  const material = new MeshBasicMaterial({
    map: texture,
  })
  return material
}

function createCube() {
  const geometry = new BoxGeometry(2, 2, 2)

  const material = createMaterial()

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, 0.8)

  const radiansPerSecond = MathUtils.degToRad(30)

  cube.tick = (delta) => {
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
    cube.rotation.z += radiansPerSecond * delta
  }

  return cube
}

export { createCube }
