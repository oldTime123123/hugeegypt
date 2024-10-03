<template>
	<view class="pdlr50 pt53 flex" style="justify-content: space-between;">
		<view class=" between">
			<image src="/static/actIcon/back.png" mode="widthFix" style="width: 48rpx;height: 36rpx;" @click="back">
			</image>
		</view>

	</view>
	<view class="content">
		<view class="item flex pdtb20 pdlr20 mb30" v-for="item in list">
			<image :src="item.gift.cover" mode="aspectFit" style="height: 100px; width: 100px"></image>
			<view class="flex-col between pdtb10 pdlr20 " style="align-items: flex-start; flex-grow: 1;">
				<view><span style="color: #666;">{{t('ss1.l_l6')}}: </span>{{ item.gift.name }}</view>
				<view><span style="color: #666;">{{t('ss1.l_l7')}}: </span>{{ item.gift.gift_price }}{{currency}}</view>
				<view class="f24" style="text-align: right;">{{ item.createTime }}</view>
			</view>

		</view>
	</view>
	<view style="height: 100rpx;">

	</view>
</template>

<script setup>
	import {
		onMounted
	} from 'vue';
	import request from '../../../comm/request.ts';
	let currency = localStorage.getItem('currency')
	import {
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();
	const back = () => {
		history.back()
	}
	let list = ref([]);
	const getData = () => {
		request({
			url: 'activity/lottery/log',
			methods: 'get'
		}).then((res) => {
			console.log(res);
			list.value = res.data;
		});
	};

	onMounted(() => {
		getData();
	});
</script>

<style lang="scss">
	page {
		background: url('/src/static/themeNum1/index/loginBack.png');
	}

	.content {
		margin: 24rpx;

		.item {
			background-color: #fff;
			border-radius: 20rpx;
		}
	}
</style>