<template lang="pug">
.component-button(
  @click="$emit('clicked', id)"
  v-ripple
  )
  v-icon.icon {{ icon }}
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      require: false,
      default: null,
    },
    icon: {
      type: String,
      require: false,
      default: 'mdi-magnify',
    },
  },
  emits: ['clicked'],
}
</script>

<style lang="scss" scoped>
.component-button {
  position: fixed;
  bottom: 1.3em;
  right: 1.3em;
  z-index: 50;
  height: 4em;
  width: 4em;
  background-color: var(--accent-color);
  color: white;
  cursor: pointer;
  border-radius: 9999px;
  .icon {
    font-size: 2.5em;
    height: 100%;
    width: 100%;
  }
}
</style>
