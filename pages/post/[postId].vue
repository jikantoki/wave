<template lang="pug">

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
  data() {
    return {
      postData: null,
    }
  },
}
</script>
