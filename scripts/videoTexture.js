import * as THREE from 'three'
import Stats from 'stats-js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

function videoTexture() {
  // variables
  const WIDTH = 500,
    HEIGHT = 500,
    container = document.getElementById('videoTexture'),
    videoTextureStats = document.getElementById('videoTextureStats'),
    videoTextureControls = document.getElementById('videoTextureControls')

  let renderer, camera, scene, material, gui, light, stats, controls

  function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor('#eee')
    // 添加阴影效果
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)
  }

  function initCamera() {
    camera = new THREE.PerspectiveCamera(
      45,
      WIDTH / HEIGHT,
      0.1,
      2000
    )
    camera.position.set(0, 0, 20)
  }

  function initScene() {
    scene = new THREE.Scene()
  }

  function initGui() {
    gui = new GUI({
      container: videoTextureControls
    })
  }

  function initLight() {
    scene.add(new THREE.AmbientLight('#444'))

    light = new THREE.DirectionalLight()
    light.position.set(0, 20, 20)
    light.castShadow = true
    light.shadow.camera.top = 10
    light.shadow.camera.bottom = -10
    light.shadow.camera.left = -10
    light.shadow.camera.right = 10

    // 开启阴影投射
    light.castShadow = true

    scene.add(light)
  }

  function initModel() {
    // 辅助线工具
    // const helper = new THREE.AxesHelper(50)
    // scene.add(helper)

    // 添加立方体
    let geometry = new THREE.BoxGeometry(10, 6, 8)

    // video 对象
    const video = document.getElementById('video')

    // video 对象实例化纹理
    const texture = new THREE.VideoTexture(video)
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
    texture.minFilter = THREE.LinearFilter

    material = new THREE.MeshBasicMaterial({ map: texture, })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = 0.5
    mesh.rotation.y = -0.1
    // mesh.rotation.set(-0.5, 0.5, 0.5)

    scene.add(mesh)
  }

  function initStats() {
    stats = new Stats()
    videoTextureStats.appendChild(stats.dom)
  }

  function initControls() {
    controls = new OrbitControls(camera, renderer.domElement)
    // 设置中心点
    controls.target.set(0, 0.1, 0.1)
    // 如果使用 animate 方法, 则去除该函数
    // controls.addEventListener('change', render)
    // 动画循环使用时阻尼或自转, 表示是否有惯性
    controls.enableDamping = true
    // 动态阻尼系数, 鼠标拖拽旋转灵敏度
    controls.dampingFactor = 0.25
    // 是否可缩放
    controls.enableZoom = true
    // 是否自动旋转
    controls.autoRotate = false
    controls.autoRotateSpeed = 0.5
    // 相机距离原点的最远/近距离
    controls.minDistance = 14
    controls.maxDistance = 30
    // 是否开启右键拖拽
  }

  function render() {}

  function animate() {
    render()

    // 性能插件更新
    stats.update()

    controls.update()

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
  }

  function draw() {
    // 兼容性判断
    // if(!Detector.webgl) Detector.addGetWebGLMessage()

    // initGui()
    initRender()
    initScene()
    initCamera()
    initLight()
    initModel()
    initControls()
    initStats()
    
    animate()
    window.onresize = onWindowResize
  }

  function onWindowResize() {
    camera.aspect = WIDTH / HEIGHT
    camera.updateProjectionMatrix()
    renderer.setSize(WIDTH, HEIGHT)
  }

  draw()
}

export default videoTexture
