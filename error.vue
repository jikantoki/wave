<template lang="pug">
.error-page
  .center
    .card
      img.logo-img(src="/icon.png")
      v-card-title.title Error {{ error.statusCode }}
      v-card-subtitle.error-subtitle(v-if="error.statusCode !== 404") {{ error }}
      v-card-subtitle.error-subtitle(v-else) {{ error.message }}
      v-card-text
        span ごめんエラーページ出ちった
      v-card-actions
        v-btn(@click="$router.push('/')") Top
        v-btn(@click="$router.go(-1)") Undo
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      error: useError()
    }
  }
}
</script>

<style lang="scss" scoped>
$breakpoints: (
  'smartPhone': 'screen and (max-width:900px)',
  'tablet': 'screen and (max-width:1400px)',
  'pwa': '(display-mode: standalone)'
) !default;

/* フォント設定 */
$font: 'Zen Maru Gothic', sans-serif;
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap');
/* フォント設定ここまで */

@mixin mq($breakpoint) {
  @media #{map-get($breakpoints, $breakpoint)} {
    @content;
  }
}
$body-font-family: $font;
html,
body {
  height: 100vh !important;
}
:root {
  font-size: 16px;
  --color-allow: #cceeff;
  --color-error: #ffcccc;
  --color-error: #cc2222;
  /** アプリの色 */
  --accent-color: #00bbee;
  /** アプリの色に合わせた文字色 */
  --accent-text-color: #ffffff;
  /** デフォルトのボーダー角の大きさ */
  --border-radius: 16px;
}
* {
  user-select: none;
  list-style: none;
  transition: all 0.14s;
  font-family: $font !important;
}
.error-page {
  background-color: black;
  color: #eeeeee;
}
.center {
  width: 60%;
  margin: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @include mq('tablet') {
    width: 80%;
  }
  @include mq('smartPhone') {
    width: 100%;
  }
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 2em;
}
.logo-img {
  width: 8em;
}
.error-subtitle {
  white-space: break-spaces;
  max-height: 20vh;
  overflow-y: auto;
  user-select: text;
}
</style>
