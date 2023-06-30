import { createCamera } from './components/camera'
import { createCube } from './components/cube'
import { createScene } from './components/scene'

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
    scene.add(cube)

    const resizer = new Resizer(container, camera, renderer)
  }

  render() {
    renderer.render(scene, camera)
  }
}

export { World }
