<template>
	<view class="btcBind">

		<view class="pdlr35 pt53" :style="{color:store.$state.secondColor}">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{t('inp.a_b1')}}</view>

			<view class="mt59">
				<view class="pl14">
					BTC
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" placeholder="Please enter btc wallet address" v-model="formData.address">
				</view>
			</view>


			<!-- 登录按钮 -->
			<view style="height: 120rpx;">
				<view class="btns f36"
					:style="showTag?{background:'#fff',boxShadow: '0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35)'}:{background: '#fff'}"
					@click="methods.saveHandle">
					{{ t('inp.i_s1')}}


				</view>
			</view>
			
			<view style="height: 50rpx;"></view>
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
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	const showLoading = ref(null)
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n();
	const methods = {
		back() {
			history.back()
		},

		saveHandle() {
			if (!canEdit.value) {
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				methods.saveHandle1()
			}, 2000)
		},
		saveHandle1() {
			request({
				methods: 'post',
				url: 'user/attribute/wallet',
				data: {
					address: formData.value.address,
					type:"2"
				}
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('inp.i_s2'));
				history.back()
			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message);
			})
		},
	};
	const canEdit = ref(false)
	const getData = () => {
		request({
			methods: 'get',
			url: 'user/attribute/wallet',
			data:{
				type:2
			}
		}).then(res => {
			if (res.address) {
				formData.value.address = res.address
				res.u_card_can_edit == 1 ? canEdit.value = true : canEdit.value = false
			} else {
				canEdit.value = true
			}
		})
	}
	const formData = ref({
		address: ''
	})
	const showTag = ref(false)
	watch(formData, (newVal, oldVal) => {
		showTag.value = false
		if (!canEdit.value) {
			return false
		}
		if (!formData.value.address) {
			return false
		}

		showTag.value = true
	}, {
		deep: true
	})
	// 终于可以用了
	onShow(() => {
		getData();
	})
</script>

<style lang="scss">
	.btcBind{
		height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.btns {
		text-align: center;
		line-height: 120rpx;
		color: #000;
		// height: 120rpx;
		border-radius: 35rpx;
		margin-top: 76rpx;
		// transition: .3s linear all;
	}
	.inp{
		background: #Fff;
		color: #000;
	}
</style>
