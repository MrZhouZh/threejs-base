import * as THREE from 'three'

function createScene() {
  const W = 500,
    H = 500,
    container = document.getElementById('scene')
  
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x8fbcd4)
  const camera = new THREE.PerspectiveCamera(
    75,
    W / H,
    0.1,
    1000
  )
  
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(W, H)
  container.appendChild(renderer.domElement)
  
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  camera.position.z = 5
  
  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  
  animate()
}

export default createScene
