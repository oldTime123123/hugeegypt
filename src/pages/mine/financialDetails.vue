<template>
	<view class="pdlr48 pt40 financialDetails">
		<view class="flex between">
		   <image
		      src="../../static/themeNum1/icon/bback.png"
		      mode="widthFix"
		      style="width: 48rpx; height: 36rpx"
		      @click="back"
		   ></image>
		</view>
		<view style="color: #fff">
		   <view class="f50 pt38">
		      {{ t('ss1.s_s5') }}
		   </view>
		   <!-- 	<view class="f30 mt60 ">
							{{t('wr.w_u9')}}
						</view> -->
		</view>
		
		<view class="mt60 myEl">
					 <!-- signTemplateObj -->
					<!-- <view class="myItem"  @click="changePage(signTemplateObj.url)" v-show="showSignTemplate">
					    <view class="flex col_center">
					       <image src="/static/sign/signIcon.png" mode="widthFix" style="width: 65rpx; height: 65rpx"></image>
					       <view class="mglr15 textHidden" style="flex: 1">{{ signTemplateObj.name }}</view>
					    </view>
					    <nut-icon name="arrow-right" color="#fff"></nut-icon>
					 </view> -->
		   <view class="myItem" v-for="(item, index) in myList" @click="changePage(item.url)" v-show="item.showFlag">
		      <view class="flex col_center">
		         <image :src="item.img" mode="widthFix" style="width: 45rpx; height: 45rpx"></image>
		         <view class="mglr15 textHidden" style="flex: 1">{{ item.name }}</view>
		      </view>
		      <nut-icon name="arrow-right" color="#000"></nut-icon>
		   </view>
		</view>
	</view>
</template>

<script setup>
import request from '../../../comm/request.ts';
import { userStore } from '@/store/themeNum.js';
import { Toast } from '@nutui/nutui';
import { onShow, onLoad } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';

const {
		t
	} = useI18n();;

const store = userStore();

const myList = ref([
 
   {
      name: t('mine.m_m5'),
      img: store.$state.my.myList[0],
      url: './accountDetails',
      showFlag: true
   },

  
   {
      name: t('mine.m_m7'),
      img: store.$state.my.myList[2],
      url: '../record/rechargeRecord',
      showFlag: true
   },

   {
      name: t('mine.m_m6'),
      img: store.$state.my.myList[3],
      url: '../record/withdrawRecord',
      showFlag: true
   },
   {
      name: t('ss1.s_s10'),
      img: '/static/themeNum1/icon/jij.png',
      url: '../record/skyPayRecord',
      showFlag: true
   },
   
]);

const back = () =>{
	history.back()
}
const changePage = (url) => {
   if (url == 'down') {
      var userAgent = navigator.userAgent; //获取userAgent信息
      if (userAgent.includes('iPhone')) {
         uni.navigateTo({
            url: '../mine/iosIntro'
         });
         return false;
      }
      window.open(appData.value.url);
   } else {
      if (url == './notice' || url == './service') {
         uni.switchTab({
            url
         });
      } else {
         uni.navigateTo({
            url
         });
      }
   }
};

// 终于可以用了
onShow(() => {
   // getData();
//    currency.value = uni.getStorageSync('currency');
});
</script>

<style lang="scss">
	.financialDetails{
		min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

	}
	.myEl {
	   width: 100%;
	
	   .myItem {
	      padding: 12rpx 32rpx;
	      background-color: #fff;
	      border-radius: 10rpx;
	      display: flex;
	      align-items: center;
	      justify-content: space-between;
	      // width: 100%;
	      text-align: center;
	      font-size: 26rpx;
	      color: #000;
	      margin-top: 20rpx;
	   }
	}
</style>
