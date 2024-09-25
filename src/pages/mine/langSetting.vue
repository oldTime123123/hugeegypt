<template>
	<view class="langSetting">

		<view class="pdlr35 pt53">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color:#fff"> {{title}}</view>

			<view class="mt80 pb50">
				<view class="kefuItem flex col_center" v-for="(item,index) in langList" @click="setHandle(index)"
					:class="langInd == index?'choStyle':'noStyle'">
					<image :src="`/static/lang/${item.lang}.png`" mode="widthFix" style="width: 60rpx;height: 60rpx;">
					</image>
					<view class="mglr40 f40">
						{{item.name}}
					</view>
				</view>
			<Loading ref="showLoading"></Loading>
		
				<!-- 	<view class="btns f40" :style="{background:store.$state.contentColor}" >
					{{t('all.a_c1')}}
				</view> -->
			</view>
		</view>
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
import i18n from 'i18n/i18n';
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";

	const {
		t,locale
	} = useI18n();
	const methods = {
		back() {
			if(uni.getStorageSync('token')){
				uni.switchTab({
					url:'../tabbar/index'
				})
			}else{
				uni.navigateTo({
					url:'../login/login'
				})
			}
			
		},

	};
	const langList = ref([])
	const langInd = ref(0)
	const getData = () => {
		title.value = t('all.a_c3')
		request({
			url: 'setting/lang',
			methods: 'get',
		}).then(res => {
			let langVal = uni.getStorageSync('lang')
			langList.value = res
			langList.value.forEach((item, index) => {
				if (langVal == item.lang) {
					langInd.value = index
				}
			})
		})
	}
	const title = ref()
	const showLoading = ref(null)
	
	const setHandle = (index) => {
		showLoading.value.loading = true
		uni.setStorageSync('lang', langList.value[index].lang)
		locale.value = langList.value[index].lang
		// getData()
		
		setTimeout(()=>{
			title.value = t('all.a_c3')
			langInd.value = index
			window.location.reload()
			
			showLoading.value.loading = false
		},500)
		// window.location.reload()
		// uni.redirectTo({
		// 	url:'./langSetting'
		// })
		// history.go(0)
		// window.history.pushState(null, null, "/pages/mine/langSetting");
		// window.open(item.contact_link)
	}
	// 终于可以用了
	onLoad(() => {
		getData();
	})
</script>

<style lang="scss">
	.langSetting{
		height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
	.kefuItem {
		border-radius: 30rpx;
		margin-bottom: 40rpx;
		padding: 35rpx 30rpx;
		transition: .3s linear all;
	}

	.btns {
		margin-top: 200rpx;
		text-align: center;
		height: 120rpx;
		box-shadow: 0px 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
		border-radius: 35rpx;
		color: #fff;
		line-height: 120rpx;
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
	}
</style>
