import { World } from './world-lib'

function generalWorldClass() {
  const container = document.getElementById('world')

  const world = new World(container)

  // render a frame
  world.render()
  // animation
  // world.start()
}

export default generalWorldClass
