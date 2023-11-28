<template lang="pug">
.common-bar(v-show="!commonBarStore.hidden && !commonBarStore.neverHidden")
  .position-relative
    v-btn.bar-close(@click="commonBarStore.setNeverHidden(true)" icon="mdi-close")
    v-card.bar-v-card
      v-card-title.bar-title.pa-4 {{ title }}
      v-card-text.bar-sub-title.pa-1(v-if="subTitle") {{ subTitle }}
      v-card-actions.bar-actions
        //アクションは、hrefに飛ぶかdoを実行するかreturnの内容を$emitするか選べる
        a.bar-button.ma-4(
          v-for="button, key of buttons"
          :key="key"
          :href="button.href"
          @click="$emit('clicked',button.return)"
          )
          .v-ripple.button-text.px-4.py-1(v-ripple) {{ button.title }}
</template>

<script>
import mixins from '~/mixins/mixins'
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    subTitle: {
      type: String,
      require: false,
      default: null,
    },
    buttons: {
      type: Array,
      require: false,
      default: [],
    },
  },
  emits: ['clicked'],
  mixins: [mixins],
}
</script>

<style lang="scss" scoped>
$breakpoints: (
  'smartPhone': 'screen and (max-width:700px)',
  'tablet': 'screen and (max-width:1100px)',
  'pwa': '(display-mode: standalone)',
) !default;

@mixin mq($breakpoint) {
  @media #{map-get($breakpoints, $breakpoint)} {
    @content;
  }
}
.common-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  @include mq('smartPhone') {
  }
  .position-relative {
    position: relative;
    vertical-align: bottom;
  }
  .bar-v-card {
    width: 100%;
    height: 100%;
    background-color: var(--accent-color);
    color: white;
    .bar-actions {
      justify-content: center;
      .bar-button {
        background-color: white;
        text-decoration: none;
        color: var(--accent-color);
        border-radius: 9999px;
      }
    }
  }
}
.bar-title,
.bar-button {
  font-weight: bold !important;
}
.bar-title {
  font-size: 1.5em;
}
.bar-sub-title {
  font-size: 1.1em;
}
.bar-button {
  font-size: 1.3em;
  white-space: nowrap;
}
.bar-close {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: red;
  color: white;
}
.button-text {
  overflow: hidden;
}
</style>
