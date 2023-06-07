import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import Stats from 'stats-js'

function loadingFBXModels() {
  const WIDTH = 500,
    HEIGHT = 500,
    container = document.getElementById('fbxModel'),
    fbxModelGUI = document.getElementById('fbxModelGUI'),
    fbxModelStats = document.getElementById('fbxModelStats')

  let renderer, camera, scene, gui, light, stats, controls, meshHelper, mixer, action
  const clock = new THREE.Clock()

  function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor('#eee')
    // 阴影效果
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
    camera.position.set(100, 200, 300)
  }

  function initScene() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color('#a0a0a0')
    scene.fog = new THREE.Fog('#a0a0a0', 200, 1000)
  }

  function initGui() {
    const param = {
      animation: action.paused,
      helper: meshHelper.visible,
    }
    gui = new GUI({ container: fbxModelGUI })

    gui.add(param, 'animation')
      .name('Action paused')
      .onChange(value => {
        action.paused = value
      })
    gui.add(param, 'helper')
      .name('Mesh helper')
      .onChange(value => {
        meshHelper.visible = value
      })
  }

  function initLight() {
    scene.add(new THREE.AmbientLight('#444'))

    light = new THREE.DirectionalLight('#fff')
    light.position.set(0, 200, 100)
    // 开启阴影投射
    light.castShadow = true
    light.shadow.camera.top = 100
    light.shadow.camera.bottom = -100
    light.shadow.camera.left = -120
    light.shadow.camera.right = 120
    
    scene.add(light)
  }

  function initModel() {
    const helper = new THREE.AxesHelper(50)
    scene.add(helper)

    // 地板
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({
        color: '#fff',
        depthWrite: false
      })
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true

    scene.add(mesh)

    // 地板割线
    const grid = new THREE.GridHelper(
      2000,
      20,
      '#000',
      '#000'
    )
    grid.material.opacity = 0.2
    grid.material.transparent = true
    scene.add(grid)

    // 加载模型
    let loader = new FBXLoader()
    loader.load(
      '/models/fbx/Samba Dancing.fbx',
      function(mesh) {
        // 骨骼辅助
        meshHelper = new THREE.SkeletonHelper(mesh)
        scene.add(meshHelper)

        // 设置模型的每个部位都可以投影
        mesh.traverse(function(child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        // AnimationMixer 是场景中特定对象的动画播放器, 当场景中的多个对象独立动画时, 可以为每个对象使用一个 AnimationMixer
        mixer = mesh.mixer = new THREE.AnimationMixer(mesh)
        // mixer.clipActino 返回一个可以控制动画的 AnimationAction 对象, 参数需要 AnimationClip 对象
        // AnimationAction.setDuration 设置一个循环所需要的时间, 当前设置了一秒, 告诉 AnimationAction 启动该动作
        action = mixer.clipAction(mesh.animations[0])
        action.play()
        initGui()

        scene.add(mesh)
      }
    )
  }

  function initStats() {
    stats = new Stats()
    fbxModelStats.appendChild(stats.dom)
  }

  function initControls() {
    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 100, 0)
    // 阻尼或自转
    controls.enableDamping = true
    // controls.dampingFactor = 0.25
    controls.enableZoom = true
    controls.autoRotate = false
    controls.autoRotateSpeed = 0.5
    controls.minDistance = 20
    controls.maxDistance = 400
    // 右键拖拽
    controls.enablePan = true
  }

  function render() {
    const time = clock.getDelta()
    if (mixer) {
      mixer.update(time)
    }

    controls.update()
  }

  function animate() {
    render()
    stats.update()
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
  }

  function draw() {
    // initGui()
    initRender()
    initScene()
    initCamera()
    initLight()
    initModel()
    initControls()
    initStats()

    animate()
    // window.onresize = onWindowResize
  }

  // function onWindowResize() {
  //   camera.aspect = WIDTH / HEIGHT
  //   camera.updateProjectionMatrix()
  //   renderer.setSize(WIDTH, HEIGHT)
  // }

  draw()
}

export default loadingFBXModels
