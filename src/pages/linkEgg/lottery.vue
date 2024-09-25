<template>
	<view class="lotteryContent">
		<!-- <topNav :title="t('newAct.l_l1')" rightIcon="/static/act/record.png" rightUrl="./lottery-record"></topNav> -->

		<view class="pdlr50 pt53 flex" style="justify-content: space-between;">
			<view class=" between">
				<image src="/static/actIcon/back.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="back"></image>

			</view>
			<view class="f36   textHiddenOne center" style="font-weight: 500;width: 60%;height: 100%; color: #fff;">
				{{t('ss1.l_l1')}}
			</view>
			
			<view style="width: 32rpx;height: 34rpx;">
				<image src="/static/egg/record.png" style="width: 100%;height: 100%;"
					@click="jumpPage('./lottery-record')">
				</image>
			</view>
		</view>
		
		<view class="pdlr45 mt50">
			<view class="flex topList">
				<view class="tabs">{{t('ss1.l_l2')}}:
					{{ userData.num }}
				</view>
				<view class="tabs ml20">
					{{t('ss1.l_l3')}}:
					{{ userData.did_num }}
				</view>

			</view>



			<!-- {{prizeList}} -->

			<nutbig-turntable class="turntable" ref="turntable" :width="luckWidth" :height="luckheight"
				:prize-list="prizeList" :turns-number="turnsNumber" :turns-time="turnsTime" :prize-index="prizeIndex"
				:style-opt="styleOpt" :pointer-style="pointerStyle" @start-turns="startTurns" @end-turns="endTurns">
			</nutbig-turntable>

			<view style="height: 700rpx;"></view>
			<view style="">
				<!--  -->
				<view class=" text_white" v-if="lotteryData.is_balance_play == 1">
					{{t('redE.p_a6')}}：{{userBalance}}
					<view class="flex between l_inpS mt40 l_inpBg ">
						<view class="l_inpS  flex col_center " style="width:100%">
							<input class="mglr39" :placeholder="t('redE.p_a5') " style="color:#fff" v-model="playNum"
								placeholder-class="text_white">
						</view>
						<view class="playBtn center" @click="changeHandle">{{t('redE.p_a7')}}</view>
					</view>
					<view class="tips mt20 f28">
						{{t('redE.p_a4')}} <text class="text_bold"
							style="color: #fff;">{{lotteryData.balance_play_cost + currency}}</text>
					</view>
				</view>
				<view class="withdraw_record_warp mt30">
					<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="1500" :duration="800"
						:vertical="true" display-multiple-items="4" style="width: 100% !important"
						:disable-touch="true">
						<swiper-item class="record_box" v-for="(item, index) of logs" :key="index">
							<view class="phone">
								{{ item.user?.phone }}
							</view>

							<view class="status textHiddenOne">Conseguir</view>
							<view class="amount">{{ item.gift?.name }} </view>
						</swiper-item>
					</swiper>
				</view>
				<view class=" mt50">
					<view class="center ">
						<view class="RulesEl">{{t("act.e_e9")}}</view>
					</view>
					<view class="text_center mt40 pb50 pdlr30 f30 text_bold" style=" color: #fff;">
						<view class="mt20" v-html="hint"></view>
					</view>
				</view>

				<view style="height: 200rpx;"></view>
			</view>

		</view>

		<nut-overlay v-model:visible="popShow">
			<view class="center flex-col  ">
				<view class="bgShow">
				</view>
				<text class="mt20" style="color: #fff">{{ popText }} </text>

				<view class="pop-btn mt20" @click="popShow = false">{{t('all.a_c2')}}</view>
			</view>
		</nut-overlay>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	// import topNav from '@/components/topNav/topNav.vue';
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from '@/store/themeNum.js';
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		onMounted
	} from 'vue';
	const store = userStore();

	import {
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();

	const back = () => {
		history.back()
	}

	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}

	const showLoading = ref(null);
	const userData = ref({
		num: 0
	});
	const hint = ref('');
	const logs = ref([]);
	const canuse = ref(false);
	const prizeList3 = ref([

	]);

	function jump(url) {
		uni.navigateTo({
			url
		})
	}

	// lottery 3
	let popShow = ref(false);
	let popText = ref('');

	const showPop = (e) => {
		popText.value = e;
		popShow.value = true;

	};
	const userBalance = ref(0)
	const lotteryData = ref({})
	const playNum = ref()

	const changeHandle = () => {

		if (Number(myScore.value) > 5) {
			setTimeout(() => {
				showLoading.value.loading = true
				request({
					url: 'activity/lottery/balanceToChance',
					methods: 'post',
					data: {
						num: playNum.value,
						type: 1
					}
				}).then(res => {
					showLoading.value.loading = false
					Toast.text(t('redE.p_a3'))
					getData();
					playNum.value = ''
				}).catch(err => {
					showLoading.value.loading = false
					uni.showToast({
						title: err.message,
						icon: 'none'
					})
				})
			}, 2000)
		} else {
			showLoading.value.loading = false
			Toast.text(t('redE.p_a2'))
			return
		}

	}
	const getData = () => {
		request({
			url: 'activity/lottery/info',
			methods: 'get'
		}).then((res) => {
			lotteryData.value = res.lottery
			userBalance.value = res.balance
			let arr = res.lottery.gift.map((item) => {
				return {
					id: item.id,
					prizeName: item.name,
					prizeImg: item.full_cover
				};
			});
			let arr2 = res.lottery.gift
			prizeList.value = res.lottery.gift.map((item) => {
				return {
					id: item.id,
					prizeName: item.name,
					prizeImg: item.full_cover
				};
			});

			prizeList3.value = arr;
			prizeList3.value.splice(4, 0, '');
			logs.value = res.result;
			userData.value = res.chance;
			hint.value = res.lottery.rule;
			userData.value.num > 0 ? (canuse.value = true) : (canuse.value = false);
		});

		request({
			url: 'user/index'
		}).then(res => {
			console.log(res);
			myScore.value = res.integral
			// showLoading.value.loading = false
			// pageData.value = res
		})
	};
	const myScore = ref(0)
	const currency = uni.getStorageSync('currency');
	onMounted(() => {
		getData();
	});

	// lottery 2

	const turntable = ref(null);
	// 转盘大小
	const luckWidth = ref("300px");
	const luckheight = ref("300px");
	// 转盘指针图片样式
	const pointerStyle = {
		width: "80px",
		height: "80px",
		backgroundImage: 'url("/static/egg/go.png")',
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
	};
	// 转盘上要展示的奖品数据
	const prizeList = ref([

	]);
	// 转动圈数
	const turnsNumber = ref(5);
	// 转动需要持续的时间(秒)
	const turnsTime = ref(5);
	// 转盘样式的选项
	const styleOpt = reactive({
		// 转盘中每一块扇形的背景色,根据奖品的index来取每一块的对应颜色
		prizeBgColors: [
			"rgb(255, 231, 149)",
			"rgb(255, 247, 223)",
			"rgb(255, 231, 149)",
			"rgb(255, 247, 223)",
			"rgb(255, 231, 149)",
			"rgb(255, 247, 223)",
			"rgb(255, 231, 149)",
			"rgb(255, 247, 223)",
		],
		// 每一个扇形的外边框颜色
		borderColor: "#ff9800",
	});
	// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
	const prizeIndex = ref(-1);
	// 剩余抽奖次数
	const num = ref(5);
	const startTurns = () => {
		
		if(userData.value.num == 0){
			return false
		}

		request({
			url: 'activity/lottery/lottery',
			methods: 'post'
		}).then(res => {
			prizeIndex.value = prizeList.value.findIndex(item => item.id == res.prize_id);
			turntable.value.rotateTurn();
			getData();
		}).catch(err => {
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	};
	const endTurns = () => {
		popText.value = t('newAct.l_l4') + ' :' + prizeList.value[prizeIndex.value].prizeName
		popShow.value = true
	};
</script>

<style lang="scss" scoped>
	.lotteryContent {
		background: url('/static/egg/lotterBg.png') no-repeat 100%/100%;
		width: 100vw;
		min-height: 100vh;
		background-size: cover;
		background-attachment: fixed;
		overflow: scroll;
	}

	.RulesEl {
		background: linear-gradient(#fffbe5, #ffe795);
		padding: 20rpx 80rpx;
		border-radius: 40rpx;
	}

	.playBtn {
		background: linear-gradient(#fffbe5, #ffe795);

		color: #000;
		width: 200rpx;
		text-align: center;
		height: 100%;
		line-height: 100%;
		border-radius: 0 20rpx 20rpx 0;
	}

	.bgShow {
		background: url('/static/egg/res.png') no-repeat 100%/100%;
		height: 600rpx;
		width: 650rpx;
	}

	.topList {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.tabs {
			padding: 25rpx 10rpx;
			border-radius: 20rpx;
			color: #fff;
			border: 1rpx solid #fff;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
		}
	}

	.withdraw_record_warp {
		// height: 240rpx;

		background: rgba(255, 255, 255, .4);
		color: #fff;
		border-radius: 20rpx;
		padding: 40rpx 50rpx 0 50rpx;

		.record_box {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-column-gap: 10rpx;
			margin-bottom: 40rpx;
			font-size: 22rpx;
			text-align: center;

			.phone {
				text-align: left;
			}

			.status {
				text-align: center;
			}

			.amount {
				text-align: right;
			}
		}
	}

	.pop-btn {
		width: 160px;
		height: 40px;
		border-radius: 20px;
		background-color: #fce256;
		color: #b7770e;
		text-align: center;
		line-height: 40px;
	}

	.desc {
		background: rgba(255, 255, 255, .4);
		color: #fff;
		border-radius: 20rpx;
		padding: 40upx;
		color: #000;
	}
</style>
