<template>
   <view style="padding-bottom: 150rpx" class="pdlr37 pt53">
      <view class="flex between">
         <image
            :src="store.$state.imgObj.backIcon"
            mode="widthFix"
            style="width: 48rpx; height: 36rpx"
            @click="back"
         ></image>
         <view class="f50 text_bold mglr17" :style="{ color: store.$state.thirdColor }">{{t('ss1.s_s3')}}</view>
         <view style="width: 50rpx"></view>
      </view>
      <view class="f50 mt30 text_bold mglr17"></view>
      <view class=" " style="position: relative">
         <image src="/static/sign/contract.jpg" mode="widthFix" style="width: 100%"></image>

         <view class="signImg" :style="{ right: '150rpx', bottom: '50rpx' }">
            <image :src="signUrl" style="width: 100rpx; height: 100%"></image>
         </view>
      </view>

      <view class="pdlr30" v-if="!hasC">
         <view class="mt30">
            <view
               @click="jumpPage('../sign/signPan')"
               class="center l_inpS mt40 l_inpBg pdlr30 text_white f32"
               style="margin-top: 34rpx"
               :style="{ background: store.$state.contentColor }"
            >
               {{t('ss1.s_s2')}}
            </view>
         </view>
      </view>
   </view>
</template>

<script setup>
import request from '../../../comm/request.ts';
import { userStore } from '@/store/themeNum.js';
import {
	Toast
} from '@nutui/nutui';
import { onShow, onLoad } from '@dcloudio/uni-app';
const store = userStore();

import { useI18n } from 'vue-i18n';

const {
		t
	} = useI18n();;

const back = () => {
  uni.reLaunch({
  	url:'../tabbar/my'
  })
};

const jumpPage = (url) => {
	
	if(vipInfo.value.sign == 1){
		uni.navigateTo({
		   url
		});
	}else{
		Toast.text(t('ss1.s_s1'),{
			duration:'6000'
		})
	}
   
};
// 终于可以用了
const imgUrl = ref('');

onShow((e) => {
   getData();
});

const hasC = ref(true); //是否签名
const isReverse = ref(false);
const id = ref('');
const contractImg = ref('');
const signUrl = ref('');
const vipInfo = ref({})
const getData = (id) => {
   request({
      methods: 'get',
      url: 'user/index'
   }).then((res) => {
      hasC.value = res.contract ? true : false;
	  vipInfo.value = res.vip
      if (hasC.value) {
         signUrl.value = res.full_contract;
      }
   });
};
</script>

<style lang="scss">
.l_inpS {
   border-radius: 55rpx;
   height: 100rpx;
}

.l_inpS:nth-child(2) {
   border: 1rpx solid #7fc3dc;
}

.signImg {
   // background-color: #7fc3dc;
   position: absolute;

   z-index: 99;
   height: 100rpx;
   
  
   // transform: ;
   // transform: rotate(-90deg);
}
</style>
