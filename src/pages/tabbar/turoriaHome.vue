<template>
	<view class="turosia">
		<view class="nav">
			<view class="flex between margin">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="task_navigation"> 
				{{t('index.i_a14')}}
			</view>
			<view></view>
		</view>
		<view class="pdlr30 pt33">
            <nut-cell class="cell" v-for="(item,index) in recordsList" :key="index" @click="jumpPage(item)" :title="item.name" is-link></nut-cell>
		</view>
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
		pos: 6,
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
			recordsList.value = res;
			showLoading.value.loading = false
		}).catch(e => {
			showLoading.value.loading = false
        })
	}
	const jumpPage = item=>{
        uni.navigateTo({
            url: './video?content='+encodeURIComponent(JSON.stringify(item.contents))
        });
	}
	onShow(()=>{
		getData()
	})
	onMounted(() => {
		showLoading.value.loading = true
	})
</script>

<style lang="scss" scoped>
	.turosia{
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
    .cell{
        background: #fff;
        color: #fff;
        border: none;
        box-shadow: none;
		color: #000;
    }
</style>
