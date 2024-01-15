<template lang="pug">
.common-right-pannel-wrap.px-2
  .common-right-pannel
    p あああテスト
</template>

<script>
import mixins from '~/mixins/mixins'

export default {
  mixins: [mixins]
}
</script>

<style lang="scss" scoped>
.common-right-pannel-wrap {
  right: 0;
  .common-right-pannel {
    max-width: 260px;
    margin-right: auto;
  }
}
</style>
