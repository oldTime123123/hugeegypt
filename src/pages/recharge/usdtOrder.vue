<template>
	<view class="usdtOrder">

		<view class="pdlr35 pt53 pb50 ">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="goBack"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{t('wr.r_r1')}}</view>
			<view class="mt38">
				<!-- top4 -->
				<view class="mt30 top_box">
					<view class="f26 flex  col_center">
						{{t('wr.r_r4')}}: <text class="pl10 f34"
							style="color: #DE3824">{{showTime}}</text>
					</view>
					<view class="mt34  flex-wrap between">
						<view class="items ">
							<view class="iTitle">{{t('wr.r_r5')}}</view>
							<view :style="topItemStyle">{{pageData.order_no}}</view>
						</view>
						<view class="items ">
							<view class="iTitle">{{t('wr.r_r6')}}</view>
							<view :style="topItemStyle">{{pageData.amount}}</view>
						</view>
						<view class="items topLine ">
							<view class="iTitle">{{t('wr.r_r10')}}</view>
							<view :style="topItemStyle">
								{{t('wr.r_r7')}}
							</view>
						</view>
						<view class="items topLine">
							<view class="iTitle">USDT</view>
							<view :style="topItemStyle">{{pageData.amount ?((pageData.amount) * rate).toFixed(2):0 }}
							</view>
						</view>
					</view>
				</view>

				<view class="addressBox">
					<view class="typeList center mb30">
						<view class="mglr20 typeItem" v-for="(item,index) in typeList"
							:style="typeInd== index?choStyle:''" @click="changeCode(index)">{{item.name}}</view>
					</view>
					<qrcode-vue :value="addresData" v-if="addresData" :size="163" level="H" />

					<view class="mt35 f26">
						{{t('wr.r_r8')}}
					</view>
					<view class="mt23 f22 addCopyEl " @click="copyHandle(addresData)">
						<view class="addEl">
							{{addresData}}

						</view>
						<view class="copy" @click="copyHandle(addresData)" :style="choStyle">copy</view>
					</view>

					<view class="copyBtn">
						<view v-html="text">
							
						</view>
						<!-- <view>1,Please transfer money to this address to recharge through the trc20 wallet. After
							completing the recharge, you can upgrade and do tasks to earn commissions.</view>
						<view class="mt20">
							2,Please refresh the page after recharging.
						</view> -->
					</view>
				</view>

					<view class="btns mt22"  v-if='length>0?true:false' :style="choStyled" style="box-shadow: none;display: flex; justify-content:center;" @click="goService">
						<view  style="width: 50px; height:50px;margin: auto 0;">
							<image style="width: 50px; height:50px;"  :src="server[0]?server[0].avatar:''" mode=""></image>
						</view>
						
						<view style="margin-left: 20rpx;">
							{{server[0]?server[0].service_name:''}}
							({{server[0]?server[0].start_working_time:''}} ~{{server[0]?server[0].end_working_time:''}})
						</view>
						
					</view>
				
				<view class="btns mt22 center" :style="choStyle" @click="methods.back">
					{{t('wr.r_r3')}}
				</view>
				
				<view class="btns mt22 center" :style="noStyle" style="box-shadow: none;background-color: #fff;"
					@click="cancleOrder">
					<view>
						{{t('wr.r_r9')}}
					</view>
				</view>
			


			</view>
		</view>

		<nut-overlay v-model:visible="cancleHandlemMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{t('wr.r_r12')}}</view>
					<view class="f30 mt40">
						{{t('wr.r_r11')}}
					</view>
					<view class="between">
						<view :style="{border:'1rpx solid #ccc',color: '#000'}">{{ t('all.a_c2')}}</view>
						<view @click="confirmHandle"
							style="color:#fff;background: #DE3824;"> {{t('all.a_c1')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import QrcodeVue from 'qrcode.vue'
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	import {
		onMounted
	} from 'vue';
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	const modal_qr = ref(false)
	import {
		useI18n
	} from "vue-i18n";
	const {
		t
	} = useI18n();
	const methods = {
		back() {
			if (!uploadTxid.value) {
				uni.showModal({
					title: 'Tips',
					content: 'Please transfer money from the trc20 wallet to the receiving address as soon as possible!',
					confirmText: 'Confirm',
					cancelText: 'Cancel',
					success: e => {
						if (e.confirm) {
							uni.navigateTo({
								url: '../record/rechargeRecord'
							})
						} else {

						}
					}
				});
			} else {
				uni.navigateTo({
					url: '../record/rechargeRecord'
				})
			}
		},
	};

	const typeList = [{
			name: 'TRC20'
		},
		// {
		// 	name:'USDT'
		// }
	]
	const service = () =>{
		uni.switchTab({
			url:'../tabbar/service'
		})
	}
	const typeInd = ref(0)

	const choStyled = {
		background: "#F36708",
		color: '#fff',
		border: 'none'
	}
	const noStyle = {
		color: "#000",
	}
	const topItemStyle = {
		color: "#fff",
		marginTop: '10rpx'
	}
	const changeCode = (ind) => {
		typeInd.value = ind
		// if (typeInd.value == 0) {
		// 	codeUrl.value = "https://www.baidu.com"
		// } else if (typeInd.value == 1) {
		// 	codeUrl.value = "https://www.bilibili.com/"
		// }
	}
	const pageData = ref({})
	const addresData = ref("")
	const length = ref()
	const timer = ref(null)
	const showTime = ref(0)
	const rate = ref(0)
	const times = ref(0)
	const choStyle = {
		background: "#e67f74",
		color: '#fff',
		border: 'none'
	}
	const goService = () => {
			if (server.value.length>0) {
				var userAgent = navigator.userAgent; //获取userAgent信息
				if (userAgent.includes('iPhone')) {
					window.location.href = server.value[0].contact_link
				}else{
					try{
						window.anecine_log.open_customer(server.value[0].contact_link);
						// window.open(item.contact_link)
					}catch(e){
						window.open(server.value[0].contact_link)
						//TODO handle the exception
					}
					// window.open(item.contact_link)
					// window.location.href = item.contact_link
					
					
				}
				
			}
		}
	const uploadTxid = ref(null)
	const server = ref([])
	const text = ref()
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (!res.order) {
				Toast.text('Order completed')
				uni.navigateTo({
					url: '../record/rechargeRecord'
				})
				return false
			}
			text.value = res.u_text
			addresData.value = res.address
			pageData.value = res.order
			server.value = res.service
			length.value = res.service.length

			try {
				if (res.type) {

					res.type == 1 ? uploadTxid.value = false : uploadTxid.value = true
				}
			} catch (e) {
				//TODO handle the exception
			}

			rate.value = res.rate
			if (timer.value) {
				clearInterval(timer.value)
			}
			times.value = res.order.expire_time
			startTimer()
		})
	}
	const changePage = () => {
		uni.navigateTo({
			url: '../record/rechargeRecord'
		})
	}
	const goBack = () => {
		history.back()
	}
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_d1') + " " + t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const cancleHandlemMask = ref(false)
	const cancleOrder = () => {
		cancleHandlemMask.value = true
	}
	const confirmHandle = () => {
		request({
			url: 'finance/usdt/recharge/cancel',
			methods: 'post',
			data: {
				order_no: pageData.value.order_no
			}
		}).then(res => {
			Toast.text(t('wr.r_r13'))
			uni.navigateTo({
				url: '../record/rechargeRecord'
			})
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const changeTime = (num) => {
		let minute = parseInt(num / 60)
		let second = num % 60
		showTime.value = (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second)
	}
	// 开始时间减减

	const startTimer = () => {
		const that = this
		timer.value = setInterval(() => {
			if (times.value == 0) {
				clearTimeout(timer.value)
				Toast.text('Order completed')
				uni.navigateTo({
					url: '../tabbar/recharge'
				});
			} else {
				times.value--;
				changeTime(times.value)
			}
		}, 1000)
	}
	// 终于可以用了
	onMounted(() => {
		getData()
	})
	// 终于可以用了
	onShow(() => {
		getData()
	})
	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
</script>

<style lang="scss">
	.usdtOrder{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
	.btns {
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 20rpx;
		text-transform: capitalize;
	}
	.copyBtn {
		font-size: 24rpx;
		margin-top: 20rpx;
		width: 100%;
		color: #DE3824;
	}

	.btns {
		height: 120rpx;
		// line-height: 120rpx;
		border-radius: 35rpx;
		color: #fff;
		overflow-scrolling: touch;
		-webkit-overflow-scrolling: touch !important;
	}

	.top_box {
		padding: 35rpx 40rpx;
		background-color: #fff;
		border-radius: 30rpx;
		color: #000;

		.items {
			width: 48%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			height: 140rpx;
			font-size: 24rpx;
			background-color: #e67f74;
			margin-bottom: 24rpx;
			border-radius: 20rpx;
		}

		.flex-wrap {
			flex-wrap: wrap;
		}
	}

	.addressBox {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 35rpx 25rpx 35rpx 35rpx;
		border-radius: 30rpx;
		background-color: #fff;
		color: #000;

		.typeItem {
			padding: 14rpx 32rpx;
			border-radius: 10rpx;
			border: 1rpx solid #eee;
		}

		.addCopyEl {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.addEl {
			color: #fff;
			height: 60rpx;
			background: #DE3824;
			border-radius: 10rpx;
			// padding: 0 30rpx;
			text-align: center;
			line-height: 60rpx;
			padding: 0 20rpx;
			flex: 1;
			margin-right: 20rpx;
		}

		.copy {
			padding: 0 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 10rpx;
		}
	}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;

		.content {
			margin-top: 400rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 350rpx;
			background: #fff;
			color: #000;
			border-radius: 30rpx;
			// justify-content: center;
			padding-top: 50rpx;
			position: relative;
			overflow: hidden;

			.between {
				position: absolute;
				bottom: 0;
				width: calc(100% - 80rpx);
				padding: 0 30rpx 40rpx;

				view {
					width: 48%;
					height: 100rpx;
					color: #fff;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					border-radius: 50rpx
				}
			}
		}
	}
</style>
