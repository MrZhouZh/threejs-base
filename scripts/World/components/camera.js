import { PerspectiveCamera } from 'three'

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field of View
    1,  // aspect ratio (dummy value)
    0.1,  // near clipping plane
    50,  // far clipping plane
  )

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10)
  // camera.position.set(-2, 2, 5)

  return camera
}

export { createCamera }
