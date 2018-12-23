import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//定义状态
	state:{
		isLogin:'',
		userid:''
	},
	mutations:{
		isLogin(state,msg){
			state.isLogin = msg;
			state.userid = msg.list[0].phoneNum;
			localStorage.setItem("isLogin",JSON.stringify(msg));
		}
	}
});

export default store;