<template>
	<view class="withdraw">

		<view class="pdlr35 pt53">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{t('wr.w_a1')}}</view>
			<!-- <view class="f30 mt60 secondClo">
				{{t('wr.w_u9')}}
			</view> -->
			<view class="choItem mt88" @click="changeChoosed('other')" :class="cType == 'other' ? 'choStyle' : 'noStyle'" v-if="showBank">
				<view class="flex">
					<image :src="store.$state.imgObj.other" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 center f28">Other</view>
				</view>
				<!-- {{store.$state.imgObj.ohter}} -->
				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType =='other'"></image>
				</view>
			</view>

			<view class="choItem" @click="changeChoosed('usdt')" :class="cType == 'usdt' ? 'choStyle' : 'noStyle'"
				v-if="showUsdt">
				<view class="flex">
					<image :src="store.$state.imgObj.usdt" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 center f28">USDT</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType =='usdt'"></image>
				</view>
			</view>
			
<view class="choItem" @click="changeChoosed('btc')" :class="cType == 'btc' ? 'choStyle' : 'noStyle'" v-if="showBTC">
				<view class="flex">
					<image src="/static/Chivo.jpg" mode="widthFix" style="width: 55rpx;height: 55rpx;border-radius: 50%;"></image>
					<view class="mglr49 center f28">Chivo</view>
				</view>
				<!-- {{store.$state.imgObj.ohter}} -->
				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType =='btc'"></image>
				</view>
			</view>


			<!-- btn -->
			<view class="btns" @click="changePage">
				{{t('all.a_c1')}}
			</view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
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

	const choStyle = {
		background: store.$state.contentColor,
		color:'#000',
		animation: '.2s linear all'
	}
	const cType = ref('')
	const changeChoosed = (type) => {
		cType.value = type
	}
	const methods = {
		back() {
			history.back()
		},
	};
	const showUsdt = ref(false)
	const showBank = ref(false)
const showBTC = ref(false)
	const getData = () => {
		request({
			url: 'setting/financeWay',
			methods: 'get'
		}).then(res => {
			// let tempArr = [1,2]
			// console.log(tempArr.includes(12));
			let {
				withdraw_type
			} = res
			// withdraw_type = [1]
			if(withdraw_type.includes(2)){
				cType.value = 'other'     
			}else{
				if (withdraw_type[0]==1) {
					cType.value = 'usdt'     
				}
				if (withdraw_type[0]==3) {
					cType.value = 'btc'  
				}  
			}
			if (withdraw_type.includes(1)) {
				showUsdt.value = true
			}
			if (withdraw_type.includes(2)) {
				showBank.value = true
			}
			if (withdraw_type.includes(3)) {
				showBTC.value = true
			}
			showLoading.value.loading = false
		}).catch(()=>{
			showLoading.value.loading = false
		})
	}

	const changePage = () => {
		let value = cType.value
		if (value == 'usdt') {
			uni.navigateTo({
				url: './usdtWithdraw'
			})
		} else if (value == 'other') {
			uni.navigateTo({
				url: './bankWithdraw'
			})
		} else if (value == 'btc') {
			uni.navigateTo({
				url: './btcWithdraw'
			})
		}
	}
	const showLoading = ref(null)
	onMounted(() => {
		showLoading.value.loading = true
	})
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss">
	.withdraw{
		height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.white{
		color: #fff;
	}
	.choStyle{
		object-fit:contain;
		flex-shrink: 0	;	
		background-size: 100% 100% !important;
		background: url(../../static/themeNum1/index/loginBtn.png);
	}
	.noStyle{
		background: #fff;
		color: #000;
		// box-shadow: 0 0 18px 0 #E9E9E9;
		// border: 0.5px solid #E9E9E9;
	}
	.choItem {
		padding: 37rpx 50rpx;
		// background-color: #1D1D1D;
		// color: #fff;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;

	
	}

	.btns {
		margin-top: 313rpx;
		text-align: center;
		line-height: 120rpx;
		background: #fff;
		color: #000;
		height: 120rpx;
		border-radius: 35rpx;
		font-size: 36rpx;
	}
</style>
