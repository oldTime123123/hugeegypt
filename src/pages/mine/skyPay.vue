<template>
   <view class="mainContentS">
      <view class="between pt30 pdlr30">
         <image
            src="../../static/themeNum1/icon/bback.png"
            mode="widthFix"
            style="width: 48rpx; height: 36rpx"
            @click="methods.back"
         ></image>
         <view class="f40  " style="color: #fff;" >{{t('ss1.a_a2')}}</view>
         <image
            src="../../static/skypay/record.png"
            mode="widthFix"
            style="width: 40rpx; height: 40rpx"
            @click="goRec"
         ></image>
      </view>
      <view class="pt23 pb50">
         <view class="topMain">
            <!-- <view class="topBox wrap between">
               <view class="topItem" v-for="item in topList">
                  <view class="f20">{{ item.name }}</view>
                  <view class="f32" :style="{ color: store.$state.contentColor }">{{ item.value }}</view>
               </view>
            </view> -->
            <view class="pt23 fundHead">
               <view class="wallet">
                  <view class="walletItem">
							<view class="flex">
								<image src="../../static/themeNum1/my/balance.png" mode="widthFix" style="width: 45rpx; height: 45rpx"></image>
								<text class="ft14" style="margin-left: 4px;">{{ $t('mine.m_t4') }}</text>
							</view>
							<text class="ft20" style="margin-top: 5px;">{{ balance }} {{ currency }}</text>
						</view>
						<view class="walletItem">
							<view class="flex">
								<image src="../../static/themeNum1/my/commission.png" mode="widthFix" style="width: 45rpx; height: 45rpx"></image>
								<text class="ft14" style="margin-left: 4px;">{{ $t('record.r_r8') }}</text>
							</view>
							<text class="ft20" style="margin-top: 5px;">{{ commission }} {{ currency }}</text>
						</view>
               </view>
            </view>
         </view>
         <view class="pdlr35 boxItemBox">
            <view class="balances">
               <view class="boxItem" v-for="(item, index) in boxItem">
                  <view class="f24 secondClo" style="color: #DE3824">
                     {{ item.value ? (item.value / 1).toFixed(2) : 0 }}
                  </view>
                  <view class="title mgtb10 f20">{{ item.name }}</view>
               </view>
            </view>
         </view>
         <view class="pdlr35 mt32">
            <view class="botItem" v-for="(item, index) in botList" @click="botInd = index">
               <view class="title">{{ item.title }}</view>

               <image
                  class="mt20"
                  :src="item.full_poster"
                  style="width: 100%; border-radius: 20rpx"
               ></image>
               <view class="mt20 between">
                  <span>{{t('ss1.a_a3')}}:</span>
                  <span>{{ item.min_num + ' ' + currency }}</span>
               </view>
               <view class="mt20 between">
                  <span>{{t('ss1.a_a4')}}:</span>
                  <span>{{ item.day }} Days</span>
               </view>
               <view class="mt20 between">
                  <span>{{t('ss1.a_a5')}}:</span>
                  <span>{{ item.day_income }} %</span>
               </view>
               <view class="mt20 between">
                  <span>{{t('ss1.a_a6')}}:</span>
                  <span>{{ item.day * item.day_income }} %</span>
               </view>
			   
			 
			   
               <view class="mt20 between">
                  <view class="center">
                     {{t('ss1.a_a7')}}
                     <nut-progress
                        :show-text="false"
                        :is-show-percentage="false"
                        class="ml20 mt10"
                        :percentage="item.progress"
                        style="width: 300rpx"
                     />
                  </view>
                  <span>{{item.progress +' %'}}</span>
               </view>
			   
			  <view class="pdlr40">
				  <view class="btns mt70 center f30  text_bold" @click="goInfo(item.id)">
				     {{t('ss1.a_a8')}}
				  </view>
			  </view>
            </view>
         </view>
      </view>
		<Loading ref="showLoading"></Loading>
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

const boxItem = ref([{
      name: t('ss1.a_a1'),
      value: 0,
   },
   {
      name: t('mine.m_s3'),
      value: 0,
   },
   {
      name: t('mine.m_s5'),
      value: 0,
   }
]);

// const topList = ref([
//    {
//       name: t('wr.w_a2'),
//       value: 0
//    },
//    {
//       name: t('mine.m_s3'),
//       value: 0.0
//    },
//    {
//       name: t('mine.m_s4'),
//       value: 0
//    },
//    {
//       name: t('mine.m_s5'),
//       value: 0
//    }
// ]);
const goRec = () => {
   uni.navigateTo({
      url: '../record/skyPayRecord'
   });
};
const botList = ref([]);
const inputNum = ref('');
const botInd = ref(0);
const choStyle = {
   background: store.$state.contentColor,
   color: '#fff'
};

const noStyle = {
   background: '#fff',
   color: store.$state.contentColor,
   'box-shadow': 'none'
};
const balance = ref('')
const commission = ref('')
const getData = () => {
   request({
      url: 'lixibao/index',
      methods: 'get'
   }).then((res) => {
      balance.value = res.balance;
      commission.value = res.profit_balance;
      boxItem.value[0].value =  res.lixibao_balance;
      boxItem.value[1].value = res.lixibao_shouru;
      boxItem.value[2].value = res.lixibao_shouru_yuji;
      // console.log(res);
      botList.value = res.lixibaos;
      showLoading.value.loading = false
   }).catch(()=>{
      showLoading.value.loading = false
   });
};

const methods = {
   back() {
      history.back()
   //   uni.switchTab({
   //   	url:'../tabbar/task'
   //   })
   },
   changePage() {
      uni.navigateTo({
         url: '../record/skyPayRecord'
      });
   },
};

const goInfo = (id)=>{
	uni.navigateTo({
		url:'./skyPayInfo?id='+id
	})
}
const confirmHandle = () => {
   const data = {
      id: botList.value[botInd.value].id,
      amount: inputNum.value
   };
   request({
      url: 'lixibao/invest',
      methods: 'post',
      data: data
   })
      .then((res) => {
         getData();
         inputNum.value = '';
         Toast.text(t('mine.m_s14'));
      })
      .catch((err) => {
         Toast.text(err.message);
      });
};
const buHandleMask = ref(false);
const currency = ref('');
const showLoading = ref(null)
   onMounted(() => {
		showLoading.value.loading = true
	})
// 终于可以用了
onShow(() => {
   getData();
   currency.value = uni.getStorageSync('currency');
});
</script>

<style lang="scss">
   .f24{
		font-size: 14px;
	}
	.ft20{
		font-size: 20px;
	}
	.ft14{
		font-size: 14px;
	}
.mainContentS {
   background-position: top;
   // background-color: #DE3824;
   background: url(../../static/themeNum1/index/loginBack.png);
   width: 100vw;
   overflow: hidden;
   .fundHead{
      width: 90%;
      height: 100%;
      position: relative;
      margin-left: 5%;
      background: url('../../static/skypay/fundHead.png') no-repeat 100%/100%;

      .wallet{
         width: 100%;
         height: 110px;
         display: flex;
         position: absolute;
         z-index: 99;
         top: 40px;
         .walletItem{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 110px;
            color: #fff;
            .flex{
               display: flex;
               align-items: center;
            }
         }
      }
   }
   .boxItemBox {
         padding: 0.90625rem 1.09375rem;
			color: #000;
         box-sizing: border-box;
         .balances{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            background: #fff;
            border-radius: 0.625rem;
            padding: 0.625rem;
            box-sizing: border-box;
         }
			.title {
				color: #000;
				// width: 90%;
				text-align: center;
				height: 50rpx;
				display: flex;
				align-items: center;

				justify-content: center;
			}

			.boxItem {
				display: flex;
				align-items: center;
				flex-direction: column;
				// width: 48%;
			}
		}
   .topMain {
      height: 300rpx;
      position: relative;
      // background: url('../../static/skypay/redHead.png') no-repeat 100%/100%;
      // margin-bottom: 30rpx;
   }
   .topBox {
      position: absolute;
      width: 80%;
      height: 200rpx;
      right: -60rpx;
      background: linear-gradient(0deg, #e67f74 0%, #DE3824 100%);
      box-shadow: 0px 5rpx 23rpx 4rpx rgba(0, 0, 0, 0.46);
      border-radius: 20rpx;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 30rpx 0;
      .topItem {
         width: 100%;
         border-radius: 20rpx;
         height: 100rpx;
         text-align: center;
         view:nth-child(1) {
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
         }
      }
   }
}
.btns {
   height: 98rpx;
   line-height: 98rpx;
   background: linear-gradient(to right, #e67f74 50%, #DE3824 100%);
   border-radius: 39rpx;
   color: #fff;
}
.botItem {
   margin-bottom: 20rpx;
   width: calc(100% - 40rpx);
   background-color: #fff;
   border-radius: 20rpx;
   font-size: 30rpx;
   padding: 20rpx;
   color: #000;
   .title {
      position: relative;
      padding-left: 5px;
   }
   .title::before {
      position: absolute;
      display: block;
      content: '';
      height: 90%;
      width: 12rpx;
      background: linear-gradient(to right, #e67f74 50%, #DE3824 100%);
      border-radius: 6rpx;
      left: -20rpx;
   }
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
      background: #fff;
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
::v-deep .nut-progress .nut-progress-outer .nut-progress-inner {
   background: linear-gradient(135deg, #e67f74 0%, #DE3824 100%);
}
::v-deep .nut-progress .nut-progress-outer{
   background-color: #000;
}
</style>
