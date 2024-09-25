<template>
	<view class="content">
		<view class="wordContent">
			<view class="title ">
				{{t('login.l_l12')}}
			</view>
			<view class="mt10 word">
				{{t('login.l_l13')}}

			</view>
			<view class="mt60 loginBtn loginBtnL" @click="changePage('./login')">
				{{t('login.l_l6')}}
			</view>
			<view class="mt30 loginBtn loginBtnR" @click="changePage('./register')">
				{{t('login.l_l8')}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useI18n
	} from "vue-i18n";

	const { t } = useI18n();
	

	const changePage = url => {
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss" scoped>
	.content {
		background-image: url('../../static/beforeLoginBg1.png');
		width: 100%;
		height: 100vh;
		background-size: cover;
		background-attachment: fixed;
		background-position: center;
		animation: scrollBg 15s linear infinite;
	}

	@keyframes scrollBg {
		0% {
			background-position: 0;
		}

		25% {
			background-position: 100%;
		}

		50% {
			background-position: 0;
		}

		75% {
			background-position: -100%;
		}

		100% {
			background-position: 0;
		}
	}

	.wordContent {
		padding-top: 50vh;
		padding-left: 50rpx;
		padding-right: 50rpx;
		text-align: center;

		.title {
			color: #fff;
			font-size: 56rpx;
			font-weight: bold;
		}

		.word {
			font-size: 32rpx;
			color: #b9b9b9;
		}

	}

	.loginBtn {
		color: #fff;
		border-radius: 30rpx;
		padding: 30rpx 0;
		font-size: 36rpx;
	}

	.loginBtnL {
		background: linear-gradient(180deg, #DE3824 0%, #d56c74  100%);
	}

	.loginBtnR {
		background: rgb(228 185 185 / 80%);
		opacity: 1;
		backdrop-filter: blur(5rpx);
		-webkit-backdrop-filter: blur(.5rpx);
		filter: blur(.5rpx);
	}
</style>