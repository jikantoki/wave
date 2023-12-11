<template lang="pug">
.post-detail(
  v-ripple
  )
  a.icon(:href="`/${post.userId}`")
    img.account-icon.ma-2(
      v-if="!post.userIcon"
      src="/account_default.jpg"
      )
    img.account-icon.ma-2(
      v-if="post.userIcon"
      :src="post.userIcon"
      )
  .post-detail-body
    .name-space
      a.account-name.px-2(
        :href="`/${post.userId}`"
        v-if="post.userName"
        ) {{ post.userName }}
      a.account-name.px-2(
        :href="`/${post.userId}`"
        v-if="!post.userName"
        ) {{ post.userId }}
      a.account-id(
        :href="`/${post.userId}`"
        ) @{{ post.userId }}
    .message.px-2(v-html="post.message")
</template>

<script>
import mixins from '~/mixins/mixins'

export default {
  props: {
    post: {
      type: Object,
      require: true,
    },
  },
  mixins: [mixins],
}
</script>

<style lang="scss" scoped>
.post-detail {
  display: flex;
  cursor: pointer;
  .icon {
    .account-icon {
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 9999px;
    }
  }
  .post-detail-body {
    .name-space {
      display: flex;
      a {
        text-decoration: none;
        color: inherit;
        &:hover {
          text-decoration: underline;
        }
      }
      .account-id {
        opacity: 0.6;
      }
    }
  }
}
</style>
