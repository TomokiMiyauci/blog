import BaseTooltip from '@/components/atoms/BaseTooltip.vue'

export default {
  title: 'base/BaseTooltip',
  components: BaseTooltip
}

export const DEFAULT = () => ({
  template:
    '<base-tooltip><template #activator><span>This is activator</span></template><span>This is tooltip</span></base-tooltip>'
})
