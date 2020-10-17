import Playground from '@/components/global/Playground.vue'

export default {
  title: 'global/Playground',

  component: Playground
}

export const DEFAULT = () => ({
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<playground><div>This is playground</div></playground>'
})
