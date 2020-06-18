import Dialog from './Dialog'

// import { merge } from '../../utils/helpers'

let localVueInstance
const isObject = (item) => typeof item === 'object' && !Array.isArray(item)
const merge = (target, source, deep = false) => {
  if (deep || !Object.assign) {
    const isDeep = (prop) =>
      isObject(source[prop]) &&
      target !== null &&
      Object.prototype.hasOwnProperty.call(target, prop) &&
      isObject(target[prop])
    const replaced = Object.getOwnPropertyNames(source)
      .map((prop) => ({
        [prop]: isDeep(prop)
          ? merge(target[prop], source[prop], deep)
          : source[prop]
      }))
      .reduce((a, b) => ({ ...a, ...b }), {})

    return {
      ...target,
      ...replaced
    }
  } else {
    return Object.assign(target, source)
  }
}
function open(propsData) {
  const vm =
    typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance
  const DialogComponent = vm.extend(Dialog)
  return new DialogComponent({
    el: document.createElement('div'),
    propsData
  })
}

const DialogProgrammatic = {
  alert(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      }
    }
    const defaultParam = {
      canCancel: false
    }
    const propsData = merge(defaultParam, params)
    return open(propsData)
  },
  confirm(params) {
    const defaultParam = {}
    const propsData = merge(defaultParam, params)
    return open(propsData)
  },
  prompt(params) {
    const defaultParam = {
      hasInput: true,
      confirmText: 'Done'
    }
    const propsData = merge(defaultParam, params)
    return open(propsData)
  }
}

Dialog.install = function(Vue) {
  localVueInstance = Vue
  Vue.component(Dialog.name, Dialog)
  Vue.prototype.$dialog = DialogProgrammatic
}

export default Dialog

export { DialogProgrammatic }
