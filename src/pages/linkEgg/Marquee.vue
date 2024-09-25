<template>
	<view class="mian">


		<!-- <view class="Mask">
			<image style="height: 116rpx;width: 116rpx;" src="../../static/PrizeDraw/Mask.png" mode=""></image>

		</view> -->
		
		<view class="pdlr32">
			
			<view class="back" @click="goback">
				<image style="height: 72rpx;width: 72rpx;" src="../../static/themeNum1/icon/bback.png" mode=""></image>
			</view>
			<view class="head">
				<view class="head_box">
					<view class="left">
						{{t('ss1.l_l8')}}：{{num}}
					</view>
				</view>
				<view class="head_box">
					<view class="left">
						{{t('ss1.l_l9')}}：{{didNnum}}
					</view>
				</view>
			</view>
			
		</view>



		
		<view class="prize">
			<button type="default" class="gonae" @click="btnPrize(4)" :disabled="disab" hover-class="is-hover">
					<view class="go">
						<image style="width: 240rpx;height: 240rpx;" src="../../static/logo1.jpg" mode=""></image>
					</view>
			</button>
			
			<view class="box">
				<view class="box_prize" v-for="(item,index) of prizeType"
					:style="item.id==back?'background-color:#16755E':'background-color:#DE3824'">
					<!-- 					:style="item.back" -->
					<view class="" @click="btnPrize(index)">
						<image :style="item.prize_style" :src="item.prize_img" mode=""></image>
					</view>
					<view class="text" :style="item.text">
						{{item.prize_name}}
					</view>
				</view>


			</view>
			
		</view>
		<view class="pdlr32">
			
			
			<view class="btn_box">
			
				<!-- <view class="">
					<image @click="record" style="width: 80rpx;height: 80rpx;" src="../../static/PrizeDraw/GroupZ.png"
						mode=""></image>
				</view> -->
				<view class="btn" @click="geRecord">
					<image style="width: 56rpx;height: 56rpx; margin-right: 10rpx;" src="../../static/egg/Mask_right.png" mode=""></image>
					{{t('ss1.l_l10')}}
			
				</view>
			</view>
			
			<view class="preList mt20" v-if="false">
					<image src="../../static/egg/prizeLaba.png" style="width: 40rpx;height: 40rpx;"></image>
					<nut-noticebar direction="vertical" :list="resultList" :speed="10" :standTime="1000">
			
					</nut-noticebar>
			</view>
		</view>
		
		<view class="rule_title pdlr32 mt40">
			<image style="width: 56rpx;height: 56rpx; margin-right: 10rpx;" src="../../static/egg/Mask_left.png" mode=""></image>
			{{t('ss1.l_l11')}}
		</view>
		
		<view class="text_center mt40 pb50 pdlr30 f30 text_bold" style=" color: #fff;">
			<view class="mt20" v-html="wenz"></view>
		</view>


		

		<!-- <view class="buom">
		</view> -->

		<view class="BlotOut" v-show='BlotOut'>
			<view class="BlotOut_box" v-show='BlotOut1'>
				<view style='float: right;margin-right: 10px;margin-top: 10px;'>
					<!-- <image @click="getOut" style="width:36rpx;height: 36rpx;" src="../../static/PrizeDraw/GroupX.png"
						mode=""></image> -->
				</view>
				<view style="margin-top: -30px;margin-left: calc(50% - 84rpx);">
					<image style="width:168rpx; height: 168rpx;" :src="lotteryUser.prize_img" mode=""></image>
				</view>
				<view class="Gerupb">
					<!-- <image style="width:300rpx; height: 164rpx;" src="../../static/PrizeDraw/Groupb.png" mode="">
					</image> -->

				</view>

				<view class="BlotOut_text">
					{{t('ss1.l_l12')}} {{lotteryUser.prize_name}}
				</view>

				<view class="btns" @click="loGetOut">
					OK
				</view>
			</view>
			<view class="BlotOut_box2" v-show='BlotOut2'>
				<view class="BlotOut_header">
					<view class="">
						Lucky Draw Record
					</view>
					<view>
						<!-- <image @click="getOut" style="width:36rpx;height: 36rpx;"
							src="../../static/PrizeDraw/GroupX.png" mode=""></image> -->
					</view>
				</view>
				<view class="BlotOut_logs">
					<view class="BlotOut_info" v-for="item of logs">
						<view style="width: 33%;">
							{{ item.createTime }}
						</view>
						<view style="width: 33%;" class="pone">
							{{ item.phone }}
						</view>
						<view style="width: 20%;" class="pone">
							{{ item.gift?.name }}
						</view>

						<view style="width: 14%;" class="" v-if='item.gift.id==1||item.gift.id==4||item.gift.id==9'>
							<!-- <image style="width: 20px;height: 20px;" src="../../static/PrizeDraw/waz.png" mode="">
							</image> -->
						</view>
						<view style="width: 14%;" class="" v-else>
						</view>
					</view>
				</view>



			</view>
		</view>
	</view>

</template>

<script setup>
	const horseLamp1 = ref(['Noticebar 公告栏', 'Cascader 级联选择', 'DatePicker 日期选择器', 'CheckBox 复选按钮']);
	// import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref,
		toRaw
	} from 'vue';
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	
	const geRecord = () =>{
		uni.navigateTo({
			url:'./marqueeRecord'
		})
	}

	const goback = () => {
		history.back()
	}
	const BlotOut = ref(false)
	const BlotOut1 = ref(false)
	const BlotOut2 = ref(false)

	const getOut = () => {
		BlotOut.value = false
	}

	const disab = ref(false)
	const loGetOut = () => {
		BlotOut.value = false
		disab.value = false
		productList()
		uni.navigateTo({
			url:'./marqueeRecord'
		})
	}


	const record = () => {
		request({
			url: 'activity/lottery/log',
			methods: 'get',
			data: {
				type: '1'
			}
		}).then(res => {
			logs.value = res
			BlotOut.value = true
			BlotOut2.value = true
			BlotOut1.value = false
		})

	}


	const prizeType = ref([])
	const back = ref()
	let rotate = ref()
	let jiasu = ref()
	let numberTurns = ref(0)
	const logs = ref([])
	const prize_id = ref('')
	const btnPrize = (index) => {
		disab.value = true
		if (index !== 4) {
			return
		}
		if (num.value == 0) {
			Toast.text('Not enough draws')
			return
		}
		request({
			url: 'activity/lottery/lottery',
			methods: 'post',
			data: {
				type: '1',
			}
		}).then(res => {
			prize_id.value = res.prize_id
			numberTurns.value = 0
			lottery()
		
		})
		
	}
	const Inception = ref(-1)
	const newTime = ref()
	const lotteryUser = ref([])
	const lotteryItem = ref({})
	const lottery = (id) => {
		let key = Inception.value
		rotate.value = setInterval(() => {
			if (key == 11) {
				key = 0
				if (numberTurns.value == 4) {
					clearInterval(rotate.value)
					let newKey = -1
					newTime.value = setInterval(() => {
						const arr = productId.value
						newKey++
						if (arr[newKey] == prize_id.value) {
							back.value = arr[newKey]
							Inception.value = newKey
							clearInterval(newTime.value)


							for (let i = 0; i < prizeType._rawValue.length; i++) {

								if (prizeType._rawValue[i].id == arr[newKey]) {
									setTimeout(() => {
										BlotOut.value = true
										BlotOut1.value = true
										BlotOut2.value = false
										lotteryUser.value = prizeType._rawValue[i]
									}, 1000)

								}
							}


						} else {
							// clearInterval(newTime.value)

							back.value = arr[newKey]
						}

					}, 250)
				} else {
					getBack(key)

				}
			} else {
				key++
				getBack(key)

			}
		}, 100)
	}
	const btnPrizeS = (index) => {
		let key = index
		jiasu.value = setInterval(() => {
			key++
			getBack(key)
		}, 100)
	}


	const getBack = (index) => {

		const arr = productId.value
		if (index == 11) {
			let num = numberTurns.value
			const dataNum = num+1
			numberTurns.value = dataNum
		}
		back.value = arr[index]

	}

	const stopGetBack = (id, key) => {
		const arr = productId.value
		if (arr[key] == id) {
			clearInterval(rotate.value)
			back.value = arr[key]
		} else {
			back.value = arr[key]

		}
	}

	const fnProduct = (res, index) => {
		let newData = {}
		newData.prize_img = res[index].full_cover
		newData.prize_name = res[index].name
		newData.prize_style = "width: 90rpx;height: 90rpx;"
		newData.back = '',
			newData.text = res[index].id == 1 ? 'width:100%' : ''
		newData.id = res[index].id
		return newData
	}


	const productInfo = ref()
	const productId = ref([])
	const num = ref()
	const didNnum = ref()
	const numUser = ref()
	const wenz = ref([])
	const resultList = ref([])
	const productList = () => {
		request({
			url: 'activity/lottery/info',
			methods: 'get'
		}).then(res => {
			didNnum.value = res.chance.did_num
			num.value = res.chance.num
			numUser.value = res.num
			const strData = res.lottery.rule.split('</p>')
			resultList.value = res.result.map(item => {
				return 'User : ' + item.user.phone + ' Winning ' + item.gift.name
			})

			// let newStrData = []
			// for (let i = 0; i < strData.length; i++) {
			// 	if (strData[i]) {
			// 		newStrData.push(strData[i].replace('<p>', ''))
			// 	}
			// }
			wenz.value = res.lottery.rule
			const lotteryNum = res.lottery.gift
			const arr = []
			const id = []
			const newdataNum = []
			for (let i = 0; i < lotteryNum.length; i++) {
				id.push(lotteryNum[i].id)
				
				if (i <= 3) {
					let newDate = fnProduct(lotteryNum, i)
					arr.push(newDate)

				} else if (i <= 4) {
					let newDate = fnProduct(lotteryNum, 11)
					arr.push(newDate)
				} else if (i <= 5) {
					let newDate = fnProduct(lotteryNum, 4)
					arr.push(newDate)
				} else if (i <= 6) {
					let newDate = fnProduct(lotteryNum, 10)
					arr.push(newDate)
				} else if (i <= 7) {
					let newDate = fnProduct(lotteryNum, 5)
					arr.push(newDate)
				} else if (i <= 8) {
					let newDate = fnProduct(lotteryNum, 9)
					arr.push(newDate)
				} else if (i <= 9) {
					let newDate = fnProduct(lotteryNum, 8)
					arr.push(newDate)
				} else if (i <= 10) {
					let newDate = fnProduct(lotteryNum, 7)
					arr.push(newDate)
				} else if (i <= 11) {
					let newDate = fnProduct(lotteryNum, 6)
					arr.push(newDate)
				}

			}
			// newdataNum.reverse()
			// arr.push(newdataNum)
			// id.push(res.lottery.gift[i].id)
			let arr1 = {
				prize_img: '',
				prize_name: "",
				prize_style: "width: 23%;height: 140rpx;background-color: #1B1B19;",
				text: '',
			}

			let arr2 = {
				prize_img: '',
				prize_name: "",
				prize_style: "width: 23%;height: 140rpx;background-color: #1B1B19;",
				text: '',
			}
			let arr3 = {
				prize_img: '',
				prize_name: "",
				prize_style: "width: 23%;height: 140rpx;background-color: #1B1B19;",
				text: '',
			}
			let arr4 = {
				prize_img: '',
				prize_name: "",
				prize_style: "width: 23%;height: 140rpx;background-color: #1B1B19;",
				text: '',
			}
			

			arr.splice(5, 0, arr1)
			arr.splice(6, 0, arr2)
			arr.splice(9, 0, arr3)
			arr.splice(10, 0, arr4)
			
			productId.value = id
			prizeType.value = arr
		})
	}
	const frequency = ref()
	const Message = () => {
		request({
			url: 'user/index',
			methods: 'get',
		}).then(res => {
			frequency.value = res.integral
		})
	}


	onLoad(() => {
		productList()
		Message()
		
	})
</script>

<style lang="scss" scoped>
	.is-hover {
		color: rgba(255, 255, 255, 0.6);
		// background-color: #262424;
		// border-color: #262424;
	  }
	.prize{
		.nut-button--round{
			border-radius: 0rpx;
		}
	}
	.gonae{
		position: absolute;
		width: 42%;
		height: 327rpx;
		// background: #262424;		
		top: 50%;
		left: 50%;
		 transform: translate( -50%,-50%);
		 .go{
			 width: 240rpx;
			 height: 240rpx;
			 position: absolute;
			 top: 50%;
			 left: 50%;
			  transform: translate( -50%,-50%);
		 }
		
	}
		
	.rule_title{
		display: flex;
		justify-content: start;
		align-items: center;
	}
	.head{
		width: 100%;
		margin-top: 52rpx;
		height: 122rpx;
		display: flex;
		justify-content: space-between;
		.head_box{
			width: 330rpx;
			height: 100%;
			background: #fff;
			// background: linear-gradient(225deg, #2F2D2D 0%, #464141 48%, #262424 100%);
			border-radius: 8px 8px 8px 8px;
			box-sizing: border-box;
			padding: 10rpx;
			.left{
				background: #fff;
				color: #000;
				// background: linear-gradient(64deg, #1B1A1A 0%, #161414 100%);
				width: 100%;
				height: 100%;
				border-radius: 8px 8px 8px 8px;
				text-align: center;
				line-height: 112rpx;
			}
		}
	}
	.preList {
		background:url('../../static/egg/preListBg.png') no-repeat 100%/100%;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		height: 100rpx;
		// border-radius: 20rpx;
	}

	.pone {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

	}

	.btn_box {
		
		display: flex;
		align-items: center;
		width: 550rpx;
		margin: 40rpx auto;
		justify-content: space-around;
	}

	.BlotOut_logs {
		width: 100%;
		height: 259px;
		margin-top: 10px;
		overflow-y: scroll;
		color: #D3D3D3;
		font-size: 24rpx;
	}

	.Gerupb {
		position: absolute;
		top: 3px;
		left: 50%;
		margin-left: -75px;
	}

	.BlotOut {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background-color: rgba(0, 0, 0, 0.5);

		.BlotOut_box {
			width: 212px;
			height: 231px;
			background: linear-gradient(180deg, #4A4A4A 0%, #303030 100%);
			border-radius: 16px 16px 16px 16px;
			opacity: 1;
			position: absolute;
			top: 266px;
			left: 50%;
			margin-left: -106px;

			.BlotOut_text {
				width: 100%;
				text-align: center;
				margin-top: 38rpx;
				box-sizing: border-box;
				padding: 0 40rpx;
				font-size: 14px;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 50rpx;
			}

			.btns {
				width: 160px;
				height: 40px;
				background: linear-gradient(180deg, #1FBA95 0%, #077E62 100%);
				border-radius: 22px 22px 22px 22px;
				opacity: 1;
				position: absolute;
				left: 50%;
				margin-left: -80px;
				bottom: 16px;
				text-align: center;
				line-height: 40px;
				font-size: 14px;
				font-weight: 400;
				color: #FFFFFF;

			}
		}

		.BlotOut_box2 {
			width: 320px;
			height: 326px;
			background: linear-gradient(180deg, #4A4A4A 0%, #303030 100%);
			border-radius: 16px 16px 16px 16px;
			opacity: 1;
			position: absolute;
			top: 266px;
			left: 50%;
			margin-left: -160px;

			.BlotOut_header {
				box-sizing: border-box;
				padding: 10px 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.BlotOut_info {
				display: flex;
				box-sizing: border-box;
				padding: 10px 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.Mask {
		width: 116rpx;
		height: 116rpx;
		position: absolute;
		top: 86px;
		left: 304px;
		z-index: 999;
	}

	.back {
		width: 72rpx;
		height: 72rpx;
		// position: absolute;
		padding-top: 48rpx;
		top: 38px;
		left: 16px;
	}

	.buom {
		width: 134px;

		height: 5px;
		background: #FFFFFF;
		border-radius: 100px 100px 100px 100px;
		opacity: 1;
		position: absolute;
		left: 50%;
		margin-left: -56px;
		top: 1115px;
	}

	.btn {
		width: 538rpx;
		height: 97rpx;
		text-align: center;
		line-height: 97rpx;
		border-radius: 18px;
		color: #000;
		background: #fff;
		// background: url("../../static/egg/btn.png");
		background-size: 100%;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mian {
		width: 100%;
		background: url(../../static/themeNum1/index/loginBack.png);
		background-size: 750rpx 100%;
		position: relative;
		height: 100%;
		color: #fff;
		background-repeat: no-repeat;

		.header {
			.header_img {
				width: 100%;
			}
		}



		.prize {
			width: 96%;
			margin: auto;
			height: 895rpx;
			box-sizing: border-box;
			padding: 10px;
			background: url('../../static/egg/prize.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-top: 40rpx;
			position: relative;

			.box {
				width: 90%;
				height: 77%;
				margin: 120rpx auto;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				.box_prize {
					width: 23%;
					height: 140rpx;
					background-color: #ffffff;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #fff;
					.text {
						width: 99%;
						font-size: 18rpx;
						box-sizing: border-box;
						// padding: 0px 20px;
						text-align: center;
						// white-space: nowrap;
						//     text-overflow: ellipsis;
						//     overflow: hidden;

					}
				}
			}
		}




	}

	
	
</style>