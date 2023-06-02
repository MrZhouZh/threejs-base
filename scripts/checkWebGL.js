export default function isSupportWebGL() {
  // Check WebGL 兼容性检查
  // 引入文件: https://github.com/mrdoob/three.js/blob/master/examples/jsm/capabilities/WebGL.js
  if (WebGL.isWebGLAvailable()) {
    animate()
  } else {
    const warning = WebGL.getWebGLErrorMessage()
    document.getElementById('container').appendChild(warning)
  }
}
