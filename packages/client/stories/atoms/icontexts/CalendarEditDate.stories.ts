export default {
  title: 'CalendarEditDate',
  argTypes: {
    date: { control: 'text', description: 'Date or String' }
  }
}

export const DEFAULT = () => ({
  template: '<calendar-edit-date :date="date" />',
  props: {
    date: {
      default: new Date()
    }
  }
})

DEFAULT.args = { date: new Date() }
