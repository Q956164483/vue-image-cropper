<template>
  <div id="app">
    <loading v-if="isLoading"></loading>
    <transition :name="routerAni">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
// import { popup, openToast, openLoading, closeLoading } from './js/tools'
import loading from '@/components/loading'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    loading
  },
  computed: mapState(['isLoading', 'routerAni']),
  mounted () {
  },
  methods: {
  },
  watch: {
    '$route' (to, from) {
      const toPathLen = to.path.length
      const fromPathLen = from.path.length
      let routerAni = toPathLen < fromPathLen ? 'slide-right' : 'slide-left'
      this.$store.commit('routerAni', routerAni)
    }
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
