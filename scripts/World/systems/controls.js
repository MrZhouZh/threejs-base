import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)

  // 启用阻尼增加真实感, 惯性物体运动
  controls.enableDamping = true

  controls.enablePan = false
  controls.enableZoom = false

  controls.tick = () => controls.update()

  return controls
}

export { createControls }
