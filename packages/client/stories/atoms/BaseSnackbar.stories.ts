import BaseSnackbar from '@/components/atoms/BaseSnackbar.vue'

export default {
  title: 'Base/BaseSnackbar',
  component: BaseSnackbar,

  argTypes: {
    message: {
      control: 'text'
    }
  }
}

export const DEFAULT = () => ({
  template: '<base-snackbar :message="message" class="max-w-xs" />',

  props: {
    message: {
      default: ''
    }
  }
})
