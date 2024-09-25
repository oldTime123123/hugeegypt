<template>
	<view :style="store.$state.imgObj.loginBg">
	<view class="pdlr35 pt33">
		<view class="flex between">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
		</view>
		<view class="f50 mt60  text_bold" :style="{color:store.$state.thirdColor}">{{t('team.t15')}}</view>
		
		
		<z-paging class="mt54 " ref="paging" v-model="recordsList" @query="getRecord" :refresher-enabled="false"
			:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
			:empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
			:empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
			:loading-more-fail-text="t('record.r_r3')" style="margin-top: 140px;" >
			
			<view class="main" v-for='(item, index) in recordsList' :key='index'>
				<view class="main_box">
					<view class="">
						{{t('team.t16')}}
					</view>
					<view class="">
						{{item.phone}}
					</view>
					
				</view>
				<view class="main_box">
					<view class="">
						{{t('team.t17')}}
						
					</view>
					<view class="">
						{{item.child}}
					</view>
					
				</view>
				<view class="main_box">
					<view class="">
						{{t('team.t18')}}
						
					</view>
					<view class="">
						{{item.total_commission}}
					</view>
					
				</view>
				<view class="main_box">
					<view class="">
						{{t('team.t19')}}
						
					</view>
					<view class="">
						{{item.balance}}
					</view>
					
				</view>
				<view class="main_box">
					<view class="">
						{{t('team.t20')}}
						
					</view>
					<view class="">
						{{item.createTime}}
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
		Locale
	} from '@nutui/nutui';
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
	import useClipboard from 'vue-clipboard3'
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
	
	const paging = ref(null)
	const pages = ref({
		page: 1,
		size: 10,
		level:'',
		type:''
		
	})
	const recordsList = ref([])
	
	const getRecord = () => {
		request({
			url: 'user/record/team/user',
			methods: 'get',
			data:pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	onLoad((e)=>{
		pages.value.level = e.level
		pages.value.type = Number(e.type) + 1
	// 	getRecord()
	})
	
	
</script>

<style lang="scss" scoped>
	.main{
		margin-bottom: 20px;
		padding: 1rem;
		border-radius: 15px;
		background-color: #1D1D1D;
		.main_box{
			display: flex;
			justify-content: space-between;
			color:#fff;
			font-size: .625rem;
			line-height: 18px;
			
		}
		
	}
</style>
