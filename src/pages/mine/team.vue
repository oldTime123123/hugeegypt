<template>
	<view class="team">

		<view class="pdlr35 pt33">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60  text_bold" style="color: #fff">{{t('mine.m_t15')}}</view>
			
			
			<view class="topGrid">
				<view class="item">
					<view>{{teamData?.teamNewNum}}</view>
					<view>{{t('team.t1')}}</view>
				</view>
				<view class="item">
					<view>{{teamData?.member_cate_commission}}</view>
					<view>{{t('team.t2')}}</view>
				</view>
			</view>
			
			<!-- <view class="inviteEl mt50 between">
				<view style="width: 70%;" class="textHiddenOne">
					<view class="mb10  " :style="{color:store.$state.secondColor}">{{t('act.m_m1')}} :<text class="f36 pl20" style="color:#EAC975 ;">{{inviteCode}}</text>	</view>
				</view>
				<view class="copyBtn" @click="copyHandle(inviteCode)">
					{{t('all.a_d1')}}
				</view>
			</view> -->
			
			<view class="inviteEl mgtb20 between">
				<view style="width: 70%;color: #DE3824;" class="textHiddenOne">
					{{codeUrl}}
				</view>
				<view class="copyBtn" @click="copyHandle(codeUrl)">
					{{t('all.a_d1')}}
				</view>
			</view>
			
			<view class="typeListEl mt40 " >
				<view style="font-size: 14px;" v-for="(item,index) in typeList"  :class="index == typeInd?'actType':''" @click='change(index)'>
					{{item.name}}
				</view>
			</view>
			
			<view class="mt30">
				<view class="teamBox">
					<view class="title">
						{{t('team.t3')}}
					</view>
					<view class="teamBot">
						<view class="between borderB">
							<view>{{t('team.t4')}} {{teamData?.list[0].module==2?(teamData?.list[0].rate/100)*100+'%':teamData?.list[0].rate+'%'}}</view>
							<view>{{teamData?.list[0].firstRechange}}</view>
						</view>
						<view class="between borderB">
							<view>{{t('team.t5')}}</view>
							<view>{{teamData?.list[0].orderNum}}</view>
						</view>
						<view class="between borderB">
							<view>{{t('team.t6')}}</view>
							<view>{{teamData?.list[0].questMoney}}</view>
						</view>
						<view class="between borderB">
							<view>{{t('team.t7')}} {{teamData?.list[0].module==2?(teamData?.list[0].questRate/100)*100+'%':teamData?.list[0].questRate+'%'}}</view>
							<view>{{teamData?.list[0].money}}</view>
						</view>
						<view class="between">
							<view>{{t('team.t8')}}</view>
							<view @click="teamSize(1)" class="flex col_center"> {{teamData?.list[0].teamNum}}  <image class="ml10" src="/static/next.png" mode="" style="width: 32rpx;height: 32rpx;"></image> </view>
						</view>
					</view>
				</view>
			
				
				<view class="teamBox">
					<view class="title">
						{{t('team.t9')}}
					</view>
					<view class="teamBot">
						<view class="between borderB">
							<view>{{t('team.t4')}} {{teamData?.list[1].module==2?(teamData?.list[1].rate/100)*100+'%':teamData?.list[1].rate+'%'}}</view>
							<view>{{teamData?.list[1].firstRechange}}</view>
						</view>
						<view class="between borderB">
							<view>{{t('team.t5')}}</view>
							<view>{{teamData?.list[1].orderNum}}</view>
						</view>
						<view class="between borderB">
							<view>{{t('team.t6')}}</view>
							<view>{{teamData?.list[1].questMoney}}</view>
						</view>
						<view class="between borderB">
							<view>{{t('team.t7')}} {{teamData?.list[1].module==2?(teamData?.list[1].questRate/100)*100+'%':teamData?.list[1].questRate+'%'}}</view>
							<view>{{teamData?.list[1].money}}</view>
						</view>
						<view class="between">
							<view>{{t('team.t8')}}</view>
							<view @click="teamSize(2)" class="flex col_center"> {{teamData?.list[1].teamNum}}  <image class="ml10" src="/static/next.png" mode="" style="width: 32rpx;height: 32rpx;"></image> </view>
						</view>
					</view>
				</view>
							
							
							
							<view class="teamBox">
								<view class="title">
									{{t('team.t10')}}
								</view>
								<view class="teamBot">
									<view class="between borderB">
									<view>{{t('team.t4')}} {{teamData?.list[2].module==2?(teamData?.list[2].rate/100)*100+'%':teamData?.list[2].rate+'%'}}</view>
										<view>{{teamData?.list[2].firstRechange}}</view>
									</view>
									<view class="between borderB">
										<view>{{t('team.t5')}}</view>
										<view>{{teamData?.list[2].orderNum}}</view>
									</view>
									<view class="between borderB">
										<view>{{t('team.t6')}}</view>
										<view>{{teamData?.list[2].questMoney}}</view>
									</view>
									<view class="between borderB">
										<view>{{t('team.t7')}} {{teamData?.list[2].module==2?(teamData?.list[2].questRate/100)*100+'%':teamData?.list[2].questRate+'%'}}</view>
										<view>{{teamData?.list[2].money}}</view>
									</view>
									<view class="between">
										<view>{{t('team.t8')}}</view>
										<view @click="teamSize(3)" class="flex col_center"> {{teamData?.list[2].teamNum}}  <image class="ml10" src="/static/next.png" mode="" style="width: 32rpx;height: 32rpx;"></image> </view>
									</view>
								</view>
							</view>
										
										
			</view>
		
		</view>
	<view style="height: 100rpx;"></view>
		<!-- 选择器 -->
		<nut-picker v-model:visible="memberShow" :columns="columns" @confirm="confirm">
		</nut-picker>

		<nut-overlay v-model:visible="teamMask">
			<div class="wrapper">
				<image src="../../static/themeNum1/teamMask.png" mode="heightFix" style="width: 100%;height: 320rpx;">
				</image>
			</div>
		</nut-overlay>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	
	
	const typeInd = ref(0)
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
	const typeList = ref([
		{
			name:t('team.t11')
		},
		{
			name:t('team.t12')
		},
		{
			name:t('team.t13')
		},
		{
			name:t('team.t14')
		},
	])
	const showLoading = ref(null)
	const methods = {
		back() {
			history.back()
		},

	};
	
	const teamSize = (id) =>{
		uni.navigateTo({
			url:'./teamDetails?level='+id +'&type='+typeInd.value
		})
	}
	const change = (id) =>{
		typeInd.value = id
		getData(id+1);
	}
	const currency = uni.getStorageSync('currency')
	const {
		toClipboard
	} = useClipboard()
	const isVisible = ref(false)
	const memberShow = ref(false)
	const memberValue = ref({
		text: t('mine.m_t7'),
		value: 0
	})
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_d1') + " " + t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const closeSwitch = param => {
		isVisible.value = false;
	};
	const setChooseValue = param => {
		pages.value.start = param[0][3]
		pages.value.end = param[1][3]
	};
	const confirm = ({
		selectedValue,
		selectedOptions
	}) => {
		// desc.value = selectedValue.join(',');
		memberValue.value = selectedOptions[0]
		showLoading.value.loading = true
		pages.value.page = 1
		pages.value.level = selectedOptions[0].value
		getRecord(pages.value)
	}

	const columns = [{
			text: t('mine.m_t7'),
			value: 0
		},
		{
			text: '1 ' + t('mine.m_t8'),
			value: 1
		},
		{
			text: '2 ' + t('mine.m_t8'),
			value: 2
		},
		{
			text: '3 ' + t('mine.m_t8'),
			value: 3
		},
	]

	const topBox = ref([{
			name: t('mine.m_t13'),
			value: 0
		},
		{
			name: t('mine.m_t14'),
			value: 0
		}, {
			name: t('mine.m_t9'),
			value: 0
		},
		{
			name: t('mine.m_t10'),
			value: 0
		},
		{
			name: t('mine.m_t11'),
			value: 0
		},
		{
			name: t('mine.m_t12'),
			value: 0
		},


	])


	const codeUrl = ref("")
	const inviteCode = ref("")
	const teamData = ref()
	const getData = (id) => {
		request({
			url: 'user/record/team/report',
			methods: 'get',
			data:{
				type:id
			}
		}).then(res => {
			codeUrl.value = res.link
			inviteCode.value = res.code
			teamData.value = res
		})

		// request({
		// 	url: 'user/index',
		// 	methods: 'get',
		// }).then(res => {
		// 	// let str = "+55"
		// 	res.country_code = res.country_code.replace("+", "")
		// 	inviteCode.value = res.invite_code
		// 	codeUrl.value = window.location.protocol + "//" + window.location.host + "/\#/\?code=" + res.invite_code 

		
		// })
	}

	const pages = ref({
		page: 1,
		size: 10,
		level: 0,
		start: "",
		end: ""
	})

	const hasMore = ref(true)
	const botList = ref([])
	const getRecord = (data) => {
		request({
			url: 'user/record/team/user',
			methods: 'get',
			data
		}).then(res => {
			showLoading.value.loading = false
			botList.value = res.data
			if (botList.value.length < res.total) {
				hasMore.value = true
			} else {
				hasMore.value = false
			}
		})
	}
	const clearHandle = () => {
		pages.value.start = ""
		pages.value.end = ""
	}
	const searchHandle = () => {
		const data = Object.assign(pages.value)
		getRecord(data)
	}
	const loadMore = () => {
		pages.value.page += 1
		showLoading.value.loading = true
		request({
			url: 'user/record/team/user',
			methods: 'get',
			data: pages.value
		}).then(res => {
			showLoading.value.loading = false
			botList.value = botList.value.concat(res.data)
			if (botList.value.length < res.total) {
				hasMore.value = true
			} else {
				hasMore.value = false
			}
		})
	}
	const teamMask = ref(false)


	// 终于可以用了
	onShow(() => {
		Locale.use('en-US', enUS);
		getData(1);
		getRecord(pages.value)
	})
</script>

<style lang="scss" scoped>
	.team{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
	.teamBox:nth-child(1){
		.title{
			background: linear-gradient(0deg, #89A1D8 0%, #DCE7FE 98%);
		}
	}
	.teamBox:nth-child(2){
		.title{
			background: linear-gradient(0deg, #AD9DFF 0%, #D7D9F1 98%);
		}
	}
	.teamBox:nth-child(3){
		.title{
			background: linear-gradient(0deg, #EC8D8E 0%, #FFECED 98%);
		}
	}
	.teamBox{
		margin-top: 50rpx;
		.title{
			border-radius: 20px 20px 0px 0px;
			padding: 30rpx;
			font-size: 36rpx;
		}
		.teamBot{
			background-color: #fff;
			border-radius:0px 0px 20px 20px ;
			.between{
				padding: 20rpx 30rpx;
				color: #000;
				font-size:22rpx ;
			}
			.borderB{
				border-bottom: 1rpx solid #FFFFFF;
			}
		}
	}
	.typeListEl{
		background-color: #fff;
		color: #000;
		height: 100rpx;
		display: flex;
		
		view{
			text-align: center;
			width: 25%;
			line-height: 100rpx;
		}
		.actType{
			background: linear-gradient(0deg, #e67f74 0%, #DE3824 100%);
			border-radius: 10px;
			color: #fff;
		}
	}
	.topGrid{
		display: flex;
		background-color:#fff ;
		color: #000;
		height: 130rpx;
		margin-top: 30rpx;
		border-radius: 20rpx;
		padding:  20rpx 0 ;
		.item{
			width: 50%;
			display: flex;
			align-items: center;
			justify-content:center;
			flex-direction: column;
		}
		.item:nth-child(1){
			border-right: 1rpx solid #fff;
		}
	}
	.inviteEl{
		border: 1rpx solid #DE3824;
		padding-left:50rpx;
		border-radius: 80rpx;
		font-size: 28rpx;
		height: 80rpx;
		background: #fff;
		.copyBtn {
			padding: 0 40rpx;
			border-radius: 80rpx;
			background: linear-gradient(0deg, #e67f74 0%, #DE3824 100%);
			color: #fff;
			height: 80rpx;
			line-height: 80rpx;
			
		}
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

	.topEl {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		// grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		background-color: #1D1D1D;
		border-radius: 30rpx;
		padding: 27rpx 20rpx;
		color: #fff;
		.topItem {
			padding: 47rpx 0;
			text-align: center;
			position: relative;

			// .askIcon{
			// 	position: absolute;
			// 	right: 20rpx;
			// 	bottom: 20rpx;
			// }
			view:nth-child(1) {
				height: 80%;
			}
		}
	}

	.selBot {
		padding: 21rpx 31rpx;
		color: #fff;
		display: inline-block;
		border-radius: 30rpx;
		font-size: 26rpx;
	}

	.botItem {
		padding: 35rpx;
		background-color: #1D1D1D;
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		font-size: 20rpx;
		color: #fff;
	}

	.botEl {
		height: 40vh;
		overflow: scroll;
	}

	.line {
		width: 44rpx;
		height: 2rpx;
		background-color: #999999;
	}

	.wrapper {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;

	}
</style>
