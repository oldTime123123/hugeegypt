<template>
	<view class="accountDetail">
		<view class="pdlr35 pt53" >

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt20 text_bold" style="color: #fff"> {{t('mine.m_a1')}}</view>

			<view style="flex: 1;margin-top: 10px;overflow-y: hidden;">
				<view class="viewTabs">
					<view class="tabsItem active" @click="viewTabChange(0)">
						<view class="line" v-if="tab1value==0"></view>
						<view :class="tab1value==0?'active':'ellipsis'">{{ $t('add2.a_a15') }}</view>
					</view>
					<view class="tabsItem active" @click="viewTabChange(1)">
						<view class="line" v-if="tab1value==1"></view>
						<view :class="tab1value==1?'active':'ellipsis'">{{ $t('add2.a_a16') }}</view>
					</view>
				</view>
				<view style="background: #fff;padding: 0 20px;">
					<payDetail :tabs.sync="tab1value" :showLoading="showLoading"></payDetail>
				</view>
			</view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import payDetail from './components/payDetail.vue';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Locale
	} from '@nutui/nutui';
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const store = userStore();
	const tab1value = ref(0)
	const methods = {
		back() {
			history.back()
		},
	};
	const tabChange = (data)=>{
		showLoading.value.loading = true;
		tab1value.value = data.paneKey;
	}
	const showLoading = ref(true)
	const viewTabChange=(index)=>{
		showLoading.value.loading = true;
		tab1value.value = index
	}
	onMounted(()=>{
		showLoading.value.loading = true;
	})
	// 终于可以用了
	onLoad(() => {
		tab1value.value = 0;
		Locale.use('en-US', enUS);
	})
</script>

<style lang="scss" scoped>
	.accountDetail{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
	body{
		overflow: hidden;
	}
	::v-deep .nut-tabpane{
		padding: 0 20px;
		height: none;
	}
	.btns {
		// width: 220rpx;
		height: 80rpx;
		border-radius: 40rpx;
		color: #fff;
		font-size: 26rpx;
		padding: 0 30rpx;
		min-width: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sea {
		background: #F5B04C;
		box-shadow: 0rpx 1rpx 31rpx 0rpx rgba(232, 158, 52, 0.57);
	}

	.sel {
		background: #3477E0;
		box-shadow: 0rpx 1rpx 31rpx 0rpx rgba(76, 136, 230, 0.38);
	}

	.staItem {
		width: 33%;
		text-align: center;
		color: #999999;
		// padding: 27rpx 0;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.recordItem {
		background-color: #1D1D1D;
		border-radius: 30rpx;
		padding: 20rpx 39rpx;
		width: 600rpx;
		margin: 30rpx auto;
		color: #fff;
	}

	.scrollable {
		height: 65vh;
		overflow: scroll;
	}

	.line {
		width: 44rpx;
		height: 2rpx;
		background-color: #999999;
	}
	.viewTabs{
		height: 46px;
		padding: 0 10px;
		display: flex;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		background: #f5f5f5;
		border-radius: 0;
		flex-shrink: 0;
	}
	.tabsItem{
		position: relative;
		font-size: 14px;
		flex: 1 0 auto;
		min-width: 50px;
		width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #1a1a1a;
	}
	.active{
		font-weight: 600;
		color: #1a1a1a;
	}
	.noActive{
	}
	.line{
		position: absolute;
		transition: width .3s ease;
		bottom: 15%;
		left: 50%;
		transform: translate(-50%);
		overflow: hidden;
		border-radius: 0;
		opacity: 1;
		width: 40px;
		height: 3px;
		background: linear-gradient(90deg, #fa2c19 0%, rgba(250, 44, 25, .15) 100%);
	}
	.ellipsis{
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		color: #726d6d;
	}
</style>
