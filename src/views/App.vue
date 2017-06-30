<template>
  <div class="root h-p100 box box-ver">
    <div class="container h-p100 box box-ver">
        <router-view></router-view>
        <v-loading :isRequest="$store.state.isLoading"></v-loading>
    </div>
  </div>
</template>
<script type="text/javascript">
import '../css/common.scss'
export default {
  name: 'app',
  components: {
    "v-loading": require('../components/loading.vue')
  },
}
</script>
<style lang="scss" scoped>
</style>
