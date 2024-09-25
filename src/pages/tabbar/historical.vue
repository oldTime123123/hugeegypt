<template>
	<view class="historical">
		
		<view class="pdlr35 pt53">
			<view class="nav">
				<view class="flex between margin">
					<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
						@click="methods.back"></image>
				</view>
				<view class="task_navigation"> 
					{{t('movie.m_a5')}}
				</view>
			</view>
			
			<z-paging class="mt54 " ref="paging" v-model="botList" @query="getData" :refresher-enabled="false"
				:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
				:empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
				:empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
				:loading-more-fail-text="t('record.r_r3')" style="margin: 20rpx auto 0;width: 100%;  " :auto="false">
			
				<view class="mian">
											<view class="main_movie"  v-for="(item,index) in botList">
												<view class="movie_cover">
													<view class="header">
				<!-- 										task time -->
														 {{t('movie.m_a7')}}：{{item.create_time_format}}
													</view>
													<view class="number">
				<!-- 										task number -->
														
														{{t('movie.m_a8')}}: {{item.createTime}}
													</view>
													<view class="movie_img">
														<view class="">
															<image :src="item.movie.cover" mode="" style="width: 175rpx;height: 175rpx;"></image>
														</view>
														<view class="text">
															{{item.movie.title}}
														</view>
													</view>
													<view class="footer">
														<view class="">
															{{t('movie.m_a9')}}
				<!-- 											commission -->
														</view>
														<view class="">
															{{item.commission}}
														</view>
													</view>
												</view>
											</view>
											
										
									<!-- 	<view class="main_movie">
											<view class="">
												
											</view>
											<view class="">
												
											</view>
										</view> -->
									</view>
			
			</z-paging>
			
			
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
		onLoad,
		onReachBottom
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
	import { onMounted, ref } from 'vue';
	const store = userStore();
	
	import {
		useI18n
	} from "vue-i18n";
	
	const {
		t
	} = useI18n();
	const hasMore = ref(true)
	const choStyle = {
		background: store.$state.contentColor,
		color: '#000',
		height: '100%',
	
	}
	const staList = [
		{
			name:t('mine.m_a4'),
			status:0
		},
		{
			name:t('mine.m_a6'),
			status:2
		},
		{
			name:t('mine.m_a5'),
			status:1
		},
	]
	const staInd = ref(0)
	
	const isVisible = ref(false)
	
	const closeSwitch = param => {
		isVisible.value = false;
	};
	
	const time = ref({
		start: "",
		end: ""
	})
	
	const setChooseValue = param => {
		time.value.start = param[0][3]
		time.value.end = param[1][3]
	};
	
	const searchHandle = () => {
		let tempObj = {
			page: 1,
			size: 10,
			type: 0
		}
		let data = Object.assign(tempObj, time.value)
		paging.value.clean() //清空数组
		getData(data)
	}
	
	const clearHandle = () => {
		let tempObj = {
			page: 1,
			size: 10,
			type: 0
		}
		time.value = {}
		paging.value.clean() //清空数组
		pages.value = tempObj
		getData()
	}
	
	const tabsChange = (ind,status) => {
		staInd.value = ind
		pages.value.page = 1
		pages.value.type = status
		paging.value.clean() //清空数组
		getData()
	}
	const botList = ref([])
	
	const methods = {
		back() {
			history.back()
		},
	};
	const pages = ref({
		page: 1,
		size: 10,
	})
	
	const paging = ref(null)
	const getData = (page) => {
		pages.value.page = page
		request({
			url: 'task/record',
			methods: 'get',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	
	// 终于可以用了
	onLoad(() => {
		// Locale.use('en-US', enUS);
		getData(pages.value.page)
	})
	// const methods = {
	// 	back() {
	// 		history.back()
	// 	},
	// };
	// const rankListRef = ref([])
	// // const rankList = () =>{
	// // 	request({
	// // 		url:'task/record',
	// // 		methods:'get',
	// // 		data:{
	// // 			page:page.value,
	// // 			size:10
	// // 		}
	// // 	}).then(res=>{
	// // 		console.log(page.value)
	// // 		if(page.value == 1){
	// // 			rankListRef.value = res.data
	// // 		}else{
	// // 			const data = rankListRef.value
	// // 			let newData = rankListRef.value.concat(res.data)
	// // 			rankListRef.value = newData
				
	// // 		}
	// // 	})
	// // }
	// const page = ref(1)
	// const paging = ref(null)
	// const getData = (pages) => {
	// 	console.log(pages)
	// 	// pages.page.value = page
	// 	request({
	// 		url:'task/record',
	// 		methods:'get',
	// 		data:{
	// 			page:pages,
	// 			size:10
	// 		}
	// 	}).then(res => {
	// 		if(page.value == 1){
	// 			rankListRef.value = res.data
	// 		}
	// 		else{
	// 			const data = rankListRef.value
	// 			let newData = rankListRef.value.concat(res.data)
	// 			rankListRef.value = newData
	// 			page.value += 1
	// 		}
			
	// 	})
	// }
	// onLoad(()=>{
	// 	getData()
		
	// })
	// onReachBottom(()=>{
	// 	// page.value = page.value+1
	// 	// rankList()
		
	// })
	
</script>
<style lang="scss" scoped>
	.historical{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.nav{
		position: fixed;
		top:0;
		width: 100%;
		color:#fff;
		height: 92rpx;
		// background: #000;
		z-index: 999;
		display: flex;
		.margin{
			// margin-left: 90rpx;
			position: absolute;
			margin-top: 17px;
		}
		.task_navigation{
			text-align:center;
			font-size: 1.125rem;
			line-height:92rpx;
			width: 100%;
		
		}
	}
	
	.mian{
		width: 95%;
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
		flex-wrap: wrap;
		.main_movie{
			width:100%;
			height:400rpx;
			background-color: #fff;
			margin-bottom: 40rpx;
			padding: 10rpx;
			.movie_cover{
				color:#000;
				width: 90%;
				height: 90%;
				margin: auto;
				.header{
					margin-bottom: 5px;
				}
				.number{
					margin-bottom: 5px;
				}
				.movie_img{
					margin-bottom: 40rpx;
					display: flex;
					height: 170rpx;
					.text{
						padding: 10px;
						width: 350rpx;
						height: 100%;
					}
				}
				.footer{
					display: flex;
					justify-content: space-between;
				}
			}
			.movie_introduce{
				width: 100%;
				height: 100rpx;
				background-color: #1D1D1D;
				.movie_text{
					width: 90%;
					height: 80rpx;
					padding: 10rpx;
					text-align: center;
					color:#fff;
					overflow:hidden;
					text-overflow:ellipsis;
					display:-webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2;
				// 	line-height: 80rpx;
				}
				.movie_task{
					width: 90%;
					height: 80rpx;
					margin: 0 auto;
					display: flex;
					background-color:#121212 ;
					
					.btn{
						width:70%;
						height: 80rpx;
						text-align: left;
						line-height:80rpx;
						background-color:#121212 ;
						margin-left: 30rpx;
						color:yellow;
						padding-left: 0px
						
					}
					.btn2{
						width:70%;
						height: 80rpx;
						text-align: left;
						line-height:80rpx;
						background-color:#121212 ;
						margin-left: 30rpx;
						color:#ccc;
						padding-left: 0px
					}
				}
			}
		}
	}
</style>