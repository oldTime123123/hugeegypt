<template>
	<view class="usdtxid">

		<view class="pdlr35 pt53" :style="{color:store.$state.secondColor}">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{t('wr.r_r1')}}</view>

			<view class="mt59">
				<view class="pl14">
					Txid
				</view>
				<view class="mt34">

					<input class="inp" :placeholder="t('inp.i_s3')" placeholder-class="colorC" v-model="formData.tx_id">
				</view>


				<view class="pl14 mt59">
					Certificate
				</view>
				<view class="mt34 flex">

					<nut-uploader :url="uploadHost +'api/uploads'" name="cert" type="image/jpeg"
						@success="successHandle" style="border-radius: 20rpx;" v-model:file-list="defaultFileList"
						maximum="1"></nut-uploader>

				</view>
			</view>

			<!-- 登录按钮 -->
			<view class="btns f36" @click="methods.saveHandle">
				{{t('inp.i_s1')}}
			</view>
			<view style="height: 50rpx;"></view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';

	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast,
		Locale
	} from '@nutui/nutui';
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";
	
	const showLoading = ref(null)
	const {
		t
	} = useI18n();
	const methods = {
		back() {
			history.back()
		},
		saveHandle() {
			if(!formData.value.cert){
				return false
			}
			showLoading.value.loading = true
			request({
				url: '/finance/usdt/recharge/cert',
				methods: 'post',
				data: {
					...formData.value
				}
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('inp.i_s2'))
				setTimeout(() => {
					uni.switchTab({
						url: '../tabbar/index'
					})
				}, 500)
			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message)
			})
		},
	};
	const uploadHost = ref("")


	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (!res.order) {
				uni.switchTab({
					url: '../tabbar/index'
				})
				return false
			}
			uploadHost.value = res.upload_host

			try {
				formData.value.tx_id = res.order.tx_id
				formData.value.order_no = res.order.order_no
				formData.value.cert = res.order.cert
				if (res.order.cert) {
					// showImg.value = true
					let temp = {
						name: '1238109381231.png',
						url: uploadHost.value+ res.order.cert,
						status: 'success',
						message: 'success',
						type: 'image'
					}
					defaultFileList.value[0] = temp
				}
			} catch (e) {
				//TODO handle the exception
			}
		})
	}
	const defaultFileList = ref([]);
	const successHandle = (responseText, option, fileItem) => {
		formData.value.cert = JSON.parse(responseText.responseText).data
	}

	const formData = ref({
		tx_id: '',
		order_no: "",
		cert: ""
	})

	// 终于可以用了
	onLoad(() => {
		Locale.use('en-US', enUS);
		getData();
	})
</script>

<style lang="scss">
	.usdtxid{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.colorC {
		color: #000 !important;
	}
	.inp{
		background: #Fff;
		color: #000;
	}
	.plo{
		color: #000 !important;
	}
	.btns {
		text-align: center;
		line-height: 120rpx;
		color: #000;
		background: #fff;
		height: 120rpx;
		border-radius: 35rpx;
		margin-top: 76rpx;
	}
</style>
