<template lang="pug">
ins.adsbygoogle(
  :data-ad-client="adClient"
  :data-ad-slot="adSlot"
  :data-ad-format="adFormat"
  :style="adStyle")
</template>

<script>
export default {
  props: {
    adClient: {
      type: String,
      required: true,
    },
    adSlot: {
      type: String,
      required: true,
    },
    adFormat: {
      type: String,
      required: false,
      default: 'auto',
    },
    adStyle: {
      type: String,
      required: false,
      default: 'display: block',
    },
  },
  mounted() {
    1 + 1
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  },
  methods: {},
}
</script>
