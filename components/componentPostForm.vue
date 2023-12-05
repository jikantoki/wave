<template lang="pug">
.component-post-form(@click="closePostForm()")
  .post-dialog-outer(@click.stop)
    v-card.post-dialog
      .v-card-main
        .account-image
          img(v-if="userStore && userStore.profile && userStore.profile.icon" :src="userStore.profile.icon")
          img(v-else src="/account_default.jpg")
        .post-main
          .post-textarea.pa-2(
            ref="postTextarea"
            contenteditable
            v-html="defaultPostMessage"
            @input="changeTextArea(this.$refs.postTextarea)"
          )
          p.post-label あかさたな
      v-card-actions
        v-spacer
        v-btn.post-button(:disabled="postButtonDisabled" @click="postMessage()"
          ) ポスト
</template>

<script>
import mixins from '~/mixins/mixins'

export default {
  components: {},
  data() {
    return {
      editorData: null,
      postButtonDisabled: true,
      defaultPostMessage:
        '<span style="opacity: 0.7;pointer-events: none;" contenteditable="false">今何してる？</span>',
    }
  },
  mixins: [mixins],
  emits: ['close'],
  watch: {
    editorData: {
      handler(newText) {
        if (this.noSpaceAndEnter(newText)) {
          this.postButtonDisabled = false
        } else {
          this.postButtonDisabled = true
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.useHumbergerStore.setDisabled(true)
  },
  unmounted() {
    this.useHumbergerStore.setDisabled(false)
  },
  methods: {
    closePostForm() {
      this.$emit('close')
      if (this.editorData) {
        //フォームを閉じていいのか確認！
      }
    },
    async postMessage() {
      if (!this.editorData) {
        return false
      }
      if (this.noSpaceAndEnter(this.editorData)) {
        console.log('post!')
      }
    },
    noSpaceAndEnter(string) {
      if (!string) {
        return false
      }
      const str1 = string.replaceAll(' ', '')
      const str2 = str1.replaceAll('　', '')
      const str3 = str2.replaceAll('\n', '')
      const str4 = str3.replaceAll('\r', '')
      if (str4 === '') {
        return false
      }
      return str4
    },
    changeTextArea(ref) {
      const includeNoiseText = ref.innerHTML
      const sourceText = includeNoiseText.replaceAll(
        this.defaultPostMessage,
        '',
      )
      if (sourceText === '') {
        ref.innerHTML = this.defaultPostMessage
        this.editorData = null
      } else {
        if (includeNoiseText !== sourceText) {
          ref.innerHTML = sourceText
        }
        this.editorData = sourceText
      }
      console.log(this.editorData)
    },
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
  .v-card-main {
    display: flex;
    width: 100%;
    .post-main {
      display: inherit;
      position: relative;
      .post-label {
        position: absolute;
        pointer-events: none;
      }
      .post-textarea {
        width: 100%;
        height: 100px;
        outline: none;
      }
    }
    .account-image > img {
      width: 64px;
      border-radius: 9999px;
      padding: 8px;
    }
  }
  .post-button {
    background: var(--accent-color);
    border-radius: 9999px;
  }
}
</style>
