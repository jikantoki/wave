<template lang="pug">
.login(v-if="isShow")
  v-form.center(@submit.prevent)
    img.ma-8(src="~/assets/logo.png")
    p.form-p.text-h6 {{ pageTitle }}
    v-container
      p.error.pa-4.mb-4.relative(v-if="errorMessage")
        v-icon mdi-alert-circle-outline
        p.px-4 {{ errorMessage }}
        v-icon.v-ripple.absolute.close-error(
          v-ripple
          @click="errorMessage=false"
          ) mdi-close-circle-outline
      v-text-field(
        v-if="page === 0"
        v-model="userName"
        label="ID"
        prepend-inner-icon="mdi-account-outline"
        required
        clearable
        ref="userName"
        @keydown.enter="$refs.password.focus()"
        )
      v-text-field(
        v-if="page === 0"
        v-model="password"
        label="Password"
        prepend-inner-icon="mdi-lock-outline"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
        required
        ref="password"
        @keydown.enter="requestToken()"
        )
      a.forgot-password(v-if="page === 0" href="/password_reset") パスワードを忘れました
      v-text-field(
        v-if="page === 1"
        v-model="token"
        type="phone"
        placeholder="XXX-XXX"
        label="アクセストークン"
        prepend-inner-icon="mdi-key-outline"
        required
        clearable
        @keydown.enter="login()"
        )
      .btns
        v-btn.round.submit(
          v-if="page === 0"
          @click="requestToken()"
          :disabled="!userName || !password"
          :loading="loading"
          ref="submit"
          ) Login
        v-btn.round(
          v-if="page === 0"
          @click="a('/registar')"
          v-show="!loading"
          ) Registar Account
        v-btn.round.submit(
          v-if="page === 1"
          @click="login()"
          :disabled="!token"
          :loading="loadingToken"
          ref="submitToken"
          ) Login
</template>

<script>
import metaFunctions from '~/js/metaFunctions'
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'
import webpush from '~/js/webpush'
export default {
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Login')
    Setup.setDescription('ログインして、世界とつながろう')
  },
  data() {
    return {
      /** 将来的にv-dialogとかでフォームを埋め込む用 */
      isShow: true,
      userName: '',
      password: '',
      token: '',
      showPassword: false,
      loading: false,
      loadingToken: false,
      errorMessage: null,
      page: 0,
      pageTitle: 'ログインして、世界とつながろう',
      userStore: useUserStore(),
    }
  },
  watch: {
    token(now) {
      const replaced = now.toString().replace('-', '')
      if (replaced.length >= 6) {
        this.login()
      }
    },
  },
  mounted() {
    this.setTitle('ログイン')
    this.commonBarStore.hidden = true
    if (localStorage.userIdForLogin) {
      this.userName = localStorage.userIdForLogin
    }
  },
  unmounted() {
    this.commonBarStore.hidden = false
    if (this.userName) {
      localStorage.userIdForLogin = this.userName
    } else {
      localStorage.userIdForLogin = ''
    }
  },
  methods: {
    /** ログイン前の二段階認証をリクエスト */
    async requestToken() {
      this.loading = true
      this.sendAjaxWithAuth('/requestToken.php', {
        id: this.userName,
        password: this.password,
      })
        .then((e) => {
          if (e.body.status === 'ok') {
            this.page = 1
            this.errorMessage = null
            this.pageTitle = 'メールに送信したトークンを入力'
          } else {
            this.errorMessage = 'ユーザー名またはパスワードが間違っています'
          }
          this.loading = false
        })
        .catch((e) => {
          console.log(e)
          this.errorMessage = 'ネットワークエラー'
          this.loading = false
        })
    },
    async login() {
      this.loadingToken = true
      this.token = this.token.replace('-', '')
      this.sendAjaxWithAuth('/loginAccount.php', {
        id: this.userName,
        password: this.password,
        token: this.token,
      })
        .then(async (e) => {
          if (e.body.status === 'ok') {
            const now = new URL(window.location.href)
            this.userStore.setId(e.body.id)
            this.userStore.setToken(e.body.token)
            const profile = await this.getProfile(e.body.id)
            this.userStore.setProfile(profile)
            //ログイン中のユーザーの情報で、プッシュ通知に関する情報をDB登録
            const push = await webpush.get()
            if (push) {
              await this.sendAjaxWithAuth('/insertPushToken.php', {
                id: this.userStore.userId,
                token: this.userStore.userToken,
                endPoint: push.endpoint,
                publicKey: push.publicKey,
                pushToken: push.authToken,
              })
            }
            const redirect = now.searchParams.get('redirect')
            if (redirect && redirect !== '') {
              this.a(redirect)
            } else {
              this.a('/')
            }
          } else {
            this.errorMessage = 'ワンタイムトークンが違います'
            this.token = ''
          }
          this.loadingToken = false
        })
        .catch((e) => {
          console.log(e)
          this.errorMessage = 'ネットワークエラー'
          this.loadingToken = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  display: contents;
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    max-width: 32em;
  }
}
.btns {
  display: flex;
  flex-direction: row-reverse;
  .round {
    border-radius: 9999px;
  }
  .submit {
    background-color: var(--accent-color);
    color: var(--accent-text-color);
  }
}
img {
  height: 8em;
  object-fit: contain;
}
.form-p {
  text-align: center;
}
.v-btn:disabled {
  opacity: 0.7;
}
.error {
  background-color: var(--color-error);
  color: white;
  display: flex;
  border-radius: 4px;
}
.v-ripple {
  border-radius: 9999px;
  cursor: pointer;
}
.close-error {
  right: 16px;
}
.forgot-password {
  color: inherit;
  opacity: 0.7;
}
</style>
