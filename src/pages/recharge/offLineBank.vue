<template>
	<view class="offLineBank">
		<view class="pdlr45 mt70">
			
			<view class="flex between" style="padding-top: 20px;">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="back"></image>
			</view>
			<view style="color: #fff">
				<view class="f50 pt38">
								{{t('back.r_r8')}}
							</view>
			<!-- 	<view class="f30 mt60 ">
					{{t('wr.w_u9')}}
				</view> -->
			</view>

			<view class="inpBox mt34">
				<view class="flex pb30 col_center" style="border-bottom: 1rpx solid #eee;">
					<view class="text_center" style="width: 100rpx;">{{currency}}</view>
					<input class="ml90 f36" type="number" placeholder="0" v-model="inputNum">
				</view>
				
				<view class="flex pb30 col_center mt34" style="border-bottom: 1rpx solid #eee;">
					<view class="text_center" style="width: 500rpx;">{{t('ss1.s_s4')}}</view>
					
					<input type="ml90 f36"  style="color: #F65E5E;" disabled
						:value="((inputNum?inputNum:0 ) - ((inputNum?inputNum:0 )  * u_percent)).toFixed(2)">
<!-- 					<input class="ml90 f36" type="number" placeholder="0" v-model="inputNum"> -->
				</view>
				
				


				<view class="flex  mt44   f20">
					<view class="pdlr35 pdtb22 textHiddenOne"
						style="background-color: #FFF8EB; color:#DE3824 ; border-radius: 10rpx;">
<!-- 						{{t('recharge.r_r9')}} -->
						{{t('wr.r_r15')}} : {{ pageData.min+ currency}} - {{ pageData.max+ currency}}
					</view>
				</view>
			</view>


			<view class="btns" style="margin-top:214rpx"
				@click="goOrder">
				{{t('back.a_c2')}}
			</view>
			
			
			<view class="mt20">
				<view style="color: #fff;" v-html="pageData.recharge_txt"></view>
			</view>
		</view>
		<FullMask  v-show="showMask" @confirm="methods.confirm" :maskList="maskData"></FullMask>
		
		<Loading ref="showLoading"></Loading>
		
	</view>
</template>

<script setup>
	import FullMask from "@/components/fullMask/fullMask";
	
	// import topNav from "@/components/topNav/topNav.vue"
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
	const showMask = ref(false)
	const methods = {
		confirm() {
			showMask.value = false;
		},
	};
	const maskData = ref([])


	const back = ()=>{
		history.back()
	}
	const numRate = ref(0)
	const inputNum = ref("")
	const goOrder = () => {
		console.log(inputNum.value)
		if ((inputNum.value - 0) < (pageData.value.min - 0) || (inputNum.value - 0) > (pageData.value.max - 0)) {
			Toast.text('Please enter the correct recharge range')
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			goOrder1()
		}, 2000)
	}
	const goOrder1 = () => {
		showLoading.value.loading = true
		const data = {
			amount: inputNum.value
		}
		request({
			url: 'finance/offline/recharge/submit',
			methods: 'post',
			data: data
		}).then(res => {
			showLoading.value.loading = false


			if (pageData.value.recharge_count == 0) {
				try {
					window.AndroidEM.onEvent('first_recharge')
				} catch (e) {}
			} else {
				try {
					window.AndroidEM.onEvent('repeatedly_recharge')
				} catch (e) {}
			}
			uni.navigateTo({
				url: './offlineOrder'
			})
		}).catch(err => {
			showLoading.value.loading = false
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	}
	const rateNum = computed(() => ((inputNum.value ? inputNum.value : 0) * pageData.value.u_rate).toFixed(2))
	const showLoading = ref(null)
	const pageData = ref({
		rate: 1,
		min: 0,
		max: 0
	})
	const getData = () => {
		request({
			url: 'finance/offline/recharge/index',
			methods: 'get'
		}).then(res2 => {
			pageData.value = res2
			
			if (res2.order) {
				uni.showModal({
						title: 'Tips',
						content: t('ss1.s_s12'),
						confirmText: 'confirm',
						cancelText: 'cancel',
						success: e => {
							if (e.confirm) {
								uni.navigateTo({
									url: './offlineOrder'
								})
							} else {
								request({
									url: 'finance/offline/recharge/cancel',
									methods: 'post',
									data: {
										order_no: res2.order.order_no
									}
								}).then(res => {
									Toast.text(t('wr.r_r13'))
									inputNum.value = ''
									if (res2.hint) {
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
			if (res2.hint) {
				showMask.value = true
				let obj = {
					content:res2.hint
				}
				maskData.value = [obj]
			}
		})
		
		request({
			url: '/setting/currency',
			methods: 'get'
		}).then(res => {
			uni.setStorageSync('currency', res.currency)
		})
	}
	const currency = uni.getStorageSync('currency')

	// 终于可以用了
	onShow(()=>{
		inputNum.value = ''
	})
	const u_percent = ref(0)
	onShow(() => {
		
		getData()
	})
	onLoad((e)=>{
		if(e.u_percent){
			u_percent.value = e.u_percent
		}
	})
</script>

<style lang="scss" scoped>
	.offLineBank{
		height: 100vh;
		margin-top: -36px;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.inpBox {
		padding: 76rpx 70rpx 50rpx 70rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}
	.btns {
		margin-top: 313rpx;
		text-align: center;
		line-height: 120rpx;
		color: #000;
		height: 120rpx;
		background: #fff;
		box-shadow: 0px 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
		border-radius: 35rpx;
		font-size: 36rpx;
	}
</style>
