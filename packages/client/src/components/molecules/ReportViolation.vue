<template>
  <div class="relative">
    <button-report @click.stop="dialog ? hideDialog() : showDialog()" />
    <transition name="fade-up">
      <div
        v-if="dialog"
        v-outside-click="onClose"
        class="card-anotation text-gray-900 absolute rounded-lg bg-white px-6 py-4 right-0 shadow hover:shadow-xl"
        style="bottom: 65px"
      >
        <button-close class="absolute dark-hover:text-white right-0 top-0" @click="onClose" />
        <h2 class="text-lg pr-10 whitespace-no-wrap">{{ $t('title') }}</h2>
        <hr class="mt-1" />
        <p class="mt-3">
          <mdi-alert /><span class="ml-2">{{ $t('alert') }}</span>
        </p>
        <div class="flex justify-center mt-1">
          <spin-loader v-show="state" width="48" height="48" />
          <button-send v-show="!state" class="dark-hover:text-white" @click="onReport" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import ButtonClose from '@/components/atoms/buttons/ButtonClose.vue'
  import ButtonReport from '@/components/atoms/buttons/ButtonReport.vue'
  import ButtonSend from '@/components/atoms/buttons/ButtonSend.vue'
  import MdiAlert from '@/components/atoms/icons/MdiAlert.vue'
  import SpinLoader from '@/components/atoms/loaders/SpinLoader.vue'
  import useSwitch from '@/core/switch'
  import outsideClick from '@/directives/outside-click'
  import { reportedUserDoc, userDoc } from '@/utils/firestore-reference'
  import { defineComponent, useContext } from '@nuxtjs/composition-api'

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

    components: {
      ButtonReport,
      ButtonClose,
      ButtonSend,
      MdiAlert,
      SpinLoader
    },

    directives: {
      outsideClick
    },

    setup(props, { emit }) {
      const { reportViolation } = useReportViolation(props)
      const { state, on, off } = useSwitch()
      const { state: dialog, on: showDialog, off: hideDialog } = useSwitch()

      const onClose = () => {
        hideDialog()
        off()
      }
      const onReport = async () => {
        on()
        await reportViolation()
        emit('report')
        hideDialog()
        off()
      }

      return { dialog, state, on, off, onReport, onClose, showDialog, hideDialog }
    }
  })
</script>

<i18n lang="yml">
en:
  title: Report Violation
  alert: Report the comment as a violation?
ja:
  title: コメントを報告
  alert: コメントを違反として報告しますか？
</i18n>

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
