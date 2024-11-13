<template>
	<view class="news">
		<view class="nav">
			<view class="flex between margin">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="task_navigation"> 
				{{t('index.i_a30')}}
			</view>
			<view></view>
		</view>
		<!-- <view class="flex between topNav" :style="{background:store.$state.contentColor}">
			<view>

			</view>
			<view class="f36 text_white" style="font-weight: 500;">
				{{t('index.i_a30')}}
			</view>
			<view>
			</view>
		</view> -->
		<view class="pdlr30 pt33">
			<video src="https://api.hugeegypt.com/3.mp4" style="width: 100%;">

			</video>
				<view class="newsItem mb30 " v-for="item in recordsList" @click="jumpPage('../mine/artcle?pos='+item.id)">
					<view>
						
						<nut-image width="115" height="90" :src="item.full_cover"  showLoading>
						    <template #loading>
						      <nut-icon name="loading"  ></nut-icon>
						    </template>
						  </nut-image>
						<!-- <image  style="width:230rpx ; height: 180rpx;"></image> -->
					</view>
					<view class="mglr31 " style=" flex: 1;">
						<view class="f28 textHiddenThree "
							style="font-weight: 400; height: 70%;  width: calc(100% - 30rpx);">
							{{item.name}}  </view>
						<view style="font-size: 20rpx; color: #999999; margin-top: 8%;">{{item.show_time_format}}</view>
					</view>
					<view class="redDor" v-if="item.read_status == 0">
						
					</view>
				</view>
		</view>
		<!-- <view style="height: 150rpx;"></view> -->
		<Loading ref="showLoading"></Loading>
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
	import {
		onMounted
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";
	const store = userStore();

	const { t } = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};
	const showLoading = ref(null)
	const pages = ref({
		page: 1,
		size: 10,
		pos: 4,
	})
	const recordsList = ref([])
	const getData = () => {
		request({
			url: 'page/article/lists',
			methods: 'get',
			data: {
				...pages.value
			}
		}).then(res => {
			recordsList.value = res
		}).catch(e => {})
	}
	const jumpPage = url=>{
		uni.navigateTo({
			url
		})
	}
	onShow(()=>{
			getData()
	})
	onMounted(() => {
		showLoading.value.loading = true
	
		setTimeout(() => {
			showLoading.value.loading = false
		}, 700);

	})
</script>

<style lang="scss" scoped>
	.news{
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
		// background-color: #DE3824;
	}
	.nav .task_navigation {
		font-size: 36rpx;
		color: #fff;
	}
	.topNav {
		height: 88rpx;
		padding: 0 30rpx;
	}
	
	.newsItem {
		padding: 25rpx 30rpx;
		display: flex;
		// align-items: center;
		background-color: #fff;
		border-radius: 20rpx;
		position: relative;
	}
	
	.redDor {
		position: absolute;
		width: 15rpx;
		height: 15rpx;
		background-color: red;
		border-radius: 50%;
		top: 20rpx;
		left: 20rpx;
	}
</style>
