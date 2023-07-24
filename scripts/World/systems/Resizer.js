import { on } from "../../utils";

// constants
const width = 500
const height = 500
const setSize = (container, camera, renderer) => {
  // container.clientWidth = width
  // container.clientHeight = height
  console.log(container.clientWidth, container.clientHeight);
  // Set the camera's aspect ratio
  camera.aspect = width / height
  // update the camera's frustum
  camera.updateProjectionMatrix()
  // update the size of the renderer and the canvas
  renderer.setSize(width, height)
  // set the pixel ratio (for mobile devices)
  renderer.setPixelRatio(window.devicePixelRatio)
}
class Resizer {
  constructor(container, camera, renderer) {
    setSize(container, camera, renderer)
    
    // window.addEventListener('resize', () => {
    //   setSize(container, camera, renderer)
    //   // perform  any custom actions
    //   this.onResize()
    // })

    on(window, 'resize', () => {
      setSize(container, camera, renderer)
      // perform  any custom actions
      this.onResize()
    })
  }

  onResize() {
    // 
  }
}

export { Resizer }
