<template>
    <div>
		<transition>
			<div v-if="isRequest" class="loadMask box box-ac box-pc">
				<div class="spinner">
					<div class="spinner-container container1">
						<div class="circle1"></div>
						<div class="circle2"></div>
						<div class="circle3"></div>
						<div class="circle4"></div>
					</div>
					<div class="spinner-container container2">
						<div class="circle1"></div>
						<div class="circle2"></div>
						<div class="circle3"></div>
						<div class="circle4"></div>
					</div>
					<div class="spinner-container container3">
						<div class="circle1"></div>
						<div class="circle2"></div>
						<div class="circle3"></div>
						<div class="circle4"></div>
					</div>
				</div>
			</div>
		</transition>
        <div v-if="showEnd" v-html="msg" class="end animated shake"></div>
    </div>
</template>
<script>
export default {
    props:{
			isRequest: {
				type: Boolean,
				default () {
					return false 
				}
			},
			showEnd: {
				type: Boolean,
				default () {
					return false 
				}
			},
			msg: {
				type: String,
				default () {
					return '没有更多数据了...' 
				}
			}
		}
}
</script>
<style lang="scss" scoped>
@import "../css/common.scss";
.end {
    height: .36rem;
    font-size:.28rem;
    color: #333;
	display: flex;
	align-items:center;
	justify-content:center;
    margin: .2rem;
	animation-duration: 2s;
}
.loadMask{
	position:fixed;
	z-index:9999999999;
    width:100%;
	height:100%;
	top:0;
	left:0;
	display: flex;
	align-items:center;
	justify-content:center;
	background-color:rgba(0,0,0,.03)
}

.spinner {
  width: 1rem;
  height: 1rem;
  position: relative;
}
 
.container1 > div, .container2 > div, .container3 > div {
  width: .3rem;
  height: .3rem;
  background-color: $theme-color;
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
 
.container2 {
  transform: rotateZ(45deg);
}
 
.container3 {
  transform: rotateZ(90deg);
}
 
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
 
.container2 .circle1 {
  animation-delay: -1.1s;
}
 
.container3 .circle1 {
  animation-delay: -1.0s;
}
 
.container1 .circle2 {
  animation-delay: -0.9s;
}
 
.container2 .circle2 {
  animation-delay: -0.8s;
}
 
.container3 .circle2 {
  animation-delay: -0.7s;
}
 
.container1 .circle3 {
  animation-delay: -0.6s;
}
 
.container2 .circle3 {
  animation-delay: -0.5s;
}
 
.container3 .circle3 {
  animation-delay: -0.4s;
}
 
.container1 .circle4 {
  animation-delay: -0.3s;
}
 
.container2 .circle4 {
  animation-delay: -0.2s;
}
 
.container3 .circle4 {
  animation-delay: -0.1s;
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
  }
}
</style>
