import { createCamera } from './components/camera'
import { createCube } from './components/cube'
import { createScene } from './components/scene'
import { createLights } from './components/lights'

import { createRenderer } from './systems/renderer'
import { createControls } from './systems/controls'
import { Loop } from './systems/Loop'
import { Resizer } from './systems/Resizer'

let camera,
  renderer,
  scene,
  loop

class World {
  constructor(container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    const controls = createControls(camera, renderer.domElement)
    loop = new Loop(camera, scene, renderer)
    container.append(renderer.domElement)

    const cube = createCube()
    const light = createLights()
    // disabled mesh rotation
    // loop.updatables.push(cube)
    loop.updatables.push(controls)
    scene.add(cube, light)
    
    this.start()

    controls.addEventListener('change', () => {
      this.render()
    })

    const resizer = new Resizer(container, camera, renderer)
    resizer.onResize = () => {
      this.render()
    }
  }

  render() {
    renderer.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export { World }
