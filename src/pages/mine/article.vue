<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-20 16:01:15
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-23 17:51:40
 * @FilePath: \dandelion6 - 副本\src\pages\mine\article.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="artice">

		<view class="pdlr35 pt53">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;" @click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{pageData.name}}</view>
			<view class="mt40 " style="color: #fff;">
				<view v-html="pageData.contents"></view>
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


	
	const methods = {
		back() {
			history.back()
		},

	};
	const pageData = ref({})
	const getData  = (data)=>{
		if(data.pos==2){
			request({
				url: 'page/article/lists',
				methods: 'get',
				data
			}).then(res => {
				pageData.value = res[0]
			})
		}else{
			request({
				url: 'page/article/detail',
				methods: 'get',
				data
			}).then(res => {
				pageData.value = res
			})
		}
		
	}

	// 终于可以用了
	onShow(() => {
		getData
	})
	onLoad((e)=>{
		const data = {
			id:e.id
		}
		getData(data)
	})
</script>

<style lang="scss">
	.artice{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
</style>
