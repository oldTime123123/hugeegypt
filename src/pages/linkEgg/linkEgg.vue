<template>
	<!-- <view class="wrap"
		style="background: url(../../static/egg/bg.png) no-repeat  100%/100%;">
		 -->
	<view class="pageBg">
		<view class="pt30 pl30">
			<nut-icon name="left" color="#fff" size="20" @click="jumpPage('/')"></nut-icon>
		</view>
		<view class="title">Red envelope</view>

		<view class="center" :style="{marginTop:newTop +'vw'}">
			<view class="money center">
				{{pageData.info?.price}} {{pageData.currency}}
			</view>
		</view>

		<view class="btns center" @click="getPro">
			Receive
		</view>
	</view>
</template>


<script setup>
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import request from '../../../comm/request.ts';
	import {
		useI18n
	} from "vue-i18n";
	
	const {
		t
	} = useI18n();
	const pageData = ref({})
	const getInfo = () => {

		request({
			url: 'activity/award/info',
			methods: 'post',
			data: {
				key: key.value
			}
		}).then(res => {
			pageData.value = res
		}).catch(err => {
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	}

	const jumpPage = url => {
		uni.reLaunch({
			url
		})
	}
	const getPro = () => {
		if (!uni.getStorageSync('token')) {
			uni.navigateTo({
				url: '../login/login'
			})
			return false
		}
		if (!pageData.value.info) {
			return false
		}

		if (pageData.value.info.status == 0) {
			uni.showToast({
				title:'The red envelope has been snatched',
				icon: 'none'
			})
			return false
		}
		request({
			url: 'activity/award/receive',
			methods: 'post',
			data: {
				key: key.value
			}
		}).then(res => {
			sessionStorage.clear()
			uni.showToast({
				title: res.price + "  USDT" ,
				icon: 'none',
				duration:5000
			})
			setTimeout(()=> {
				uni.navigateTo({
					url: "../mine/accountDetails"
				})
			}, 5500)
			getInfo()
		}).catch(e => {
			uni.showToast({
				title: e.message,
				icon: 'none'
			})
		})
	}
	const key = ref("")
	// sfH9cq2UXz
	onLoad(e => {
		if (e.key) {
			key.value = e.key
			sessionStorage.setItem('link', e.key)
			getInfo()
		}
		getSysInfo()
	})
	const newTop = ref(30)
	const getSysInfo = () => {
		uni.getSystemInfo({
			success: res => {
				if (res.windowHeight > 810) {
					newTop.value = 70;
				} else if (res.windowHeight <= 810 && res.windowHeight >= 750) {
					newTop.value = 70;
				} else if (res.windowHeight < 750 && res.windowHeight >= 710) {
					newTop.value = 62;
				} else if (res.windowHeight < 710 && res.windowHeight >= 610) {
					newTop.value = 50;
				} else {
					newTop.value = 35;
				}
			}
		});
	}
	// 
</script>


<style lang="scss" scoped>
	.pageBg {
		min-height: 100vw;
		height: 100vh;
		background: url('../../static/linkEgg/eggBg.png') no-repeat 100%/100%;
	}

	.title {
		padding-top: 68rpx;
		font-size: 80rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FBEBBD;
		text-align: center;
	}

	.money {
		background: url('../../static/linkEgg/egg.png') no-repeat 100%/100%;
		height: 300rpx;
		width: 300rpx;
		font-size: 42rpx;
		font-weight: 500;
		color: #DB1100;
	}

	.btns {
		width: 589rpx;
		height: 125rpx;
		background: linear-gradient(180deg, #FFFFE1 0%, #F5CB7E 100%);
		border-radius: 63rpx;
		margin: 100rpx auto 0;
		font-size: 40rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #DB1100;
		line-height: 125rpx;
	}
</style>
