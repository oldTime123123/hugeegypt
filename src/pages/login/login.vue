<template>
	<!--:style="store.$state.imgObj.loginBg"  -->
	<!--  -->
	<view class="login">

		<view class="pdlr35 pt33">

			<view class="flex between" style='justify-content: right;'>
				<!-- <image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image> -->
				<image :src="store.$state.imgObj.langSetting" mode="widthFix" style="width: 70rpx;height: 70rpx;"
					@click="methods.changePage('../mine/langSetting')">
				</image>
			</view>

			<view class="mt73" :style="{color:store.$state.secondColor}">
				<view class="f60 text_bold" style="color:#fff">
					{{t('login.l_l1')}}
				</view>
				<!-- 登录 -->
				<view class="mt173">
					<view class="pl14 red">
						{{t('login.l_l2')}}
					</view>
					<view class="mt34 phoneEl inp">
						<view class="phoneLabel flex  center" @click="showPicker = true" style="color:#DE3824">
							{{country_code.country_code}}
							<image src="../../static/themeNum1/icon/Polygon.png " mode="widthFix" style="width: 30rpx;margin-left: 10rpx; margin-top: 5rpx;"></image>
						</view>
						<input class="pl80" type="number" v-model="loginForm.phone" :placeholder="t('login.l_l3')"  >
						<nut-icon name="Check" size="20" v-if="phoneRegFlag"
							class="phoneCheck animate__animated animate__fadeIn " color="#FF0000"></nut-icon>
					</view>

					<view class="mt38">
						<view class="pl14 red">
							{{t('login.l_l4')}}
						</view>
						<view class="mt34 passwordInp">
							<input class="inp" type="safe-password" password="true" v-model="loginForm.password"
								:placeholder="t('login.l_l5')" v-if="openCpwd">
							<input class="inp" v-model="loginForm.password" :placeholder="t('login.l_l5')" v-else>
							<image src="../../static/themeNum1/index/zhengyan.png" class="pwdEye"
								style="width: 50rpx;height: 45rpx;" @click="openCpwd = !openCpwd" v-if="!openCpwd">
							</image>
							<image src="../../static/themeNum1/index/biyan.png" class="pwdEye"
								style="width: 50rpx;height: 45rpx;" @click="openCpwd = !openCpwd" v-else>
							</image>
						</view>
					</view>
					<view class="xuan mt24">
						<nut-radiogroup v-model="radioVal">
						    <nut-radio label="1">{{t('ss1.s_s11')}}</nut-radio>
						</nut-radiogroup>
						<view class=" f24 pr10 red"  :style="{color:store.$state.contentColor}"
							@click="forgetHandle">
							{{t('act.l_f2')}}
						</view>
						
					</view>
					
					
					<!-- 登录按钮 -->
					<view class="mt204 pl14 mar" :class="[regFlag?'choStyle1':'noCho']" @click="methods.loginHandle">
						{{t('login.l_l6')}}
					</view>
					<view class="text_center mt34 f26 pb10 red" @click="methods.changePage('./register')">
						{{t('login.l_l7')}} <text class="pb5" style="border-bottom: 2rpx solid ;color:#fff"> {{t('login.l_l8')}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 客服列表 -->
		<nut-drag :boundary="{ top:50, left: 30, bottom:50, right: 15 }" :attract="true" v-if="showService"
			:style="{ top: '170rpx', right: '30rpx' }">
			<!-- <image :src="COUNTRY.kefu?COUNTRY.kefu:store.$state.imgObj.kefuIcon" mode="widthFix"
				style="width: 70rpx;height: 70rpx;margin-top: 0;" @click="methods.changePage('../mine/service')">
			</image> -->
			<image src="../../static/service/kefu2.jpg" mode="widthFix"
				style="width: 50px;height: 50px;margin-top: 0;border-radius: 50%;" @click="methods.changePage('../mine/service')">
			</image>
		</nut-drag>

		<nut-popup position="left" :style="{ width: '50%', height: '100%' }" v-model:visible="showPicker">
			<view class="listItem" v-for="(item,index) in countryList" :style="index == currentInd?choStyle:''"
				@click="confirm(item,index)">
				{{item.text}}  {{item.name}}
			</view>
		</nut-popup>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import COUNTRY from "../../../setting.js"
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n()
	const store = userStore();
	const showService = ref(false)
	const actInd = ref(0); //0 登录  1 注册  2 找回密码
	const radioVal = ref()

	// 登录表单
	const loginForm = ref({
		phone: '',
		password: ''
	})
	const regFlag = ref(false)
	const currentInd = ref(0)
	const openCpwd = ref(true)
	const phoneRegFlag = ref(false)
	// 监听
	watch(loginForm, (newVal, oldVal) => {
		let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (phoneReg.test(loginForm.value.phone)) {
			
			phoneRegFlag.value = true
		} else {
			regFlag.value = false
			phoneRegFlag.value = false
		}

		if (phoneReg.test(loginForm.value.phone) && loginForm.value.password.length > 5 && loginForm.value.password
			.length < 25) {
				
			regFlag.value = true
		} else {
			regFlag.value = false
			regFlag.value = false
		}
	}, {
		deep: true
	})

	const choStyle = {
		background: '#DE3824',
		color: '#fff',

	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#fff'
	}

	const country_code = ref("")
	const showPicker = ref(false)
	const isGoForgetPwd = ref(false)
	const confirm = (item, index) => {
		if (isGoForgetPwd.value) {
			let flag = item.sms_status
			if (flag == 1) {
				let code = item.code.replace("+", "")
				methods.goResetPwd(code)
			} else {
				methods.changePage('../mine/service')
			}
			showPicker.value = false
			return false
		}
		country_code.value = item
		currentInd.value = index
		showPicker.value = false
		
		let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (phoneReg.test(loginForm.value.phone)) {
			phoneRegFlag.value = true
		} else {
			regFlag.value =false
			phoneRegFlag.value = false
		}
		
	}
	watch(showPicker, (newVal, oldVal) => {
		if (!newVal) {
			isGoForgetPwd.value = false
		}
	}, {
		deep: true
	})
	const forgetHandle = () => {
		uni.navigateTo({
			url:'../tabbar/service'
		})
		// isGoForgetPwd.value = true
		// showPicker.value = true
	}
	const showLoading = ref(null)
	
	const methods = {
		back() {
			uni.switchTab({
				url: '../tabbar/index'
			})
		},
		changePage(url) {
			uni.navigateTo({
				url
			})
		},
		loginHandle() {
			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(loginForm.value.phone)) {
				Toast.text(t('login.l_l9'))
				return false
			}
			if (loginForm.value.password.length < 6 || loginForm.value.password.length > 24) {
				Toast.text(t('login.l_r14'))
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				methods.loginHandle1()
			}, 1500)
		},
		loginHandle1() {

			loginForm.value.country_code = country_code.value.text
			request({
				url: '/join/login',
				methods: 'post',
				data: loginForm.value
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('login.l_l11'))
				console.log(radioVal.value,'sss')
				if(radioVal.value){
					uni.setStorageSync('user',loginForm.value)
					
				}else{
					uni.removeStorageSync('user')
				}
				if (sessionStorage.getItem('link')) {
					let key = sessionStorage.getItem('link')
					uni.clearStorage()
					uni.setStorageSync('token', res.accessToken)
					uni.navigateTo({
						url: '../linkEgg/linkEgg?key=' + key
					})
					
					return false
				}
				uni.setStorageSync('token', res.accessToken)
				setTimeout(() => {
					uni.switchTab({
						url: '../tabbar/index'
					})
				}, 1000)
			}).catch(err => {
				showLoading.value.loading = false
				uni.showToast({
					title: err.message,
					icon: 'none'
				})

			})

			// uni.switchTab({
			// 	url: '../tabbar/index'
			// })
		},


		goResetPwd(code) {
			uni.navigateTo({
				url: './resetPwd?code=' + code
			})
		},
	};
	const countryList = ref([])
	const getData = () => {
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
			country_code.value = store.$state.countryCode[0]
			countryList.value = store.$state.countryCode
		})
		// 获取客服状态
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {
			// console.log(res);
			res.status == 1 ? showService.value = true : showService.value = false
		})
		// request({
		// 	url: '/setting/lang',
		// 	methods: 'get'
		// }).then(res => {
		// 	console.log(res);
		// })
	}
	const textToast = (msg) => {
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	}
	// 终于可以用了
	onLoad((e) => {
		if(uni.getStorageSync('user')){
			loginForm.value.phone = uni.getStorageSync('user').phone
			loginForm.value.password = uni.getStorageSync('user').password
		}
		if (e.code) {
			if(e.country){
				uni.navigateTo({
					url: "../login/register?code=" + e.code  + "&country=" + e.country
				})
			}else{
				uni.navigateTo({
					url: "../login/register?code=" + e.code  
				})
			}
			
		}
		let curLang = uni.getStorageSync('lang')
		// uni.clearStorage()
		uni.removeStorageSync('token')
		uni.removeStorageSync('localVersion')
		uni.removeStorageSync('setLang')
		uni.removeStorageSync('currency')
		uni.removeStorageSync('lang')
		uni.removeStorageSync('setLang')
		
		
		
		if(curLang){
			uni.setStorageSync('lang',curLang)
			uni.setStorageSync('setLang',true)
		}else{
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang',res[0].lang)
				uni.setStorageSync('setLang',true)
				window.location.reload()
			})
		}
		getData()
	})
</script>

<style lang="scss" scoped>
	.login{
		height: 100vh;
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
	.pl14{
		font-size: 20px;
	}
	.f24{
		font-size: 13px;
	}
	.f26{
		font-size: 16px;
	}
	::v-deep .uni-input-input{
		color: #999999;
		font-size: 16px;
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
	.xuan{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	::v-deep.xuan .nut-radiogroup .nut-radio .nut-radio__label{
		font-size: 16px;
	}
	.mt173 {
		margin-top: 70rpx;
	}

	.mt204 {
		margin-top: 50rpx;
		text-align: center;
		height: 120rpx;
		border-radius: 35rpx;
		color: #000;
		line-height: 120rpx;
		transition: .3s linear all;
	}



	.phoneEl {
		position: relative;
		padding-left: 80rpx;
	
		border-radius: 30rpx;
		
		.phoneLabel {
			position: absolute;
			left: 30rpx;
			top: 48%;

			font-size: 30rpx;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			justify-content: space-between;
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
		// justify-content: center;
		padding-left: 60rpx;
		border-bottom: 1rpx solid #eee;
	}

	.actItem {
		color: #fff;
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
</style>
