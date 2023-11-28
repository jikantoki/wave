<template lang="pug">
.home
  //img(alt="Vue logo" src="~/assets/logo.png")
  HelloWorld(msg="Welcome to Your Vue.js App")
</template>

<script>
// @ is an alias to /src
import HelloWorld from '~/items/HelloWorld.vue'
import metaFunctions from '~/js/metaFunctions'
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'

export default {
  name: 'HomeView',
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Vuetify')
    Setup.setDescription('Vuetifyのサンプルページ')
  },
  components: {
    HelloWorld,
  },
  mixins: [mixins],
  mounted() {
    this.setTitle('Vuetify')
  },
}
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
