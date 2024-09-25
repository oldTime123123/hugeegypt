<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-20 16:01:15
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-23 18:25:28
 * @FilePath: \dandelion6 - 副本\src\pages\mine\iosIntro.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="iosIntro">

		<view class="pdlr30 pt53">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{t('add1.a_d1') + " APP"}}</view>
			
			
			<view class="flex mt20" style="justify-content: space-between; flex-wrap: wrap;">
				<view v-for="(item,index) in list" style="width: 100%;" class="mgtb40">
					<view class="text_bold f40">{{index+1}}</view>
					<image :src="item" mode="" style="width: 100%; height:944px;"></image>
				</view>
			</view>
		</view>
		

	</view>
</template>

<script setup>
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
			uni.switchTab({
				url:'/'
			})
		},

	};
const list = ref([
		// '/static/download/1.png',
		// '/static/download/2.png',
		// '/static/download/3.png',
		// '/static/download/4.png',
		'/static/IMG_1612.JPG',
		
	])
	// 终于可以用了
	onLoad(() => {

	})
</script>

<style lang="scss">
	.iosIntro{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	page {
		font-family: PingFangSC;
	}


</style>
