<template lang="pug">
.header
  v-navigation-drawer.pa-0.nav-drawer(v-model="drawer" fixed temporary)
    v-list(nav dense)
      v-item-group(v-model="group" active-class="deep-purple-text text--accent-4")
        a.header-list(href="/login" v-if="!userStore || !userStore.userId")
          v-list-item.pa-4(link)
            .v-item
              v-icon(style="opacity:0.7") mdi-account-outline
              p.nav ログイン
        a.header-list(:href="`/${userStore.userId}`" v-if="userStore && userStore.userId")
          v-list-item.pa-4(link)
            .v-item
              img.menu-profile-img.nav-img(
                v-if="!(userStore.profile && userStore.profile.icon)"
                src="/account_default.jpg")
              img.menu-profile-img.nav-img(
                v-if="userStore.profile && userStore.profile.icon"
                :src="userStore.profile.icon")
              .menu-profile-flex
                p.nav.profile-name(v-if="userStore.profile && userStore.profile.name") {{ userStore.profile.name }}
                p.nav.profile-name(v-if="userStore.profile && !userStore.profile.name && userStore.profile.userId") {{ userStore.profile.userId }}
                p.nav.profile-id(v-if="userStore.profile") @{{ userStore.profile.userId }}
        v-divider(style="opacity:0.3")
        a.header-list(:href="`/${userStore.userId}`" v-if="userStore && userStore.userId")
          v-list-item.pa-4(link)
            .v-item
              v-icon(style="opacity:0.7") mdi-account-outline
              p.nav {{ $t('header.profile') }}
        a.header-list(v-for="navigationItem in NavigationList" :href="navigationItem.url")
          v-list-item.pa-4(link)
            .v-item
              v-icon(style="opacity:0.7") {{ navigationItem.icon }}
              p.nav {{ navigationItem.name }}
        v-divider(style="opacity:0.3")
        a.header-list(v-for="navigationItem in infoList" :href="navigationItem.url")
          v-list-item.pa-4(link)
            .v-item
              v-icon(style="opacity:0.7") {{ navigationItem.icon }}
              p.nav {{ navigationItem.name }}
        v-divider(style="opacity:0.3")
        v-list-item.pa-4
          .v-item
            v-icon(style="opacity:0.7") mdi-theme-light-dark
            p.nav {{ $t('header.theme') }}
            v-switch(v-model="isDarkTheme")
        v-list-item.pa-4(link)
          .v-item
            v-icon(style="opacity:0.7") mdi-translate-variant
            p.nav {{ $t('header.language') }}
            v-icon(style="opacity:0.7") mdi-menu-right
          v-menu(activator="parent" offset-x)
            v-list
              v-list-item(
                link
                v-for="locale in availableLocales"
                :key="locale"
                @click="changeLocale(locale)"
                )
                v-list-item-title {{ arrangeLocale(locale) }}
    template(v-slot:append)
      a.header-list(v-if="userStore && userStore.userId")
        v-list-item.pa-4(link)
          .v-item
            v-icon(style="opacity:0.7") mdi-dots-vertical
            p.nav {{ $t('header.showMore') }}
            v-icon(style="opacity:0.7") mdi-menu-right
        v-menu(activator="parent" offset-x)
          v-list
            v-list-item.logout(link @click="logoutDialog()")
              v-list-item-title ログアウト
  v-app-bar
    template(v-slot:append)
      v-btn(icon="mdi-magnify" @click="headerSearchDialog = true")
      v-btn(icon)
        v-icon mdi-dots-vertical
        v-menu(activator="parent" offset-y)
          v-list
            v-list-item(link @click="a('/rule')")
              v-list-item-title 利用規約
    v-app-bar-nav-icon(v-if="isRoot && (!userStore || !userStore.profile || !userStore.profile.userId)" @click="toggleDrawer()")
    .nav-icon(v-if="isRoot && userStore && userStore.profile && userStore.profile.userId")
      .nav-round(@click="toggleDrawer()" v-ripple)
        img.nav-img(
          v-if="!(userStore.profile && userStore.profile.icon)"
          src="/account_default.jpg")
        img.nav-img(
          v-if="userStore.profile && userStore.profile.icon"
          :src="userStore.profile.icon")
    v-btn(v-if="!isRoot" icon="mdi-keyboard-backspace" @click="back()")
    v-app-bar-title {{ metaStore.title }}
  v-dialog(v-model="dialog" max-width="500")
    v-card
      v-card-title {{ dialogTitle }}
      v-card-text(v-html="dialogText")
      v-card-actions(v-if="dialogActions")
        v-spacer
        v-btn(
          v-for="btn, key in dialogActions"
          :key="key"
          @click="btn.action()"
          v-bind:class="[key === dialogActions.length - 1 ? 'btn-default' : 'btn-other']"
          ) {{ btn.value }}
  v-dialog(v-model="headerSearchDialog" max-width="500")
    v-card
      v-card-text
        v-text-field(
          v-model="searchText"
          placeholder="今日の天気"
          label="検索"
          ref="searchBox"
          style="width: 100%;display: contents;"
          append-inner-icon="mdi-magnify"
          @click:append-inner="console.log('search!!!')"
          @keydown.enter="console.log('search!!!')"
          clearable
          )
</template>

<script>
import Functions from '~/js/Functions'
import MetaFunctions from '~/js/metaFunctions'
import NavigationList from '~/items/itemNavigationList'
import infoList from '~/items/itemInfoList'
import mixins from '~/mixins/mixins'
import webpush from '~/js/webpush'
export default {
  components: {},
  mixins: [mixins],
  data() {
    return {
      NavigationList: NavigationList,
      infoList: infoList,
      Functions: Functions,
      //currentMeta: currentMeta,
      drawer: false,
      group: 1,
      isRoot: false,
      theme: 'light',
      isDarkTheme: false,
      headerSearchDialog: false,
      searchText: '',
      //ここからダイアログ用
      dialog: false,
      dialogTitle: null,
      dialogText: null,
      dialogActions: null,
    }
  },
  watch: {
    $route() {
      const now = new URL(window.location.href)
      if (Functions.isRoot(now.pathname)) {
        this.isRoot = true
      } else {
        this.isRoot = false
      }
    },
    isDarkTheme(isDark) {
      if (isDark) {
        this.$vuetify.theme.global.name = 'dark'
        MetaFunctions.setStatusColor('#222222')
        localStorage.theme = 'dark'
      }
      if (!isDark) {
        this.$vuetify.theme.global.name = 'light'
        MetaFunctions.setStatusColor('#FFFFFF')
        localStorage.theme = 'light'
      }
    },
  },
  async mounted() {
    const now = new URL(window.location.href)
    if (Functions.isRoot(now.pathname)) {
      this.isRoot = true
    } else {
      this.isRoot = false
    }

    const theme = localStorage.theme
    if (theme) {
      switch (theme) {
        case 'light':
          this.$vuetify.theme.global.name = 'light'
          MetaFunctions.setStatusColor('#FFFFFF')
          this.isDarkTheme = false
          this.nowTheme.setTheme('light')
          break
        case 'dark':
          this.$vuetify.theme.global.name = 'dark'
          MetaFunctions.setStatusColor('#222222')
          this.isDarkTheme = true
          this.nowTheme.setTheme('dark')
          break
      }
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches == true) {
        //dark mode
        this.$vuetify.theme.global.name = 'dark'
        MetaFunctions.setStatusColor('#222222')
        this.isDarkTheme = true
        this.nowTheme.setTheme('dark')
      } else {
        this.$vuetify.theme.global.name = 'light'
        MetaFunctions.setStatusColor('#FFFFFF')
        this.isDarkTheme = false
        this.nowTheme.setTheme('light')
      }
    }

    //タップ時の誤動作を防ぐためのスワイプ時の処理を実行しない最小距離
    const minimumDistance = 10
    //スワイプ開始時の座標
    let startX = 0
    let startY = 0
    //スワイプ終了時の座標
    let endX = 0
    let endY = 0
    this.nulling(endY)

    //移動を開始した座標を取得
    document.getElementById('main').addEventListener(
      'touchstart',
      (e) => {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
      },
      { passive: true },
    )

    //移動した座標を取得
    document.getElementById('main').addEventListener(
      'touchmove',
      (e) => {
        endX = e.changedTouches[0].clientX
        endY = e.changedTouches[0].clientY
      },
      { passive: true },
    )

    //移動距離から左右or上下の処理を実行
    document.getElementById('main').addEventListener('touchend', (e) => {
      //rootディレクトリ関連じゃないばあいは処理を停止
      if (!this.isRoot) {
        return false
      }
      //触っているクラスに.dont-swipeが含まれていたらリジェクト
      const classes = e.target.className.split(' ')
      if (classes) {
        for (const className of classes) {
          if (className === 'dont-swipe') {
            return false
          }
        }
      }
      // スワイプ終了時にx軸とy軸の移動量を取得
      // 左スワイプに対応するためMath.abs()で+に変換
      const distanceX = this.unsigned(endX - startX)
      const distanceY = this.unsigned(endY - startY)

      //左右のスワイプ距離の方が上下より長い && 小さなスワイプは検知しないようにする
      if (distanceX > distanceY && distanceX > minimumDistance) {
        //スワイプ後の動作
        if (endX - startX > 0) {
          //rightswipe
          this.drawer = true
        }
      }

      //上下のスワイプ距離の方が左右より長い && 小さなスワイプは検知しないようにする
      if (distanceX < distanceY && distanceY > minimumDistance) {
        //スワイプ後の動作
        //console.log('上下スワイプ')
      }
    })

    if (this.userStore && this.userStore.userId) {
      //アカウントのトークンが正しいか認証
      this.sendAjaxWithAuth('/authAccount.php', {
        id: this.userStore.userId,
        token: this.userStore.userToken,
      })
        .then((e) => {
          if (e.body && e.body.status && e.body.status === 'ng') {
            this.userStore.setToken(null)
            this.userStore.setId(null)
            this.userStore.setProfile({})
          }
        })
        .catch((e) => {
          console.log(e)
        })

      //プロフィールを最新に
      this.getProfile(this.userStore.userId)
        .then((e) => {
          this.userStore.setProfile(e)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    //言語関係
    if (this.localeStore.locale) {
      try {
        this.$i18n.locale = this.localeStore.locale
      } catch (e) {
        this.$i18n.locale = 'ja'
        this.localeStore.setLocale(null)
      }
    }

    const push = await webpush.set()
    if (push && push.endpoint && this.userStore && this.userStore.userId) {
      //ログイン中のユーザーの情報で、プッシュ通知に関する情報をDB登録
      await this.sendAjaxWithAuth('/insertPushToken.php', {
        id: this.userStore.userId,
        token: this.userStore.userToken,
        endPoint: push.endpoint,
        publicKey: push.publicKey,
        pushToken: push.authToken,
      })
    }
  },
  methods: {
    toggleDrawer() {
      if (this.drawer === false) {
        this.drawer = true
      } else {
        this.drawer = false
      }
    },
    toggleTheme() {
      if (this.isDarkTheme) {
        this.isDarkTheme = false
      } else {
        this.isDarkTheme = true
      }
    },
    /**
     * 同じドメイン、かつindexじゃない場所にいる場合はページを戻す
     * @param {bool} PleaseReturn trueの場合、ページを戻せない場合にreturnする
     */
    back(pleaseReturn = false) {
      const goHome = () => {
        this.$router.push('/')
      }
      if (document.referrer === '') {
        if (
          !window.history ||
          !window.history.state ||
          !window.history.state.back
        ) {
          if (!pleaseReturn) {
            goHome()
          }
          return -1
        }
      }
      let ref
      if (document.referrer !== '') {
        ref = document.referrer
      } else {
        ref = `${new URL(window.location.href).protocol}${
          new URL(window.location.href).host
        }${window.history.state.back}`
      }
      const referrer = new URL(ref)
      const now = new URL(window.location.href)
      if (!referrer) {
        if (!pleaseReturn) {
          goHome()
        }
        return 1
      }
      if (referrer.host !== now.host) {
        if (!pleaseReturn) {
          goHome()
        }
        return 2
      }
      let isRoot = Functions.isRoot(now.pathname)
      if (isRoot) {
        if (!pleaseReturn) {
          goHome()
        }
        return 3
      } else {
        if (referrer.host === now.host && !referrer.pathname) {
          this.$router.push('/')
          return 0
        } else {
          this.$router.back()
          return false
        }
      }
    },
    logoutDialog() {
      this.dialogTitle = '最終確認'
      this.dialogText = 'ログアウトしますか？'
      this.dialogActions = [
        {
          value: 'いいえ',
          action: () => {
            this.dialog = false
          },
        },
        {
          value: 'はい',
          action: () => {
            this.logout()
            this.dialog = false
          },
        },
      ]
      this.dialog = true
    },
    async logout() {
      const push = await webpush.get()
      if (push) {
        await this.sendAjaxWithAuth('/deletePushToken.php', {
          id: this.userStore.userId,
          token: this.userStore.userToken,
          endPoint: push.endpoint,
          publicKey: push.publicKey,
          pushToken: push.authToken,
        })
      }
      this.sendAjaxWithAuth('/logoutAccount.php', {
        id: this.userStore.userId,
        token: this.userStore.userToken,
      })
        .then((e) => {
          this.userStore.setId(null)
          this.userStore.setToken(null)
          this.userStore.setProfile(null)
        })
        .catch((e) => {
          console.log(e)
        })
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
.nav {
  width: 100%;
  height: 2em;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 0;
}
.text-none {
  font-weight: normal;
  font-size: 1.3em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}
.ripple {
  &:hover {
    box-shadow:
      0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  }
}
button {
  margin: 0.2em !important;
}
.v-input {
  display: flex;
  padding-right: 10%;
  justify-content: flex-end;
}
.v-item {
  display: flex;
  align-items: center;
  .nav {
    margin-left: 16px;
  }
}
.inline {
  display: inline;
  vertical-align: middle;
}
.header-list {
  text-decoration: none;
  color: inherit;
}
.logout {
  background-color: #aa0000;
  color: white;
  font-weight: bold;
  border-radius: 8px;
}
.menu-profile-img {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  object-fit: cover;
}
.menu-profile-flex {
  display: flex;
  flex-direction: column;
  .profile-name {
    font-size: 1.5em;
  }
  .profile-id {
    font-size: 0.9em;
    opacity: 0.7;
  }
  .nav {
    margin-top: -6px;
    margin-bottom: -6px;
    white-space: nowrap;
    overflow: hidden;
  }
}
.nav-drawer {
  @include mq('tablet') {
  }
  @include mq('smartPhone') {
    width: 60% !important;
  }
}
.nav-icon {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  .nav-round {
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    border-radius: 9999px;
    cursor: pointer;
    .nav-img {
      height: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
      border-radius: 9999px;
    }
  }
}
</style>
