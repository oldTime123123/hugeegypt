<template>
	<view class="despoitRecord">
		<view class="pdlr35 pt53">


			<z-paging class="mt54 " ref="paging" v-model="recordsList" @query="getData" :refresher-enabled="false"
				:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
				:empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
				:empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
				:loading-more-fail-text="t('record.r_r3')" style="margin: 30rpx auto 0;width: 100%;  ">
				<view class="flex between pdlr35 pt53">
					<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
						@click="methods.back"></image>
				</view>
				<view class="f40 mt20 text_bold pdlr35" style="margin-bottom: 60rpx;color: #fff">{{t('ss1.l_l14')}}</view>
				<view class="listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="vvItem">
						<!-- <view style="width: 50px;height: 50px; margin-top: 25px;"  >
							<image style="width: 50px;height: 50px;" :src="item.vip.pic" ></image>
						</view> -->
						<view style="margin-left: 20px;">
							<view class="">
								{{t('ss1.l_l15')}}：{{item.vip.name}}
							</view>
							<!-- <view class="">
								{{t('ss1.l_l16')}}：{{item.amount}}
							</view> -->
							<view class="">
								{{t('ss1.l_l17')}}：{{item.createTime}}
							</view>
							<view class="">
								{{t('ss1.l_l18')}}：{{item.expire_time}}
							</view>
							<view class="">
								{{t('ss1.l_l19')}}：{{item.amount}}{{currency}}
							</view>
							<!-- <view class="" style="color: rgb(234, 201, 117);">
								{{item.status==0?'':t('newAct.l_l9')}}
							</view> -->
						</view>

					</view>


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
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n();
	const methods = {
		back() {
			// 	history.back()
			uni.switchTab({
				url: '../tabbar/my'
			})
		},

	};
	const recordsList = ref([])
	const paging = ref(null)
	const pages = ref({
		page: 1,
		size: 10
	})
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: '/user/record/lock',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	const currency = ref('')
	// 终于可以用了
	onLoad(() => {
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss">
	.despoitRecord{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
	.listItem {
		background: #fff;
		color: #000;
		border-radius: 20rpx;
		padding: 4rpx 45rpx 34rpx 45rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		width: 600rpx;
		margin: 30rpx auto;

		.vvItem {
			display: flex;
			// justify-content: space-between;
			// align-items: center;
			margin-top: 29rpx;
		}

		.pass {
			color: #5db760;
		}

		.error {
			color: #f5564b;
		}

		.cancle {
			color: #AFAFAF;
		}
	}
</style>