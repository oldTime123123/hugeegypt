<template>
	<view class="mainContentS">
		<view class="between pt30 pdlr30">
			<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx; height: 36rpx"
				@click="methods.back"></image>
			<view class="f40  " style="color: #fff;">{{t('ss1.a_a2')}}</view>
			<image src="../../static/skypay/record.png" mode="widthFix" style="width: 40rpx; height: 40rpx"
				@click="goRec"></image>
		</view>
		<view class="pdlr35 pt23 pb50">
			<view class="mt32">
				<view class="botItem">
					<view class="title">{{ pageData.title }}</view>
					<image class="mt20" :src="pageData.full_poster" style="width: 100%; border-radius: 20rpx"></image>
					<view class="mt20 between">
						<span>{{t('ss1.a_a3')}}:</span>
						<span>{{ pageData.min_num + ' ' + currency }}</span>
					</view>
					<view class="mt20 between">
						<span>{{t('ss1.a_a4')}}:</span>
						<span>{{ pageData.day }} Days</span>
					</view>
					<view class="mt20 between">
						<span>{{t('ss1.a_a5')}}:</span>
						<span>{{ pageData.day_income }} %</span>
					</view>
					<view class="mt20 between">
						<span>{{t('ss1.a_a6')}}:</span>
						<span>{{pageData.day * pageData.day_income }} %</span>
					</view>
					<view class="mt20 between">
						<span>{{t('ss1.a_a9')}}:</span>
						<span>{{ pageData.limit}}</span>
					</view>
					<view class="mt20 between">
						<view class="center">
							{{t('ss1.a_a7')}}
							<nut-progress :show-text="false" :is-show-percentage="false" class="ml20 mt10"
								:percentage="pageData.progress" style="width: 300rpx" />
						</view>
						<span>{{ pageData.progress + ' %' }}</span>
					</view>
				</view>
			</view>

			<view class="rule mt30" style="background: #fff; color: #000; padding: 20rpx 30rpx; border-radius: 20rpx">
				<view v-html="pageData.content"></view>
			</view>
		</view>

		<view class="pdlr40 floatBtn">
			<view class="btns mt70 center f30 text_bold" @click="openMask">{{t('ss1.a_a8')}}</view>
		</view>

		<view style="height: 100rpx"></view>
		<nut-overlay v-model:visible="buyHandleMask" :close-on-click-overlay="false">
			<div class="wrapper">
				<div class="content">
					<view class="f44 text_center textHidden">{{ pageData.title }}
					</view>
					<view class="mt30 goldLine"></view>
					<view class="mt30 goldInfo">
						{{t('ss1.a_a10')}} + {{(pageData.rate *100).toFixed(2)}}%
					</view>
					<view class="flex mt40" v-if="buyHandleMask">
						<SelectDown ref="select" :placeholder="balanceNmae" @propChange="propChange"
							@propChangeIndex="propChangeIndex" :list="codeList">
						</SelectDown>
					</view>
					<view class="flex mt40" style="background: #DE3824;padding: 20rpx 20rpx;border-radius: 10rpx;">
						<input type="text" placeholder-class="plo" style="color: #000;flex:1" focus v-model="inputNum"
							:placeholder="t('mine.m_s7')">
					</view>
					<view class="mt20 f26" style="color: #DE3824 ;">
						{{t('ss1.a_a11')}}:{{pageData.min_num}} ~{{pageData.max_num}}
					</view>

					<view class=" mt40 between">
						<view @click="buyHandleMask = false" class="default">{{ t('all.a_c2') }}</view>
						<view @click="confirmHandle">
							{{ t('all.a_c1') }}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import SelectDown from '@/components/SelectDown.vue'
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
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();;

	const store = userStore();

	const goRec = () => {
		uni.navigateTo({
			url: '../record/skyPayRecord'
		});
	};
	const inputNum = ref('');
	const botInd = ref(0);

	const pageData = ref({});
	const balanceType = ref(undefined)
	const codeList = reactive([t('add2.a_a7'), t('add2.a_a8')])
	const getData = (id) => {
		request({
			url: 'lixibao/info',
			methods: 'get',
			data: {
				id
			}
		}).then((res) => {
			codeList[0] = `${t('add2.a_a7')} ${currency.value} ${res.balance} `
			codeList[1] = `${t('add2.a_a8')} ${currency.value} ${res.profit_balance} `
			pageData.value = res;
			showLoading.value.loading = false
		}).catch(() => {
			showLoading.value.loading = false
		});
	};
	const balanceNmae = ref('')
	const propChange = (item) => {
		balanceNmae.value = item
	}
	const propChangeIndex = (index) => {
		balanceType.value = index + 1
	};
	const openMask = () => {
		balanceType.value = '';
		balanceNmae.value = t('add2.a_a5');
		inputNum.value = '';
		buyHandleMask.value = true;
	};
	const methods = {
		back() {
			history.back();
		}
	};

	const confirmHandle = () => {
		if (!balanceType.value) {
			Toast.text(t('add2.a_a5'));
			return
		}
		if (!inputNum.value) {
			Toast.text(t('mine.m_s7'));
			return
		}
		const data = {
			id: pageData.value.id,
			amount: inputNum.value,
			balance_type: balanceType.value
		};
		request({
				url: 'lixibao/invest',
				methods: 'post',
				data: data
			})
			.then((res) => {
				buyHandleMask.value = false
				getData(pageData.value.id);
				inputNum.value = '';
				Toast.text(t('mine.m_s14'));
				uni.navigateTo({
					url: '../record/skyPayRecord'
				})
			})
			.catch((err) => {
				inputNum.value = '';
				buyHandleMask.value = false
				Toast.text(err.message);
			});
	};
	const buyHandleMask = ref(false);
	const currency = ref('');
	const showLoading = ref(null)
	onMounted(() => {
		showLoading.value.loading = true
	})
	// 终于可以用了
	onShow(() => {
		currency.value = uni.getStorageSync('currency');
	});

	onLoad((e) => {
		if (e.id) {
			getData(e.id);
		}

	});
</script>

<style lang="scss">
	.mainContentS {
		height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}

	.mt40 {
		margin-top: 1.8rem;
	}

	.floatBtn {
		position: fixed;
		bottom: 20rpx;
		width: calc(100% - 80rpx);
	}

	.plo {
		color: #fff !important;
	}

	.btns {
		height: 98rpx;
		line-height: 98rpx;
		// background: linear-gradient(to right, #e67f74 50%, #DE3824 100%);
		background: #FFF;
		border-radius: 39rpx;
		color: #000;
	}

	.botItem {
		margin-bottom: 20rpx;
		width: calc(100% - 40rpx);
		background-color: #fff;
		border-radius: 20rpx;
		font-size: 30rpx;
		padding: 20rpx;
		color: #000;

		.title {
			position: relative;
			padding-left: 5px;
		}

		.title::before {
			position: absolute;
			display: block;
			content: '';
			height: 90%;
			width: 12rpx;
			background: linear-gradient(0deg, #e67f74 0%, #DE3824 100%);
			border-radius: 6rpx;
			left: -20rpx;
		}
	}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;

		.content {
			margin-top: 400rpx;
			width: calc(100% - 70rpx);
			// height: 500rpx;
			max-height: 650rpx;
			background: #fff;
			border-radius: 30rpx;
			// justify-content: center;
			padding-top: 50rpx;
			position: relative;
			overflow: hidden;
			color: #000;
			padding: 40rpx 35rpx;

			.goldLine {
				width: 100%;
				height: 2rpx;
				background: linear-gradient(90deg, #e67f74 13%, #DE3824 55.00000000000001%, #f1f1f1 87%);
			}

			.goldInfo {
				padding: 20rpx 0;
				text-align: center;
				background: linear-gradient(90deg, #e67f74 13%, #DE3824 55.00000000000001%, #f1efed 74%, #f1f1f1);
			}

			.between {

				view {
					width: 48%;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 30rpx;
					border-radius: 50rpx;
				}

				view:nth-child(1) {
					border-radius: 42px;
					border: 3rpx solid #FFEAB1;
				}

				view:nth-child(2) {
					background: linear-gradient(0deg, #e67f74 0%, #DE3824 100%);
					color: #000;
				}
			}
		}
	}

	.default {
		border: 1px solid #000 !important;
		color: #000;
	}

	::v-deep .nut-progress .nut-progress-outer .nut-progress-inner {
		background: linear-gradient(135deg, #e67f74 0%, #DE3824 100%);
	}

	::v-deep .nut-progress .nut-progress-outer {
		background-color: #515151;
	}
</style>