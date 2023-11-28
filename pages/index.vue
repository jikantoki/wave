<template lang="pug">
.index-page
  .wrap
    v-card.content(elevation="4")
      .text-h1
        span NuxTemp {{ PackageJson.version }}
        img.ontext(src="~/assets/logo.png")
      hr
      .text-h6 {{ $t('index.nuxtSampleProject') }}
      .btns
        v-btn(@click="pushForMe()") {{ $t('index.buttons.notificationTest') }}
        //v-btn.is-not-pwa(@click="download('/download/nuxTemp.apk','vuetifyTemplate.apk')") Download APK
        v-btn(@click="a('https://github.com/jikantoki/nuxt3temp')") Github
        v-btn(@click="createPopup()") {{ $t('index.buttons.popup') }}
      .input-area
        v-text-field.my-4(
          :label="$t('index.hints.whatDoYouWantToSend')"
          v-model="notificationText"
          )
      .lang {{ $t('page.content') }}
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
  .wrap
    v-card.content(elevation="4")
      .text-h2 {{ $t('index.easyAndBeautiful') }}
      p {{ counter.count }}
      v-btn(@click="counter.increment") 追加
      hr
      .text NuxTempで理想の作業効率化
      p 吾輩は猫である。名前はまだない。どこで生れたか頓（とん）と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪（どうあく）な種族であったそうだ。この書生というのは時々我々を捕（つかま）えて煮て食うという話である。しかしその当時は何という考（かんがえ）もなかったから別段恐しいとも思わなかった。ただ彼の掌（てのひら）に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ち付いて書生の顔を見たのがいわゆる人間というものの見始（みはじめ）であろう。この時妙なものだと思った感じが今でも残っている。第一毛を以て装飾されべきはずの顔がつるつるしてまるで薬缶（やかん）だ。その後猫にも大分逢（あ）ったがこんな片輪には一度も出会（でく）わした事がない。のみならず顔の真中が余りに突起している。そうしてその穴の中から時々ぷうぷうと烟（けむり）を吹く。どうも咽（む）せぽくて実に弱った。これが人間の飲む烟草（タバコ）というものである事は漸（ようや）くこの頃（ごろ）知った。
  .wrap
    v-card.content(elevation="4")
      .text-h2 画像だって表示可能
      hr
      p このコンポーネントを使えば、エモい感じで画像を簡単に表示できます
      .img-wrap.my-4
        img.big-img(src="~/assets/img001.jpg")
        p.text-h1 テキストを入力
  .wrap
    v-card.content(elevation="4")
      .text-h2 いい感じの読み込み画面
      hr
      .flex
        .flex-child
          p.text-h0 H0テキスト
          p.text-h1 H1テキスト
          p.text-h2 H2テキスト
          p.text-h3 H3テキスト
          p.text-h4 H4テキスト
          p.text-h5 H5テキスト
          p.text-h6 H6テキスト
          p.text-h7 H7テキスト
        .flex-child
          ContentLoader.text-h0
          ContentLoader.text-h1
          ContentLoader.text-h2
          ContentLoader.text-h3
          ContentLoader.text-h4
          ContentLoader.text-h5
          ContentLoader.text-h6
          ContentLoader.text-h7
</template>

<script>
/**
 * ページ推移ごとにmountedを実行する必要があるため、どのviewsでも読み込むこと
 */
import mixins from '~/mixins/mixins'
import webpush from '~/js/webpush'
import metaFunctions from '~/js/metaFunctions'
import Setup from '~/js/setup'
export default {
  name: 'index',
  components: {},
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Top')
    Setup.setDescription('Nuxt環境を簡単にセットアップできる全部入りパッケージ')
  },
  data() {
    return {
      notificationText: '通知テスト12345🤓',
      dialog: false,
      dialogTitle: null,
      dialogText: null,
      dialogActions: null,
      counter: useCounterStore(),
    }
  },
  async mounted() {
    this.setTitle(this.$t('index.title'))
  },
  methods: {
    async pushForMe() {
      const keys = await webpush.get()
      if (!keys) {
        this.dialogTitle = '通知を送信できませんでした'
        this.dialogText =
          'プッシュ通知が許可されていないため、処理を完了できませんでした'
        this.dialog = true
        this.dialogActions = [
          {
            value: '閉じる',
            action: () => {
              this.dialog = false
            },
          },
        ]
        return false
      }
      this.sendAjaxWithAuth(
        '/sendPushForMe.php',
        {
          endpoint: keys.endpoint,
          publickey: keys.publicKey,
          authtoken: keys.authToken,
        },
        {
          message: this.notificationText,
          title: 'て～～～すと🤓',
          icon: 'https://nuxt.enoki.xyz/img/icon192.png',
        },
      )
      this.dialogTitle = '通知を送信しました'
      this.dialogText = 'プッシュ通知を確認してみてください！'
      this.dialog = true
      this.dialogActions = [
        {
          value: '閉じる',
          action: () => {
            this.dialog = false
          },
        },
      ]
      return true
    },
    createPopup() {
      this.dialogTitle = 'ポップアップテスト'
      this.dialogText = 'これはテストです'
      this.dialog = true
      this.dialogActions = [
        {
          value: 'ボタン2',
          action: () => {
            this.dialog = false
          },
        },
        {
          value: '閉じる',
          action: () => {
            this.dialog = false
          },
        },
      ]
    },
  },
}
</script>
