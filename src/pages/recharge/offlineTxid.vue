<template>
   <view class="offlineTxid">
      <view class="flex between">
         <image
            src="../../static/themeNum1/icon/bback.png"
            mode="widthFix"
            style="width: 48rpx; height: 36rpx; margin-left: 20px; margin-top: 40px"
            @click="back"
         ></image>
      </view>
      <view style="margin-left: 20px;color: #fff">
         <view class="f50 pt38">
            {{ t('back.r_r8') }} {{showWord}}
         </view>
      </view>
      <view class="pdlr45 mt69">
		  <image style="width: 100%;height: 150rpx;" src="../../static/themeNum1/tips.png" mode=""></image>
         <view class="mt34 pdlr10 flex between" style="height: 600rpx;">
            <view class="ww49 center" style=" position: relative;">
				<nut-uploader
				   :url="uploadHost + 'api/uploads'"
				   name="cert"
				   upload-icon='image'
				   type="image/jpeg"
				   @success="successHandle"
				   @delete="clearImg"
				   style="border-radius: 20rpx;width: 100%;height: 100%;"
				></nut-uploader>
				<view v-show="showWord" class="wordInfo">
					Cargar imagen
				</view>
				<view class="" v-if="showImg" style="position: absolute; left: 0">
				   <image style="width: 157px; height: 315px" :src="uploadHost + formData.cert"></image>
				</view>
				<nut-icon
				   name="close-little"
				   v-if="showImg"
				   size="15"
				   style="position: absolute; top: -10rpx; left: 143px; background: #fff; border-radius: 50%"
				   @click="clearImg"
				></nut-icon>
			</view>
			<view class="ww49" style="height: 100%;">
				<image src="../../static/demoR.jpg" style="width: 100%;height: 600rpx;"></image>
			</view>
         </view>

         <view class="btns" @click="jumpPage('../tabbar/index')">
            {{ t('back.r_r11') }}
         </view>
      </view>
   </view>
</template>

<script setup>
// import topNav from "@/components/topNav/topNav.vue"
import request from '../../../comm/request.ts';
import { userStore } from '@/store/themeNum.js';
import { Toast, Locale } from '@nutui/nutui';
import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
import { onShow, onLoad } from '@dcloudio/uni-app';
const store = userStore();

import { useI18n } from 'vue-i18n';

const {
		t
	} = useI18n();;

const btc = ref('');
const uploadHost = ref('');

const showImg = ref(false);
const getData = () => {
   if (btc.value) {
      request({
         url: 'finance/btc/recharge/index',
         methods: 'get'
      }).then((res) => {
         if (!formData.value.order_no) {
            uni.switchTab({
               url: '../tabbar/index'
            });
            return false;
         }
         uploadHost.value = res.upload_host;
         try {
            formData.value.order_no = res.order.order_no;
            formData.value.cert = res.order.cert;
            if (res.order.cert) {
               showImg.value = true;
            }
         } catch (e) {}
      });
   } else {
      request({
         url: 'finance/offline/recharge/index',
         methods: 'get'
      }).then((res) => {
         if (!res.order) {
            uni.switchTab({
               url: '../tabbar/index'
            });
            return false;
         }
         uploadHost.value = res.upload_host;
         try {
            formData.value.order_no = res.order.order_no;
            formData.value.cert = res.order.cert;
            if (res.order.cert) {
               showImg.value = true;
			   showWord.value = false
            }
         } catch (e) {}
      });
   }
};
const showWord = ref(true)
const successHandle = (responseText, option, fileItem) => {
   showImg.value = false;
   showWord.value = false
   formData.value.cert = JSON.parse(responseText.responseText).data;
};

const formData = ref({
   order_no: '',
   cert: '',
   type: '4'
});
const clearImg = () => {
	console.log('123')
   showImg.value = false;
   showWord.value = true
};
const back = () => {
   history.back();
};
const jumpPage = (url) => {
   if(!formData.value.cert){
	   return false
   }
   request({
      url: 'finance/offline/recharge/cert',
      methods: 'post',
      data: formData.value
   })
      .then((res) => {
         Toast.text('Success');
         setTimeout(() => {
            uni.navigateTo({
               url: '../../pages/record/rechargeRecord'
            });
         }, 500);
      })
      .catch((err) => {
         Toast.text(err.message);
      });
};
// 终于可以用了
onShow(() => {
   getData();
   Locale.use('en-US', enUS);
});
onLoad((e) => {
   if (e.order) {
      formData.value.order_no = e.order;
   }
   if (e.btc) {
      btc.value = e.btc;
   }
});
</script>

<style lang="scss" scoped>
   .offlineTxid{
      min-height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);

   }
	.wordInfo{
		color: #09090A;
		position: absolute;
		top: 60%;
		transform: translateY(-50%);
		font-weight: bold;
		z-index: 999;
	}
.btns {
   margin-top: 113rpx;
   text-align: center;
   line-height: 120rpx;
   color: #000;
   height: 120rpx;
   background: #fff;
   box-shadow: 0px 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
   border-radius: 35rpx;
   font-size: 36rpx;
}
</style>
