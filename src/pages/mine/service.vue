<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-20 16:01:15
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-23 18:28:27
 * @FilePath: \dandelion6 - 副本\src\pages\mine\service.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view  class="service" style="height: calc(100vh) !important;overflow: hidden;">

		<view class="pdlr35 pt53">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{t('all.a_c4')}}</view>

			<view class="mt80">
				<view class="kefuItem flex col_center" v-for="item in serviceList" @click="changePage(item)">
					<image :src="item.avatar" mode="widthFix" style="width: 80rpx;height: 80rpx;border-radius: 10rpx;"></image>
					<view class="mglr40 f34">
						{{item.service_name}} ({{item.start_working_time}} -
							{{item.end_working_time}})
					</view>
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

	const methods = {
		back() {
			history.back()
		},

	};
	const serviceList = ref([])
	const getData = () => {
		// 获取客服状态
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {
			// console.log(res);
			res.list ? serviceList.value = res.list : ''
		})
	}
	const changePage = item => {
		window.open(item.contact_link)
	}
	// 终于可以用了
	onShow(() => {
		getData();
	})
</script>

<style lang="scss">
	.service{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.kefuItem {
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		padding:  20rpx;
	}
</style>
