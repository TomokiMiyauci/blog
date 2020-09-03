export default {
  title: 'TimerReadingTime'
}

export const DEFAULT = () => ({
  template: '<timer-reading-time :text="text" />',
  props: {
    text: {
      default: '2 min read'
    }
  }
})
