<template lang="pug">
a.component-left-pannel-button.left-links-a(:href="href")
  .left-links-ripple.py-3.px-4.my-3(v-ripple)
    v-icon.left-links-icon {{ icon }}
    p.left-links-word.pl-2(v-if="!isActive")
      slot
    p.left-links-word.active-text(v-if="isActive")
      slot
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      require: false,
      default: null
    },
    icon: {
      type: String,
      require: false,
      default: null
    },
    isActive: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.left-links-a {
  text-decoration: none;
  color: var(--v-theme-surface);
  cursor: pointer;
  .left-links-ripple {
    display: flex;
    font-size: 1.5em;
    border-radius: 9999px;
    &:hover {
      background: rgba(100, 100, 100, 0.3);
    }
    .left-links-word {
      white-space: nowrap;
    }
    .active-text {
      font-weight: bold;
    }
  }
}
</style>
