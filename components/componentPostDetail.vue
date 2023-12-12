<template lang="pug">
//v-ripple動的変更が今のところ不可
.component-post-detail.pt-1(
  :v-ripple="!clickable"
  @click="postClick"
  @click.middle.stop="postClickMiddle"
  :style="clickable ? 'cursor: pointer;' : ''"
  )
  .component-post-wrap
    .icon
      a(:href="`/${postForDisplay.userId}`")
        img.account-icon.ma-2(
          v-if="!postForDisplay.userIcon"
          src="/account_default.jpg"
          )
        img.account-icon.ma-2(
          v-if="postForDisplay.userIcon"
          :src="postForDisplay.userIcon"
          )
    .post-detail-body
      .name-space
        a.account-name.px-2(
          :href="`/${postForDisplay.userId}`"
          v-if="postForDisplay.userName"
          ) {{ postForDisplay.userName }}
        a.account-name.px-2(
          :href="`/${postForDisplay.userId}`"
          v-if="!postForDisplay.userName"
          ) {{ postForDisplay.userId }}
        a.account-id(
          :href="`/${postForDisplay.userId}`"
          ) @{{ postForDisplay.userId }}
        a.time {{ postForDisplay.createdAt }}
      .message.px-2(
        v-html="postForDisplay.message"
        @click="checkClickElement"
        :style="clickable ? '' : 'user-select: text;'"
        )
  .action-buttons
    v-btn(
      size="small"
      icon="mdi-heart-outline"
      @click.stop
      )
    v-btn(
      size="small"
      icon="mdi-repeat-variant"
      @click.stop
      )
    v-btn(
      size="small"
      icon="mdi-message-reply-outline"
      @click.stop
      )
    v-btn(
      size="small"
      icon="mdi-dots-vertical"
      @click.stop
      )
  .hr
</template>

<script>
import mixins from '~/mixins/mixins'

export default {
  props: {
    post: {
      type: Object,
      require: true,
    },
    clickable: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  data() {
    return {
      postForDisplay: null,
    }
  },
  mixins: [mixins],
  watch: {
    post: {
      handler(post) {
        if (post) {
          const createdAt = new Date(post.postCreatedAt * 1000)
          const createdAtText = this.decodeDate(createdAt)
          const returnPost = {
            ...post,
            message: this.decodeEntity(post.postMessage),
            createdAt: createdAtText,
          }
          this.postForDisplay = returnPost
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    /** Date型のタイムデータを見やすく変換 */
    decodeDate(date) {
      if (!date) {
        date = new Date()
      }
      return `${date.getFullYear()}年${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}月${date
        .getDate()
        .toString()
        .padStart(2, '0')}日${date
        .getHours()
        .toString()
        .padStart(2, '0')}時${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}分${date.getSeconds().toString().padStart(2, '0')}秒`
    },
    checkClickElement(e) {
      if (e && e.target.tagName === 'A') {
        e.stopPropagation()
      }
    },
    postClick(e) {
      if (e && e.target.tagName !== 'A' && e.target.tagName !== 'IMG') {
        if (this.clickable) {
          this.a(`/post/${this.postForDisplay.postId}`)
          e.preventDefault()
          e.stopPropagation()
          return false
        }
      } else {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    postClickMiddle(e) {
      if (!this.clickable) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      if (e && e.target.tagName !== 'A' && e.target.tagName !== 'IMG') {
        this.a(`/post/${this.postForDisplay.postId}`, true)
      }
      e.preventDefault()
      e.stopPropagation()
    },
  },
}
</script>

<style lang="scss">
//v-htmlを使う関係でscoped禁止
.component-post-detail {
  .component-post-wrap {
    display: flex;
    .icon {
      .account-icon {
        width: 32px;
        height: 32px;
        object-fit: cover;
        border-radius: 9999px;
      }
    }
    .post-detail-body {
      width: 100%;
      .name-space {
        display: flex;
        white-space: nowrap;
        a {
          text-decoration: none;
          color: inherit;
          &:hover {
            text-decoration: underline;
          }
        }
        .time {
          margin-left: auto;
        }
        .account-id,
        .time {
          opacity: 0.6;
        }
      }
      .message {
        a {
          color: var(--accent-color);
        }
      }
    }
  }
  .action-buttons {
    display: flex;
    justify-content: space-evenly;
    opacity: 0.7;
  }
  .hr {
    border-bottom: solid 1px;
    opacity: 0.4;
  }
}
</style>
