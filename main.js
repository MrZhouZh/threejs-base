import createScene from './scripts/scene.js'
import drawLine from './scripts/line.js'
import createText from './scripts/createText.js'
import loadingModels from './scripts/loadingModels.js'
import videoTexture from './scripts/videoTexture.js'
import loadingFBXModels from './scripts/loadingFbxModels.js'
import generalThreejsApp from './scripts/general-threejs.app.js'
import generalWorldClass from './scripts/World'
import './style.css'

createScene()
drawLine()
createText()
loadingModels()
videoTexture()
loadingFBXModels()
generalThreejsApp()
generalWorldClass()
