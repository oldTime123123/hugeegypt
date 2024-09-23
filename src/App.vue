<script>
	import pageAnimation from '@/components/yy-PageAnimation';
	import {
		useI18n
	} from "vue-i18n";


	export default {

		mixins: [pageAnimation],
		onLaunch: function() {

		},
		onShow: function() {
			// console.log('App Show')

		},
		onHide: function() {
			// console.log('App Hide')
		},

	}
</script>

<style lang="scss">


	/*每个页面公共css */
	.nut-navbar {
		padding: 0 !important;
	}

	.botBox {
		img {
			width: 100%;
		}
	}
	.text_white{
		color: #fff;
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
		background-color: #080808;
		font-size: 30rpx;
		animation: .3s linear all;
	}

	.secondClo {
		font-weight: bold;
		color: #2A5F64;
	}

	.inp {
		padding: 44rpx 49rpx;
		border-radius: 80rpx;
		font-size: 28rpx;
		color: #fff;
		background: #314539;
	}

	.loginInp {
		background: #FFFFFF;
		font-size: 28rpx;
		color: #fff;
		border-bottom: 1px solid #ccc;
		display: flex;
		padding: 30rpx 0;
	}

	.btns {
		transition: .3s linear all;
	}

	.calendar-confirm-btn {
		border-radius: 20rpx !important;
		background: #F5B04C !important;
	}

	.calendar-month-day-active {
		background: #F5B04C !important;

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

	.listItem {
		background: #314539;
		border-radius: 20rpx;
		padding: 34rpx 45rpx;
		margin: 30rpx auto;
		font-size: 28rpx;
		width: 600rpx;
		color: #fff;

		.vvItem {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 29rpx;
		}

		.pass {
			color: #5db760;
		}

		.error {
			color: #f5564b;
		}

		.cancel {
			color: #afafaf;
		}
	}
</style>
