<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-19 14:16:47
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-19 16:45:14
 * @FilePath: \dandelion6 - 副本\src\pages\tabbar\Profits.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view >
		<view class="content">
			<view class="ScrollBox">
				<view v-html="Profits" class="pText"></view>
			</view>
		</view>
		<!-- <view style="height: 100rpx;"></view> -->
	</view>
	<Menu :bottom="300" :right="0"></Menu> 
	<Loading ref="showLoading"></Loading>

</template>


<script setup>
	import Menu from '@/components/menu.vue'
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
	const Profits = ref('')
	
	const getData = () => {
		request({
			url: 'page/article/detailByPos?pos=2',
			methods: 'get',
		}).then(res => {        
            Profits.value = res.contents;
			showLoading.value.loading = false
		}).catch(()=>{
			showLoading.value.loading = false
		})
	}
	const showLoading = ref(null)
	// 终于可以用了
	onMounted(() => {
		tabbarIl8n()
		showLoading.value.loading = true
	})
	onLoad(e => {
		getData()
	})

    const tabbarIl8n = () =>{
		uni.setTabBarItem({
			index:0,
			text:t('add1.a_c1')
		})
		uni.setTabBarItem({
			index:1,
			text:t('add1.a_c2')
		})
		uni.setTabBarItem({
			index:2,
			text:t('add1.a_c3')
		})
		uni.setTabBarItem({
			index:3,
			text:t('index.i_a31')
		})
		uni.setTabBarItem({
			index:4,
			text:t('add1.a_c5')
		})
	}

</script>


<style lang="scss" scoped>
	.content{
		overflow: hidden;
		// background-color: #fafafa;
	}
	.ScrollBox{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.pText{
		text-transform: none !important;
		height: 100%;
		width: 100%;
	}
	::v-deep img{
		max-width: 100%;
	}
</style>