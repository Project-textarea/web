<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
window.addEventListener('beforeunload', e => {
  window.scroll(0, 0,)
})
export default {
  name: "App",
  computed: {},
  data() {
    return {};
  },
  watch: {},
  beforeCreate() {
  },
  created() {
  },
};
</script>

<style lang="less">
@import "./styles/common.less";

img::selection {
  background: transparent;
}
body{
  padding: 0;
  margin: 0;
}
* {
  -webkit-user-select: none !important;
  -khtml-user-select: none !important;
  -moz-user-selec: none !important;
  -ms-user-select: none !important;
  -o-user-select: none !important;
  user-select: none !important;
}

.about-container .content * {
  -webkit-user-select: text !important;
  -khtml-user-select: text !important;
  -moz-user-selec: text !important;
  -ms-user-select: text !important;
  -o-user-select: text !important;
  user-select: text !important;
}
[contenteditable="true"], input, textarea {
   -webkit-user-select:auto!important;
   -khtml-user-select: auto!important;
   -moz-user-select: auto!important;
   -ms-user-select: auto!important;
   -o-user-select: auto!important;
   user-select: auto!important;
 }
</style>
