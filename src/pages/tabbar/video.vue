<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-20 16:01:15
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-23 17:21:46
 * @FilePath: \dandelion6 - 副本\src\pages\tabbar\video.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="video">
        <view class="nav">
			<view class="flex between margin">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="task_navigation"> 
				{{t('index.i_a32')}}
			</view>
			<view></view>
		</view>
        <view>
            <view class="pdlr30 mt70">
                
                <view class="mainBox">
                    <!-- <view class="f40 text_bold mb20">{{pageData.name}}</view> -->
                    <view v-html="companyData" style="text-transform: none !important"></view>
                </view>
            </view>
            <view style="height: 100rpx;"></view>
        </view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
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
	import {
		onMounted
	} from "vue";
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

	};
	const companyData = ref('')
	onLoad(e => {
        companyData.value = JSON.parse(decodeURIComponent(e.content))
	})
</script>

<style lang="scss" scoped>
	.video{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
    .nav {
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 32rpx 32rpx 0 32rpx;
	}
	.nav .task_navigation {
		font-size: 36rpx;
		color: #fff;
	}
	.mainBox {
		// background-color: #fff;
		// border-radius: 20px;
		// padding: 50rpx;
		// line-height: 40rpx;
		// word-spacing: 0.1rem;
		color: #fff;
		overflow-y: auto;
	}
</style>
