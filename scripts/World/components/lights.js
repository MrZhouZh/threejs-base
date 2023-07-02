import {
  AmbientLight,
  DirectionalLight,
} from 'three'

function createLights() {
  const ambientLight = new AmbientLight('white', 0.5)
  const mainLight = new DirectionalLight('white', 3)
    mainLight.position.set(10, 10, 10)
  
  return {
    ambientLight,
    mainLight
  }
}

export { createLights }
