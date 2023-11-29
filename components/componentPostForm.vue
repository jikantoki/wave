<template lang="pug">
.component-post-form
  //v-dialogでツイート画面を実装はバグる
  //自力で背景透過してフォーム実装の必要アリ
  //v-dialog(v-model="showForUse")
    v-card
      v-card-title あ
</template>

<script>
import mixins from '~/mixins/mixins'

export default {
  mixins: [mixins],
  props: {
    show: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
