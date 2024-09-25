<script>
import pageAnimation from '@/components/yy-PageAnimation';
import { useI18n } from 'vue-i18n';

export default {
   mixins: [pageAnimation],
   onLaunch: function () {
      if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
         // 如果是移动设备的话
         var meta = document.createElement('meta');
         meta.setAttribute('name', 'google');
         meta.setAttribute('content', 'notranslate');
         document.head.appendChild(meta);
      }
      // let curVersion = '1.0.0'
      // let nowVersion = uni.getStorageSync('version')
      // if (!nowVersion) {
      // 	uni.setStorageSync('version', curVersion)
      // 	window.location.reload()
      // } else {
      // 	if (nowVersion !== curVersion) {
      // 		uni.setStorageSync('version', curVersion)
      // 		window.location.reload()
      // 	}
      // }
   },
   onShow: function () {
      // console.log('App Show')
   },
   onHide: function () {
      // console.log('App Hide')
   }
};
</script>

<style lang="scss">
	.nutbig-turntable .drawTable-img {
		left: calc(50% - 23px) !important;
		top: 45px !important;
		width: 48px !important;
		height: 48px !important;
	}
	
	.nutbig-turntable .drawTable-name {
		font-weight: bold !important;
	}
	
	.nutbig-turntable .pointer {
		transform: translate(-45.75%, -50%) !important;
	}
	
	
	.nutbig-turntable {
		top: 600rpx !important;
	}
	
	.nutbig-hiteggs {
		display: grid !important;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 20rpx 20rpx;
	}
	
.xuan{
	.nut-radiogroup{
		.nut-radio{
			.nutui-iconfont{
				color:#fff;
			}
			.nut-radio__label {
				color: #fff;
				font-size: 0.75rem;
				margin-left: 10px;
			}
		}
	}
}
	
/*每个页面公共css */
.nut-navbar {
   padding: 0 !important;
}

uni-page {
   display: webkit-box;
   overflow: auto;
   paddingb-bottom: 10rpx;
   margin-bottom: -10rpx; // overflow: hidden;
   font-family: SF UI Text;
}

.uni-tabbar-bottom {
   bottom: 0 !important;
}
::-webkit-scrollbar {
   display: none;
}

.botBox {
   img {
      width: 100%;
   }
}

.maskItem img,
.mt70 img,
.mt40 img {
   width: calc(100% - 45rpx) !important;
   max-height: 100% !important;
}

page {
   font-family: PingFangSC !important;
   // color: #333;
   font-size: 30rpx;
   animation: 0.3s linear all;
   overscroll-behavior-y: none;
}

.secondClo {
   font-weight: bold;
   color: #2a5f64;
}

// 签名大小
.nut-signature .nut-signature-inner {
   height: 40vh !important;
   background-color: #fff;
}
// .sign .nut-button--primary {
//    background: #fff !important;
//    color: #000 !important;
// }
.sign {
   .nut-button {
      width: 90% !important;
      margin: 20rpx 5% !important;
      height: 100rpx;
      border-radius: 20rpx;
   }
}
.inp {
   padding: 44rpx 49rpx;
   background: #141414;
   box-shadow: 0px 1rpx 51rpx 0px rgba(64, 46, 197, 0.05);
   border-radius: 30rpx;
   font-size: 28rpx;
   color: #afafaf;
}

.btns {
   transition: 0.3s linear all;
}

.calendar-confirm-btn {
   border-radius: 20rpx !important;
   background: #f5b04c !important;
}

.calendar-month-day-active {
   background: #f5b04c !important;
}

.calendar-month-day-choose {
   color: #333 !important;
   background: rgb(254, 243, 222) !important;
}

.plo {
   color: #afafaf;
   font-weight: normal;
}

.pwdEye {
   transform: translateY(-50%);
}

.uni-swiper-dot {
   background-color: rgba(255, 255, 255, 0.5) !important;
}

.uni-swiper-dot-active {
   background-color: rgb(245, 176, 76) !important;
}
.nut-uploader__upload,
.nut-uploader__preview-img {
   width: 300rpx !important;
   height: 600rpx !important;
}
.ww49 .nut-icon:before {
   position: absolute;
   top: 52%;
   left: 46%;
   font-size: 24px;
}
</style>
