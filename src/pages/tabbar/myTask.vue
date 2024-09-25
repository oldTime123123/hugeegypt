<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="nav">
			<view class="flex between margin">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="task_navigation"> 
<!-- 			More task -->
				{{t('movie.m_b3')}}
			</view>
		</view>

		  <!-- <view class="main">
		        <view :class="item.is_active==1?'main_box':'main_box mian_box_two'" v-for="(item,index) in movieList" :key='index' >
		            <view class="main_box_Center">
		                <view v-show='item.is_active==1' class="ply"> Current status </view>
		                <view class="mian_box1">
		                    <image style="width: 100rpx;height: 100rpx;" :src="item.pic" ></image>
		                    <view class='userName' >{{item.name}}</view>
		                </view>
		                <view class="mian_text">
		                    <view class="mian_text_c">
		                        <view>Daily Tasks</view>
		                        <view class="weight" style="margin-bottom: 6px;">{{item.day_max}}</view>
		                        <view>Per order</view>
		                        <view class="weight">EUR {{item.bonus}}</view>
		
		                    </view>
		                    <view class="mian_text_w">
		                        <view>Daily Profit</view>
		                        <view class="weight" style="margin-bottom: 8px;">EUR {{item.daily_profit}}</view>
		                        <view>Monthly Income</view>
		                        <view class="weight">EUR ?</view>
		                    </view>
		                </view>
						 <view v-show='item.is_active==0' class="footer_text">
								<view class="main_box_footer_bix1">{{item.price}}</view>
								<view class="main_box_footer_bix2" @click="goGrade(item)">Join Now</view>
						</view>
		            </view>
		        </view>
			</view> -->
			<view class="mian">
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
			</view>
			<Loading ref="showLoading"></Loading>
		
	</view>

</template>


<script setup>
	import request from '../../../comm/request.ts';
	
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
			showLoading.value.loading = false
			// const num = res.find(item=>{
			// 	if(item.is_active == 1){
			// 		return item
			// 	}
				
			// })
			res.map((item) => {
				if (item.is_active == 1) {
					activeItem.value.push(item)
				} else{
					noActiveItem.value.push(item)
				}
			})
			let active = res.filter((movie)=>movie.is_active==1)[0];
			actineNum.value = active.number;
			amount.value = active.price;
			// showLoading.value =false
			movieList.value = res
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
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
		flex-wrap: wrap;
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