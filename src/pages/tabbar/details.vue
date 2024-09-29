<template>
	<view class="detail">
		<view class="pdlr35 pt53">
			<view class="flex between">
				<image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" style="color: #fff">{{movieData.title}}</view>
			<video v-if="movieData.video_type=='mp4'" webkit-playsinline="true" playsinline="true" id="myVideo"
				show-loading :src="movieData?movieData.video:''" :poster="movieData?movieData.cover:''"
				@timeupdate='videoTime($event)' :controls="true" controls>
			</video>
			<iframe v-else class="iframe" style="position: relative;" width="100%" height="265" :src="movieData.video"
				frameborder="0" fs="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			<view class="ifeamBox" v-if="movieData.video_type=='iframe'"></view>
			<!-- <nut-video :source="videoData.source" :options="option" @time="videoTime">
			  </nut-video>
			options='true' -->
			<view class='movieInformation'>
				<view style='font-weight: 600;'>
					<!-- 					Movie introduction -->
					{{t('movie.m_c4')}}
				</view>
				<view class="introduction">
					{{movieData.desc}}
				</view>
				<view class="time">
					<view class="time_1">
						<view style='font-weight: 600;'>
							<!-- 							Task requirements -->
							{{t('movie.m_c5')}}

						</view>
						<!-- <view class="">
							{{t('movie.m_c6')}}
							{{time?time:0}} 
							{{t('movie.m_c7')}}
						</view> -->

						<view class="Rate" @click="Rate">
							<image :src="rating?'../../static/star1.png':'../../static/star.png'" mode="widthFix"
								style="width: 35rpx;height: 35rpx;"></image>
							{{rating?rating+'/10':t('movie.m_d1')}}
						</view>
						<view class="tatol_Rate">
							<!-- 							评分 -->
							{{t('movie.m_c8')}}
							{{result}}
						</view>
					</view>
					<!-- <view class="tim_2">
						<view style='font-weight: 600;'>
							ReWard Price
						</view>
						<view style='color:linear-gradient(90deg,#fd4f19,#ffc265);' class="EUR">
							{{movieData.vip?movieData.vip.bonus:''}} EUR
						</view>
					</view> -->
				</view>
			</view>
			<!-- 			 v-show="movieData.state" -->
			<view class="btn" v-show="movieData.state">
				<!-- 				<button  class="page-body-button" @click="storp(movieData,2)">Give up the task</button> -->
				<button :disabled="disabledflag" class="page-body-button1"
					@click="storp(movieData,1)">{{t('movie.m_d6')}}</button>
			</view>
		</view>
		<view v-show='RateShow' class="popUp">
			<view class="RateBtn">
				<view class="Cancel" @click="Cancel">
					x
				</view>
				<view class="wujiao">
					{{rating?rating:'?'}}
				</view>
				<view class="rate">
					<!-- 					RATE THIS -->
					{{t('movie.m_c9')}}
				</view>
				<view class="desc">
					{{movieData.desc}}
				</view>
				<view class="tes">
					<image v-for="(item,index) in 10" :key='index' class="xin" @click="change(item,index)"
						:src="grade>=item?'../../static/star1.png':'../../static/star.png'" mode="widthFix"
						style="width: 45rpx;height: 45rpx;"></image>

				</view>
				<button class='btnRate'
					:style="grade?'background-color: #DE3824;color:#fff':'background-color: #DE3824;color: #fff'"
					@click="submitScore(grade)">
					<!-- 					Rate -->
					{{t('movie.m_d1')}}
				</button>

			</view>
		</view>
		<view v-show="pop" class="Popup">
			<view class="boxs">
				<view class="header">
					<!-- 					提示 -->
					{{t('movie.m_c1')}}

				</view>
				<view class="main_texted">
					{{popText}}
				</view>
				<view class="sub">
					<!-- <view class="canner" @click="canner">
						<view class="no">
							取消
						</view>
					</view> -->
					<view class="verify" @click="verify">
						<view class="yes">
							<!-- 							确定 -->
							{{t('movie.m_c3')}}

						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onMounted,
		ref
	} from 'vue';
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const option = {
		muted: true,
		controls: true
	}


	const pop = ref(false)
	const popText = ref()
	const color = ref('#ccc')
	const rating = ref()
	const movieUrl = ref('')
	//获取电影详情
	const movieData = ref({})
	// const videoData = ref({})
	const movieDetails = (id) => {
		request({
			url: 'task/detail',
			methods: 'get',
			data: {
				movieId: id
			}
		}).then(res => {
			// console.log(res,'dd')

			if (res.video_type !== 'mp4') {
				setTimeout(() => {
					time.value = 12;
					if (res.state == 1) {
						RateShow.value = true
					}
				}, 12000);
			}


			movieData.value = res
			// const source = {
			// 	src:res.video,
			// 	 type: 'video/mp4'
			// }
			// videoData.value.source = source
			result.value = res.rate
		})
	}
	const add = () => {
		console.log('111111')
	}
	const methods = {
		back() {
			history.back()
		},

	};
	const time = ref()
	const videoTime = (e) => {


		// console.log(e, 'ss')
		time.value = e.detail.currentTime
	}

	const back = ref(0)
	const disabledflag = ref(false)
	const storp = (item, state) => {
		if (time.value > 10 && rating.value > 0) {
			disabledflag.value = true
			request({
				url: 'task/grab',
				methods: 'post',
				data: {
					movieId: item.id,
					status: state,
					rate: result
				}
			}).then(res => {
				popText.value = t('movie.m_d4')
				disabledflag.value = true
				pop.value = true
				back.value = 1

			}).catch(err => {
				popText.value = err.message
				disabledflag.value = true
				pop.value = true
				back.value = 1
			})
		} else {
			popText.value = t('movie.m_d3')
			pop.value = true
		}
	}
	const grade = ref()
	const change = (item) => {
		grade.value = item
		// 	rating.value = item
	}

	//提交评分
	const result = ref({})
	const submitScore = (index) => {
		if (index) {
			rating.value = index
			RateShow.value = false
			color.value = 'orange'
		} else {
			return

		}
	}
	//取消
	const Cancel = () => {
		RateShow.value = false
	}
	const verify = () => {
		if (back.value == 1) {
			methods.back()
		}
		pop.value = false

	}


	//评分
	const RateShow = ref(false)
	const Rate = () => {
		if (time.value > 10) {
			RateShow.value = true
			// 	color.value = 'orange'
		} else {
			popText.value = t('movie.m_d2')
			pop.value = true

		}
	}
	watch(time, (newTime, oldTime) => {
		if (parseInt(newTime) == 10) {
			RateShow.value = true
		}

	})
	// 终于可以用了
	onLoad(() => {
		let data = uni.getStorageSync('item');
		pop.value = false;
		movieDetails(data.id)

	})
	// created((){
	// 	console.log('sss')
	// })
</script>
<style lang="scss" scoped>
	.detail {
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
	}

	.Popup {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		top: 0px;
		z-index: 10000;

		.boxs {
			width: 600rpx;
			height: 350rpx;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background-color: #fff;
			color: #000;
			border-radius: 3px;

			.header {
				width: 100%;
				height: 60rpx;
				text-align: center;
				line-height: 100rpx;
			}

			.main_texted {
				width: 86%;
				height: 80rpx;
				padding: 15px;
				text-align: center;

			}

			.sub {
				display: flex;

				.verify {
					width: 100%;
					height: 100%;

					.yes {
						width: 220rpx;
						height: 80rpx;
						background-color: #DE3824;
						color: #fff;
						border-radius: 20rpx;
						margin: 30px auto;
						text-align: center;
						line-height: 80rpx;

					}
				}

				.canner {
					width: 50%;
					height: 100%;

					.no {
						width: 150rpx;
						height: 60rpx;
						background-color: #1D1D1D;
						border-radius: 20rpx;
						margin: 0 auto;
						text-align: center;
						line-height: 60rpx;

					}
				}
			}
		}
	}

	.Cancel {
		color: #fff;
		font-size: 1.5rem;
		display: inline-block;
		position: absolute;
		top: -27px;
		right: 24px;
	}

	.popUp {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.xin {
		margin: 0 8rpx;
	}

	.btnRate {
		// background-color: #f5c518;
		width: 640rpx;
		height: 72rpx;
		line-height: 72rpx;
	}

	.tes {
		width: 80%;
		// height: 200px;
		margin: 10rpx auto;
		display: flex;
	}

	.desc {
		width: 93%;
		color: #000;
		padding: 14px;
		height: 60rpx;
		overflow: hidden;
		text-align: center;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.rate {
		color: #DE3824;
		text-align: center;
		margin-top: 50px;
		font-size: 24rpx;
	}

	.shul {
		color: #fff;
		font-size: 24px;
		text-align: center;
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		background: #5799ef;
		margin: 0 8rpx;
		// position: absolute;
		// top:-120rpx;
		// left:50%;
		// margin-left: -100rpx;
		/* 绘制路径 */
		clip-path: polygon(50% 0, 65% 40%, 100% 40%, 72% 60%, 85% 100%, 50% 75%, 15% 100%, 28% 60%, 0 40%, 35% 40%);
	}

	.wujiao {
		text-align: center;
		font-size: 48rpx;
		color: #fff;
		width: 200rpx;
		height: 200rpx;
		line-height: 200rpx;
		background-image: url('../../static/star1.png');
		background-size: 200rpx;
		background-repeat: no-repeat;
		position: absolute;
		top: -120rpx;
		left: 50%;
		margin-left: -100rpx;
		/* 绘制路径 */

	}

	.RateBtn {
		width: 100%;
		height: 600rpx;
		position: absolute;
		// color: #fff;
		background-color: #fff;
		bottom: 0;
	}

	.Rate {
		color: #DE3824;
		// margin-left: 10px;
		font-size: 36rpx;
		display: inline-block;
		margin-right: 10px;
	}

	.tatol_Rate {
		display: inline-block;

	}

	#myVideo {
		width: 99% !important;
	}

	.introduction {
		width: 100%;
		//height: 100%;
		max-height: 165px;
		overflow-y: auto;
		display: flex;
	}

	.movieInformation {
		background: #fff;
		color: #000;
		padding: 10px;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.time {
		display: flex;

		.time_1 {
			width: 70%;
		}

		.time_2 {
			width: 30%;

			.EUR {
				color: red
			}
		}
	}

	.btn {
		display: flex;
		margin-top: 30rpx;
	}

	.page-body-button {
		width: 330rpx;
		height: 100rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 100rpx;


	}

	.page-body-button1 {
		width: 410rpx;
		height: 110rpx;
		background: url(../../static/themeNum1/index/loginBtn.png);
		background-size: 100% 100%;
		color: #fff;
		font-size: 30rpx;
		text-align: center;
		line-height: 110rpx;


	}

	.ifeamBox {
		position: absolute;
		width: 50%;
		min-height: 48px;
		opacity: 0;
		background: #fff;
		top: 325px;
		left: 50%;
	}
</style>