<template>
	<view class="regist">
		<view class="pdlr35 pt33">
			<view class="flex between" >
				<view class="f60 text_bold red">
					{{t('login.l_r1')}}
				</view>
				<image :src="store.$state.imgObj.langSetting" mode="widthFix" style="width: 70rpx;height: 70rpx;"
					@click="methods.changePage">
				</image>
			</view>

			<view :style="{color:store.$state.secondColor}">

				<!-- 登录 -->
				<view class="mt54">
					<view class="pl14">
						{{t('login.l_l2')}}
					</view>
					<view class="mt34 phoneEl inp">
						<view class="phoneLabel flex  center" @click="showPicker = true" style="color:#DE3824">
							{{country_code.country_code}}
							<image src="../../static/themeNum1/icon/Polygon.png " mode="widthFix"
								style="width: 30rpx;margin-left: 10rpx; margin-top: 5rpx;"></image>
						</view>
						<input class="pl20" type="number" v-model="regisForm.phone" :placeholder="t('login.l_l3')"
							style="margin-left: 50rpx;">
						<nut-icon name="Check" size="20" v-if="phoneRegFlag"
							class="phoneCheck animate__animated animate__fadeIn " color="#DE3824"></nut-icon>
					</view>

					<view class="mt38">
						<view class="pl14">
							{{t('login.l_l4')}}
						</view>
						<view class="mt34 passwordInp">
							<input class="inp " type="safe-password" password="true" v-model="regisForm.password"
								:placeholder="t('login.l_l5')" v-if="openPwd">
							<input class="inp " type="safe-password" v-model="regisForm.password"
								:placeholder="t('login.l_l5')" v-else>


							<image src="../../static/themeNum1/index/biyan.png" class="pwdEye"
								style="width: 49rpx;height: 35rpx;" @click="methods.openPwdHandle('first')"
								v-if="!openPwd"></image>

							<image src="../../static/themeNum1/index/zhengyan.png" class="pwdEye"
								style="width: 49rpx;height: 36rpx;" @click="methods.openPwdHandle('first')" v-else>
							</image>
						</view>
					</view>

					<view class="mt38">
						<view class="pl14">
							{{t('login.l_r2')}}
						</view>
						<view class="mt34  passwordInp">
							<input class="inp " type="safe-password" password="true" v-model="regisForm.password2"
								:placeholder="t('login.l_r3')" v-if="openCpwd">
							<input class="inp " type="safe-password" v-model="regisForm.password2"
								:placeholder="t('login.l_r3')" v-else>

							<image src="../../static/themeNum1/index/zhengyan.png" class="pwdEye"
								style="width: 49rpx;height: 35rpx;" @click="methods.openPwdHandle('second')"
								v-if="!openCpwd"></image>
							<image src="../../static/themeNum1/index/biyan.png" class="pwdEye"
								style="width: 49rpx;height: 36rpx;" @click="methods.openPwdHandle('second')" v-else>
							</image>
						</view>
					</view>
					<view class="mt38" v-if="smsFlag">
						<view class="pl14">
							{{t('login.l_r4')}}
						</view>
						<view class="mt34 otpEl">
							<input class="inp" v-model="regisForm.sms_code" :placeholder="t('login.l_r5')">

							<view class="otp" v-if="!hasSend" @click="sendHandle">
								OTP
							</view>
							<view class="countdown center" v-else>
								{{hasSecond}}s
							</view>
						</view>
					</view>
					<view class="mt38">
						<view class="pl14">
							{{t('login.l_r6')}}
						</view>
						<view class="mt34">
							<input class="inp" v-model="regisForm.invite_code" :placeholder="t('login.l_r7')"
								:disabled="!canInpCode" />
						</view>
					</view>

					<!-- 登录按钮 -->
					<view class="mt71 f36" :class="[regFlag?'choStyle1':'noCho']"
						@click="methods.regisHandle(methods.regisHandle1)">
						{{t('login.l_r8')}}
					</view>
				</view>
			</view>
			<view class="center">
				<view
					style="height: 50rpx;color:#fff;text-align: center;margin-top: 10px;border-bottom: 1rpx solid rgb(234, 201, 117);font-size: 16px;"
					@click="getLogin">{{t('add2.a_a4')}}
				</view>
			</view>


			<nut-popup position="left" :style="{ width: '50%', height: '100%' }" v-model:visible="showPicker">
				<view class="listItem" v-for="(item,index) in countryList" :style="index == currentInd?choStyle:''"
					@click="confirm(item,index)">
					{{item.text}} {{item.name}}
				</view>
			</nut-popup>

			<Loading ref="showLoading"></Loading>
		</view>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	import {
		onMounted,
		watch
	} from 'vue';
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const store = userStore();

	const actInd = ref(0); //0 登录  1 注册  2 找回密码

	const openPwd = ref(true) // 密码可见
	const openCpwd = ref(true) // 第二次密码可见

	// 登录表单
	const regisForm = ref({
		phone: '',
		password: '',
		password2: '',
		invite_code: '',
		sms_code: '',
	})
	const btnDis = ref(false)
	
	const country_code = ref('')
	const showPicker = ref(false)


	//getLogin
	const getLogin = () => {
		uni.navigateTo({
			url: './login'
		})
	}

	const regFlag = ref(false)
	const phoneRegFlag = ref(false)
	// 监听
	watch(regisForm, (newVal, oldVal) => {
		if (country_code.value.preg) {
			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				phoneRegFlag.value = false
				regFlag.value = false
				return false
			} else {
				phoneRegFlag.value = true
			}
		}

		if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value.password
			.length > 24 || regisForm.value.password2.length > 24) {
			regFlag.value = false
			return false
		}
		if (regisForm.value.password !== regisForm.value.password2) {
			regFlag.value = false
			return false
		}
		if (smsFlag.value && !regisForm.value.sms_code) {
			regFlag.value = false
			return false
		}
		if (codeFlag.value && !regisForm.value.invite_code) {
			regFlag.value = false
			return false
		}
		regFlag.value = true
	}, {
		deep: true
	})

	const choStyle = {
		background: "#DE3824",
		color: '#fff',
	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#fff'
	}

	const hasSecond = ref(60)
	const hasSend = ref(false)
	const sendHandle = () => {
		let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (!phoneReg.test(regisForm.value.phone)) {
			Toast.text(t('login.l_l9'))
			return false
		}

		if (timer.value) {
			clearInterval(timer.value)
		}
		const data = {
			tel: regisForm.value.phone,
			country: country_code.value.text,
			type: 1
		}

		request({
			url: 'join/sms',
			methods: 'post',
			data: data
		}).then(res => {
			startTimer()
			hasSend.value = true
			Toast.text(t('login.l_r9'))
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const openPicker = () => {
		if (canChoCountry.value) {
			showPicker.value = true
		}
	}
	const timer = ref(null)
	const startTimer = () => {
		timer.value = setInterval(() => {
			if (hasSecond.value == 0) {
				clearInterval(timer.value)
				hasSecond.value = 60
				hasSend.value = false
			}
			hasSecond.value--;
		}, 1000)

	}
	const currentInd = ref(0)

	const showLoading = ref(null)

	const confirm = (item, index) => {
		console.log(item, index, 22)
		country_code.value = item
		currentInd.value = index
		showPicker.value = false
		regFlag.value = false
		country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false


		if (country_code.value.preg) {
			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				phoneRegFlag.value = false
				regFlag.value = false
				return false
			} else {
				phoneRegFlag.value = true
			}
		}

	}
	const methods = {
		back() {
			history.back()
		},
		changePage() {
			uni.navigateTo({
				url: '../mine/langSetting'
			})
		},
		regisHandle(fn) {
			// if(!regFlag.value){
			// 	return false
			// }

			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				Toast.text(t('login.l_l9'))

				return false
			}

			if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value.password
				.length > 24 || regisForm.value.password2.length > 24) {
				Toast.text(t('login.l_r14'))
				return false
			}
			if (regisForm.value.password !== regisForm.value.password2) {
				Toast.text(t('login.l_r13'))
				return false
			}
			if (smsFlag.value && !regisForm.value.sms_code) {
				Toast.text(t('login.l_r10'))
				return false
			}
			if (codeFlag.value && !regisForm.value.invite_code) {
				Toast.text(t('login.l_r11'))
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				fn()
			}, 1500)
		},
		regisHandle1() {
			regisForm.value.country_code = country_code.value.text;
			request({
				url: '/join/register',
				methods: 'post',
				data: regisForm.value
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('login.l_r12'))

				if (sessionStorage.getItem('link')) {
					let key = sessionStorage.getItem('link')
					uni.clearStorage()
					uni.setStorageSync('token', res.accessToken)
					uni.navigateTo({
						url: '../linkEgg/linkEgg?key=' + key
					})
					return
				}
				uni.setStorageSync('token', res.accessToken)
				setTimeout(() => {
					uni.switchTab({
						url: '../tabbar/my'
					})
				}, 1000)

			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message)
			})

		},
		openPwdHandle(type) {
			if (type == 'second') {
				openCpwd.value = !openCpwd.value
			}
			if (type == 'first') {
				openPwd.value = !openPwd.value
			}
		}

	};

	const smsFlag = ref(false)
	const codeFlag = ref(false)
	const countryList = ref([])
	const getSetting = () => {
		// console.log(countryList.value)

		request({
			url: 'setting/register',
			methods: 'get'
		}).then(res => {

			// 邀请码 状态 1.必填 0.选填
			res.registerInviteCode.status == 1 ? codeFlag.value = true : codeFlag.value = false

		})

		if (store.$state.countryCode.length > 0) {

			countryList.value = store.$state.countryCode
			country_code.value = countryList.value[0]

			// /状态 1.开启 0关闭 短信
			country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false
			// console.log(country_code.value);
		} else {
			request({
				url: '/setting/country',
				methods: 'get'
			}).then(res => {
				let tempArr = []
				for (let i = 0; i < res.length; i++) {
					res[i].text = res[i].country_code
					res[i].value = res[i].id
					tempArr.push(res[i])
				}
				store.setCountryCode(tempArr)
				countryList.value = store.$state.countryCode
				console.log(store.$state.countryCode)
				if (canChoCountry.value) {
					country_code.value = store.$state.countryCode[0]
				} else {
					console.log(country_code.vlaue,'country_code.vlaue');
					
					store.$state.countryCode.forEach(item => {
						let str = "+" + countryVal.value
						if (item.country_code == str) {
							country_code.value = item
						}
					})
					if (!country_code.value) {
						country_code.value = store.$state.countryCode[0]
					}
				}
				country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false

			})

		}
	}
	// 终于可以用了
	onShow(() => {
		getSetting()
	})
	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	const canInpCode = ref(true)
	const canChoCountry = ref(true)
	const countryVal = ref(0)
	onLoad((e) => {
		console.log(e,'rerrr');
		
		if (e.country) {
			canChoCountry.value = false;
			countryVal.value = e.country;
			country_code.vlaue = e.country;
			request({
				url: 'setting/country',
				methods: 'get',
			}).then(res => {
				res.forEach((item, index) => {
					if (item.country_code.split('+')[1] == e.country) {
						currentInd.value = index
					}

				})
			})
		}
		if (!uni.getStorageSync('setLang')) {
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang', res[0].lang)
				uni.setStorageSync('setLang', true)
				window.location.reload()
			})
		}
		if (e.code) {
			regisForm.value.invite_code = e.code
			canInpCode.value = false

		}
		// if (e.country) {
		// 	canChoCountry.value = false
		// 	countryVal.value = e.country

		// }
	})
	// onMounted(() => {
	// 	getSetting()
	// })
</script>

<style lang="scss" scoped>
	.regist{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}
	.inp{
		background: #fff;
		// box-shadow: 0 0 18px 0 #F5F5F5;
		border: 1px solid #F5F5F5;
	}
	.red{
		color: #fff;
	}
	.f60{
		font-size: 2.25rem;
	}
	.f24{
		font-size: 13px;
	}
	.f26{
		font-size: 16px;
	}
	.pl14{
		font-size: 20px;
		color: #fff;
	}
	::v-deep .uni-input-input{
		color: #999999;
	}
	.mt71 {
		text-align: center;
		height: 120rpx;
		border-radius: 35rpx;
		color: #fff;
		line-height: 120rpx;
		transition: .3s linear all;
	}
	.choStyle1 {
		background: url(../../static/themeNum1/index/loginBtn.png);
		color: #fff !important;
		background-size: 100% 100%;

	}
	.noCho{
		background: rgb(216, 216, 216);
		color: #fff !important;
	}
	.passwordInp {
		position: relative;

		.pwdEye {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
		}
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
			width: 60rpx;
			height: 60rpx;
			background: linear-gradient(-43deg, #e67f74 0%, #DE3824 100%);
			border-radius: 10rpx;
			color: #fff;
			text-align: center;
			line-height: 60rpx;
		}

		.countdown {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 60rpx;
			height: 60rpx;
			border: 1rpx solid #ccc;
			border-radius: 10rpx;
			color: #ccc;
			text-align: center;
			line-height: 60rpx;

		}
	}

	.phoneEl {
		position: relative;
		padding-left: 100rpx;
		// background-color: #fff;
		border-radius: 30rpx;

		.phoneLabel {
			position: absolute;
			left: 40rpx;
			top: 50%;
			transform: translateY(-50%);
		}

		.phoneCheck {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);

		}
	}

	.listItem {
		font-size: 30rpx;
		padding: 10rpx 20rpx;
		margin: 10rpx 0;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1rpx solid #eee;
	}

	.actItem {
		color: #fff;
	}
</style>