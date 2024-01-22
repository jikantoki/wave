<template lang="pug">
.component-toast.px-3.py-2
  slot
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.component-toast {
  background: var(--accent-color);
  position: fixed;
  z-index: 1010;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 9999px;
}
</style>
