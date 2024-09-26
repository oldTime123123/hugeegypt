<template>
	<view class="marquee">
		<view class="pdlr50 pt53 flex" style="justify-content: space-between;">
			<view class="flex between" style="width: 100%;" >
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="back"></image>
				
				<view class="" style="color: #fff;font-size: 48rpx;">
					{{t('tabbar.t_t2')}}
				</view>
				<view class="">
					
				</view>
		
			</view>
			<view class="content ">
				
				<z-paging class="mt54" ref="paging" v-model="botList" @query="getData" :refresher-enabled="false"
					:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
					:empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
					:empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
					:loading-more-fail-text="t('record.r_r3')" style="margin: 140rpx auto 0;box-sizing: border-box;padding: 0 50rpx;  " :auto="false">
					
					<view class="item flex pdtb20 pdlr20 mb30 pdlr18" v-for="item in botList">
						<image :src="item.gift.cover" mode="aspectFit" style="height: 100px; width: 100px"></image>
						<view class="flex-col between pdtb10 pdlr20 " style="align-items: flex-start; flex-grow: 1;">
								<view ><span style="color: #666;">{{t('ss1.l_l6')}}: </span>{{ item.gift.name }}</view>
								<view v-if="item.gift.gift_price=='0.00'"  ><span style="color: #666;">{{t('ss1.l_l7')}} </span></view>
								<view v-else><span  style="color: #666;">{{t('ss1.l_l13')}}: </span>{{ item.gift.gift_price }}{{currency}}</view>
								<view class="f24" style="text-align: right;">{{ item.createTime }}</view>
						</view>
					
					</view>
				</z-paging>
				
		</view>
		</view>
		<view style="height: 100rpx;">
			
		</view>
	</view>
	
</template>

<script setup>
import { onMounted } from 'vue';
import request from '../../../comm/request.ts';
let currency = localStorage.getItem('currency')
	import {
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();
	const back = () =>{
		history.back()
	}
	let list = ref([]);
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
	const pages = ref({
		page: 1,
		size: 10,
	})
	const paging = ref(null)
	const getData = (page) => {
		pages.value.page = page
	request({
		url: 'activity/lottery/log',
		methods: 'get',
		data: pages.value
	}).then((res) => {
		paging.value.complete(res.data);
		pages.value.page += 1
	});
};

onMounted(() => {
	getData(pages.value.page)
	
});
</script>

<style lang="scss">
	.marquee{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
.content {
	margin: 24rpx;
	.item{
		background-color: #fff;
		border-radius: 20rpx;
	}
}
</style>
