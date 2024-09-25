<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-11 14:28:35
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-24 16:19:05
 * @FilePath: \dandelion6 - 副本\src\pages\mine\components\payDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view style="height: 80vh;position: relative;overflow-y: hidden;">
        <view class="flex mt40" v-if="!time.start">
            <view class="sel btns" @click="popShow">
                {{t('mine.m_a2')}}
                <image class="mglr17" :src="store.$state.imgObj.down" mode="widthFix"
                    style="width: 21rpx; height: 13rpx;"></image>
            </view>
            <view class="sea btns mglr22" @click="searchHandle">
                <image class="mr17" :src="store.$state.imgObj.search" mode="widthFix"
                    style="width: 31rpx; height: 30rpx;"></image>
                {{t('mine.m_a3')}}
            </view>
        </view>
        <view class="flex  mt40" v-else>
            <view class="sel btns col_center">
                {{time.start +'--'+ time.end}}

                <view class="mglr17" @click="clearHandle">
                    <nut-icon name="close" size="14"></nut-icon>
                </view>
            </view>

            <view class="sea btns mglr22" @click="searchHandle">
                <image class="mr17" :src="store.$state.imgObj.search" mode="widthFix"
                    style="width: 31rpx; height: 30rpx;"></image>
                {{t('mine.m_a3')}}
            </view>
        </view>
        <view class="mt58 between f28"
            style="background-color: #fff;border-radius: 20rpx;	overflow: hidden;height: 90rpx;">
            <view v-for="(item,index) in staList" class="staItem" :style="staInd == index?choStyle:''"
                @click="tabsChange(index,item.status)" style="padding: 0 20rpx;border-radius: 20rpx;">
                {{item.name}}
            </view>
        </view>
        <z-paging class="mt54 " ref="paging" v-model="botList" @query="getData" :refresher-enabled="false"
            :to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
            :empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
            :empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
            :loading-more-fail-text="t('record.r_r3')" style="width: 100%;  " :auto="false">

            <view class="flex recordItem col_center between" v-for="item in botList">
                <view class="flex col_center" style="flex: 1;">
                    <view>
                        <image :src="store.$state.imgObj.rUp" style="width: 85rpx;height: 85rpx;"
                            v-if="item.change_type ==1"></image>
                        <image :src="store.$state.imgObj.rDown" style="width: 85rpx;height: 85rpx;" v-else>
                        </image>
                    </view>
                    <view class="mglr28">
                        <view class="f26 ">{{item.change_reason}}</view>
                        <view class="mt20 f20" style="color: #000;">{{item.createTime}}</view>
                    </view>
                </view>
                <view class="f24" :style="{color:store.$state.contentColor}" v-if="item.change_type==1"
                    style="text-align:right">
                    +{{item.amount}}
                </view>
                <view class="f24" :style="{color:store.$state.secondColor}" v-else
                    style="text-align:right">
                    -{{item.amount}}
                </view>
                <view>
                </view>

            </view>

        </z-paging>
		<!-- 日历 -->
		<nut-calendar v-model:visible="isVisible" type="range" @choose="setChooseValue" style="position: absolute;"></nut-calendar>
    </view>
  
</template>


<script setup>
	import request from '../../../../comm/request';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Locale
	} from '@nutui/nutui';
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		useI18n
	} from "vue-i18n";
	import { defineProps } from 'vue';

	const {
		t
	} = useI18n();
	const store = userStore();
	const tab1value = ref(1)
	const hasMore = ref(true)
	const choStyle = {
		background: "#DE3824",
		color: '#fff',
		height: '100%',

	}
	const staList = [
		{
			name:t('mine.m_a4'),
			status:0
		},
		{
			name:t('mine.m_a6'),
			status:2
		},
		{
			name:t('mine.m_a5'),
			status:1
		},
	]
	const staInd = ref(0)

	const isVisible = ref(false)

	const closeSwitch = param => {
		isVisible.value = false;
	};

	const time = ref({
		start: "",
		end: ""
	})

	const popShow = ()=>{
		isVisible.value = true;
	}
	const setChooseValue = param => {
		time.value.start = param[0][3]
		time.value.end = param[1][3]
	};

	const searchHandle = () => {
		time.value.start ? pages.value.start = time.value.start : undefined;
		time.value.end ? pages.value.end = time.value.end : undefined;
		paging.value.clean() //清空数组
		getData(1)
	}

	const clearHandle = () => {
		let tempObj = {
			page: 1,
			size: 10,
			type: 0,
			balance_type: Number(propsA.tabs)+1
		}
		time.value = {}
		paging.value.clean() //清空数组
		pages.value = tempObj
		getData(1)
	}

	const tabsChange = (ind,status) => {
		staInd.value = ind;
		pages.value.type = status;
		paging.value.clean() //清空数组
		getData(1)
	}
	const botList = ref([])
	const methods = {
		back() {
			history.back()
		},
	};
	const pages = ref({
		page: 1,
		size: 10,
		balance_type: Number(propsA.tabs)+1
	})

	const paging = ref(null)

	const getData = (page) => {
		
		pages.value.page = page?page:1
		request({
			url: 'user/record/balance',
			methods: 'get',
			data: pages.value
		}).then(res => {
            // paging.value.complete([]);
            paging.value.complete(res.data);
			pages.value.page += 1;
			propsA.showLoading.loading = false
		}).catch(()=>{
		})
	}
	const propsA = defineProps(['tabs','showLoading']);
	// 监听
	watch(propsA, (newVal, oldVal) => {
		isVisible.value = false;
		pages.value.balance_type = Number(newVal.tabs)+1;
		getData()
	}, {
		deep: true,
		immediate: true
	})
	// 终于可以用了
	onShow((e) => {
		Locale.use('en-US', enUS);
	})
</script>

<style lang="scss" scoped>
    ::v-deep .z-paging-content{
        position: absolute !important;
        z-index: 999;
        top: 125px !important;
    }
	.btns {
		// width: 220rpx;
		height: 80rpx;
		border-radius: 40rpx;
		color: #fff;
		font-size: 26rpx;
		padding: 0 30rpx;
		min-width: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sea {
		background: #F5B04C;
		box-shadow: 0rpx 1rpx 31rpx 0rpx rgba(232, 158, 52, 0.57);
	}

	.sel {
		background: #3477E0;
		box-shadow: 0rpx 1rpx 31rpx 0rpx rgba(76, 136, 230, 0.38);
	}

	.staItem {
		width: 33%;
		text-align: center;
		color: #999999;
		// padding: 27rpx 0;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.recordItem {
		background-color: #fff;
		border-radius: 30rpx;
		padding: 20rpx 39rpx;
		width: 100%;
		margin: 30rpx auto;
		color: #000;
        box-sizing: border-box;
		box-shadow: 0 0 18px 0 #E9E9E9;
		border: 0.5px solid #E9E9E9;
	}

	.scrollable {
		height: 65vh;
		overflow: scroll;
	}

	.line {
		width: 44rpx;
		height: 2rpx;
		background-color: #999999;
	}
</style>