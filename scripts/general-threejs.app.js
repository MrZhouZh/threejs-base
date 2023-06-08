import * as THREE from 'three'

function generalThreejsApp() {
  const WIDTH = 500,
    HEIGHT = 500,
    container = document.getElementById('general')
  
  // 渲染器
  let renderer
  function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor('#fff', 1.0)
    container.appendChild(renderer.domElement)
  }

  // 相机
  let camera
  function initCamera() {
    camera = new THREE.PerspectiveCamera(
      70,
      WIDTH / HEIGHT,
      1,
      1000
    )
    camera.position.x = 0
    camera.position.y = 900
    camera.position.z = 0
    camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  // 场景
  let scene
  function initScene() {
    scene = new THREE.Scene()
  }

  // 光源
  let light
  function initLight() {
    light = new THREE.DirectionalLight('#f00', 1.0, 0)
    light.position.set(100, 100, 200)
    scene.add(light)
  }

  // 模型
  function initModel() {
    // 轴辅助 每个轴的长度
    const axesHelper = new THREE.AxesHelper()
    scene.add(axesHelper)

    const points = []
    points.push(new THREE.Vector3(-500, 0, 0))
    points.push(new THREE.Vector3(500, 0, 0))

    const geometry = new THREE.BufferGeometry()
      .setFromPoints(points)

    for (let i = 0; i <= 20; i++) {
      let line
      line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: randomColor(),
          opacity: 1
        })
      )
      line.position.z = (i * 50) - 500
      console.log(line, '-- line 1');
      scene.add(line)

      line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: randomColor(),
          opacity: 1,
        })
      )
      line.position.x = (i * 50) - 500
      line.rotation.y = 90 * Math.PI / 180
      console.log(line, '-- line 2');
      scene.add(line)
    }

  }

  // 绘制
  function draw() {
    initRender()
    initCamera()
    initScene()
    initLight()
    initModel()
    renderer.render(scene, camera)
  }

  // 随机颜色
  function randomColor() {
    let letters = '0123456789abcdef'
    let color = '#'
    // let color = '0x'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 15)]
    }

    // return color.toString() - 0
    return color
  }

  draw()
}

export default generalThreejsApp
