import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//定义状态
	state:{
		isLogin:'',
		userid:'',
		myId:'',
		username:'',
		//resolve:'',
		messageList:[],
	},
	mutations:{
		isLogin(state,msg){
			state.isLogin = msg;
			state.userid = msg.list[0].phoneNum;
			state.myId = msg.list[0]._id;
			state.username = msg.list[0].userName;
			localStorage.setItem("isLogin",JSON.stringify(msg));
		},
		/*resolveMsg(state,msg){
			state.resolve = msg;
		},*/
		saveMsg(state,msg){
			state.messageList.push(msg);
		},
		getMsg(state,msg) {
			state.messageList = msg;
		}
	}
});

export default store;