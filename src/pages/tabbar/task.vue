
<template>
	<view :style="store.$state.imgObj.loginBg" style="background: #fff;">
		<view class="task_navigation"> {{t('movie.m_a6')}} </view>
		<view class="Historical" @click="historical">
			{{t('movie.m_a1')}}
		</view>
		<view class="pdlr30 pt23">
			<view class="mian_top">
				<view class="mian_top_box">
					<view class="">
						{{t('movie.m_a2')}}({{unidad}})
					</view>
					<view class="weight">
						{{income?Number(income.month).toFixed(2):''}}
					</view>
				</view>
				<view class="mian_top_box">
					<view class="">
						{{t('movie.m_a3')}}({{unidad}})

					</view>
					<view class="weight">
						{{income?Number(income.total).toFixed(2):''}}
					</view>
				</view>
				<view class="mian_top_box">
					<view class="">
						{{t('movie.m_a4')}}

					</view>
					<view class="weight">
						{{is_task==0&&is_next_vip!==1? 0 :( totle?totle.done:'')+ '/' + (totle?totle.total:'')}}
						
					</view>
				</view>
			</view>
			
			<image v-if="showLixibao" src="../../static/skypay/skypayRk1.png" style="width: 100%;height: 157rpx;" @click="goSkypay"></image>
			<view class="  mt30">
				<view class="kefuItem flex col_center" v-for="item in serviceList" @click="changePage(item)">
					<image :src="item.avatar" mode="widthFix" style="width: 80rpx;height: 80rpx;border-radius: 10rpx; margin-left: 30px;"></image>
					<view class="mglr40 f34" style="color: #fff;">
						{{item.service_name}} 
							
					</view>
				</view>
			</view>
			<view class="mian">
				<view class="main_movie" v-for="(item,index) in rankListRef" v-show="showMovie">
					<view class="movie_cover">
						<!-- 						<view class='movie_text'></image> -->
						<view class="movie_header">

							<nut-icon name="uploader" style="margin-left: 2px; margin-top: 3px;"
								color="#FFF"></nut-icon>

						</view>
						<image :src="item.cover" mode="scaleToFill" style=" width: 100%;height: 100%;object-fit: cover;">
						</image>
					</view>
					<view class="movie_introduce">
						<view class="movie_text">
							{{item.title}}
						</view>
						<view class="movie_task">
							<nut-icon v-if='item.state==2' class='yes' name="Check"
								style="margin-top: 20rpx;margin-left: 28rpx; color:#DE3824;"></nut-icon>
							<nut-icon v-else name="uploader" style="margin-top: 20rpx;margin-left: 28rpx;"
								color="#ccc"></nut-icon>

							<button class='btn' v-show='item.state==2' @click="details(item)">complete</button>
							<button class='btn2' v-show='item.state==1||item.state==3'
								@click="details(item)">initiate</button>

						</view>
					</view>
				</view>
				<view  class="Tips" v-show="showNull">
					{{t('movie.m_d7')}}
				</view>
				
			</view>
		</view>
		
		<Loading ref="showLoading"></Loading>
<!-- 		<view style="width: 100%;height: 60px;"></view> -->

		<Menu :bottom="300" :right="0"></Menu> 

	</view>
</template>

<script setup>
	// import Tabbar from '@/components/botTabbar/botTabbar.vue'
	import Menu from '@/components/menu.vue';

	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onPageScroll,
		onHide,
		onReachBottom,
		onTabItemTap
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onMounted
	} from 'vue';
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

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
	//收入
	const income = ref()
	const totle = ref()
	const showNull = ref(false)
	const showMovie = ref(false)
	const is_next_vip = ref()
	const is_task = ref()
	const goSkypay = ()=>{
		uni.navigateTo({
			url:"../mine/skyPay"
		})
	}
	const getIncome = () => {
		request({
			url: 'task/index',
			methods: 'get'
		}).then(res => {
			income.value = res.income
			totle.value = res.task
			is_next_vip.value = res.task.is_next_vip
			is_task.value = res.task.is_task
			if(res.task.is_task&&res.task.is_next_vip!==1){
				showMovie.value = true
				showNull.value = false
			}else{
				showNull.value = true
				showMovie.value = false
				
			}
			
		})
	}
	const historical = () => {
		uni.navigateTo({
			url: './historical'
		})
	}

	const showLoading = ref(null)
	//详情
	const details = (item) => {
		uni.setStorageSync("item", item)
		uni.setStorageSync("newsTop", item)
		uni.navigateTo({
			url: './details'
		})
	}
	const page = ref(1)
	const rankListRef = ref([])
	const serviceList = ref([])
	const rankList = () => {
		request({
			url: 'setting/subscriptionList',
			methods: 'get',
		}).then(res => {
			res.list ? serviceList.value = res.list : ''
		})
		
		request({
			url: 'task/list',
			methods: 'get',
		}).then(res => {
			showLoading.value.loading = false
			rankListRef.value = res.data
			
			
		})
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
			text:t('index.i_a31')
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
	// onLoad(() => {
	// 	getIncome()
	// 	rankList()
	// 	tabbarIl8n()
	// 	unread()

	// })
	const datass = ref()
	const showLixibao = ref(false)
	const getStatus = ()=>{
		request({
		   url: 'setting/lixibao',
		   methods: 'get',
		  }).then(res => {
			 res.status == 1?showLixibao.value = true:showLixibao.value = false
		  })
	}
	//货币单位
	const unidad = ref()
	onMounted(() => {
		tabbarIl8n()
		showLoading.value.loading = true
		unidad.value = uni.getStorageSync('currency')
	})
	onShow(() => {
		rankList()
		getStatus()
		getIncome()
		// unread()
		// uni.getStorage({
		// 	key: "newsTop",
		// 	success: (res) => {
		// 		//在onshow中如果要使用uni.pageScrollTo方法让页面滚动到指定位置，需要使用定时器才可以
		// 		var timer = setTimeout(() => {
		// 			uni.pageScrollTo({
		// 				scrollTop: res.data, //距离页面顶部的距离
		// 				duration: 0
		// 			});
		// 			clearTimeout(timer);
		// 		}, 10)
		// 	}
		// });
	})
	// onReachBottom(()=>{
	// 	page.value = page.value+1
	// 	rankList()
	// })
</script>

 <style >
	 ::v-deep .uni-tabbar__reddot{
			right:12px !important;
		}
	
</style>
<style lang="scss" scoped>
	.kefuItem {
		background: #DE3824;
		border-radius: 60rpx;
		margin-bottom: 40rpx;
		padding:  20rpx;
	}
	.Tips{
		color:#fff;
		text-align: center;
	}
	 .yes {
		color: #DE3824;
	}

	.Historical {
		position: fixed;
		top: 13px;
		color: #fff;
		z-index: 9999;
		right: 15px;
	}

	.mian_top {
		width: 100%;
		height: 150rpx;
		display: flex;
		overflow: hidden;
		justify-content: space-around;
		margin-top: 50rpx;
		color: #fff;
		font-size: 24rpx;

		.mian_top_box {
			width: 190rpx;
			padding: 10rpx;
			height: 110rpx;
			background: #fff;
			color: #000;
			border-radius: 8px;
			box-shadow: 0 0 18px 0 #E9E9E9;
			border: 0.5px solid #E9E9E9;
			text-align: center;
			.weight {
				color: #DE3824;
				font-weight: 600;
				margin-top: 12px;
			}
		}
	}

	.movie_header {
		background-image: url('../static/movie_start.png');
		background-size: 100%;
		z-index: 995;
		position: absolute;
		background-repeat: no-repeat;
		width: 50rpx;
		height: 75rpx;

	}

	.task_navigation {

		color: #fff;
		text-align: left;
		font-size: 1.125rem;
		position: fixed;
		top: 0;
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		// background: #DE3824;
		background: url(../../static/themeNum1/index/taskIndex.png);
		z-index: 1000;
		text-indent: 1em;
	}

	.userName {
		color: #fff;
		text-align: center;
		font-size: 30rpx;
	}

	.nav {
		display: flex;
	}

	.margin {
		// margin-left: 52rpx;
		z-index: 1000;
		position: fixed;
		left: 60rpx;
	}

	.mian {
		width: 95%;
		padding: 20rpx;
		display: flex;
		margin-top: 50rpx;
		flex-wrap: wrap;
		justify-content: space-between;
		.main_movie {
			width: 46%;
			// height: 700rpx;
			margin-bottom: 40rpx;

			.movie_cover {
				width: 100%;
				height: 160px;
				// width: 100%;
				// height: 500rpx;
			}

			.movie_introduce {
				width: 100%;
				// height: 200rpx;
				background-color: #1D1D1D;
				min-height: 110px;
				.movie_text {
					width: 90%;
					height: 100rpx;
					padding: 10rpx;
					text-align: center;
					color: #fff;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					line-height: 50rpx;
				}

				.movie_task {
					width: 90%;
					height: 80rpx;
					margin: 0 auto;
					display: flex;
					background-color: #121212;
					.btn {
						width: 70%;
						height: 80rpx;
						text-align: left;
						line-height: 80rpx;
						background-color: #121212;
						margin-left: 30rpx;
						color: #DE3824
						;
						padding-left: 0px
					}

					.btn2 {
						width: 70%;
						height: 80rpx;
						text-align: left;
						line-height: 80rpx;
						background-color: #121212;
						margin-left: 30rpx;
						color: #ccc;
						padding-left: 0px
					}
				}
			}
		}
	}
</style>