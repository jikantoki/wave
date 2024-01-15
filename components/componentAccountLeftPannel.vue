<template lang="pug">
.common-account-left-pannel-wrap.px-2.my-2
  .common-account-left-pannel
    .account-left-pannel(v-if="userStore && userStore.userId && userStore.profile" v-ripple)
      a.account-left-pannel-a.px-4.py-3(:href="`/${userStore.userId}`")
        .user-img-left-pannel
          img(:src="userStore.profile.icon ? userStore.profile.icon : '/account_default.jpg'")
        .user-name-left-pannel.mx-2
          .user-name {{ userStore.profile.name ? userStore.profile.name : userStore.userId }}
          .user-id @{{ userStore.userId }}
        .dot-vertical.pa-2
          v-icon mdi-dots-vertical
    .account-left-pannel(v-else v-ripple)
      a.account-left-pannel-a.px-4.py-3(href="/login")
        .user-img-left-pannel
          img(src="/account_default.jpg")
        .user-name-left-pannel.mx-2
          .user-name ログイン
        .dot-vertical.pa-2
          v-icon mdi-dots-vertical
</template>

<script>
import mixins from '~/mixins/mixins'
export default {
  mixins: [mixins]
}
</script>

<style lang="scss" scoped>
.common-account-left-pannel-wrap {
  .common-account-left-pannel {
    position: relative;
    max-width: 260px;
    margin-left: auto;
    .account-left-pannel {
      width: 100%;
      border-radius: 9999px;
      position: absolute;
      bottom: 0;
      .account-left-pannel-a {
        border-radius: 9999px;
        text-decoration: none;
        display: flex;
        color: var(--v-theme-surface);
        align-items: center;
        &:hover {
          background: rgba(100, 100, 100, 0.3);
        }
        .user-img-left-pannel {
          background-color: rgba(var(--v-theme-on-surface), 0.9);
          border-radius: 9999px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 90%;
            height: 90%;
            object-fit: cover;
            border-radius: 9999px;
          }
        }
        .user-name-left-pannel {
          .user-name {
            font-size: 1.5em;
          }
          .user-id {
            opacity: 0.7;
          }
        }
        .dot-vertical {
          margin-left: auto;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
