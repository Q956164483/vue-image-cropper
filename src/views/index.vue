<template>
  <div class="container">
    <img class="box" v-for="(value, key) in images" :value="value" :key="key" :src="value" />
    <div class="setting">
      <div class="box box-ver">
        <div class="box box-fh line box-ac">
          裁剪宽度：
          <input class="box box-f1" placeholder="width" type="tel" v-model="cropperConfig.width" />
        </div>
        <div class="box  box-fh line box-ac">
          裁剪高度：
          <input class="box box-f1" placeholder="height" type="tel" v-model="cropperConfig.height" />
        </div>
        <div class="box  box-fh line box-ac">
          图片质量：
          <input class="box box-f1" placeholder="height" type="tel" v-model="cropperConfig.quality" />
        </div>
        <div class="box  box-fh line box-ac">
          最大宽度：
          <input class="box box-f1" placeholder="height" type="tel" v-model="cropperConfig.maxWidth" />
        </div>
      </div>
      <div class="box box-ac box-jc">
        <div @click="selectFile()" class="btn">选择图片</div>
        <div @click="uploadImg()" class="btn">上传</div>
      </div>
    </div>
    <image-cropper ref="imageCropper" :cropperConfig="cropperConfig" :callback="loadImage"></image-cropper>
  </div>
</template>
<script>
import imageCropper from '@/components/imageCropper'
export default {
  name: 'index',
  components: {
    imageCropper
  },
  data () {
    return {
      images: [],
      cropperConfig: {
        width: 1,
        height: 1,
        quality: 0.7,
        maxWidth: 750
      }
    }
  },
  mounted () {
  },
  methods: {
    selectFile () {
      this.$refs.imageCropper.checkPhoto()
    },
    // 图片裁剪之后的回调
    loadImage (data) {
      this.images.push(data)
    },
    uploadImg () {
      alert('上传')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/config.scss";
.container{
  height:100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-top:4rem;
  img{
    display:block;
    width:50%;
    float:left;
  }
}
.setting{
  position:fixed;
  width:100%;
  top:0;
  left:0;
  border-bottom:1px dashed $themeColor;
  padding-bottom:.1rem;
  .line{
    margin:0 .2rem;
    height:.75rem;
    color:$themeColor;
  }
  input{
    display: block;
    height:.5rem;
    padding:0 .15rem;
    font-size:.32rem;
    border:1px solid $themeColor;
    outline: none;
  }
  .btn{
    color:#FFF;
    margin:.1rem .5rem;
    width:2rem;
    height:.6rem;
    line-height:.6rem;
    font-size:.32rem;
    text-align: center;
    background-color: $themeColor;
    border-radius:.1rem;
  }
}
</style>
