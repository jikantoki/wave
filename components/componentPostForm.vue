<template lang="pug">
.component-post-form(@click="closePostForm()")
  .post-dialoga(@click.stop)
    v-card.post-dialog
      v-textarea(
        count=400
      )
      //textarea
      v-card-actions
        v-spacer
        v-btn ポスト
</template>

<script>
import mixins from '~/mixins/mixins'

export default {
  components: {},
  data() {
    return {
      editorData: null,
    }
  },
  mixins: [mixins],
  emits: ['close'],
  mounted() {
    this.useHumbergerStore.setDisabled(true)
  },
  unmounted() {
    this.useHumbergerStore.setDisabled(false)
  },
  methods: {
    closePostForm() {
      this.$emit('close')
    },
    handleImageAdded() {},
  },
}
</script>

<style lang="scss" scoped>
$breakpoints: (
  'smartPhone': 'screen and (max-width:700px)',
  'tablet': 'screen and (max-width:1100px)',
  'pwa': '(display-mode: standalone)',
) !default;

@mixin mq($breakpoint) {
  @media #{map-get($breakpoints, $breakpoint)} {
    @content;
  }
}
.component-post-form {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1400;
  background: rgba(0, 0, 0, 0.5);
}
.post-dialog {
  width: 95%;
  max-width: 480px;
  height: 50%;
  margin: auto;
  margin-top: calc(100px);
  border-radius: 16px;
  @include mq('smartPhone') {
    max-width: none;
  }
}
</style>
