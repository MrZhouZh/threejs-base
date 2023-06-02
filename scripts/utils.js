export const on = (function() {
  return function(element, event, handler, useCapture = false) {
    if (element && event && handler) {
      element.addEventListener(event, handler, useCapture)
    }
  }
})()

export const off = (function() {
  return function(element, event, handler, useCapture = false) {
    if (element && event) {
      element.removeEventListener(event, handler, useCapture)
    }
  }
})()
