<template lang="pug">
.center
  .copyRight &copy; 2019 - {{ new Date().getFullYear() }} エノキ電気
</template>

<script>
import mixins from '~/mixins/mixins'
export default {
  mixins: [mixins],
}
</script>

<style lang="scss" scoped></style>
