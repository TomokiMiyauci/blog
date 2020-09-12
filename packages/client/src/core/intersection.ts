import { onMounted, isRef, getCurrentInstance } from '@nuxtjs/composition-api'
import { Ref } from '@vue/composition-api'

type Emitters = {
  outerEmitter?: string
  innerEmitter?: string
}

export default (
  target: Ref<HTMLElement> | Ref | { selectors: keyof HTMLElementTagNameMap; multiple?: boolean },
  emitter?: Emitters
): void => {
  const vm = getCurrentInstance()

  onMounted(() => {
    if (isRef(target)) {
      if ('$el' in target.value) {
        onIntersect(target.value.$el)
      } else {
        onIntersect(target.value)
      }
    } else if (target.multiple) {
      const nodeList = document.querySelectorAll(target.selectors)
      nodeList.forEach((target) => onIntersect(target))
    } else {
      const node = document.querySelector(target.selectors)
      if (node) onIntersect(node)
    }
  })

  const onIntersect = (target: Element, options = {}): void => {
    const observer = new IntersectionObserver(addEmitter, options)
    observer.observe(target)
  }

  const addEmitter = (entries: IntersectionObserverEntry[]): void => {
    const outersect = emitter?.outerEmitter
    const innersect = emitter?.innerEmitter
    entries.forEach((e) => {
      if (e.isIntersecting) {
        if (vm) {
          vm.$emit(outersect || 'outersect')
        }
      } else if (vm) {
        vm.$emit(innersect || 'intersect')
      }
    })
  }
}
