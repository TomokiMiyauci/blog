import { DirectiveOptions, DirectiveFunction } from 'vue'
import { DirectiveBinding } from 'vue/types/options'

const validate = (binding: DirectiveBinding): boolean => {
  if (typeof binding.value !== 'function') {
    // eslint-disable-next-line no-console
    console.warn('Directive[click-outside]: provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

const bind: DirectiveFunction = (el: HTMLElement, binding: DirectiveBinding): void => {
  if (!validate(binding)) return
  el.onclick = (e) => {
    e.stopPropagation()
  }

  el.ontouchstart = (e) => {
    e.stopPropagation()
  }

  document.addEventListener(
    'click',
    () => {
      binding.value()
    },
    { once: true }
  )
  document.addEventListener(
    'touchstart',
    () => {
      binding.value()
    },
    { once: true }
  )
}

const OutsideClickDirective: DirectiveOptions = {
  bind
}

export default OutsideClickDirective
