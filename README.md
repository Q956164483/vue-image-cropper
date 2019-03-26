## vue-image-cropper 基于vue的图片压缩裁剪插件

### 1.功能说明
图片压缩，图片裁剪，vue图片压缩，vue图片裁剪，vue-image-cropper，解决了部分机型方向不对的问题，同时可以对图片进行尺寸和质量的压缩
### 2.[效果演示](https://q956164483.github.io/vue-image-cropper/dist/#/)(chrome调试模式下或者手机打开)
### 3.本地运行
```bash
git clone https://github.com/Q956164483/vue-image-cropper.git
cd vue-image-cropper
yarn
yarn run serve
```
### 4.使用
1. copy本项目的 ./src/components/imageCropper.vue文件 (imageCropper.vue需要引入lrz)所以需要 yarn add lrz || npm install lrz
2. 在需要使用的页面直接引入imageCropper组件并绑定cropperConfig配置参数和裁剪之后的回调函数callback
```HTML
<image-cropper ref="imageCropper" :cropperConfig="cropperConfig" :callback="loadImage"></image-cropper>
```
```javascript
loadImage (data) {
  console.log(data)
  // data为base64字符串
}
```
### 5.参数说明
```javascript
cropperConfig: {
  width: 1, // 裁剪宽度（比例）
  height: 1, // 裁剪高度（比例）
  quality: 0.7, // 图片质量（0~1之间）
  maxWidth: 750 // 导出的图片的最大宽度
}
```
### 目前这个组件已经在我们的多个项目上用到，暂未发现问题，欢迎提问题一起完善，如果帮您解决了问题，请给个star，谢谢啦0.0



