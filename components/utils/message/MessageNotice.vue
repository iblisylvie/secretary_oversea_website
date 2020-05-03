<template>
  <Message v-bind="$options.propsData" @close="close" />
</template>

<script>
import Message from './Message'
import NoticeMixin from './NoticeMixin.js'

export default {
  name: 'MessageNotice',
  components: {
    Message
  },
  mixins: [NoticeMixin],
  props: {
    indefinite: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newDuration: this.duration
    }
  }
}
</script>
