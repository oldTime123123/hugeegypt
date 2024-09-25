<template>
	<view class="charge">

		<view class="pdlr35 pt53 pb50 ">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{t('wr.r_r1')}}</view>
			<view class="mt55">

				<view class="mt47 flex">
					<image src="../../static/themeNum1/wr/rechargeDor.png" mode="widthFix"
						style="width: 65rpx;height: 51rpx;"></image>
					<view class="mglr27" :style="{color:store.$state.secondColor}">
						{{t('wr.r_r14')}}
					</view>
				</view>
				<view v-if="pageData.type==2" class="inputBut">
					<view v-for="(item,index) in pageData.buttons" :key="index" class="inputItem">
						<view @click="selectBut(item)">{{ item }}</view>
					</view>
				</view>
				<view class="mainBox">
					<view class="flex">
						<view class="short" style="width: 30%;">{{currency}}</view>
						<input type="number"  :disabled="pageData.type==2" placeholder-class="plo" focus :placeholder="t('add1.b_b3')" v-model="inputNum">
					</view>

					<view class="flex mt30">
						<view class="short" style="width: 30%;">≈USDT</view>
						<input type="number"  style="color: #F65E5E;" disabled
							:value="(((inputNum?inputNum:0 ) * pageData.rate)+ ((inputNum?inputNum:0 ) * pageData.rate) * u_percent).toFixed(2)">
					</view>

					<view class="mt44">
						<view class="tips">
							{{t('wr.r_r15')}} : {{ pageData.min+ currency}} - {{ pageData.max+ currency}}
						</view>
					</view>
				</view>


				<view class="btns choStyle" @click="goOrder">
					{{t('wr.r_r3')}}
				</view>
			</view>
		</view>
		
	<!-- <nut-overlay v-model:visible="showMask">
		<div class="wrapper">
			<div class="content">
				<view v-html="maskData"></view>
			</div>
		</div>
	</nut-overlay> -->
	<FullMask  v-show="showMask" @confirm="methods.confirm" :maskList="maskData"></FullMask>
	
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import FullMask from "@/components/fullMask/fullMask";
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";
	
	const {
		t
	} = useI18n();
	const methods = {
		back() {
			history.back()
		},
		confirm() {
			showMask.value = false;
		},
	};
	const showMask = ref(false)
	const maskData = ref([])
	const pageData = ref({
		rate: 0
	})
	const inputNum = ref("")
	const showLoading = ref(null)
	const goOrder = () => {
		if ((inputNum.value - 0) < (pageData.value.min - 0) || (inputNum.value - 0) > (pageData.value.max - 0)) {
			Toast.text(t('wr.r_r16'))
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			goOrder1()
		}, 2000)
	}
	const goOrder1 = () => {


		const data = {
			amount: inputNum.value
		}
		request({
			url: 'finance/usdt/recharge/submit',
			methods: 'post',
			data: data
		}).then(res => {
			showLoading.value.loading = false
			uni.navigateTo({
				url: './usdtOrder'
			})
		}).catch(err => {
				showLoading.value.loading = false
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	}
const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (res.order) {
				const res2 = res
				uni.showModal({
					title: 'Tips',
					content: t('ss1.s_s12'),
					confirmText: 'Confirm',
					cancelText: 'Cancel',
					success: e => {

						if (e.confirm) {
							uni.navigateTo({
								url: './usdtOrder'
							})
						} else {
							request({
								url: 'finance/usdt/recharge/cancel',
								methods: 'post',
								data: {
									order_no: res.order.order_no
								}
							}).then(res => {
								Toast.text(t('wr.r_r13'))

								pageData.value = res2

								if (res2.hint) {
									showMask.value = true
									showMask.value = true
									let obj = {
										content:res2.hint
									}
									maskData.value = [obj]
								}
							})
						}
					}
				});
				return false
			}
			pageData.value = res

			if (res.hint) {
				
				showMask.value = true
				let obj = {
					content:res.hint
				}
				maskData.value = [obj]
			}
		})
	}
	
	const selectBut = (item)=>{
		inputNum.value = Number(item)
	}
	const currency = ref("")
	const u_percent = ref()
	// 终于可以用了
	onShow(() => {
		getData();
		currency.value = uni.getStorageSync('currency')
	})
	onLoad(e=>{
		u_percent.value = e.u_percent/100
	})
</script>

<style lang="scss" scoped>
	.charge{
		height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
	.choStyle{
		// background: url(../../static/themeNum1/index/loginBtn.png);
		// background-size: 100% 100%;
		background: #fff;
		color: #000 !important;

	}
	.mainBox {
		margin-top: 36rpx;
		border-radius: 30rpx;
		padding: 32rpx 57rpx;
		font-size: 28rpx;
		background-color: #fff;
		color: #000;
		.flex {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #eee;
			padding: 30rpx 0;

			.short {
				width: 60%;
				text-align: center;
				font-weight: bold;
			}

			input {
				margin-left: 30rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
		}

		.tips {
			background-color: #DE3824;
			border-radius: 10rpx;
			padding: 20rpx;
			font-size: 20rpx;
			width: auto;
			color: #fff;
			display: inline-block;
		}
	}

	.btns {
		margin-top: 200rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		text-transform: capitalize;
		border-radius: 35rpx;
	}
	.wrapper {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	
		.content {
			width: 650rpx;
			padding: 20rpx;
			height: 450rpx;
			overflow: scroll;
			background: #fff;
			border-radius: 8px;
		}
	}
	.inputBut{
		display: flex;
		color: #fff;
		flex-wrap: wrap;
		margin-top: 32rpx;
		.inputItem{
			margin: 0 15px 15px 0;
			padding: 5px;
			box-sizing: border-box;
			background: rgb(223, 184, 87);
		}
	}
</style>
