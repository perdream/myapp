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
		clientTalkId:'',
		avatar:'',
	},
	mutations:{
		isLogin(state,msg){
			state.isLogin = msg;
			state.userid = msg.list[0].phoneNum;
			state.myId = msg.list[0]._id;
			state.username = msg.list[0].userName;
			state.avatar = msg.list[0].avatar;
			localStorage.setItem("isLogin",JSON.stringify(msg));
		},
		/*resolveMsg(state,msg){
			state.resolve = msg;
		},*/
		saveMsg2(state,msg){
			if(state.clientTalkId == msg.from){
				state.messageList.push(msg);
			}
		},
		//修改头像
		updataAvatar(state,data) {
			state.avatar = data
		},
		saveClientId(state,id){
			state.clientTalkId = id;
		},
		getMsg(state,msg) {
			state.messageList = msg;
		},
	}
});

export default store;