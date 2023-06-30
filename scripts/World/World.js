import { createCamera } from './components/camera'
import { createCube } from './components/cube'
import { createScene } from './components/scene'
import { createLights } from './components/lights'

import { createRenderer } from './systems/renderer'
import { Resizer } from './systems/Resizer'

let camera,
  renderer,
  scene

class World {
  constructor(container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    container.append(renderer.domElement)

    const cube = createCube()
    const light = createLights()
    scene.add(cube, light)

    const resizer = new Resizer(container, camera, renderer)
  }

  render() {
    renderer.render(scene, camera)
  }
}

export { World }
