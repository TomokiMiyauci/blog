<template>
  <div class="relative">
    <lazy-button-report @click.stop="isOpen ? close() : open()" />
    <transition name="fade-up">
      <div
        v-if="isOpen"
        v-click-outside="onClose"
        class="card-anotation text-gray-900 absolute rounded-lg bg-white px-6 py-4 right-0 shadow hover:shadow-xl"
        style="bottom: 65px"
      >
        <lazy-button-close class="absolute dark-hover:text-white right-0 top-0" @click="onClose" />
        <h2 class="text-lg pr-10 whitespace-no-wrap">{{ $t('COMMENT.REPORT.HEADER') }}</h2>
        <hr class="mt-1" />
        <p class="mt-3">
          <lazy-mdi-alert /><span class="ml-2">{{ $t('COMMENT.REPORT.ALERT') }}</span>
        </p>
        <div class="flex justify-center mt-1">
          <lazy-spin-loader v-show="state" width="48" height="48" />
          <lazy-button-send v-show="!state" class="dark-hover:text-white" @click="onReport" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import outsideClick from '@/directives/outside-click'
  import { reportedUserDoc, userDoc } from '@/utils/firestore-reference'
  import { defineComponent, ref, useContext } from 'nuxt-composition-api'

  const useDialog = () => {
    const isOpen = ref<boolean>(false)

    const open = (): void => {
      isOpen.value = true
    }

    const close = (): void => {
      isOpen.value = false
    }

    return { isOpen, open, close }
  }

  const useSwitch = () => {
    const state = ref<boolean>(false)

    const on = (): void => {
      state.value = true
    }

    const off = (): void => {
      state.value = false
    }

    return { state, on, off }
  }

  const useReportViolation = (props: { id: string }) => {
    const ctx = useContext()
    const reportViolation = (): Promise<void> => {
      return reportedUserDoc(ctx, props.id).set({
        userRef: userDoc(ctx),
        createdAt: ctx.$fireStoreObj.FieldValue.serverTimestamp()
      })
    }

    return { reportViolation }
  }

  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true
      }
    },

    directives: {
      'click-outside': outsideClick
    },

    setup(props, { emit }) {
      const { reportViolation } = useReportViolation(props)
      const { isOpen, open, close } = useDialog()
      const { state, on, off } = useSwitch()

      const onClose = () => {
        close()
        off()
      }
      const onReport = async () => {
        on()
        await reportViolation()
        emit('report')
        close()
        off()
      }

      return { isOpen, open, close, state, on, off, onReport, onClose }
    }
  })
</script>

<style scoped lang="scss">
  .card-anotation {
    & ::before {
      right: 12px;
      bottom: -17px;
      content: '';
      border-top: 15px solid rgba(0, 0, 0, 0.01);
      border-right: 13px solid transparent;
      border-left: 13px solid transparent;
      @apply absolute;
    }

    & ::after {
      right: 12px;
      bottom: -15px;
      content: '';
      border-top: 15px solid white;
      border-right: 13px solid transparent;
      border-left: 13px solid transparent;
      @apply absolute;
    }
  }
</style>
