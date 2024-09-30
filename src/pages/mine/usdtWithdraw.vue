<template>
	<view class="withdraw">

		<view class="pdlr50 pt53 pb50 ">

			<view class=" between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold ml10" style="color: #fff">{{t('wr.w_a1')}}</view>
			<view class="pay">{{ $t('add2.a_a6') }}</view>
			<view class="mt55">
				<view class="topBox  flex-col" style="border-radius: 30rpx;">
					<view class="topBoxTab">
						<view class="tabItem" @click="tabChange(1)" :class="[tabClick==1?'active1':'gray1']">
							{{ $t('add2.a_a7') }}
						</view>
						<view class="tabItem" @click="tabChange(2)" :class="[tabClick==2?'active2':'gray2']">
							{{ $t('add2.a_a8') }}
						</view>
					</view>
					<view class="topBoxItem">
						<view style="display: flex;align-items: center;">
							<image v-if="tabClick==1" src="../../static/themeNum1/my/balance.png" class="tabImg">
							</image>
							<image v-else src="../../static/themeNum1/my/commission.png" class="tabImg"></image>
							<view class="topItem f26">{{ tabText }}</view>
						</view>
						<view class="mt35 f55" style="color: #DE3824;"> {{pageData.balance_max}} {{currency}}</view>
					</view>
				</view>
				<view class="notice flex col_center" dir="ltr">

					<image :src="store.$state.imgObj.labaIcon" mode="widthFix" style="width: 40rpx;"></image>
					<view class="ml30">
						<text v-if="showWord">
							{{wordText}}
						</text>
						<text v-else class="f24">
							{{t('add2.a_a3')}}
						</text>
					</view>
				</view>
				<view v-if="pageData.withdrawLimitType==2" style="color: #fff;margin-top: 15px;">{{ t('add2.a_a17') }}:
				</view>
				<view v-if="pageData.withdrawLimitType==1&&pageData.input_type==2"
					style="color: #fff;margin-top: 15px;">{{ t('add2.a_a17') }}:</view>
				<view v-if="pageData.withdrawLimitType==2">
					<view class="inputBut">
						<view v-for="(item,index) in pageData.withdrawArr" :key="index"
							:class="[index==titckIndex?'activeItem':'inputItem']">
							<view @click="selectBut(item,index)">{{ item }}{{ currency }}</view>
						</view>
					</view>
					<view v-if="inputNum" style="color: #fff;display: flex;">
						<view class="short">≈USDT:</view>
						<text
							style="margin-left: 10px;">{{(inputNum * (pageData.u_rate?pageData.u_rate:1)).toFixed(2)}}</text>
					</view>
				</view>
				<view v-else>
					<view v-if="pageData.input_type==2" class="inputBut">
						<view v-for="(item,index) in pageData.buttons" :key="index"
							:class="[index==titckIndex?'activeItem':'inputItem']">
							<view @click="selectBut(item,index)">{{ item }}{{ currency }}</view>
						</view>
					</view>
					<view v-if="pageData.input_type==2&&inputNum" style="color: #fff;display: flex;">
						<view class="short">≈USDT:</view>
						<text
							style="margin-left: 10px;">{{(inputNum * (pageData.u_rate?pageData.u_rate:1)).toFixed(2)}}</text>
					</view>
					<view class="mt40 inputItems" v-if="pageData.input_type==1">
						{{currency}}
						<view class="pl15">
							<input type="text" :focus="true" :placeholder="t('mine.m_s7')" placeholder-class="f30 plo"
								v-model="inputNum">
						</view>
					</view>
				</view>
				<view class="f20 mt30 text_center" v-if="pageData.withdrawLimitType==1&&pageData.input_type==1"
					style="color: #fff;">
					* {{t('wr.w_a4')}} : {{pageData.min+currency}} - {{pageData.max+currency}}
				</view>

				<view class="mt40" v-if="pageData.input_type==1&&inputNum" style="color: #fff;display: flex;">
					<view class="short">≈USDT:</view>
					<text
						style="margin-left: 10px;">{{(inputNum * (pageData.u_rate?pageData.u_rate:1)).toFixed(2)}}</text>
				</view>

				<view class="mt38">
					<view class="f34  text_bold" :style="{color:store.$state.secondColor}">{{t('wr.w_u3')}}</view>
					<view class="mt34 otpEl">
						<input class="inp" placeholder-class="plo" :placeholder="t('wr.w_u4')" :disabled="true"
							:value="pageData.user_link">
						<view class="otp" v-if="!pageData.user_link" @click="changePage('../setting/set2')">
							{{t('wr.w_u5')}}
						</view>
					</view>
				</view>

				<view class="mt38">
					<view class="f34  text_bold" :style="{color:store.$state.secondColor}">{{t('login.l_l5')}}</view>
					<view class="mt34  passwordInp" v-if="!showInp">

						<input class="inp " type="safe-password" placeholder-class="plo" password="true"
							v-model="fundPwd" :placeholder="t('login.l_l5')" v-if="showNewPwd1">
						<input class="inp " placeholder-class="plo" type="safe-password" v-model="fundPwd"
							:placeholder="t('login.l_l5')" v-else>
						<image v-if="showNewPwd1" src="../../static/themeNum1/index/biyan.png" class="pwdEye"
							style="width: 49rpx;height: 36rpx;" @click="methods.openPwdHandle('showNewPwd1')"></image>

						<image v-else src="../../static/themeNum1/index/zhengyan.png" class="pwdEye openEye"
							style="width: 49rpx;height: 35rpx;" @click="methods.openPwdHandle('showNewPwd1')"></image>
					</view>

					<view class="mt34  passwordInp otpEl" v-else>
						<input class="inp " placeholder-class="plo" type="safe-password" password="true"
							:disabled="true" :placeholder="t('inp.a_c6')">
						<view class="otp" @click="changePage('../setting/set4')">
							{{t('mine.m_m14')}}
						</view>
					</view>


					<view class="btns" @click="submitHandle">
						{{t('wr.w_a11')}}
					</view>

					<view class="desc">
						<view class="mt70" v-html="pageData.description" style="color: #fff;"></view>
					</view>
				</view>
			</view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	const showWord = ref(false)
	const wordText = ref("")

	const inputNumHandle = e => {
		let val = Number(e.detail.value)


		for (let i = 0; i < fealList.value.length; i++) {
			if ((Number(fealList.value[i].withdraw_min) <= val) && (val <= Number(fealList.value[i].withdraw_max))) {
				let str = t('wr.w_u6')
				// 手续费类型 1.比例 2.固定金额
				if (fealList.value[i].fee_type == 1) {
					str = str + fealList.value[i].fee + '%'
				} else if (fealList.value[i].fee_type == 2) {
					str = str + fealList.value[i].fee
				}
				wordText.value = str
				showWord.value = true
				break
			} else {
				showWord.value = false
			}
		}
	}
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
	const store = userStore();
	const showLoading = ref(null)
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
		openPwdHandle(type) {
			if (type == 'showOld') {
				showOld.value = !showOld.value
			} else if (type == 'showNewPwd1') {
				showNewPwd1.value = !showNewPwd1.value
			} else if (type == 'showNewPwd2') {
				showNewPwd2.value = !showNewPwd2.value
			}
		}
	};
	const choStyle = {
		background: "#DE3824",
		color: '#fff'
	}
	const noStyle = {
		color: store.$state.contentColor
	}
	const showNewPwd1 = ref(true)
	const fundPwd = ref("")
	const fealList = ref([])
	const pageData = ref({})
	const showInp = ref(true)
	const getData = (tabClick) => {
		request({
			url: `finance/usdt/withdraw/index?balance_type=${tabClick?tabClick:1}`,
			methods: 'get',
		}).then(res => {
			pageData.value = res
			if (res.user.payment_password) {
				showInp.value = false
			}
			fealList.value = res.feeList
			// console.log(res);
			// let str = t('wr.w_u6')
			// // 手续费类型 1.比例 2.固定金额
			// if (res.fee_type == 1) {
			// 	str = str + res.fee_rate * 100 + '%'
			// } else if (res.fee_type == 2) {
			// 	str = str + res.fee
			// }
			// topNotice.value = str
		})
	}
	const changePage = (url) => {
		uni.navigateTo({
			url
		})
	}
	const tabClick = ref(1)
	const tabText = ref('')
	const currency = ref("")
	const inputNum = ref("")
	const topNotice = ref("")
	const locked = ref(false)
	const titckIndex = ref(undefined)
	const selectBut = (item, index) => {
		titckIndex.value = index;
		inputNum.value = Number(item)
	}
	const tabChange = (index) => {
		tabClick.value = index;
		tabText.value = index == 1 ? t('mine.m_t4') : t('add2.a_a14');
		getData(index)
	}
	const submitHandle = () => {
		if (pageData.value.check.status == 1) {
			Toast.text(pageData.value.check.message)
			return
		}

		if ((inputNum.value - 0) < (pageData.value.min - 0) || (inputNum.value - 0) > (pageData.value.max - 0)) {
			Toast.text(t('wr.w_u7'))
			return false
		}
		if (!fundPwd.value) {
			Toast.text(t('login.l_l5'))
			return
		}
		// showLoading.value.loading = true
		// setTimeout(() => {
		submitHandle1()
		// }, 2000)
	}

	const submitHandle1 = () => {
		const data = {
			amount: inputNum.value,
			password: fundPwd.value,
			balance_type: tabClick.value
		}
		showLoading.value.loading = true;
		request({
			url: 'finance/usdt/withdraw/submit',
			methods: 'post',
			data: data
		}).then(res => {
			showLoading.value.loading = false
			Toast.text(t('wr.w_u8'))
			inputNum.value = ""
			fundPwd.value = ""

			uni.navigateTo({
				url: '../record/withdrawRecord'
			})
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}
	// 终于可以用了
	onShow(() => {
		tabClick.value = 1;
		tabText.value = t('mine.m_t4');
		getData();
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss" scoped>
	.withdraw {
		background: url(../../static/themeNum1/index/loginBack.png);
	}

	.topBox {
		width: 100%;
		height: 328rpx
	}

	.topBoxTab {
		width: 100%;
		height: 45px;
		display: flex;

		.tabItem {
			width: 50%;
			height: 100%;
		}
	}

	.ml10 {
		margin-left: 10px;
	}

	.pay {
		color: #fff;
		margin-top: 10px;
	}

	.topBoxItem {
		height: calc(100% - 45px);
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		border: none;
		background: url(../../static/themeNum1/my/orBottom.png);
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.active1 {
		border-top-right-radius: 12px;
		color: #000;
		background: url(../../static/themeNum1/my/orLeft.png);
		background-size: 100% 100%;
	}

	.active2 {
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		color: #000;
		background: url(../../static/themeNum1/my/orRight.png);
		background-size: 100% 100%;
	}

	.gray1 {
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		background: #fff;
		color: #000;
	}

	.gray2 {
		background: #fff;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		color: #000;
	}

	.tabItem {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tabImg {
		width: 24px;
		height: 24px;
		margin-right: 10px;
	}

	.flex {
		display: flex;
		// flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.withdrawAll {
		padding: 27rpx 36rpx;
		border-radius: 38rpx;
		background: #fff;
	}

	.notice {
		padding: 0 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 34rpx;
		font-size: 28rpx;
		height: 100rpx;
		color: #DE3824;
	}

	.mainBox {
		margin-top: 28rpx;
		border-radius: 30rpx;
		padding: 32rpx 57rpx;
		font-size: 28rpx;
		background-color: #fff;
		position: relative;
		color: #000;

		.withTitle {
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 30rpx 0 30rpx 0;
			padding: 33rpx 48rpx;
		}

		.flex {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #eee;
			padding: 30rpx 0;

			.short {
				width: 30%;
				text-align: center;
				font-weight: bold;
			}

			input {
				margin-left: 30rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
		}

		.tips {
			background-color: #1D1D1D;
			border-radius: 10rpx;
			padding: 20rpx;
			font-size: 20rpx;
			width: auto;
			color: #DE3824;
			display: inline-block;
		}
	}

	.btns {
		margin-top: 100rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
		background: #fff;
		color: #000;
	}

	.inp {
		background: #fff;
		color: #000 !important;
	}

	.plo {
		color: #000 !important;
	}

	.otpEl {
		position: relative;

		.otp {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			font-size: 20rpx;
			transform: translateY(-50%);
			// width: 60rpx;
			padding: 0 10rpx;
			height: 60rpx;
			background: linear-gradient(-43deg, #e67f74 0%, #DE3824 100%);
			border-radius: 10rpx;
			color: #fff;
			text-align: center;
			line-height: 60rpx;
		}
	}

	.passwordInp {
		position: relative;

		.pwdEye {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);
		}

	}

	.inputItems {
		height: 115rpx;
		background: #fff;
		box-shadow: 0rpx 1rpx 51rpx 0rpx rgba(64, 46, 197, 0.05);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		color: #DE3824;
		padding-left: 40rpx;
	}

	.inputBut {
		display: flex;
		color: #000;
		flex-wrap: wrap;
		margin-top: 32rpx;

		.inputItem {
			border-radius: 8px;
			margin: 0 15px 15px 0;
			padding: 5px;
			box-sizing: border-box;
			background: rgb(255, 234, 177);
		}

		.activeItem {
			border-radius: 8px;
			color: #fff;
			margin: 0 15px 15px 0;
			padding: 5px;
			box-sizing: border-box;
			background: rgb(223, 184, 87);
		}
	}
</style>