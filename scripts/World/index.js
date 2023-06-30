import { World } from './World'

function generalWorldClass() {
  const container = document.getElementById('world')

  const world = new World(container)

  world.render()
}

export default generalWorldClass
