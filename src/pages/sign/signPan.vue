<template>
	<view  class="pdlr37 pt23">
		<view class="flex between">
		   <image
		      :src="store.$state.imgObj.backIcon"
		      mode="widthFix"
		      style="width: 48rpx; height: 36rpx"
		      @click="back"
		   ></image>
		   <view class="f50 text_bold mglr17" :style="{ color: store.$state.thirdColor }">{{t('ss1.s_s3')}}</view>
		   <view style="width: 50rpx;"> </view>
		</view>
		<view class=" sign mt30" style="width: 100%;">
			<nut-signature :line-width="3" @confirm="confirm" @clear="clear" :stroke-style="'#000'" @end="endHandle">
			</nut-signature>
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
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		onMounted
	} from "vue";
	const store = userStore();
	import {
		Locale
	} from '@nutui/nutui';
	// 引入英文语言包
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
	// import es from '@nutui/nutui/dist/packages/locale/lang/es';
	import {
		useI18n
	} from "vue-i18n";
	const demoSignUrl = ref('');

	// setting/upload
	const showLoading = ref(null)

	const count = ref(0)


	const endHandle = (e) => {
		count.value++;
	}
	const confirm = (canvas, data) => {
		if (data == '') {
			return false;
		}
		if (count.value < 1) {
			Toast.text('Please enter your signature')
			return false
		}

		showLoading.value.loading = true
		uni.uploadFile({
			url: uploadUrl.value,
			filePath: data,
			name: 'cert',
			success: (res) => {
				request({
					url: 'user/setContract',
					methods: 'post',
					data: {
						contract:JSON.parse(res.data).data
					}
				}).then(res => {
					showLoading.value.loading = false
					Toast.text('success')
					setTimeout(()=>{
						back()
					},500)
				}).catch(e => {
					showLoading.value.loading = false
					Toast.text(e.message)
				})
			},
			fail: (e) => {
				showLoading.value.loading = false
			}
		});


	};
	const back = ()=>{
		history.back()
	}
	const clear = () => {
		demoSignUrl.value = '';

	}
	const {
		t
	} = useI18n();
	const upData = ref({
		id: "",
		contract: ""
	})
	const uploadUrl = ref("")
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get',
		}).then(res => {
			uploadUrl.value = res.upload_host + 'api/uploads'
		}).catch(e => {
			Toast.text(e.message)
		})
	}

	// 终于可以用了
	onMounted(() => {
		if(uni.getStorageSync('lang') == 'es'){
		// 	Locale.use('es', es);
		}else{
			Locale.use('en-US', enUS);
		}
		getData()
	})
	onLoad(e => {
		
	})
</script>

<style lang="scss">
	.mgtb20 {
		color: rgb(22, 183, 57);
	}
</style>
