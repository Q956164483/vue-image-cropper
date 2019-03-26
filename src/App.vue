<template>
  <div id="app">
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
  }
}
</script>

<style lang="scss">
@import './assets/css/config';
#app{
  position: relative;
  width:100%;
  height:100%;
}
.router-view{
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color:$bgColor;
  transition: opacity .33s, transform .33s cubic-bezier(0.25,0.1,0.25,1);
}
.slide-left-enter{
  opacity:.5;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity:0;
  transform: translate3d(-33%, 0, 0);
}
.slide-right-enter {
  opacity:.5;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity:0;
  transform: translate3d(33%, 0, 0);
}
</style>
