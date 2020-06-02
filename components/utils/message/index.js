import Message from './Message'
import MessageNotice from './MessageNotice'

let localVueInstance
const MessageProgrammatic = {
  open(params) {
    let parent
    if (typeof params === 'string') {
      params = {
        message: params
      }
    }

    if (params.parent) {
      parent = params.parent
      delete params.parent
    }

    const vm =
      typeof window !== 'undefined' && window.Vue
        ? window.Vue
        : localVueInstance
    const MessageComponent = vm.extend(MessageNotice)
    return new MessageComponent({
      parent,
      el: document.createElement('div'),
      propsData: params
    })
  }
}

Message.install = function(Vue) {
  localVueInstance = Vue
  Vue.component(Message.name, Message)
  Vue.prototype.$message = MessageProgrammatic
}

export default Message

export { MessageProgrammatic }
