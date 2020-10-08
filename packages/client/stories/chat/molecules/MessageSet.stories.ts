import MessageSet from '@/components/chat/molecules/MessageSet.vue'

export default {
  title: 'chat/molecules/MessageSet',
  components: MessageSet,

  argTypes: {
    name: {
      control: 'text'
    },

    text: {
      control: 'text'
    },

    date: {
      control: 'date'
    },

    isUser: {
      control: 'boolean'
    }
  }
}

export const DEFAULT = () => ({
  template: '<message-set v-bind="$props" />',

  props: {
    name: {
      default: 'name'
    },

    text: {
      default: 'test message'
    },

    date: {
      default: new Date()
    },

    isUser: {
      default: false
    }
  }
})
