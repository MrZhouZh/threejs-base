import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)

  controls.enablePan = false
  controls.enableZoom = false

  controls.tick = () => controls.update()

  return controls
}

export { createControls }
