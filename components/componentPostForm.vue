<template lang="pug">
.component-post-form(
  @click="closePostForm()"
  :style="noFloat ? '' : 'position: fixed;width: 100%;height: 100%;z-index: 1400;background: rgba(0, 0, 0, 0.5);'"
  )
  .post-dialog-outer(@click.stop)
    v-card.post-dialog(
      :style="noFloat ? '' : 'margin-top: 100px;width: 95%;max-width: 640px;height: 50%;margin: auto;border-radius: 16px;'"
    )
      v-card-actions.is-mobile.py-0
        v-btn(icon="mdi-close" @click="closePostForm()").my-1.mx-0
        v-spacer
        v-btn.post-button(:disabled="postButtonDisabled" @click="postMessage()"
          ) {{ $t('postForm.post') }}
      .v-card-main
        .account-image
          img(
            v-if="userStore && userStore.profile && userStore.profile.icon"
            :src="userStore.profile.icon"
            )
          img(v-else src="/account_default.jpg")
        .post-main
          .post-textarea.py-4.px-2(
            ref="postTextarea"
            contenteditable
            @keydown.enter="checkCtrlPlusEnter"
            @input="changeTextArea(this.$refs.postTextarea)"
          )
          p.post-label.py-4.px-2(
            v-show="!editorData"
          )  {{ $t('postForm.whatsUp') }}
      v-card-actions.is-not-mobile
        v-spacer
        v-btn.post-button(:disabled="postButtonDisabled" @click="postMessage()"
          ) {{ $t('postForm.post') }}
</template>

<script>
import mixins from '~/mixins/mixins'

export default {
  components: {},
  data() {
    return {
      editorData: null,
      postButtonDisabled: true
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
          if (newText === '<div><br></div>') {
            this.editorData = null
          }
        }
      },
      immediate: true
    }
  },
  props: {
    noFloat: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  mounted() {
    this.useHumbergerStore.setDisabled(true)
    if (!this.noFloat) {
      this.$refs.postTextarea.focus()
    }
  },
  unmounted() {
    this.useHumbergerStore.setDisabled(false)
  },
  methods: {
    closePostForm() {
      this.$emit('close')
      const string = this.noSpaceAndEnter(this.noBrTag(this.editorData))
      console.log(string)
    },
    async postMessage() {
      if (
        this.noSpaceAndEnter(this.editorData) &&
        this.noBrTag(this.editorData)
      ) {
        console.log('post!')
        this.sendAjaxWithAuth(
          '/sendPostMessage.php',
          {
            id: this.userStore.userId,
            token: this.userStore.userToken
          },
          {
            message: this.editorData
          }
        )
          .then((e) => {
            console.log(e)
            if (e.body && e.body.status === 'ok') {
              console.log(e.body.status)
            }
          })
          .catch((e) => {
            console.log(e)
          })
        return true
      } else {
        return false
      }
    },
    noSpaceAndEnter(string) {
      if (!string || string === '') {
        return false
      }
      string = string.replaceAll(' ', '')
      string = string.replaceAll('　', '')
      string = string.replaceAll('\n', '')
      string = string.replaceAll('\r', '')
      string = string.replaceAll('<div>', '')
      string = string.replaceAll('</div>', '')
      string = string.replaceAll('<span>', '')
      string = string.replaceAll('</span>', '')
      string = string.replaceAll('<br>', '')
      string = string.replaceAll('&nbsp;', '')
      if (string === '') {
        return false
      }
      return string
    },
    noBrTag(string) {
      if (!string || string === '') {
        return false
      }
      const str1 = this.noSpaceAndEnter(string)
      if (!str1) {
        return false
      }
      const str2 = str1.replaceAll('<br>', '')
      if (str2 === '') {
        return false
      }
      return str1
    },
    changeTextArea(ref) {
      const text = ref.innerHTML
      const linked = this.encodeLink(text)
      if (text !== linked && linked) {
        ref.innerHTML = linked
      }
      this.editorData = linked
    },
    checkCtrlPlusEnter(keyboardEvent) {
      if (
        !keyboardEvent ||
        (!keyboardEvent.ctrlKey && !keyboardEvent.metaKey)
      ) {
        return false
      }
      this.postMessage()
    },
    encodeLink(str) {
      if (!str) {
        return false
      }
      return str
      const regexp_url =
        /(https?|ftp):\/\/[-_.!~*'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3001-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g
      var regexp_makeLink = function (url) {
        return '<a href="' + url + '">' + url + '</a>'
      }
      if (str.match(regexp_url) != null) {
        const urlAllMatches = str.match(regexp_url)
        if (urlAllMatches) {
          const urlMatches = new Set(urlAllMatches)
          urlMatches.forEach((url) => {
            str = str.replaceAll(url, regexp_makeLink(url))
          })
        }
      }
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
$breakpoints: (
  'smartPhone': 'screen and (max-width:700px)',
  'tablet': 'screen and (max-width:1000px)',
  'pwa': '(display-mode: standalone)'
) !default;

@mixin mq($breakpoint) {
  @media #{map-get($breakpoints, $breakpoint)} {
    @content;
  }
}
.post-dialog {
  @include mq('smartPhone') {
    max-width: none;
  }
  .v-card-main {
    display: flex;
    width: 100%;
    .post-main {
      display: inherit;
      position: relative;
      width: 100%;
      .post-label {
        opacity: 0.7;
        pointer-events: none;
        position: absolute;
        pointer-events: none;
      }
      .post-textarea {
        width: 100%;
        min-height: 4em;
        max-height: 60vh;
        overflow-y: auto;
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
