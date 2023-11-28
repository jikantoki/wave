<template lang="pug">
v-card.miniCard(elevation="12" width="256" loading v-if="!cookieAllowed")
  v-list-item.miniCard(three-line)
    v-list-item-title.text-h6 We need Cookie!
    v-list-item-subtitle.text-h7 クリックすることで利用規約に同意し、クッキーの使用を許可します。
  v-card-actions
    v-btn(@click="allowCookie()") Allow Cookie
</template>

<script>
import mixins from '~/mixins/mixins'
export default {
  mixins: [mixins],
  mounted() {
    this.cookieAllowed = this.checkCookie()
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.v-card {
  position: fixed;
  right: 10%;
  top: 10%;
}
.v-btn {
  background-color: var(--color-allow);
}
.miniCard > div {
  flex-direction: column !important;
  align-items: baseline !important;
  display: block !important;
}
</style>
