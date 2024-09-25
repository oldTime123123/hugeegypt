<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="pdlr35 pt53">
		   <view class="nav">
					<view class="flex between margin">
						<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
							@click="methods.back"></image>
					</view>
					<view class="f50 mt60 text_bold" :style="{color:store.$state.thirdColor}">{{t('add2.a_a2')}}</view>
					
					<view class="task_navigation" style=''> 
						
					</view>
			</view>
   <!-- 登录失效 -->
   
		   <view class=" pt33">
			  <z-paging
				 class=""
				 ref="paging"
				 v-model="recordsList"
				 @query="getData"
				 width="100%"
				 :fixed="false"
				 :use-page-scroll="true"
				 :refresher-enabled="false"
				 :to-bottom-loading-more-enabled="true"
				 :auto-show-back-to-top="true"
				 :safe-area-inset-bottom="true"
				 :empty-view-text="t('record.r_r1')"
				 :loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')" :loading-more-default-text="t('rec.r_r2')"
				 :loading-more-loading-text="t('record.r_r3')" :loading-more-fail-text="t('record.r_r4')" 
			  >
				 <view class="noticeItem" v-for="(item, index) in recordsList" :key="index" @click="readHandle(item)">
					<view class="redDor" v-if="item.status ==0"></view>
					<view class="mglr32 f24">
					   <view class="textHiddenOne" style=" width: 500rpx">
						  {{ item.template ? item.template.title : '' }}
					   </view>

					   <view class="mgtb5 " style="color: #afafaf">
						  {{ item.template ? item.template.content : '' }}
					   </view>

					   <view class="" style="color: #afafaf">{{ item.createTime }}</view>
					</view>
				 </view>
			  </z-paging>
		   </view>
		</view>
   </view>
   
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import request from '../../../comm/request.ts';
const { proxy } = getCurrentInstance();
import { useI18n } from 'vue-i18n';
import {
	userStore
} from "@/store/themeNum.js";

const store = userStore();
const { t } = useI18n();
const recordsList = ref([]);
const paging = ref(null);
const pages = ref({
   page: 1,
   size: 10
});
const getData = (page) => {
	pages.value.page = page
   request({
      url: 'user/record/message',
      methods: 'get',
      data: pages.value
   }).then((res) => {
      paging.value.complete(res.data);
      pages.value.page += 1;
   });
};
const methods = {
		back() {
			history.back()
		},
	};
const readHandle = (item) => {
   // 状态：0.未读 1.已读
   if (item.status !== 0) {
      return false;
   }
   request({
      url: 'user/read',
      methods: 'post',
      data: {
         id: item.id
      }
   })
      .then((res) => {
         recordsList.value = [];
         pages.value.page = 1;
         getData(1);
      })
      .catch((err) => {
		  uni.showLoading({
		  	icon:'none',
			title:err.message
		  })
      });
};

onMounted(() => {});
</script>

<style lang="scss">
	.redDor{
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background-color: red;
		border-radius: 50%;
		right: 15rpx;
		top: 15rpx;
	}
.noticeItem {
   background: #fff;
   border-radius: 10rpx;
   padding: 12rpx 12upx;
   margin-top: 28upx;
	position: relative;
   .item-head {
      .head-main {
         .main-title {
         }
      }
   }
}
</style>
