import ProjectCredit from '@/components/app/atoms/ProjectCredit.vue'

export default {
  title: 'app/atoms/ProjectCredit',
  components: ProjectCredit
}

export const DEFAULT = () => ({
  template: '<project-credit name="Test" />'
})
