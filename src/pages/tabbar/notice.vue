<template>
   <view class="notice">
      <view class="nav">
         <view class="flex between margin">
            <image src="../../static/themeNum1/icon/bback.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
               @click="methods.back"></image>
         </view>
         <view class="task_navigation"> 
            {{t('add1.a_d2')}}
         </view>
         <view></view>
      </view>
      <view>
         <view class="pdlr30 pt23">
            <!-- <view class="f50 text_bold text_center" :style="{ color: store.$state.thirdColor }">{{ t('add1.a_d2') }}</view> -->

            <view class="main" v-for="item of recordsList" @click="readHandle(item)">
               <image class="img" :src="item.full_cover"></image>
               <view class="redDor" v-if="item.read_status == 0"></view>
               <view class="name_text">
                  <view class="text_m">
                     {{ item.name }}
                  </view>
                  <view class="">
                     <nut-icon name="rect-right"></nut-icon>
                  </view>
               </view>
            </view>
         </view>
      
      <view class="entrance" @click="methods.link" v-if="prizePackage"> 
         <image style="width: 100%; height: 100%;" src='../../static/actIcon/redElove/hList.png'></image>
      </view>
      <!-- <view class="flex_col center rightIcon">
            <image class=" " src="/static/actIcon/lotteryIcon.png" mode="widthFix" 
            style="width: 100rpx;height: 100rpx;" @click="methods.letty">
         </image>
      </view> -->
      <view class="flex_col center rightIcon" v-if="lottery">
               <image class=" " src="/static/actIcon/Mask.png" mode="widthFix" 
               style="width: 160rpx;height: 160rpx;" @click="methods.letty">
            </image>
      </view>

      </view>
   </view>
   
</template>

<script setup>
// import Tabbar from '@/components/botTabbar/botTabbar.vue'
import request from '../../../comm/request.ts';
import { userStore } from '@/store/themeNum.js';
import { Toast } from '@nutui/nutui';
import { onShow, onLoad } from '@dcloudio/uni-app';
const store = userStore();

import { useI18n } from 'vue-i18n';

const {
		t
	} = useI18n();;
const methods = {
   back() {
      history.back();
   },
   link(){
	   uni.navigateTo({
	   	url: '../mine/redEnvelope'
	   })
   },
   letty(){
	   uni.navigateTo({
	   	url: '../linkEgg/Marquee'
	   })
   }
};
const recordsList = ref([]);
const paging = ref(null);
const pages = ref({
   page: 1,
   size: 10
});

const lottery = ref(false)
const prizePackage = ref(false)
const getData = () => {
	request({
		url:"activity/status",
		methods: 'get',
	}).then(res=>{
		lottery.value = res.lottery.status == 1 ? true : false
		prizePackage.value = res.prizePackage.status == 1 ? true : false
	})
	
   request({
      url: 'page/article/lists',
      methods: 'get',
      data: {
         pos: '4'
      }
   }).then((res) => {
      recordsList.value = res;
      // console.log(res,'dddd')
      // paging.value.complete(res.data);
      // pages.value.page += 1
   });
};
const readHandle = (item) => {
   uni.navigateTo({
      url: '../mine/article?id=' + item.id
   });
   // 状态：0.未读 1.已读
   // if (item.status !== 0) {
   // 	return false
   // }

   // request({
   // 	url: 'user/read',
   // 	methods: 'post',
   // 	data: {
   // 		id: item.id
   // 	}
   // }).then(res => {
   // 	Toast.text('success')
   // 	recordsList.value = []
   // 	pages.value.page = 1
   // 	getData()
   // }).catch(err => {
   // 	Toast.text(err.message)
   // })
};

// 终于可以用了
onLoad(() => {
   getData();
});
onShow(() => {
   getData();
   
});
</script>

<style>
::v-deep .uni-tabbar__reddot {
   right: 12px !important;
}
</style>

<style lang="scss" scoped>
   .notice{
      min-height: 100vh;
      background: url(../../static/themeNum1/index/loginBack.png);

   }
   .nav {
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 32rpx 32rpx 0 32rpx;
	}
	.nav .task_navigation {
		font-size: 36rpx;
		color: #fff;
	}
	.rightIcon {
		position: fixed;
		right: 0rpx;
		top: 700rpx;
	}
	.entrance{
		position: fixed;
		width: 70px;
		height: 80px;
		top: 300rpx;
		right: 0rpx;
	}
page {
   font-family: PingFangSC;
}

.main {
   position: relative;
   margin: 40px 0px;
   color: #fff;
   background-color: rgb(29, 29, 29);
   border-radius: 10px;
   .redDor {
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      width: 20rpx;
      height: 20rpx;
      background: red;
      border-radius: 50%;
   }
   .name_text {
      padding: 8px 8px;
      display: flex;
      width: 100%;
      // justify-content: space-between;
      .text_m {
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         width: 90%;
      }
   }
   .img {
      width: 100%;
      height: 120px;

      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
   }
}

.listItem {
   background: #1d1d1d;
   border-radius: 20rpx;
   padding: 34rpx 45rpx;
   margin-bottom: 25rpx;
   font-size: 28rpx;
   display: flex;
   color: #fff;
}
</style>
