<template>
	<view class="setting1">

		<view class="pdlr35 pt53" :style="{color:store.$state.secondColor}">

			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{t('inp.i_a1')}}</view>

			<view class="mt59">
				<view class="pl14">
					{{t('inp.i_a2')}}
				</view>
				<view class="mt34">
					<nut-picker v-model:visible="show" :text="'text2'" :columns="columns" @confirm="confirm"
						:cancel-text="t('all.a_c2')" :ok-text="t('all.a_c1')" />
					<view class="inp" :style="{color: bName?'#000':'#afafaf'}" @click="show = true">
						{{ bName?bName:t('inp.i_a3') }}
					</view>
					<!--  <input class="inp" placeholder-class="plo"  placeholder="please enter the Bank Name"  v-model="formData.bName"> -->
				</view>
			</view>

			<view class="mt38">
				<view class="pl14">
					{{t('inp.i_a4')}}
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.i_a5')" 
						v-model="formData.bank_num">
				</view>
			</view>
			
			<view class="mt38" v-if="showIn">
				<view class="pl14">
					{{t('add1.b_b5')}} ifsc_code
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('add1.b_b5') +'ifsc_code'" 
						v-model="formData.other_param_1">
				</view>
			</view>
			
			<view class="mt38">
				<view class="pl14">
					{{t('inp.i_a6')}}
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.i_a7')" 
						v-model="formData.account_holder">
				</view>
			</view>

			<view class="mt38">
				<view class="pl14">
					{{t('inp.i_a8')}}
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.i_a9')" 
						v-model="formData.phone">
				</view>
			</view>



			<!-- 登录按钮 -->
			<view style="height: 120rpx;">
				<view class="btns f36"
					:style="showTag?{background:'#fff'}:{background:store.$state.btnDis}"
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
	
	const showIn =ref(false)
	const methods = {
		back() {
			history.back()
		},
		saveHandle() {
			// if (!showTag.value) {
			// 	return false
			// }
			if (!formData.value.bankId) {
				Toast.text(t('inp.i_a3'));
				return false
			}

			if (!formData.value.bank_num) {
				Toast.text(t('inp.i_a5'));
				return false
			}
			if (!formData.value.account_holder) {
				Toast.text(t('inp.i_a7'));
				return false
			}
			if (!formData.value.phone) {
				Toast.text(t('inp.i_a9'));
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				methods.saveHandle1()
			}, 2000)
		},
		saveHandle1() {

			request({
				url: 'user/attribute/bankcard',
				methods: 'post',
				data: formData.value
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
	const show = ref(false)
	const columns = ref([])

	const confirm = ({
		selectedValue,
		selectedOptions
	}) => {
		// desc.value = selectedValue.join(',');
		show.value = false;
		bName.value = selectedOptions[0].text
		formData.value.bankId = selectedOptions[0].value
	}
	const bName = ref("")
	const formData = ref({
		bankId: "",
		bank_num: '',
		account_holder: '',
		phone: '',
		other_param_1:""
	})
	const showTag = ref(false)
	// 监听
	watch(formData, (newVal, oldVal) => {
		// if (!canEdit.value) {
		// 	showTag.value = false
		// 	return false
		// }
		if (!formData.value.bankId) {
			showTag.value = false
			return false
		}

		if (!formData.value.bank_num) {
			showTag.value = false
			return false
		}
		if (!formData.value.account_holder) {
			showTag.value = false
			return false
		}
		if (!formData.value.phone) {
			showTag.value = false
			return false
		}
		showTag.value = true
	}, {
		deep: true
	})

	const canEdit = ref(false)
	const getData = () => {
		request({
			url: 'user/attribute/bankcard',
			methods: 'get',
		}).then(res => {
			// columns.value = res.banks
			if (res.banks.length > 0) {
				let temArr = []
				for (let i = 0; i < res.banks.length; i++) {
					res.banks[i].text = res.banks[i].name
					res.banks[i].value = res.banks[i].id
					temArr.push(res.banks[i])
				}
				columns.value = temArr
			}

			res.bank_card_can_edit == 1 ? canEdit.value = true : canEdit.value = false

			if (res.bankcard) {
				formData.value.account_holder = res.bankcard.account_holder
				formData.value.phone = res.bankcard.phone
				formData.value.bank_num = res.bankcard.bank_num
				formData.value.bankId = res.bankcard.bankId
				try{
					formData.value.other_param_1 = res.bankcard.other_param_1
				}catch(e){
					//TODO handle the exception
				}
				for (let i in columns.value) {
					if (columns.value[i].id == formData.value.bankId) {
						bName.value = columns.value[i].text
					}
				}
			}
		})
		
		request({
			url: '/user/index',
			methods: 'get',
		}).then(res => {
			if(res.country_code == '+91'){
				showIn.value = true
			}
		})
		
	}
	// 终于可以用了
	onShow(() => {
		getData();
		
	})
</script>

<style lang="scss">
	.setting1{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.colorC {
		color: #AFAFAF !important;
	}

	.btns {
		text-align: center;
		line-height: 120rpx;
		color: #000;
		// height: 120rpx;
		border-radius: 35rpx;
		margin-top: 76rpx;
	}
	.inp{
		background: #Fff;
		color: #000;
	}
</style>
