export default {
  title: 'global/Alert',
  argTypes: {
    type: {
      defaultValue: 'info',
      description: 'info | success | warning |danger',
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'option' },
        defaultValue: { summary: 'info' }
      },
      control: {
        type: 'select',
        options: ['info', 'success', 'warning', 'danger']
      }
    }
  }
}

export const DEFAULT = () => ({
  template: '<alert :type="type">This is alert</alert>',
  props: {
    type: {
      default: 'info'
    }
  }
})
