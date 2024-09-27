<template>
	<view :style="store.$state.imgObj.loginBg" style="background: #fff;">
			<!-- <view class="mian">
				<view v-if="activeItem.length > 0" style="width: 100%;color: #fff;margin-bottom: 10px;">{{ t('task.t1')
					}}
				</view>
				<view class="activeItem" v-for="(item, index) in activeItem">
					<view style="display: flex;">
						<view style="display: flex;flex-direction: column;align-items: center;">
							<image class="acImg" :src="item.little_pic"></image>
							<view class="acText">
								<text>{{ item.name }}</text>
							</view>
						</view>
						<view style="display: flex;flex-direction: column;margin-left: 20px;margin-top: 10px;">
							<view style="font-size: 10px;">{{ currency }} {{item.price}}/{{ $t('add2.a_a11') }}</view>
							<view style="font-size: 10px;">{{ $t('add2.a_a12') }}:{{ item.day_max }} {{ $t('act.e_e12') }}</view>
							<view style="font-size: 10px;">{{ $t('add2.a_a13') }}:{{ currency }}{{ item.bonus }}</view>
						</view>
					</view>
					<view class="applyBtn">
						<text @click="goGrade(item)">{{ t('add2.a_a9') }}</text>
					</view>
				</view>
				<view v-if="noActiveItem.length > 0" style="width: 100%;color: #fff;margin-bottom: 10px;">{{
					t('task.t4')
				}}</view>
				<view class="activeItem" v-for="(item, index) in noActiveItem">
					<view style="display: flex;">
						<view style="display: flex;flex-direction: column;align-items: center;">
							<image class="acImg" :src="item.little_pic"></image>
							<view class="acText">
								<text>{{ item.name }}</text>
							</view>
						</view>
						<view style="display: flex;flex-direction: column;margin-left: 20px;margin-top: 10px;">
							<view style="font-size: 10px;">{{ currency }} {{item.price}}/{{ $t('add2.a_a11') }}</view>
							<view style="font-size: 10px;">{{ $t('add2.a_a12') }}:{{ item.day_max }} {{ $t('act.e_e12') }}</view>
							<view style="font-size: 10px;">{{ $t('add2.a_a13') }}:{{ currency }}{{ item.bonus }}</view>
						</view>
					</view>
					<view class="applyBtn">
						<text @click="goGrade(item)">{{ item.number>actineNum?t('task.t6'):t('task.t7') }}</text>
					</view>
				</view>
			</view> -->
			<view class="mian">
				<view style="width: 100%;color: #fff;margin-bottom: 10px;">
					<view class="gradeItem" v-for="(item, index) in allGradeList">
						<view class="starviptc" v-if="item.is_active==1" @click="goGrade(item)">
							<image class="grademg" :src="item.little_pic"></image>
							<view class="pg">{{ item.name }}</view>
							<view class="iden">{{ t('index.i_a33') }}</view>
							<view class="lh">{{ $t('add2.a_a12') }}:{{ item.day_max }} {{ $t('act.e_e12') }}</view>
							<view class="bottom">
								<view>{{ t('index.i_a34') }}</view>
								<view style="margin-top: 5px;">{{ item.start_time}} ~ {{ item.end_time }}</view>
							</view>
						</view>
						<view class="starviptc" v-else-if="item.is_active==3" @click="goUnlock(item.id)">
							<image class="grademg" :src="item.little_pic"></image>
							<view class="pg">{{ item.name }}</view>
							<view class="iden">{{ t('index.i_a33') }}</view>
							<view class="lh">{{ $t('add2.a_a12') }}:{{ item.day_max }} {{ $t('act.e_e12') }}</view>
							<view class="bottom" >
								<view>Unlock</view>
							</view>
						</view>
						<view class="starviptc" v-else-if="item.is_active==0"  @click="gochange(item)">
							<image class="grademg" :src="item.little_pic"></image>
							<view class="pg">{{ item.name }}</view>
							<view class="iden">{{ t('index.i_a33') }}</view>
							<view class="lh">{{ $t('add2.a_a12') }}:{{ item.day_max }} {{ $t('act.e_e12') }}</view>
							<view class="bottom">{{ item.number>actineNum?t('task.t6'):t('task.t7') }}</view>
						</view>
						<view class="starviptc" v-else @click="goGrade(item)">
							<image class="grademg" :src="item.little_pic"></image>
							<view class="pg">{{ item.name }}</view>
							<view class="mf14">{{ currency }} {{item.price}}/{{ $t('add2.a_a11') }}</view>
							<view class="mf14">{{ $t('add2.a_a12') }}:{{ item.day_max }} {{ $t('act.e_e12') }}</view>
							<view class="mf14">{{ $t('add2.a_a13') }}:{{ currency }}{{ item.bonus }}</view>
							<view class="bottom">{{ item.number>actineNum?t('task.t6'):t('task.t7') }}</view>
						</view>
					</view>
				</view>
			</view>
			<Loading ref="showLoading"></Loading>
            <Menu :bottom="300" :right="0"></Menu> 

	</view>

</template>


<script setup>
	import request from '../../../comm/request.ts';
    import Menu from '@/components/menu.vue'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		userStore
	} from "@/store/themeNum.js";
	const store = userStore();
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
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
	};
	const currency = uni.getStorageSync('currency');
	let activeItem = ref([])
	let noActiveItem = ref([])
	let allGradeList = ref([])
	//任务页信息
	const actineNum = ref(undefined)
	const showLoading = ref(true)
	const movieList = ref()
	const amount = ref()
	const movieMission = () =>{
		request({
			url:'home/vipList',
			methods:'get'
		}).then(res=>{
			allGradeList.value = [];
			// const num = res.find(item=>{
			// 	if(item.is_active == 1){
			// 		return item
			// 	}
				
			// })
			res.map((item) => {
				if (item.is_active == 1) {
					allGradeList.value.unshift(item)
				} else{
					allGradeList.value.push(item)
				}
			})	
			let active = res.filter((movie)=>movie.is_active==1)[0];
			actineNum.value = active.number;
			amount.value = active.price;
			// showLoading.value =false
			movieList.value = res
			showLoading.value.loading = false
		}).catch(()=>{
			showLoading.value.loading = false
		})
	}

	//去充值

	const gochange = (item) =>{
		uni.navigateTo({
			url:`/pages/tabbar/recharge?id=${item.id}&rechargeAmount=${item.price}`
		})
		
	}

	//等级解锁
	const goUnlock = (id) =>{
		request({
			url:'home/vipUnlock',
			methods:'post',
			data:{
				vipId:id
			}
		}).then(res=>{
			Toast.text('Unlocked successfully')
			movieMission()
			
		}).catch((err)=>{
			Toast.text(err.message)
		})
	}
	
	
	//单个等级详情
	const goGrade = (item) =>{
		if(item.is_active==1){
			uni.switchTab({url: "./task"})
		}else{
			if(item.number < actineNum.value){
				const itemData = {
					amount:amount.value,
					itemData:item,
				}
				uni.setStorageSync("goGrade",itemData)
				uni.navigateTo({url: "gradeDetails"})
			}else{
				uni.navigateTo({url: './recharge'})
			}
		}
	}

	const tabbarIl8n = () =>{
		uni.setTabBarItem({
			index:0,
			text:t('add1.a_c1')
		})
		uni.setTabBarItem({
			index:1,
			text:t('add1.a_c2')
		})
		uni.setTabBarItem({
			index:2,
			text:t('add1.a_c3')
		})
		uni.setTabBarItem({
			index:3,
			text:t('index.i_a31')
		})
		uni.setTabBarItem({
			index:4,
			text:t('add1.a_c5')
		})
	}
	
	onLoad(()=>{
		tabbarIl8n()
		
	})
	onLoad(()=>{
		movieMission()
	})
	onMounted(()=>{
		showLoading.value.loading = true
		
	})

 
	
	
</script>

<style lang="scss" scoped>
	
	.userName{
		color:#fff;
		text-align: center;
	}
	.nav{
		position: fixed;
		top:0;
		width: 100%;
		color:#fff;
		height: 92rpx;
		background: #000;
		z-index: 999;
		display: flex;
		.margin{
			margin-left: 30rpx;
			margin-right: 30rpx;
			
			position: absolute;
			margin-top: 17px;
		}
		.task_navigation{
			text-align:center;
			font-size: 1.125rem;
			line-height:92rpx;
			width: 100%;
		
		}
	}
	
	.main{
		width: 90%;
		height: 100%;
		margin: 70rpx 38rpx 0rpx 38rpx;
	}
	.main_box{
		width: 100%;
		height: 150rpx;
		border:1px solid rgb(234, 201, 117);;
		border-radius: 15rpx;
		margin-bottom: 40rpx;
		.header{
			width: 100%;
			height: 50rpx;
			border-radius: 15rpx 15rpx 0rpx 0rpx;
			background-color: rgb(234, 201, 117);;
		}
		.main_text{
			width: 100%;
			height: 100rpx;
			font-size: 36rpx;
			line-height: 100rpx;
			color:#fff;
			display: flex;
			justify-content: space-around;
			.box1{
				width: 60%;
				height: 100%;
				text-indent:2em;
			}
			.box3{
				width: 30%;
				height: 100%;
				text-indent:2em;
				
			}
			.box2{
				width: 20%;
				height: 100%;
				text-align: right;
			}
			
		}
	}
	.activeItem{
		width: 100%;
		background: #1C1C1C;
		color: #fff;
		border-radius: 10px;
		margin-bottom: 10px;
		padding: 10px 15px;
		display: flex;
		justify-content: space-between;
		background-image: url(../../static/task.png);
		background-size: 100% 100%;
		box-sizing: border-box;
	}
	.acImg{
		width: 40px;
		height: 40px;
		margin-top: 0px;
		// margin-left: 12px;
		position: absolute;
		z-index: 99;
	}
	.acText{
		width: 45px;
		height: 15px;
		background: #36383B;
		margin-top: 47px;
		font-size: 10px;
		border-radius: 10px;
		text-align: center;
		// margin-left: 7px;
		
	}
	.applyBtn{
		background: #f4c56f;
		color: #000;
		height: 25px;
		width: 80px;
		text-align: center;
		border-radius: 10px;
		margin-top: 15px;
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mian{
		width: 95%;
		padding: 0 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-around;
		// margin-top: 50rpx;
		flex-wrap: wrap;
	}
	.gradeItem{
		padding: 0.9375rem;
		margin-top: 12px;		
		box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
		border-radius: 1rem;
		padding: 18px 16px;
		.starviptc{
			position: relative;
		}
		.grademg{
			width: 64px;
			height: 64px;
			display: block;
			position: absolute;
			right: 0.6rem;
			top: 0px;
		}
		.pg{
			margin-bottom: 18px;
			font-size: 1.6rem;
			text-align: left;
			line-height: 25px;
			font-weight: 600;
		}
		.iden{
			margin: 5px 0;
			text-align: left;
			font-size: 16px;
		}
		.mf14{
			margin: 5px 0px;
			font-size: 14px;
		}
		.lh{
			margin: 18px 0px 5px 0;
			text-align: left;
			font-size: 14px;
		}
		.bottom{
			text-align: right;
			margin-right: 0.6rem;
		}
	}
	.gradeItem:nth-child(1) {
		background: #000;
	}
	.gradeItem:nth-child(2) {
		background: linear-gradient(60deg, #1f2025, #ff3302);
		background: -webkit-linear-gradient(60deg, #1f2025, #ff3302);
	}
	.gradeItem:nth-child(3) {
		background: linear-gradient(60deg, #966576, #32cec6);
		background: -webkit-linear-gradient(60deg, #966576, #32cec6);
	}
	.gradeItem:nth-child(4) {
		background: linear-gradient(60deg, #a57f40, #fdd407);
	}
	.gradeItem:nth-child(5) {
		background: linear-gradient(60deg, #7687eb, #10ef4f);
	}
	.gradeItem:nth-child(6) {
		background: linear-gradient(60deg, #7c5284, #3f8eb3);
	}
	.gradeItem:nth-child(7) {
		background: linear-gradient(60deg, #555a6f, #1f2025);
	}
	.gradeItem:nth-child(8) {
		background: linear-gradient(60deg, #ef7e9a, #8611a5);
	}
	.gradeItem:nth-child(9) {
		background: linear-gradient(60deg, #de2248, #ccff40);
	}
	.gradeItem:nth-child(10) {
		background: linear-gradient(225deg, #92daff, #c006bc);
	}
	// .main{
 //            width: 100%;
 //            height: 100%;
 //            margin-top: 50px;
 //        }
 //        .main_box{
 //            /* background-color: #fff; */
 //            display: flex;
 //            padding: 10px;
 //            height: 131px;
 //            flex-direction: column;
 //        }
 //        .main_box_Center{
 //            width: 100%;
 //            height: 100%;
 //            background: rgb(29, 29, 29);
 //            border-radius: 5px;
 //            box-shadow: 0 1px 2px rgba(0,0,0,.2);
 //            position: relative;
 //            display: flex;
 //        }
 //        .ply{
 //            background-color: rgb(205, 18, 25);
 //            color: rgb(255, 255, 255);
 //            display: inline-block;
 //            padding: 5px;
 //            border-top-right-radius: 5px;
 //            border-bottom-left-radius: 5px;
 //            font-size: 12px;
 //            position: absolute;
 //            right: 0;
 //        }
 //        .mian_box1{
 //            margin: 27px 10px;
 //            width: 30%;
 //            height: 144rpx;
 //            display: flex;
 //            flex-direction: column;
 //            align-items: center;
 //        }
 //        .mian_box1>p{
 //            font-size: 16px;
 //            color: rgb(42, 42, 0);
 //            font-weight: 600;
 //            margin-top: 5px;
 //        }
 //        .mian_text{
 //            width: 70%;
 //            height: 77px;
 //            font-size: 12px;
 //            display: flex;
	// 		color:#fff;
 //            justify-content:space-around;
 //        }
 //        .mian_text_c{
 //            width: 68px;
 //            height: 77px;
 //            margin: 27px 0px;
           
 //        }
 //        .mian_text_c>p{
 //            margin-bottom: 2px;
 //        }
 //        .mian_text_w{
 //            width: 95px;
 //            height: 77px;
 //            margin: 27px 0px;
           
 //        }
 //        .mian_text_w>p{
 //            margin-bottom: 2px;
 //        }
 //        .weight{
 //            font-weight: 600;
 //        }
 //        .mian_box_two{
 //            height: 169px;
 //            position: relative;
 //        }

        
 //        .main_box_footer_bix1{
 //            width: 83px;
 //            height: 18px;
 //            // background-color: #fff;
 //            /* margin-left: 20px; */
 //            font-size: 16px;
	// 		color:#fff;
 //            font-weight: 600;
 //        }
 //        .main_box_footer_bix2{
 //            background: linear-gradient(80deg,#00ee43,#00ab36);
 //            border-radius: 25px;
 //            color: #fff;
 //            font-weight: 600;
 //            font-size: 16px;
 //            width: 100px;
 //            height: 28px;
 //            text-align: center;
 //            line-height: 28px;
 //            margin-right: -20px;
 //        }
 //        .footer_text{
 //            width: 100%;
 //            height: 59px;
 //            position: absolute;
 //            top: 108px;
 //            display: flex;
 //            justify-content: space-around;
 //            align-items: center;
 //        }
</style>