<template>
	<div class="container">
		<img src="./../assets/images/how.jpg" class="icon-container">
		<div class="text-container">
			<h2 class="z-depth-5">Ask questions<br/>solve doubts</h2>
		</div>
		<div class="input-container">
			<md-field md-clearable>
		      <label>Phone toggle</label>
		      <md-input v-model="initial"></md-input>
		    </md-field>
		    <md-field>
		      <label>Password toggle</label>
		      <md-input v-model="password" type="password"></md-input>
		    </md-field>
		</div>
		<div class="button-login">
			<md-button class="md-primary button-login2" @click="login">Sign in</md-button>
		</div>
		<div class="register-forget">
			<span class="text-left" @click="goRegister">
				立即注册
			</span>
			<span class="text-right">
				忘记密码?
			</span>
		</div>
		<md-dialog-alert
	      :md-active.sync="first"
	      md-content="Your post has been deleted!"
	      md-confirm-text="get!"/>
	    <md-dialog-alert
	      :md-active.sync="second"
	      md-content="Something wrong"
	      md-confirm-text="get!"/>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name:'Login',
	data() {
		return {
			initial:'',
			password:'',
			first:false,
			second:false,
		}
	},
	components:{

	},
	methods:{
		login(){
			if(this.initial==''||this.password==''){
				this.first=true;
				return
			}
			var param = {
				phoneNum: this.initial,
				userPwd: this.password
			}
			var that = this
			//请求后端，验证用户phone和password
			axios.get('/users',{
				params:param
			}).then((response)=>{
				var res = response.data;
				if(res.status == '0'&& res.result.count > 0){
					//console.log(JSON.stringify(res.result));
					this.$store.commit('isLogin',res.result);
					this.$router.push({path:'/mainpage'});
					//console.log(localStorage.getItem('isLogin'));
				}else{
					that.second = true;
					return
					//console.log(res.msg);
				}
			})
		},
		goRegister() {
			this.$router.push({path:'/register'});
		}
	}
}
</script>
<style scoped>
.container {
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    bottom: 0;
    text-align: center;                                              
}

.input-container {
	position: relative;
	top: 25%;
	left: 10%;
}
.md-field {
	border-bottom: 1px solid grey;
	width: 80%;
}
.icon-container {
	position: relative;
	top: 4.28rem;
	left: 0;
	height: 100px;
}
.text-container {
	position: relative;
	top: 16%;
	left: 10%;
	height: 60px;
	width: 80%;
	text-align: center;
	line-height: 40px;
}
.register-forget {
	position: relative;
	top: 24%;
	left: 10%;
	height: 25px;
	width: 80%;
	line-height: 25px;
}
.text-left {
	float: left;
	margin-left: 10px;
}
.text-right {
	float: right;
	margin-right: 10px;
}
.z-depth-5 {
	box-shadow:0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.3);
}
.button-login {
	position: relative;
	top: 23%;
	left: 10%;
	height: 40px;
	width: 80%;
}
.button-login2 {
	height: 100%;
	width: 100%;
	margin:auto;
	background-color: #383835;
	color: #fff;
}
.md-dialog {
	background-color: #fff;
	color: black;
}

.md-button-content  {
	color: white;
}

</style>