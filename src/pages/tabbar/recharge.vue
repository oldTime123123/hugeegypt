<template>
   <view class="recharge">
      <view class="pdlr50 pt33 pb50">
         <view class="flex between">
            <image
               src="../../static/themeNum1/icon/bback.png"
               mode="widthFix"
               style="width: 48rpx; height: 36rpx"
               @click="back"
            ></image>
         </view>
         <view :style="{ color: store.$state.thirdColor }">
            <view class="f50 pt38 red">
               {{ t('tabbar.t_t4') }}
            </view>
            <!-- 	<view class="f30 mt60 ">
					{{t('wr.w_u9')}}
				</view> -->
         </view>

         <view
            class="choItem mt88"
            @click="changeChoosed('usdt')"
            :class="cType == 'usdt' ? 'choStyle' : 'noStyle'"
            v-if="showUsdt"
         >
            <view class="flex">
               <image :src="store.$state.imgObj.usdt" mode="widthFix" style="width: 55rpx; height: 55rpx"></image>
               <view class="mglr20 center f28">USDT
                  <!-- <text v-if="u_percent" style="font-size: 32rpx;">:&nbsp {{t('ss1.s_s4')}}+{{u_percent}}%</text>  -->
               </view>
            </view>

            <view class="noCho">
               <image
                  :src="store.$state.imgObj.choosed"
                  mode="widthFix"
                  style="width: 35rpx; height: 35rpx"
                  v-if="cType == 'usdt'"
               ></image>
            </view>
         </view>

         <view class="choItem" @click="changeChoosed('bank')" :class="cType == 'bank' ? 'choStyle' : 'noStyle'" v-if="showBank">
            <view class="flex">
               <image :src="store.$state.imgObj.bank" mode="widthFix" style="width: 55rpx; height: 55rpx"></image>
               <view class="mglr20 center f28">Bank Card</view>
            </view>
            <view class="noCho">
               <image
                  :src="store.$state.imgObj.choosed"
                  mode="widthFix"
                  style="width: 35rpx; height: 35rpx"
                  v-if="cType == 'bank'"
               ></image>
            </view>
         </view>

         <view
            class="choItem"
            @click="changeChoosed('offline')"
            :class="cType == 'offline' ? 'choStyle' : 'noStyle'"
            v-if="offline"
         >
            <view class="flex">
               <image :src="store.$state.imgObj.bank" mode="widthFix" style="width: 55rpx; height: 55rpx"></image>
               <view class="mglr20 center f28">Bank <text v-if="recharge_fee[4] !=='0'" style="font-size: 32rpx;"> :&nbsp {{t('ss1.s_s4')}} -{{(recharge_fee[4]) * 100}}%</text></view>
            </view>
            <view class="noCho">
               <image
                  :src="store.$state.imgObj.choosed"
                  mode="widthFix"
                  style="width: 35rpx; height: 35rpx"
                  v-if="cType == 'offline'"
               ></image>
            </view>
         </view>

         <view class="choItem" @click="changeChoosed('btc')" :class="cType == 'btc' ? 'choStyle' : 'noStyle'" v-if="showBTC">
            <view class="flex">
               <image
                  src="/static/Chivo.jpg"
                  mode="widthFix"
                  style="width: 55rpx; height: 55rpx; border-radius: 50%"
               ></image>
               <view class="mglr20 center f28">Chivo
                  <!-- <text v-if="recharge_fee[3] !=='0'" style="font-size: 32rpx;"> :&nbsp {{t('ss1.s_s4')}} -{{(recharge_fee[3]) * 100}}%</text> -->
               </view>
            </view>
            <view class="noCho">
               <image
                  :src="store.$state.imgObj.choosed"
                  mode="widthFix"
                  style="width: 35rpx; height: 35rpx"
                  v-if="cType == 'btc'"
               ></image>
            </view>
         </view>
         <!-- btn -->
         <view class="btns" @click="chooseHandle">
            {{ t('all.a_c1') }}
         </view>
         <nut-overlay v-model:visible="showDialog">
            <div class="wrapper">
               <div class="content">
                  <view class="f40">{{ t('wr.r_r12') }}</view>
                  <view class="f30 mt40 pldr30 text_center">
                     Please complete your signature before continuing to recharge.
                  </view>
                  <view class="between">
                     <view :style="{ border: '1rpx solid #ccc' }">{{ t('all.a_c2') }}</view>
                     <view
                        :style="{ background: store.$state.contentColor }"
                        @click="confirmHandle"
                        style="color: #000"
                     >
                        {{ t('all.a_c1') }}
                     </view>
                  </view>
               </div>
            </div>
         </nut-overlay>
      </view>
		<Loading ref="showLoading"></Loading>
   </view>
</template>

<script setup>
import request from '../../../comm/request.ts';
import { userStore } from '@/store/themeNum.js';
// import {
// 	Toast
// } from '@nutui/nutui';
import { onShow, onLoad } from '@dcloudio/uni-app';
const store = userStore();
import { useI18n } from 'vue-i18n';

const {
		t
	} = useI18n();;
const cType = ref('usdt');
const changeChoosed = (type) => {
   cType.value = type;
};

const showUsdt = ref(false);
const showBank = ref(false);
const showBTC = ref(false);
const offline = ref(false);
const hasPaid = ref(0);
const needRedirct = ref(false);
const showSignTemplate = ref(false);
const u_percent = ref()
const recharge_fee = ref({})
const getData = () => {
   request({
      methods: 'get',
      url: 'user/index'
   }).then((res) => {
      if (res.hasPaid == 1 && !res.contract) {
         needRedirct.value = true;
      }
      res.template == 1 ? (showSignTemplate.value = true) : (showSignTemplate.value = false);
   });
   request({
      url: 'setting/financeWay',
      methods: 'get'
   }).then((res) => {
      let { recharge_type } = res;
      recharge_fee.value = res.recharge_fee
      u_percent.value = res.u_percent

      if (recharge_type.includes(1)) {
         showUsdt.value = true;
      }
      if (recharge_type.includes(2)) {
         showBank.value = true;
      }
      if (recharge_type.includes(3)) {
         showBTC.value = true;
      }
      if (recharge_type.includes(4)) {
         offline.value = true;
      }
		showLoading.value.loading = false

      // console.log(res);
   }).catch(()=>{
		showLoading.value.loading = false
   });
};
const back = () => {
   history.back();
};
const confirmHandle = () => {
   uni.navigateTo({
      url: '../sign/signC'
   });
};
const showDialog = ref(false);
const chooseHandle = () => {
   // if (needRedirct.value && showSignTemplate.value) {
   //    showDialog.value = true;
   //    return false;
   // }
   let value = cType.value;
   if (value == 'usdt') {
      uni.navigateTo({
         url: '../recharge/usdtRecharge?u_percent='+u_percent.value
      });
   } else if (value == 'bank') {
      uni.navigateTo({
         url: '../recharge/bankRecharge'
      });
   } else if (value == 'btc') {
      uni.navigateTo({
         url: '../recharge/btcRecharge?u_percent='+recharge_fee.value['3']
      });
   } else if (value == 'offline') {
      uni.navigateTo({
         url: '../recharge/offLineBank?u_percent='+recharge_fee.value['4']
      });
   }
};
const showLoading = ref(null)
   onMounted(() => {
		showLoading.value.loading = true
	})
// 终于可以用了
onShow(() => {
   getData();
});
</script>

<style lang="scss">
   .recharge{
      height: 100vh;
		background: url(../../static/themeNum1/index/loginBack.png);
   }
   .red{
		color: #fff;
	}
   .choStyle{
		object-fit:contain;
		flex-shrink: 0	;	
		background-size: 100% 100% !important;
		background: url(../../static/themeNum1/index/loginBtn.png);
	}
	.noStyle{
		background: #fff;
		color: #000;
      // box-shadow: 0 0 18px 0 #E9E9E9;
	   // border: 0.5px solid #E9E9E9;
	}
.choItem {
   padding: 37rpx 30rpx;
   // background-color: #fff;
   border-radius: 30rpx;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 30rpx;
   // .noCho {
   // 	width: 35rpx;
   // 	height: 35rpx;
   // 	border: 1px solid #AFAFAF;
   // 	border-radius: 10rpx;
   // }
}

.btns {
   margin-top: 173rpx;
   text-align: center;
   line-height: 120rpx;
   color: #000;
   height: 120rpx;
   background: #fff;
   box-shadow: 0px 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
   border-radius: 35rpx;
   font-size: 36rpx;
}
.wrapper {
   display: flex;
   height: 100%;
   justify-content: center;
   padding: 0 50rpx;

   .content {
      margin-top: 400rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 350rpx;
      background: #1d1d1d;
      color: #fff;
      border-radius: 30rpx;
      // justify-content: center;
      padding-top: 50rpx;
      position: relative;
      overflow: hidden;

      .between {
         position: absolute;
         bottom: 0;
         width: calc(100% - 80rpx);
         padding: 0 30rpx 40rpx;

         view {
            width: 48%;
            height: 100rpx;
            color: #fff;
            text-align: center;
            line-height: 100rpx;
            font-size: 30rpx;
            border-radius: 50rpx;
         }
      }
   }
}
</style>
