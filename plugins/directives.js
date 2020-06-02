import Vue from 'vue'
import { isFunction } from 'lodash-es'

Vue.directive('click-outside', {
  bind(el, binding, vNode) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        const invoker = vNode.context[binding.expression]
        if (isFunction(invoker)) {
          invoker(event)
        }
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind(el) {
    // @TODO
    // check whether unbind when lead to other page
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})
