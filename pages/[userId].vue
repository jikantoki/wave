<template lang="pug">
.user-page(v-if="param")
  p.text-h3 Hello! {{ param.userId }}
  ContentLoader.text-h3.loading-text(width="10em")
  div(v-if="userData")
    p {{ userData }}
    v-text-field(
      v-model="pushMessage"
      placeholder="インターネットからお邪魔します！"
      :label="`${userData.userId}にメッセージを送ってみよう！`"
      prepend-inner-icon="mdi-email-edit-outline"
      @keydown.enter="sendPushForAccount(userData.userId)"
      clearable
    )
    v-btn(@click="sendPushForAccount(userData.userId)") {{ userData.userId }}に通知を送信
  p(v-if="!userData") unknown user
  .profile-zone
    .cover
      img.cover-img(v-if="userData && userData.coverImg" :src="userData.coverImg")
      img.cover-img(v-else src="/img/default_cover.jpg")
    .icon-and-follow.px-2
      .icon
        img.icon-img(src="/account_default.jpg")
      .button
        v-btn.follow-button フォロー
    .name-and-id.pl-2
      .name.text-h5 {{ userData.name ? userData.name : userData.userId }}
      .id.text-h7 @{{ userData.userId }}
    .message
      .message-content(v-html="userData.message ? userData.message : 'ステータスメッセージが設定されていません'")
    .createdat.my-2
      p {{ new Date(userData.createdAt * 1000) }}からWaveを利用しています
v-dialog(v-model="errorMessage" style="max-width: 500px;")
  v-card
    v-card-title 送信失敗
    v-card-text この機能は、ログインしたユーザーのみ使えます！（荒らし対策）
    v-card-actions
      v-spacer
      v-btn(@click="a('/login')") ログイン
      v-btn(@click="errorMessage = false") 閉じる
v-dialog(v-model="successMessage" v-if="userData && userData.userId" style="max-width: 500px;")
  v-card
    v-card-title 送信完了
    v-card-text {{ userData.userId }}に通知を送信しました！
    v-card-actions
      v-spacer
      v-btn(@click="successMessage = false") 閉じる
</template>

<script>
import metaFunctions from '~/js/metaFunctions'
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'
export default {
  mixins: [mixins],
  setup() {
    const route = useRoute()
    const userId = route.params.userId
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle(userId)
    Setup.setDescription(`${userId}さんの詳細ページです`)
  },
  data() {
    return {
      param: null,
      userData: null,
      pushMessage: '',
      errorMessage: false,
      successMessage: false
    }
  },
  async mounted() {
    this.param = this.$route.params
    this.userData = await this.getProfile(this.param.userId)
    if (this.userData) {
      this.setTitle(this.userData.userId)
    } else {
      this.setTitle('unknown user')
    }
  },
  methods: {
    sendPushForAccount(userId) {
      if (!this.userStore.userId) {
        this.errorMessage = true
        return false
      }
      if (!this.pushMessage && this.pushMessage === '') {
        return false
      }
      this.sendAjaxWithAuth(
        '/sendPushForAccount.php',
        {
          id: this.userStore.userId,
          token: this.userStore.userToken,
          for: userId
        },
        {
          title: `${this.userStore.userId}からのメッセージ`,
          message: this.pushMessage
        }
      )
        .then((e) => {
          this.successMessage = true
          console.log(e)
          return true
        })
        .catch((e) => {
          console.log(e)
          return false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-page {
  .profile-zone {
    .cover {
      .cover-img {
        width: 100%;
        aspect-ratio: 4/1;
        object-fit: cover;
      }
    }
    .icon-and-follow {
      display: flex;
      align-items: flex-end;
      margin-top: -36px;
      .icon {
        height: 72px;
        .icon-img {
          border-radius: 9999px;
          width: 72px;
          height: 72px;
          object-fit: cover;
        }
      }
      .button {
        margin-left: auto;
        .follow-button {
          border-radius: 9999px;
          margin: 0 !important;
        }
      }
    }
    .name-and-id {
      .id {
        opacity: 0.7;
      }
    }
    .createdat {
      opacity: 0.7;
    }
  }
}
</style>
