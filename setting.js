import themeNum1 from './color/themeNum1.js';
import {
	userStore
} from "@/store/themeNum.js";
const store = userStore();

const dev = 2
let COUNTRY = {}

const countryList = [{
		url: 'grab.huanqiubaowang.com',
		themeNum: 1,
		lang: "en",
	},
	{
		url: 'api.u-savdo.com',
		themeNum: 1,
		lang: "en",
		title: "",
		icon: "/static/logo.jpg"
	}, {
		url: 'grab.task678.com',
		themeNum: 1,
		lang: "en",
	},

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
COUNTRY.HOST = `https://${COUNTRY.url}` + '/api/'
export default COUNTRY