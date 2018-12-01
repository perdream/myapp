import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//定义状态
	state:{
		isLogin:''
	},
	mutations:{
		isLogin(state,msg){
			state.isLogin = msg;
			localStorage.setItem("isLogin",msg);
		}
	}
});

export default store;