<template lang="pug">
.usre-page(v-if="param")
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
      successMessage: false,
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
          for: userId,
        },
        {
          title: `${this.userStore.userId}からのメッセージ`,
          message: this.pushMessage,
        },
      )
        .then((e) => {
          this.successMessage = true
          return true
        })
        .catch((e) => {
          console.log(e)
          return false
        })
    },
  },
}
</script>
