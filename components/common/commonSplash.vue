<template lang="pug">
.wait
  .wait-wrap(style="background:rgb(var(--v-theme-background));")
    img.splash-img(src="/img/icon512.png")
    p.text-h4.splash-text Nuxt
    .ma-16
    loading
</template>

<script>
import loading from '~/items/itemLoading.vue'

export default {
  name: 'splash',
  components: {
    loading: loading,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.wait-wrap {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .splash-img {
    width: 128px;
  }
  .splash-text {
    font-family: 'Zen Maru Gothic', sans-serif !important;
  }
  .loading {
    width: 100px;
  }
}
</style>
