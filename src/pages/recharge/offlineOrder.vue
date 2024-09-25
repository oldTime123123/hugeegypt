<template>
	<view class="offlineOrder">
		<!-- 		<topNav :title="t('recharge.r_r1')" :goBackNum="2"></topNav> -->
		<view class="pdlr45 mt70">
			<view class="flex between" style="padding-top: 20px;">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="back"></image>
			</view>
			<view style="color: #fff">
				<view class="f50 pt38">
					<!-- 								{{t('recharge.r_r8')}} -->
					{{t('wr.r_r1')}}
				</view>
				<!-- 	<view class="f30 mt60 ">
							{{t('wr.w_u9')}}
						</view> -->
			</view>
			<view class="mt38">
				<!-- top4 -->
				<view class="mt30 top_box text_center">

					<view class=" ">
						<view class="items ">
							<view class="iTitle ">{{t('back.r_o2')}}</view>
							<view :style="topItemStyle">{{pageData.order_no}}</view>
						</view>

						<view class="items ">
							<view class="iTitle ">{{t('back.r_o3')}}</view>
							<view :style="topItemStyle">{{pageData.amount}}</view>
						</view>


						<view class="items" @click="copyText(bankData.cci)">
							<view class="iTitle ">CCI</view>
							<view :style="topItemStyle">{{bankData.cci}}</view>
						</view>
						<view class="items topLine ">
							<view class="iTitle ">{{t('back.r_o4')}}</view>
							<view :style="topItemStyle">
								{{t('back.r_o5')}}
							</view>

						</view>
						<view class="iTitle" style="margin-left: 15px;" @click="copyText(bankData.name)">{{t('back.b1')}}</view>
						
						<view class="items  " style="justify-content:space-between;">
							<view :style="topItemStyle">{{bankData.name}}
							</view>
							<view class="flex " @click="copyText(bankData.name)">
								<view class="copyBtn">
									copy
								</view>
							</view>
						</view>
						
						
						<view class="iTitle" style="margin-left: 15px;" @click="copyText(bankData.bank_name)">{{t('back.b2')}}</view>
						
						<view class="items" style="justify-content:space-between">
							<view :style="topItemStyle">{{bankData.bank_name}}</view>
							<view class="flex " @click="copyText(bankData.bank_name)">
								<view class="copyBtn">
									copy
								</view>
							</view>
						</view>
						
						
						<view class="iTitle " style="margin-left: 15px;">{{t('back.b3')}}</view>
						
						<view class="items" style="justify-content:space-between" @click="copyText(bankData.bank_number)">
							<view :style="topItemStyle">{{bankData.bank_number}}</view>
							<view class="flex " @click="copyText(bankData.bank_number)">
								<view class="copyBtn">
									copy
								</view>
							</view>
						</view>
						
					</view>
				</view>


				
				<view class="btns mt78" v-if='length>0?true:false' :style="choStyled" style="box-shadow: none;display: flex; justify-content:center;" @click="goService">
					<view  style="width: 50px; height:50px;margin: auto 0;">
						<image style="width: 50px; height:50px;"  :src="bankData.service?bankData.service[0].avatar:''" mode=""></image>
					</view>
					
					<view style="margin-left: 20rpx;">
						
						{{bankData.service?bankData.service[0].service_name:''}}
						({{bankData.service?bankData.service[0].start_working_time:''}} ~{{bankData.service?bankData.service[0].end_working_time:''}})
					</view>
					
				</view>
				<!-- service -->
				<view class="btns mt22" :style="choStyle" @click="changePage(pageData.order_no)">
					{{t('back.r_r6')}}
				</view>
				<view class="btns mt22" :style="noStyle" style="box-shadow: none;background-color: #fff;"
					@click="cancleOrder">
					{{t('back.r_o7')}}
				</view>
			</view>

		</view>

		<view style="height: 100rpx;"></view>

		<nut-overlay v-model:visible="cancleHandlemMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{t('back.a_t1')}}</view>
					<view class="f30 mt40">
						{{t('back.r_o8')}}
					</view>
					<view class="between">
						<view :style="{border: '1rpx solid' +store.$state.contentColor,color:'#333'}">{{t('back.a_c1')}}
						</view>
						<view :style="{background:store.$state.contentColor}" @click="confirmHandle"> {{t('back.a_c2')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	// import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
	import useClipboard from 'vue-clipboard3'
	import QrcodeVue from 'qrcode.vue'
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();



	const back = () => {
		history.back()
	}
	const choStyle = {
		background: '#e67f74',
		color: '#fff',
		border: 'none'
	}
	const choStyled = {
		background: "#F36708",
		color: '#fff',
		border: 'none'
	}
	const noStyle = {
		color: store.$state.contentColor,
	}
	const topItemStyle = {
		color: "#DE3824",
		marginLeft: '23rpx'
	}

	const timer = ref(null)
	const showTime = ref("")
	const times = ref(0)
	const showLoading = ref(false)
	const cancleHandlemMask = ref(false)
	const typeList = [{
		name: 'TRC20'
	}, ]
	const typeInd = ref(0)
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('back.a_c4'))
		} catch (e) {
			console.error(e)
		}
	}

	const changeTime = (num) => {
		let minute = parseInt(num / 60)
		let second = num % 60
		showTime.value = (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second)
	}
	// 开始时间减减

	const startTimer = () => {
		timer.value = setInterval(() => {
			if (times.value == 0) {
				clearTimeout(timer.value)
				confirmHandle()
			} else {
				times.value--;
				changeTime(times.value)
			}
		}, 1000)
	}
	
	const goService = () => {
		if (bankData.value.service[0]) {
			window.location.href = bankData.value.service[0].contact_link
		}
	}
	const changePage = url => {
		console.log(url, 'sss')
		jumpPage('./offlineTxid?order=' + url)
	}
	// res.type == 1?uploadTxid.value = false:uploadTxid.value = true
	const cancleOrder = () => {
		cancleHandlemMask.value = true

	}
	const confirmHandle = () => {
		// console.log(pageData.value.order.order_no,'sss')
		showLoading.value.loading = true
		request({
			url: 'finance/offline/recharge/cancel',
			methods: 'post',
			data: {
				order_no: pageData.value.order_no
			}
		}).then(res => {
			showLoading.value.loading = false
			Toast.text(t('back.a_c5'))
			history.back()
		}).catch(err => {
			Toast.text(err.message)
		})
	}

	const jumpPage = (url) => {
		uni.navigateTo({
			url
		})
	}

	const pageData = ref({})
	const addresData = ref("")
	const uploadTxid = ref(false)
	const bankData = ref("")
	const length = ref('')
	const rate = ref(1)
	const getData = () => {
		request({
			url: 'finance/offline/recharge/index',
			methods: 'get'
		}).then(res => {
			// if (!res.order) {
			// 	history.back()
			// 	return false
			// }
			addresData.value = res.address
			pageData.value = res.order
			bankData.value = res
			length.value = res.service.length
			
			res.type == 1 ? uploadTxid.value = false : uploadTxid.value = true
			rate.value = res.rate
			if (timer.value) {
				clearInterval(timer.value)
			}
			// times.value = res.order.expire_time
			// startTimer()
		})
	}

	function copyText(text) {
		toClipboard(text)
		Toast.text(t('back.a_c4'))
	}

	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	// 终于可以用了
	onShow(() => {
		getData()

	})
</script>

<style lang="scss">
	.offlineOrder{
		min-height: 100vh;
		margin-top: -36px;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.iTitle {
		width: 250rpx;
		text-align: left;
		font-size: 24rpx;
	}
	.copyBtn {
		padding: 10rpx 30rpx;
		background-color: #DE3824;
		border-radius: 10rpx;
		color: #fff;

	}

	.btns {
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 20rpx;
	}

	.top_box {
		padding: 35rpx 40rpx;
		background-color: #fff;
		border-radius: 30rpx;

		.items {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			background-color: #FFF8EB;
			margin-bottom: 24rpx;
			border-radius: 20rpx;
			padding: 30rpx;

			

			view {
				word-break: break-all;
			}
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
		padding: 27rpx 71rpx 48rpx 71rpx;
		border-radius: 30rpx;
		background-color: #fff;

		.typeItem {
			padding: 14rpx 32rpx;
			border-radius: 10rpx;
			border: 1rpx solid #eee;
		}

		.addEl {
			color: #fff;
			height: 60rpx;
			background: #DE3824;
			border-radius: 10rpx;
			// padding: 0 30rpx;
			text-align: center;
			line-height: 60rpx;
			width: 100%;
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
					border-radius: 20rpx
				}
			}
		}
	}
</style>