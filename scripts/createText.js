import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { on, off } from './utils.js'

function createText() {
  THREE.Cache.enabled = true

  const W = 500 || window.innerWidth,
    H = 500 || window.innerHeight,
    container = document.getElementById('text'),
    textControls = document.getElementById('textControls'),
    height = 12,
    size = 70,
    hover = 30,
    curveSegments = 4,
    bevelThickness = 2,
    bevelSize = 1.5,
    mirror = true,
    fontMap = {
      'helvetiker': 0,
      'optimer': 1,
      'gentilis': 2,
      'droid/droid_sans': 3,
      'droid/droid_serif': 4
    },
    weightMap = {
      'regular': 0,
      'bold': 1
    },
    reverseFontMap = [],
    reverseWeightMap = []

  let camera,
    cameraTarget,
    scene,
    renderer,
    group,
    textMesh1,
    textMesh2,
    textGeo,
    materials,
    firstLetter = true,
    text = 'three.js',
    bevelEnabled = true,
    font = undefined,
    fontName = 'optimer',
    fontWeight = 'bold',
    targetRotation = 0,
    targetRotationOnpointerDown = 0,
    pointerX = 0,
    pointerXOnPointerDown = 0,
    windowHalfX = W / 2,
    fontIndex = 1

  for (const [k] of Object.entries(fontMap)) reverseFontMap[fontMap[k]] = k
  for (const [k] of Object.entries(weightMap)) reverseWeightMap[weightMap[k]] = k

  init()
  animate()

  function init() {
    // Camera
    camera = new THREE.PerspectiveCamera(
      30,
      W / H,
      1,
      1500
    )
    camera.position.set(0, 400, 800)
    cameraTarget = new THREE.Vector3(0, 150, 0)

    // Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color('#000')
    scene.fog = new THREE.Fog('#000', 250, 1400)

    const dirLight = new THREE.DirectionalLight('#fff', 0.125)
    dirLight.position.set(0, 0, 1).normalize()
    scene.add(dirLight)

    const pointLight = new THREE.PointLight('#fff', 1.5)
    pointLight.color.setHSL(Math.random(), 1, 0.5)
    pointLight.position.set(0, 100, 90)
    scene.add(pointLight)

    materials = [
      new THREE.MeshPhongMaterial({ color: '#fff', flatShading: true }),  // front
      new THREE.MeshPhongMaterial({ color: '#fff' })  // side
    ]

    group = new THREE.Group()
    group.position.y = 100

    scene.add(group)

    loadFont()

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.MeshBasicMaterial({ color: '#fff', opacity: 0.5, transparent: true, })
    )
    plane.position.x = -Math.PI / 2
    plane.position.y = 100
    console.log('plane-> ', plane);
    scene.add(plane)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(W, H)
    
    container.appendChild(renderer.domElement)

    container.style.touchAction = 'none'
    on(container, 'pointerdown', onPointerDown)
    
    on(document, 'keypress', onDocumentKeyPress)
    on(document, 'keydown', onDocumentKeyDown)

    const params = {
      changeColor() {
        pointLight.color.setHSL(Math.random(), 1, 0.5)
      },
      changeFont() {
        fontIndex++
        fontName = reverseFontMap[fontIndex % reverseFontMap.length]
        loadFont()
      },
      changeWeight() {
        if (fontWeight === 'bold') {
          fontWeight = 'regular'
        } else {
          fontWeight = 'bold'
        }
        
        loadFont()
      },
      changeBevel() {
        bevelEnabled = !bevelEnabled
        refreshText()
      }
    }

    const gui = new GUI({
      container: textControls,
    })
    gui.add(params, 'changeColor').name('change color')
    gui.add(params, 'changeFont').name('change font')
    gui.add(params, 'changeWeight').name('change weight')
    gui.add(params, 'changeBevel').name('change bevel')
    gui.open()

    // on(window, 'resize', onWindowResize)
  }

  function animate() {
    requestAnimationFrame(animate)
    render()
  }

  function render() {
    group.rotation.y += (targetRotation - group.rotation.y) * 0.05
    camera.lookAt(cameraTarget)
    renderer.clear()
    camera.aspect = W / H
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
  }

  function loadFont() {
    const loader = new FontLoader()
    loader.load(
      `/fonts/${fontName}_${fontWeight}.typeface.json`,
      function(response) {
        font = response
        refreshText()
      }
    )
  }

  function generateText() {
    textGeo = new TextGeometry(text, {
      font,
      size,
      height,
      curveSegments,
      bevelThickness,
      bevelSize,
      bevelEnabled
    })
    textGeo.computeBoundingBox()

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

    textMesh1 = new THREE.Mesh(textGeo, materials)
    textMesh1.position.x = centerOffset
    textMesh1.position.y = hover
    textMesh1.position.z = 0
    textMesh1.rotation.x = 0
    textMesh1.rotation.y = Math.PI * 2
    group.add(textMesh1)

    if (mirror) {
      textMesh2 = new THREE.Mesh(textGeo, materials)
      textMesh2.position.x = centerOffset
      textMesh2.position.y = -hover
      textMesh2.position.z = height
      textMesh2.rotation.x = Math.PI
      textMesh2.rotation.y = Math.PI * 2
      group.add(textMesh2)
    }
  }
  
  function refreshText() {
    group.remove(textMesh1)
    if (mirror) group.remove(textMesh2)
    if (!text) return

    generateText()
  }

  function onPointerDown(event) {
    if (event.isPrimary === false) return
    pointerX = event.clientX - windowHalfX
    targetRotationOnpointerDown = targetRotation
    
    on(document, 'pointermove', onPointerMove)
    on(document, 'pointerup', onPointerUp)
  }

  function onPointerMove(event) {
    if (event.isPrimary === false) return
    pointerX = event.clientX - windowHalfX
    targetRotation = targetRotationOnpointerDown + (pointerX - pointerXOnPointerDown) * 0.02
  }

  function onPointerUp(event) {
    if (event.isPrimary === false) return
    off(document, 'pointermove', onPointerMove)
    off(document, 'pointerup', onPointerUp)
  }

  function onDocumentKeyPress(event) {
    const keyCode = event.keyCode

    // backspace
    if (keyCode == 8) {
      event.preventDefault()
    } else {
      const ch = String.fromCharCode(keyCode)
      text += ch
      refreshText()
    }
  }

  function onDocumentKeyDown(event) {
    if (firstLetter) {
      firstLetter = false
      text = ''
    }

    const keyCode = event.keyCode

    // backspace
    if (keyCode == 8) {
      event.preventDefault()
      text = text.substring(0, text.length - 1)
      refreshText()

      return false
    }
  }

  function onWindowResize() {
    windowHalfX = W / 2
    camera.aspect = W / H
    camera.updateProjectionMatrix()

    renderer.setSize(W, H)
  }
}

export default createText
