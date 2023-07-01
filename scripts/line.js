import * as THREE from 'three'

function drawLine() {
  const W = 500,
    H = 500,
    container = document.getElementById('line')
  
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x8fbcd4)
  const camera = new THREE.PerspectiveCamera(
    45,
    W / H,
    1,
    500
  )
  
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)
  const material = new THREE.LineBasicMaterial({ color: '#f00' })
  const points = []
  points.push(new THREE.Vector3(-10, 0, 0))
  points.push(new THREE.Vector3(0, 10, 0))
  points.push(new THREE.Vector3(10, 0, 0))
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(W, H)
  container.appendChild(renderer.domElement)
  
  // 画线
  const line = new THREE.Line(geometry, material)
  scene.add(line)
  
  renderer.render(scene, camera)
}

export default drawLine
