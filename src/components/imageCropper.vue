<style lang="scss" scoped>
  @import '../css/color.scss';
  @import '../css/mixins.scss';
  .box{display: -webkit-box !important;display: box !important;position:relative;}
  .box-f1{position:relative;-webkit-box-flex: 1;box-flex: 1;}
  .box-ac{-webkit-box-align:center;box-align:center;}
  .box-pc{-webkit-box-pack:center;box-pack:center;}
  .box-pe{webkit-box-pack:end;box-pack:end;}
  .box-pj{-webkit-box-pack:justify;box-pack:justify;}
  .box-ver{-webkit-box-orient:vertical;box-orient:vertical;}
  .box-ver{-webkit-box-orient:vertical;box-orient:vertical;}
  .box-rev {-webkit-box-direction:reverse;box-direction:reverse;}
  .box-fh{width:100%;}
  .cropper-page{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fff;
    overflow: hidden;
  }
  .cover{
    color:#FFF;
    font-size:.4rem;
    background-color: rgba(0,0,0,0.5);
  }
  .cropper-box{
    border:1px dashed $border-color;    
  }
  .cropper-img{
    position: absolute;
    z-index: -1;
  }
  input[type="file"]{
    opacity: 0;
    position: fixed;
    top:-1000px;
    left:-1000px;
  }
  .btn{
    font-size:.3rem;
    padding:.1rem .3rem;
    border:.02rem solid;
    color:#FFF;
    border-radius:.1rem;
    &.sure{
      color:$theme-color;
    }
  }
</style>

<template>
  <div ref="cropperPage" class="cropper-page" v-show="isShow" >
    <input ref="file" type="file" accept="image/*" @change="readImage">
    <img alt="" class="cropper-img" :style="imageStyle" ref="img">
    <div class="cover box box-ac box-pc" :style="{height: coverHeight + 'px'}">
      请调整图片
      <!--<div>{{imageStyle.transform}}</div>-->
    </div>
    <div ref="cropBox" class="cropper-box" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend.prevent="touchEnd"></div>
    <div class="cover cover box box-ac box-pc" :style="{height: coverHeight + 'px'}">
      <div class="box box-f1 box-pc box-fh">
        <div class="btn" @click="checkPhoto">重选</div>
      </div>
      <div class="box box-f1 box-pc box-fh">
        <div class="btn sure" @click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import EXIF from 'exif-js'
const getDinstance = function (point0, point1) {
  return Math.sqrt(Math.pow(point0.pageY - point1.pageY, 2) + Math.pow(point0.pageX - point1.pageX, 2))
}
export default {
  name: 'ImageCropper',
  props: {
    callback: {
      type: Function,
      default () {}
    },
    checkPhotoFlag:0,
    cropperSize: {
      type: Object,
      default () {
        return {
          width:1,
          height:1
        } 
      }
    }
  },
  data () {
    return {
      coverHeight: 0,
      cropperHeight: 0,
      imgInitTop: 0,
      amplitude: 0,
      imageState: {
        left: 0,
        top: 0,
        scale: 1,
        width: 0,
        height: 0,
        originX: 0,
        originY: 0
      },
      distance: 0,
      imageStyle: {
        top: '0',
        transform: 'translate3d(0px, 0px, 0px) scale(1)',
        transformOrigin: 'left top'
      },
      cropBoxRect: {},
      touchPos: {
        x: 0,
        y: 0
      },
      isShow: false,
      minScale: 0,
      info: '',
      file:null
      // orientation:6
    }
  },
  watch: {
    'imageState': {
      handler (val, oldVal) {
        // console.log(this.imageState.left)
        // this.imageStyle.transformOrigin = val.originX + '% ' + val.originY + '%'
        // this.imageStyle.transform = 'translate3d(-' + val.left + 'px, -' + val.top + 'px, 0px)'
        this.imageStyle.transform = 'translate3d(-' + val.left + 'px, -' + val.top + 'px, 0px) scale(' + val.scale + ')'
      },
      deep: true
    },
    checkPhotoFlag () {
      // console.log('触发选择图片')
      this.checkPhoto()
    }
  },
  methods: {
    checkPhoto () {
      this.$refs.file.click()
    },
    readImage (event) {
      // console.log('read')
      var self = this
      self.$store.state.isLoading = true
      var file = event.target.files[0]
      var reader = new window.FileReader()
      self.file = file
      reader.onload = () => {
        // 通过 reader.result 来访问生成的 DataURL
        //EXIF.getData(file, function() { 
          self.$store.state.isLoading = false
          self.$refs.img.onload = () => {
            self.initCropper()
          }
          self.$refs.img.src = reader.result
          //self.orientation = EXIF.getTag(this, 'Orientation')
        //})
      }
      reader.readAsDataURL(file)
    },
    initCropper () {
      this.isShow = true // 显示裁剪界面
      this.$nextTick(() => {
        let cropperPage = this.$refs.cropperPage
        let pageWidth = cropperPage.clientWidth
        let pageHeight = cropperPage.clientHeight

        let cropBox = this.$refs.cropBox
        let cropBoxWidth = cropBox.clientWidth
        let cropBoxHeight = Math.floor(cropBoxWidth*(+this.cropperSize.height)/(+this.cropperSize.width))

        this.$refs.cropBox.style.height = cropBoxHeight + 'px'
        this.coverHeight = (pageHeight - cropBoxHeight) / 2
        let cropBoxTop = this.coverHeight

        this.imageState.left = 0
        this.imageState.top = 0
        
        this.imageStyle.top = cropBoxTop + 'px'
        
        this.cropBoxRect = {
          left: 0,
          top: cropBoxTop,
          width: pageWidth,
          height: cropBoxHeight
        }

        let img = this.$refs.img
        var width = this.imageState.width = img.naturalWidth
        var height = this.imageState.height = img.naturalHeight
        // console.log(width,height)
        // 计算imageState
        if (width > height) {
          this.minScale = this.imageState.scale = this.cropBoxRect.height / height
          this.imageState.left = (width * this.imageState.scale - this.cropBoxRect.width) / 2
        } else {
          this.minScale = this.imageState.scale = this.cropBoxRect.width / width
          this.imageState.top = (height * this.imageState.scale - this.cropBoxRect.height) / 2
        }
      })
    },
    confirm () {
      let self = this
      let imageState = this.imageState
      let cropBoxRect = this.cropBoxRect
      let scale = imageState.scale
      let image = this.$refs.img
      let width = cropBoxRect.width
      let height = cropBoxRect.height
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // ios 的照片有拍摄的角度信息 参考 http://www.bcty365.com/content-142-3055-1.html
      //alert(self.orientation)
      self.$store.state.isLoading = true
      EXIF.getData(self.file, function() { 
        self.$store.state.isLoading = false
        let orientation = EXIF.getTag(this, 'Orientation')
        // alert(orientation)
        if(!orientation) {
          if (navigator.userAgent.indexOf('Android') > -1) {
            orientation = 1
          } else {
            orientation = 6
          }
        }
        switch(orientation){ 
          case 1:
            canvas.width = width  
            canvas.height = height 
            ctx.drawImage(image, imageState.left / scale, imageState.top / scale, width / scale, height / scale, 0, 0, width, height)
            break
          case 6:
            canvas.width = height 
            canvas.height = width
            ctx.rotate(90*Math.PI/180) 
            ctx.drawImage(image, imageState.left / scale, imageState.top / scale, width / scale, height / scale, 0, -height, width, height) 
            break
          case 8:
            canvas.width = height 
            canvas.height = width
            ctx.rotate(-90*Math.PI/180) 
            ctx.drawImage(image, imageState.left / scale, imageState.top / scale, width / scale, height / scale, -width, 0, width, height)
            break; 
          case 3: 
            canvas.width = width  
            canvas.height = height 
            ctx.rotate(180*Math.PI/180) 
            ctx.drawImage(image, imageState.left / scale, imageState.top / scale, width / scale, height / scale, -width, -height, width, height)
            break
        }    
        let data = canvas.toDataURL("image/png")
        self.callback(data)
        self.isShow = false
      })
    },
    getFocalPoint (point0, point1) {
      return {
        x: (point0.pageX + point1.pageX) / 2,
        y: (point0.pageY + point1.pageY) / 2
      }
    },
    touchStart (event) {
      var fingerCount = event.touches.length
      if (fingerCount) {
        // 记录触摸初始位置
        let touchEvent = event.touches[0]
        this.touchPos = {
          x: touchEvent.clientX,
          y: touchEvent.clientY
        }
      }

      if (fingerCount >= 2) {
        // 获取两点距离、中点位置；两点距离old/new=放大倍数；中点位置，缩放中心；
        let point0 = event.touches[0]
        let point1 = event.touches[1]

        this.distance = getDinstance(point0, point1)
        this.touchPos = this.getFocalPoint(point0, point1)
        // 设置缩放倍数，
      }
    },
    touchMove (event) {
      // 根据触摸点位移，移动图片，重置触摸点位置
      var fingerCount = event.touches.length
      var touchEvent = event.touches[0]

      if (fingerCount === 1) {
        let distX = touchEvent.pageX - this.touchPos.x
        let distY = touchEvent.pageY - this.touchPos.y
        let newX = this.imageState.left - distX
        let newY = this.imageState.top - distY

        let scale = this.imageState.scale
        // alert(scale)
        let maxX = this.imageState.width * scale - this.cropBoxRect.width
        let maxY = this.imageState.height * scale - this.cropBoxRect.height
        this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
        this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
        this.touchPos.x = touchEvent.pageX
        this.touchPos.y = touchEvent.pageY
      }  else if (fingerCount > 1) {
        let point0 = event.touches[0]
        let point1 = event.touches[1]

        let distance = getDinstance(point0, point1)
        let zoom = distance / this.distance

        let scale = zoom * this.imageState.scale
        let maxX = this.imageState.width * scale - this.cropBoxRect.width
        let maxY = this.imageState.height * scale - this.cropBoxRect.height
        let touchPos = this.getFocalPoint(point0, point1)
        let newX = zoom * (this.imageState.left + touchPos.x) - touchPos.x
        let newY = zoom * ((this.imageState.top - this.imgInitTop) + touchPos.y) - touchPos.y + this.imgInitTop
        // 限制缩放

        // 图片新位置:由中点位置确认;(新位置到中点)/(旧位置到中点)=(new scale)/(old scale)
        // newLeft - touchPos.x = (distance / this.distance) * (oldLetf - touchPos.x)
        // oldLeft = 0 - this.imageState.left
        // oldTop = imgInitTop - this.imageState.top
        this.distance = distance
        if (scale < this.minScale) {
          this.imageState.scale = this.minScale
        } else {
          this.imageState.scale = scale
          this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
          this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
        }
        this.touchPos = touchPos
      }
    },
    touchEnd (event) {
      console.log('end')
    }
  }
}
</script>