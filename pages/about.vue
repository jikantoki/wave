<template lang="pug">
.about
  h1 This is an about page
  adsense
</template>

<script>
import metaFunctions from '~/js/metaFunctions'
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'

export default {
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('About')
    Setup.setDescription('NuxTempについて')
  },
  mounted() {
    this.setTitle('About')
  },
}
</script>
