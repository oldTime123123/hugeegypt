/*
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-09 14:31:35
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-25 17:51:40
 * @FilePath: \dandelion6 - 副本\setting.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import themeNum1 from './color/themeNum1.js';
import {
	userStore
} from "@/store/themeNum.js";
const store = userStore();

const dev = 1
let COUNTRY = {}

const countryList = [
	{
		url: 'task678.com',
		themeNum: 1,
		qianzhui: 'ads.',
		lang: "en",
		icon: "/static/logo1.png",
		title: ""
	},
	{
		url: 'hugeegypt.com',
		themeNum: 1,
		qianzhui: 'api.',
		lang: "en",
		icon: "/static/logo1.jpg",
		title: "AdsWorld"
	}
]
countryList.forEach((item, index) => {
	if (index == dev) {
		COUNTRY = item
	}
})


if (COUNTRY.themeNum == 1) {
	store.setContentColor(themeNum1.contentColor)
	store.setSecondColor(themeNum1.secondColor)
	store.setImgObj(themeNum1.imgObj)
	store.setMy(themeNum1.my)
	store.setWr(themeNum1.wr)
	store.setTask(themeNum1.task)
}
COUNTRY.HOST = `https://${COUNTRY.qianzhui}${COUNTRY.url}` + '/api/'

export default COUNTRY