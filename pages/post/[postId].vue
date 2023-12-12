<template lang="pug">
p {{ postId }}
</template>

<script>
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'

export default {
  mixins: [mixins],
  setup() {
    const route = useRoute()
    const postId = route.params.postId
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle(postId)
    Setup.setDescription(`ID:${postId}詳細ページ`)
  },
  mounted() {
    const params = this.$route.params
    this.postId = params.postId
  },
  data() {
    return {
      postId: null,
      postData: null,
    }
  },
}
</script>
