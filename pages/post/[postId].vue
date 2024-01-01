<template lang="pug">
.post-page
  ComponentPostDetail(
    v-if="postData"
    :post="postData"
    :clickable="false"
    )
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
    Setup.setTitle('ポスト')
    Setup.setDescription('ポストの詳細')
  },
  async mounted() {
    this.setTitle('ポスト')
    const params = this.$route.params
    this.postId = params.postId
    const post = await this.sendAjaxWithAuth('/getPost.php', {
      postId: this.postId
    })
    if (post && post.body.status === 'ok') {
      const returnPost = {
        ...post.body.res,
        message: this.decodeEntity(post.body.res.postMessage)
      }
      this.postData = returnPost
    } else {
      //404
    }
  },
  data() {
    return {
      postId: null,
      postData: null
    }
  }
}
</script>
