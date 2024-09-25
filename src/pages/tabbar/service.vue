<template>
	<view class="service">
		<view class="nav">
			<view class="flex between margin">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
		</view>
		<view style="height: calc(100vh) !important;overflow: hidden;">

			<view class="pdlr35 pt53">
				<view class="f50  text_bold text_center" style="color: #fff">{{t('all.a_c4')}}</view>
				<view class="mt60">
					<view class="kefuItem flex col_center" v-for="item in serviceList" @click="changePage(item)">
						<image :src="item.avatar" mode="widthFix" style="width: 80rpx;height: 80rpx;border-radius: 10rpx;"></image>
						<view class="mglr40 f34">
							{{item.service_name}} ({{item.start_working_time}} -
								{{item.end_working_time}})
								
						</view>
					</view>
				</view>
	<!-- 		<view style="width: 100%;height: 60px;"></view> -->
				
				<!-- <Tabbar :activeIndex="2"></Tabbar> -->
				
			</view>
	<!-- 		<Tabbar :activeIndex="2"></Tabbar> -->
			
		</view>
	</view>
	
</template>

<script setup type="text/javascript">
	// import Tabbar from '@/components/botTabbar/botTabbar.vue'
	
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
			res.list ? serviceList.value = res.list : ''
		})
	}
	const changePage = item => {
		var userAgent = navigator.userAgent; //获取userAgent信息
		
		if (userAgent.includes('iPhone')) {
			window.location.href = item.contact_link
			
		}else{
			try{
				window.anecine_log.open_customer(item.contact_link);
				
				// window.open(item.contact_link)
			}catch(e){
				window.open(item.contact_link)
				
				//TODO handle the exception
			}
			// window.open(item.contact_link)
			// window.location.href = item.contact_link
			
			
		}
	}
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
			text:t('add1.a_c4')
		})
		uni.setTabBarItem({
			index:4,
			text:t('add1.a_c5')
		})
	}
	const unread = () =>{
		request({
		   url: 'user/unreadArticleNum',
		   methods: 'get',
		  }).then(res => {
			 if(res !== 0){
				 uni.setTabBarBadge({ //显示数字
				 	index: 3, //tabbar下标
				 	text: res //数字
				 })
			 }
		  })
	}
	onLoad(()=>{
		tabbarIl8n()
		// unread()
	})
	// 终于可以用了
	onShow(() => {
		getData();
	})
</script>

 <style >
	 ::v-deep .uni-tabbar__reddot{
			right:12px !important;
		}
	
</style>
<style lang="scss">
	body{
		background: none !important;
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
	.ml10{
		margin: 10px;
	}
</style>
