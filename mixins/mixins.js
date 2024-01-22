/**
 * ここに記述したものはVueの機能として使える
 * しかもどのファイルでも読み込める
 */

//import router from '~/router/router'
import adsense from '~/components/common/commonAdsense'
import ajaxFunctions from '~/js/ajaxFunctions'
import PackageJson from '/package.json'
import Functions from '~/js/Functions'
import ContentLoader from '~/components/LoadingText'
import { useCommonBarStore } from '~/composables/commonBar'
import { useThemeStore } from '~/composables/theme'
import { useToastStore } from '~/composables/toast'
import ComponentButton from '~/components/componentButton.vue'

export default {
  components: {
    adsense: adsense,
    ContentLoader: ContentLoader,
    ComponentButton: ComponentButton
  },
  data() {
    return {
      cookieAllowed: false,
      PackageJson: PackageJson,
      envconf: useRuntimeConfig(),
      env: null,
      counter: useCounterStore(),
      metaStore: useMetaStore(),
      userStore: useUserStore(),
      localeStore: useLocaleStore(),
      commonBarStore: useCommonBarStore(),
      nowTheme: useThemeStore(),
      useHumbergerStore: useHumbergerStore(),
      useToastStore: useToastStore()
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.availableLocales.filter(
        (i) => i.code !== this.$i18n.locale
      )
    }
  },
  mounted() {
    const isAllow = localStorage.cookieAllowed === 'true'
    this.cookieAllowed = isAllow
    const vues = this
    const aTags = document.querySelectorAll('a')
    for (let count = 0; count < aTags.length; count++) {
      if (aTags[count].href !== '') {
        aTags[count].onclick = function () {
          const now = new URL(window.location.href).host
          const next = new URL(aTags[count].href).host
          let to = aTags[count].href
          if (now === next) {
            const next = new URL(aTags[count].href)
            to = next.pathname + next.hash + next.search
          }
          vues.a(to)
          event.preventDefault()
          return false
        }
      }
    }
    this.env = this.envconf.public.env
  },
  methods: {
    sendAjax: ajaxFunctions.send,
    /**
     * APIトークンを同時に送信するAjax（内部処理用）
     * ### ヘッダ送付方法
     * ```js
    header = {
      id: 'hogefuga',
      password: 'qwerty'
    }
     * ```
     * ___
     * @param {string} url 送信先URL（ドメインは自動で付きます）
     * @param {array} header ヘッダ情報
     * @param {object} sendObject 送りたいオブジェクト
     * @param {bool} isPost true（デフォ）ならPOST、falseでGET
     */
    sendAjaxWithAuth(url, header = null, sendObject, isPost = true) {
      const authHeader = {
        apiid: this.env.VUE_APP_API_ID,
        apitoken: this.env.VUE_APP_API_TOKEN,
        apipassword: this.env.VUE_APP_API_ACCESSKEY
      }
      let hd = []
      if (this.isObject(header)) {
        hd = Object.assign(header, authHeader)
      } else {
        hd = authHeader
      }
      return this.sendAjax(
        this.env.VUE_APP_API_HOST + url,
        sendObject,
        hd,
        isPost
      )
    },
    /**
     * <p>aタグと同じ動きをするし、pjaxになる</p>
     * <p>外部URLの場合、新しいタブで開く</p>
     * @param {string} url 転送したいURL（ルートからのパス）
     * @param {string} isNewTab trueなら絶対に新規タブ
     * @returns {int} 内部リンクなら0、外部ドメインなら1
     */
    a(url, isNewTab = false) {
      if (url.slice(0, 4) === 'http' || isNewTab) {
        window.open(url, '_blank')
        return 1
      } else {
        this.$router.push(url)
        if (this.drawer) this.drawer = false
        return 0
      }
    },
    /**
     * ファイルをダウンロードさせる
     * @param {string} filePath ファイルのパス
     * @returns 0
     */
    download(filePath, name) {
      if (!name) {
        name = filePath
      }
      let element = document.createElement('a')
      element.href = filePath
      element.download = name
      element.target = '_blank'
      element.click()
      return 0
    },
    /**
     * 0未満なら-1で乗算する
     * @param {int, float} number 変換したい数値
     * @returns 正の値
     */
    unsigned(number) {
      if (number < 0) {
        return number * -1
      } else {
        return number
      }
    },
    /**
     * クッキーの特定のキーを取得
     * @param {string} name 取得したいCookieのキー
     * @returns キーがあればvalue、無ければnull
     */
    getCookie(name) {
      let c = new RegExp(name + '=[^;]+').exec(document.cookie)
      return c ? c[0].replace(name + '=', '') : null
    },
    /**
     * 全てのクッキーを連想配列で返す
     * @returns cookie
     */
    getAllCookie() {
      let cookie = document.cookie
      if (!cookie || cookie === '') {
        return null
      }
      let cookieArray = cookie.split(';')
      let newCookieArray = []
      for (const keyAndValue of cookieArray) {
        let keyValue = keyAndValue.split('=')
        newCookieArray.push(keyValue)
      }
      return newCookieArray
    },
    /**
     * クッキーをセットする
     * @param {string} key 設定したいキー
     * @param {*} value 設定したい値
     * @returns OKだったらTrue、許可がなかったらFalse
     */
    setCookie(key, value) {
      if (this.cookieAllowed) {
        document.cookie = `${key}=${value};`
        return true
      } else {
        return false
      }
    },
    checkCookie() {
      let isAllow = localStorage.cookieAllowed
      isAllow = isAllow ? true : false
      this.cookieAllowed = isAllow
      return isAllow
    },
    /**
     * Cookieを許可する
     */
    allowCookie() {
      localStorage.cookieAllowed = true
      this.cookieAllowed = true
    },
    /**
     * Cookieを拒否する
     */
    denyCookie() {
      localStorage.cookieAllowed = false
      this.cookieAllowed = false
    },
    /**
     * いい感じのタイトルを付ける
     * @param {string} newTitle 新しく付けたいタイトル
     * @returns 引数に合わせて設定したら0、デフォルトのまま設定したら1
     */
    setTitle: (newTitle) => {
      let siteName = PackageJson.name
      siteName = Functions.ifEnglishStartUpper(siteName)
      let pageTitle
      let returnCode
      if (newTitle) {
        pageTitle = `${newTitle} | ${siteName}`
        returnCode = 0
      } else {
        pageTitle = siteName
        returnCode = 1
      }
      //まずリアルタイムで更新
      document.title = pageTitle
      //何故かこうしないと無効になる場合がある
      setTimeout(() => {
        document.title = pageTitle
      }, 1500)
      useMetaStore().setTitle(newTitle)
      return returnCode
    },
    /**
     * アカウントのプロフィールを取得
     * @param {string} userId 欲しいユーザーのID
     * @returns アカウントの公開情報
     */
    async getProfile(userId) {
      const profile = await this.sendAjaxWithAuth('/getProfile.php', {
        id: userId
      })
      const res = profile.body.res
      if (res) {
        return {
          userId: res.userId !== '' ? res.userId : null,
          createdAt: res.createdAt !== '' ? res.createdAt : null,
          status: res.status !== '' ? res.status : null,
          icon: res.icon !== '' ? res.icon : null,
          coverImg: res.coverImg !== '' ? res.coverImg : null,
          name: res.name !== '' ? res.name : null,
          message: res.message !== '' ? res.message : null
        }
      } else {
        //存在しない
        return null
      }
    },
    /**
     * 言語切替
     */
    async changeLocale(locale) {
      try {
        this.$i18n.locale = locale
      } catch (e) {
        this.$i18n.locale = 'ja'
      }
      this.localeStore.setLocale(locale)
    },
    /**
     * 省略された言語名を展開
     * @param {string} locale 言語名
     * @returns string
     */
    arrangeLocale(locale) {
      if (!locale) return null
      switch (locale) {
        case 'ja':
          return '日本語'
        case 'en':
          return 'English'
        case 'cn':
          return '中文'
        default:
          return locale
      }
    },
    /** 連想配列かどうか？（T/F） */
    isObject(obj) {
      return obj instanceof Object && !(obj instanceof Array) ? true : false
    },
    /** HTMLの特殊文字をデコード（危険性あり！） */
    decodeEntity(inputStr) {
      var textarea = document.createElement('textarea')
      textarea.innerHTML = inputStr
      return textarea.value
    },
    setToast(newMessage) {
      this.useToastStore.setMessage(newMessage)
      setTimeout(() => {
        this.useToastStore.setMessage(null)
      }, 5000)
    },

    //ここからは優先度低いやつ

    /**
     * 変数が使われてません！を無効化
     * @param {*} obj エラーを無効化したい変数
     * @returns objがtrueなら1
     */
    nulling(obj) {
      if (obj) return 1
    },
    crack() {
      alert('さてはオメー、ソースコードを見ているな！？！？！？')
      return 7095110
    }
  }
}
