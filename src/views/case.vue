<template>
  <div class="container">
      <img class="box" v-for="(item,index) in images" :src="item" />
      <div class="setting">
        <div class="box box-ver">
          <div class="box box-fh">
            裁剪宽度：
            <input class="box box-f1" placeholder="宽" v-model="cropperSize.width" />
          </div>
          <div class="box  box-fh">
            裁剪高度：
            <input class="box box-f1" placeholder="高" v-model="cropperSize.height" />
          </div>
        </div>
        <div class="box box-ac box-pc">
          <div @click="checkPhoto()" class="uploadImg"></div>
          <div @click="uploadImg()" class="btn">上传</div>
        </div>
        
      </div>
      <image-cropper :cropperSize="cropperSize" :checkPhotoFlag="checkPhotoFlag" :callback="loadImage"></image-cropper>
  </div>
</template>
<script>
export default {
  name: 'topicCreate',
  components: {
    'image-cropper': require('../components/imageCropper.vue')
  },
  data() {
    return {
      images: [],
      isRequest: false,
      checkPhotoFlag:0,
      cropperSize:{
        width:1,
        height:1
      }
    }
  },
  mounted () {
  },
  methods: {
    checkPhoto () {
      this.checkPhotoFlag++
    },
    // image-cropper组件的回调
    loadImage (data) {
      // this.images = []
      this.images.push(data)
      this.file = this.dataURLtoBlob(data)
    },
    // dataurl 转 Blob
    dataURLtoBlob (dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    },
    uploadImg () {
      alert('上传')
      var self = this
      var state = self.$store.state
      var file = self.file
      var formData = new FormData()
      formData.append('file', file)
      formData.append('token','你的七牛token');
      this.$http.post('http://up-z2.qiniu.com/', formData, {
        progress(event) {
          let progress = Math.floor(event.loaded / event.total * 100) + '%'
          console.log(progress)
        }
      }).then(res => {
        var data = res.data
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../css/common.scss';
    @import '../css/mixins.scss';
    .container{
      height:100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      padding-top:2.5rem;
      img{
        display:box;
        width:48%;
        margin:.4%;
        float:left;
      }
    }
    .setting{
      position:fixed;
      width:100%;
      top:.2rem;
      left:0;
      input{
        font-size:.4rem;
        border:1px solid #999;
      }
      .btn{
        width:1rem;
        height:.5rem;
        line-height:.5rem;
        text-align: center;
        background-color:$theme-color;
        border-radius:.1rem;
      }
    }
    
    .uploadImg{
      width:1rem;
      height:1rem;
      margin-right:1rem;
      @include bg-size(cover);
      @include bg-image('../img/upload')
    }
</style>
