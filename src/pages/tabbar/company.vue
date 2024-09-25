<template>
	<view class="company">
        <view class="nav">
			<view class="flex between margin">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="task_navigation"> 
				{{t('index.i_a13')}}
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
	
	const getData = () => {
		request({
			url: 'page/article/detailByPos?pos=5',
			methods: 'get',
		}).then(res => {            
            companyData.value = res.contents;
			showLoading.value.loading = false
		}).catch(()=>{
			showLoading.value.loading = false
		})
	}
	const showLoading = ref(null)
	// 终于可以用了
	onMounted(() => {
		showLoading.value.loading = true
	})
	onLoad(e => {
		getData()
	})
</script>

<style lang="scss" scoped>
	.company{
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
