import BaseMenu from '@/components/atoms/BaseMenu.vue'

export default {
  title: 'base/BaseMenu',
  components: BaseMenu,

  argTypes: {
    top: {
      control: 'boolean'
    },

    bottom: {
      control: 'boolean'
    }
  }
}

export const DEFAULT = () => ({
  template:
    '<div class="w-full h-full mt-16 bg-red-300 text-center"><base-menu v-bind="$props"><template #icon>hoge</template><template #menu><div><p>fijsof</p><p>fjsofs</p></div></template></base-menu></div>',

  props: {
    top: {
      default: false
    },

    bottom: {
      default: true
    }
  }
})
