<template>
  <div class="container">
  	<span class="back-icon" @click="back"><</span>
  	<img src="@/assets/images/how.jpg" class="icon-container">
  	<div class="input-container">
	  	<md-field>
	      <label>Your phone</label>
	      <md-input v-model="phonenumber"></md-input>
	    </md-field>
    	<md-field>
	      <label>Password</label>
	      <md-input v-model="password" type="password"></md-input>
	      <span class="md-helper-text">at least eight</span>
	    </md-field>
	    <md-field>
	      <label>Confirm Password</label>
	      <md-input v-model="confirm" type="password"></md-input>
	    </md-field>
	    <md-field>
	      <label>Verification code</label>
	      <md-input v-model="code"></md-input>
	      <span class="md-helper-text">check your phone</span>
	    </md-field>
	     <!--<md-button class="getcode">Primary</md-button>-->
	     <button class="getcode" @click="getCode">{{content}}</button>
  	</div>
	<div class="button-login">
		<md-button class="md-primary button-login2" @click="Register">Sign up</md-button>
	</div>
	<md-dialog-alert
      :md-active.sync="first2"
      :md-content="wrongMsg"
      md-confirm-text="get!"
      />
	<md-dialog-alert
      :md-active.sync="second2"
      md-content="Registered successfully"
      md-confirm-text=""/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
    	phonenumber:'',
    	password:'',
    	confirm:'',
    	code:'',
    	first2:false,
    	second2:false,
    	content:'发送验证码',
    	totalTime:5,
    	canClick:true,
    	wrongMsg:'Something wrong'
    }
  },
  methods:{
  	Register() {
  		//测试
		/*var par = {
			phoneNum:this.phonenumber,
			userName:this.phonenumber,
			userPwd:this.password,
			};
		axios.get('/users/adduser',{params:par}).then((response)=>{
			var res = response.data;
			if(res.status == '0'){
				console.log(res.result);
			}else{
				console.log(res.msg);
			}
		});*/

	 	if(this.phonenumber != '' && this.password != ''|| this.confirm != '' || this.code != '' ){
	 		//console.log('565');
	 		if (this.phonenumber.length >= 3 && this.password == this.confirm){
	 			//验证手机短信验证码是否正确
 			    let config = {
	                headers:{
	                	'X-Bmob-Application-Id': 'c6df199bdc19ff4ab05d20d5a8c9e9eb',
						'X-Bmob-REST-API-Key': 'e6471431bc68976ccea467b4cf1ac101',
						'Content-Type': 'application/json'
	                }
	            };
		        var parama = {
		        	'mobilePhoneNumber':this.phonenumber,
		        }
		  		axios.post('https://api2.bmob.cn/1/verifySmsCode/'+this.code,parama,config).then((response)=>{
	  				if(response.status == 200){
	  					console.log(response.data.msg);
	  					//发送后端保存用户
  						var par = {
							phoneNum:this.phonenumber,
							userName:this.phonenumber,
							userPwd:this.password,
							};
						axios.get('/users/adduser',{params:par}).then((response)=>{
							var res = response.data;
							if(res.status == '0'){
								console.log(res.result);
							}else if (res.status == '2') {
								this.wrongMsg == '用户已存在',
								this.first2 = true;
								return;
							}else{
								this.first2 = true;
								return;
							}
						});
				  		this.second2 = true;
			 			setTimeout(()=>{
			 				this.second2 = false;
			 			},1000);
			 			this.$router.push({path:'/'});
	  				}else{
	  					this.wrongMsg = 'Something wrong';
	  					this.first2 = true;
	  				}
	  				//console.log(response);
		  		}).catch((err)=>{
		  			this.wrongMsg = 'Something wrong';
		  			this.first2 = true;
		  			return;
		  		});
	 		}else{
	 			this.wrongMsg = 'Something wrong';
	 			this.first2 = true;
	 		}
	 	}else{
 			this.first2 = true;
	 	}
	 	this.code = '';
  	},
  	back() {
  		this.$router.go(-1);
  	},
  	getCode() {
  		if(!this.canClick)return;
  		if(this.phonenumber == ''){
 			this.wrongMsg = 'please enter your phone number';
 			this.first2 = true;
  			return;
  		}else if(this.phonenumber!= 11){
 			this.wrongMsg = 'please enter 11-bit phone number';
 			this.first2 = true;
  			return;
  		};
  		var param = {
  			phoneNum:this.phonenumber
  		};
  		var that = this;
  		axios.get('/users/register',{
				params:param
			}).then((response)=>{
				var res = response.data;
				if(res.status == '0'&& res.result.count > 0){
					that.wrongMsg = '用户已存在';
					that.first2 = true;
					return;
				}else if(res.status == '0'&& res.result.count == 0) {
					//console.log('没有注册过');
					//请求验证码
			  		let config = {
			                headers:{
			                	'X-Bmob-Application-Id': 'c6df199bdc19ff4ab05d20d5a8c9e9eb',
								'X-Bmob-REST-API-Key': 'e6471431bc68976ccea467b4cf1ac101',
								'Content-Type': 'application/json'
			                }
			            };
			        var parama = {
			        	'mobilePhoneNumber':this.phonenumber,
			        	"template":'Yun'
			        }
			  		axios.post('https://api2.bmob.cn/1/requestSmsCode',parama,config).then((response)=>{
			  				console.log(response);
			  		}).catch((err)=>{
			  			console.log(err);
			  			return;
			  		});
			  		this.canClick = false;
			  		this.content = this.totalTime + 's后重新发送';
			  		let clock = window.setInterval(()=>{
			  			this.totalTime--;
			  			this.content = this.totalTime+'s后重新发送';
			  			if(this.totalTime < 1){
			  				window.clearInterval(clock);
			  				this.totalTime = 5;
			  				this.content = "重新发送";
			  				this.canClick = true;
			  			};
			  		},1000)
				}else{
					that.first2 = true;
					return
					//console.log(res.msg);
				}
			})
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
.icon-container {
	position: relative;
	top: 4.28rem;
	left: 0;
	height: 100px;
}
.md-field {
	border-bottom: 1px solid grey;
	width: 80%;
}
.input-container {
	position: relative;
	top: 16%;
	left: 10%;
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
.back-icon {
	position: fixed;
	top: 20px;
	left: 20px;
	height: 30px;
	width: 30px;
	font-size: 30px;
	display: block;
	text-align: center;
	line-height: 30px;
	font-weight: 600;
}
.getcode {
	position: absolute;
	bottom:0;
	right: 18%;
	color:#fff;
	width:100px;
	height: 40px;
	background-color: #666;
	border:none;
	color:#FFF;
	border-radius: 3px;
}
</style>
