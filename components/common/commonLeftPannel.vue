<template lang="pug">
.common-left-pannel-wrap.px-2
  .common-left-pannel
    .navigation-buttons
      componentLeftPannelButton(
        href="/"
        icon="mdi-home-outline"
        isActive
      ) トップ
      componentLeftPannelButton(
        v-if="userStore && userStore.userId && userStore.profile"
        :href="`/${userStore.userId}`"
        icon="mdi-account"
        isActive
      ) プロフィール
      componentLeftPannelButton(
        v-for="item, key of NavigationList"
        :href="item.url"
        :icon="item.icon"
      ) {{ item.name }}
</template>

<script>
import mixins from '~/mixins/mixins'
import NavigationList from '~/items/itemNavigationList'
import componentLeftPannelButton from '../componentLeftPannelButton.vue'

export default {
  components: {
    componentLeftPannelButton
  },
  mixins: [mixins],
  data() {
    return {
      NavigationList
    }
  }
}
</script>

<style lang="scss" scoped>
.common-left-pannel-wrap {
  .common-left-pannel {
    position: relative;
    max-width: 260px;
    margin-left: auto;
  }
}
</style>
