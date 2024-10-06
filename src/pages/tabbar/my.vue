<template>
	<view class="my">
		<view class="content">
			<view class="header">
				<!-- head -->
				<view class="between pt40">
					<view class="secondClo" style="font-weight: normal" :style="{ color: store.$state.secondColor }">
						<view class="f32 text_bold flex col_center" v-if="showEye">
							<view>
								{{ pageData.phoneNew }}
							</view>

							<image class="ml20" src="../../static/themeNum1/index/close.png"
								style="width: 49rpx; height: 35rpx" @click="showEye = !showEye"></image>
						</view>
						<view class="f32 text_bold flex col_center" v-else>
							{{ pageData.phone }}
							<image class="ml20" src="../../static/themeNum1/index/open.png"
								style="width: 49rpx; height: 35rpx" @click="showEye = !showEye"></image>
						</view>
						<!-- <view class="f22 mt10">
							{{t('act.m_m1')}}: <text class="pl10">{{pageData.invite_code}}</text>
							<image class="mglr10" :src="store.$state.my.copy" mode="widthFix"
								style="width: 22rpx;height: 22rpx;" @click="copyHandle(pageData.invite_code)"></image>
						</view> -->
					</view>

					<nut-badge dot v-if="showBadge" right="10" top="5" size>
						<image :src="store.$state.my.notice" mode="widthFix" style="width: 70rpx; height: 70rpx"
							@click="changePage('./noticeTwo')"></image>
					</nut-badge>
					<!-- <image :src="store.$state.my.notice" mode="widthFix" style="width: 70rpx;height: 70rpx;"
						@click="changePage('./notice')" v-else></image> -->
				</view>

				<!-- box -->
				<view class="mt80 bBox" style="color: #000">
					<!-- <view class="f24 mt20">{{ t('mine.m_t4') }}</view>
					<view style="font-size: 48rpx" class="mt20 f70">
						{{ pageData.balance ? (pageData.balance / 1).toFixed(2) : 0 }} {{ currency }}
					</view> -->
					<view class="wallet">
						<view class="walletItem">
							<view class="flex">
								<image src="../../static/themeNum1/my/balance.png" mode="widthFix"
									style="width: 45rpx; height: 45rpx"></image>
								<text class="ft14" style="margin-left: 8px;">{{ $t('add2.a_a15') }}</text>
							</view>
							<text class="ft20" style="margin-top: 5px;">{{ pageData.balance }} {{ currency }}</text>
						</view>
						<view class="walletItem">
							<view class="flex">
								<image src="../../static/themeNum1/my/commission.png" mode="widthFix"
									style="width: 45rpx; height: 45rpx"></image>
								<text class="ft14" style="margin-left: 8px;">{{ $t('add2.a_a16') }}</text>
							</view>
							<text class="ft20" style="margin-top: 5px;">{{ pageData.profit_balance }}
								{{ currency }}</text>
						</view>
					</view>
					<view class="mt26 boxItemBox">
						<!--  @click="tips(index)" -->
						<view class="boxItem" v-for="(item, index) in boxItem">
							<image :src="item.img" mode="widthFix" style="width: 45rpx; height: 45rpx"></image>
							<view class="title mgtb10 f20">{{ item.name }}</view>
							<view class="f24 secondClo" :style="{ color: store.$state.secondColor }">
								{{ item.value ? (item.value / 1).toFixed(2) : 0 }}
							</view>
						</view>
					</view>
				</view>

				<!-- withdraw -->
				<!-- <view class="between mt40">
					<view @click="myTask" class="bItem">
						<view class="mglr27">
							{{ t('movie.m_b1') }}
						</view>
					</view>
					<view @click="goTask" class="bItem1">
						<view class="mglr27">
							{{ t('movie.m_b2') }}
						</view>
					</view>
				</view> -->
				<view class="myData mt40">
					<view v-for="(item,index) in myDataList" :key="index" class="myItem">
						<view class="myContent">
							<text class="name">{{ item.name }}</text>
							<text class="value">{{ item.value }}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="myEl">
				<!-- signTemplateObj -->
				<!-- <view class="myItem"  @click="changePage(signTemplateObj.url)" v-show="showSignTemplate">
			    <view class="flex col_center">
			       <image src="/static/sign/signIcon.png" mode="widthFix" style="width: 65rpx; height: 65rpx"></image>
			       <view class="mglr15 textHidden" style="flex: 1">{{ signTemplateObj.name }}</view>
			    </view>
			    <nut-icon name="arrow-right" color="#fff"></nut-icon>
			 </view> -->
				<view class="myElItem">
					<view class="myItem" v-for="(item, index) in myList" @click="changePage(item.url)"
						v-show="item.showFlag">
						<view class="flex col_center">
							<image :src="item.img" mode="widthFix" style="width: 65rpx; height: 65rpx"></image>
							<view class="mglr15 textHidden" style="flex: 1">{{ item.name }}</view>
						</view>
						<nut-icon name="arrow-right" color="#000"></nut-icon>
					</view>
				</view>

			</view>
		</view>

		<view v-show="pop" class="Popup">
			<view class="boxs">
				<view class="main_texted">
					{{ t('act.m_m2') }}
				</view>
			</view>
		</view>

		<!-- <view class="refresh" @click="refresh">
			<image style="width: 70rpx; height: 70rpx" src="../../static/shuax.png" mode=""></image>
		</view> -->

		<!-- <div class="drag-boundary"></div> -->

		<!-- <view style="height: 50rpx"></view> -->

		<nut-overlay v-model:visible="loginOutMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">Tips</view>
					<view class="f30 mt40">
						{{t('mine.m_m13')}}
					</view>

					<view class="between">
						<view :style="{border:'1rpx solid #ccc'}">{{ t('all.a_c2')}}</view>
						<view style="background:linear-gradient(0deg, #DE3824 0%, #d56c74  100%)"
							@click="confirmHandle"> {{t('all.a_c1')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>

		<!-- v-if="showAllAct v-if="showSign"" -->
		<!-- 		<view style="width: 100%;height: 60px;"></view> -->
		<!-- <Tabbar :activeIndex="4"></Tabbar> -->
		<Menu :bottom="300" :right="0"></Menu>

	</view>
</template>

<script setup>
	import Menu from '@/components/menu.vue'
	// import Tabbar from '@/components/botTabbar/botTabbar.vue'
	import COUNTRY from '../../../setting.js';
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from '@/store/themeNum.js';
	import useClipboard from 'vue-clipboard3';
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	const store = userStore();
	const {
		toClipboard
	} = useClipboard();
	import {
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();
	const myDataList = ref([{
			name: t('index.i_a16'),
			value: 0
		},
		{
			name: t('index.i_a17'),
			value: 0
		},
		{
			name: t('index.i_a18'),
			value: 0
		},
		{
			name: t('index.i_a19'),
			value: 0
		},
		{
			name: t('index.i_a20'),
			value: 0
		},
		{
			name: t('index.i_a21'),
			value: 0
		},
		{
			name: t('index.i_a22'),
			value: 0
		},
		{
			name: t('index.i_a23'),
			value: 0
		},
		{
			name: t('index.i_a24'),
			value: 0
		},
	])
	const showBadge = ref(false);
	const showAllAct = ref(true);
	const showSign = ref(false);
	const showDraw = ref(false);
	const showHong = ref(false);
	const showEgg = ref(false);
	const eggId = ref(0);
	const showEye = ref(true);
	const loginOutMask = ref(false)
	//提示
	const pop = ref(false);
	const tips = (index) => {
		let timer;
		if (index == 0) {
			clearTimeout(timer);
			pop.value = true;
			timer = setTimeout(() => {
				pop.value = false;
			}, 5000);
		}
	};
	const refresh = () => {
		window.location.reload();
	};

	//跳转task页面
	const goTask = () => {
		uni.navigateTo({
			url: '../mine/team'
		});
	};

	//跳转myTask页面
	const myTask = () => {
		uni.navigateTo({
			url: './myTask'
		});
	};

	const getAct = () => {
		// 获取签到
		request({
			url: 'activity/status',
			methods: 'get'
		}).then((res) => {
			try {
				res.lottery.status == 1 ? (showDraw.value = true) : '';
				res.signIn.status == 1 ? (showSign.value = true) : '';
				res.prizePackage.status == 1 ? (showHong.value = true) : '';
				res.goldenEgg.status == 1 ? (showEgg.value = true) : '';
				eggId.value = res.goldenEgg.id;
			} catch (e) {
				//TODO handle the exception
			}
		});
	};

	const boxItem = ref([{
			name: t('add1.a_d8'),
			value: '0',
			img: '/static/themeNum1/my/account.png'
		},
		{
			name: t('add1.a_d9'),
			value: '0',
			img: '/static/themeNum1/my/deposit.png'
		},
		{
			name: t('ss1.a_a1'),
			value: 0,
			img: '/static/themeNum1/my/fundBalance.png'
		}
	]);

	const signTemplateObj = {
		name: t('ss1.s_s3'),
		img: '/static/sign/signIcon.png',
		url: '../sign/signC',
		showFlag: true
	}
	// myList
	const myList = ref([{
			name: t('back.r_r8'),
			img: '/static/themeNum1/icon/ll2.png',
			url: './recharge',
			showFlag: true
		},
		{
			name: t('mine.m_m15'),
			img: '/static/themeNum1/icon/ll3.png',
			url: '../mine/withdraw',
			showFlag: true
		},
		{
			name: t('ss1.s_s3'),
			img: '/static/sign/signIcon.png',
			url: '../sign/signC',
			showFlag: false
		},
		// {
		// 	name: t('ss1.l_l14'),
		// 	img: '/static/themeNum1/icon/loginBg.png',
		// 	url: '../record/despoitRecord',
		// 	showFlag: true
		// },
		{
			name: t('ss1.s_s5'),
			img: store.$state.my.myList[0],
			url: '../mine/financialDetails',
			showFlag: true
		},
		{
			name: t('ss1.s_s8'),
			img: '/static/themeNum1/icon/wallet.png',
			url: '../mine/walletManagement',
			showFlag: true
		},
		{
			name: t('ss1.s_s7'),
			img: '/static/themeNum1/icon/password.png',
			url: '../mine/passwordManagement',
			showFlag: true
		},

		{
			name: t('ss1.s_s6'),
			img: store.$state.my.myList[1],
			url: '../mine/teamManagement',
			showFlag: true
		},
		{
			name: t('add1.a_d1') + ' APP',
			img: '/static/themeNum1/index/indexComm8.png',
			showFlag: true,
			url: 'down'
			// url:"https://www.binance.com/en"
		},
		{
			name: t('movie.m_d5'),
			img: '/static/themeNum1/icon/ll4.png',
			showFlag: true,
			url: '../mine/article?id=' + 18
		},
		{
			name: t('add1.a_c4'),
			img: '/static/themeNum1/tabbar/notice1.png',
			showFlag: true,
			url: "./notice"
		},
		{
			name: t('ss1.s_s9'),
			img: '/static/themeNum1/icon/out.png',
			showFlag: true,
			url: "out"
		},
		// {
		//    name: t('mine.m_m10'),
		//    img: store.$state.my.myList[7],
		//    url: '../setting/setUp',
		//    showFlag: true
		// },

		// {
		//    name: 'Service Center',
		//    img: '/static/themeNum1/icon/ll1.png',
		//    url: './service',
		//    showFlag: true
		// },

	]);

	const confirmHandle = () => {
		uni.navigateTo({
			url: '../login/login'
		})
	}

	const changePage = (url) => {

		if (url == 'down') {
			var userAgent = navigator.userAgent; //获取userAgent信息
			if (userAgent.includes('iPhone')) {
				Toast.text(t('ss1.l_l20'))
				return false;
			}
			window.open(appData.value.url);
		} else if (url == 'out') {
			loginOutMask.value = true

		} else {
			// if (url == './notice' || url == './service') {
			// 	uni.switchTab({
			// 		url
			// 	});
			// } else {

			uni.navigateTo({
				url
			});
			// }
		}
	};

	const copyHandle = async (data) => {
		try {
			await toClipboard(data);
			Toast.text(t('all.a_d1') + ' ' + t('all.a_c9'));
		} catch (e) {
			console.error(e);
		}
	};
	const goRecharge = (url) => {
		uni.navigateTo({
			url: './recharge'
		});
	};
	const pageData = ref({
		balance: '0'
	});
	const appData = ref({});
	const showSignTemplate = ref(false)
	const getData = () => {
		request({
			url: 'user/index',
			methods: 'get'
		}).then((res) => {
			(res.phoneNew = res.phone.substring(0, 1) + '****' + res.phone.substr(res.phone.length - 4)),
			(pageData.value = res);
			boxItem.value[0].value = res.unlock_price;
			boxItem.value[1].value = res.withdraw_balance;
			boxItem.value[2].value = res.lixibao_balance;
			myDataList.value[0].value = res.incomeReport.yesterday;
			myDataList.value[1].value = res.incomeReport.today;
			myDataList.value[2].value = res.incomeReport.total;
			myDataList.value[3].value = res.incomeReport.week;
			myDataList.value[4].value = res.task.done;
			myDataList.value[5].value = res.task.rest;
			myDataList.value[6].value = res.incomeReport.month;
			myDataList.value[7].value = res.incomeReport.children_job;
			myDataList.value[8].value = res.incomeReport.children_rebate;
			// res.template= 1
			res.template == 1 ? showSignTemplate.value = true : showSignTemplate.value = false
		});

		// 获取app状态
		request({
			url: 'setting/app',
			methods: 'get'
		}).then((res) => {
			if (res.download_status == 1) {
				myList.value.forEach((item) => {
					if (item.url == 'down') {
						item.showFlag = true;
					}
				});
				appData.value = res;
			}
		});
		// 获取app状态
		request({
			url: 'user/unreadNoticeNum',
			methods: 'get'
		}).then((res) => {
			res > 0 ? (showBadge.value = true) : (showBadge.value = false);
		});
		request({
			url: 'setting/currency',
			methods: 'get'
		}).then((res) => {
			currency.value = res.currency ? res.currency : 'USDT';
			uni.setStorageSync('currency', currency.value)
		});
	};
	const currency = ref('');
	const tabbarIl8n = () => {
		uni.setTabBarItem({
			index: 0,
			text: t('add1.a_c1')
		});
		uni.setTabBarItem({
			index: 1,
			text: t('add1.a_c2')
		});
		uni.setTabBarItem({
			index: 2,
			text: t('add1.a_c3')
		});
		uni.setTabBarItem({
			index: 3,
			text: t('index.i_a31')
		});
		uni.setTabBarItem({
			index: 4,
			text: t('add1.a_c5')
		});
	};
	const unread = () => {
		request({
			url: 'user/unreadArticleNum',
			methods: 'get'
		}).then((res) => {
			if (res !== 0) {
				uni.setTabBarBadge({
					//显示数字
					index: 3, //tabbar下标
					text: res //数字
				});
			}
		});
	};
	onLoad(() => {
		tabbarIl8n();
		// unread();
	});

	// 终于可以用了
	onShow(() => {
		getData();
		getAct();
	});
</script>

<style>
	::v-deep .uni-tabbar__reddot {
		right: 12px !important;
	}
</style>
<style lang="scss" scoped>
	.my {
		background: #fff;
	}

	.content {
		background: url(../../static/themeNum1/my/backgroundMy.png);
	}

	.mt80 {
		margin-top: 2.25rem;
	}

	.f24 {
		font-size: 14px;
	}

	.ft20 {
		font-size: 20px;
		color: #DE3824;
		font-weight: bold;
	}

	.ft14 {
		font-size: 14px;
		color: #000;
	}

	.header {
		padding: 0 1rem 0 1rem;
		background-size: 100% 100%;

	}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;

		.content {
			margin-top: 400rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 350rpx;
			background: #1D1D1D;
			color: #fff;
			border-radius: 30rpx;
			// justify-content: center;
			padding-top: 50rpx;
			position: relative;
			overflow: hidden;

			.between {
				position: absolute;
				bottom: 0;
				width: calc(100% - 80rpx);
				padding: 0 30rpx 40rpx;

				view {
					width: 48%;
					height: 100rpx;
					color: #fff;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					border-radius: 50rpx
				}
			}
		}
	}

	.wallet {
		width: 100%;
		height: 110px;
		display: flex;

		.walletItem {
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			height: 110px;
			color: #fff;

			.flex {
				display: flex;
				align-items: center;
			}
		}
	}

	.refresh {
		width: 70rpx;
		height: 70rpx;
		position: fixed;
		top: 1000rpx;
		right: 20rpx;
	}

	.Popup {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		top: 0px;
		z-index: 10000;

		.boxs {
			width: 600rpx;
			height: 200rpx;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background-color: #ccc;
			color: #fff;
			border-radius: 20px;

			.main_texted {
				width: 90%;
				height: 150rpx;
				padding: 15px;
				text-align: center;
				// 	line-height: 150rpx;
			}
		}
	}

	.bBox {
		background: url(../../static/themeNum1/my/head.png);
		background-size: 100% 100%;
		// height: 389rpx;
		height: 451rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: column;
		// padding: 0 80rpx;
		color: #fff;

		.boxItemBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.90625rem 0.84375rem;
			width: 100%;
			border-radius: 0.9375rem;
			color: #000;

			.title {
				color: #fff;
				width: 90%;
				text-align: center;
				height: 50rpx;
				display: flex;
				align-items: center;

				justify-content: center;
			}

			.boxItem {
				display: flex;
				align-items: center;
				flex-direction: column;
				width: 48%;
			}
		}
	}

	.bItem {
		width: 48%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		// padding: 41rpx 35rpx;
		border-radius: 25rpx;
		height: 125rpx;
		background: url(../../static/themeNum1/my/myPosition.png);
		background-size: 100% 100%;
	}

	.bItem1 {
		width: 48%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		// padding: 41rpx 35rpx;
		border-radius: 25rpx;
		height: 125rpx;
		background: url(../../static/themeNum1/my/myTeam.png);
		background-size: 100% 100%;
	}

	.mglr27 {
		margin-left: 65px;
	}

	.mt30 {
		margin-top: 0.8rem;
	}

	.myData {
		// padding: 0 1rem;
		display: flex;
		flex-wrap: wrap;

		.myItem {
			width: 31%;
			height: 75px;
			background: #fff;
			border-radius: 12px;
			margin: 0 0.5rem 0.6rem 0;

			// color: #fff;
			.myContent {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.name {
					font-size: 11px;
					color: #000000;
					text-align: center;
				}

				.value {
					padding-top: 10px;
					color: #DE3824;
				}
			}
		}
	}

	.myEl {
		// width: 100%;
		padding-top: 0.6rem;

		// padding: 0.2rem 1rem 0 1rem;
		.myElItem {
			// background: url(../../static/themeNum1/my/content.png);
			background: #fff;
			background-size: 100% 100%;
			padding-top: 1.2rem;
			border-top-left-radius: 70px !important;
			border-top-right-radius: 70px !important;

			.myItem {
				padding: 12rpx 32rpx;
				// background-color: #1d1d1d;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// width: 100%;
				text-align: center;
				font-size: 26rpx;
				color: #000;
				margin-top: 20rpx;
			}
		}

	}

	.rightIcon {
		top: 40%;
		right: 45rpx;
		display: flex;
		align-items: center;
		flex-direction: column;

		image {
			margin-top: 50rpx;
		}
	}

	.openBg {
		background-color: rgba(25, 25, 25, 0.3);
		padding: 30rpx 30rpx 30rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: space-between;
		position: relative;
		overflow: hidden;

		.closeIcon {
			position: absolute;
			right: 10rpx;
			top: 10rpx;
		}
	}

	.actItem {
		animation: fadeInDown;
		/* referring directly to the animation's @keyframe declaration */
		animation-duration: 1s;
	}
</style>