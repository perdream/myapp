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
	      <label>New Password</label>
	      <md-input v-model="password" type="password"></md-input>
	      <span class="md-helper-text">at least eight</span>
	    </md-field>
 	    <md-field>
	      <label>Verification code</label>
	      <md-input v-model="code"></md-input>
	      <span class="md-helper-text">check your phone</span>
	    </md-field>
	     <button class="getcode" @click="getCode">{{content}}</button>
  	</div>
	<div class="button-login">
		<md-button class="md-primary button-login2" @click="commitRe">确认修改</md-button>
	</div>
	<md-dialog-alert
      :md-active.sync="first2"
      :md-content="wrongMsg"
      md-confirm-text="get!"
      />
	<md-dialog-alert
      :md-active.sync="second2"
      md-content="modification successfully"
      md-confirm-text=""/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Forget',
  data () {
    return {
    	phonenumber:'',
    	password:'',
    	code:'',
    	first2:false,
    	second2:false,
    	content:'发送验证码',
    	totalTime:60,
    	canClick:true,
    	wrongMsg:'Something wrong',
    }
  },
  methods:{
  	//点击返回键
  	back() {
  		this.$router.go(-1);
    	this.phonenumber = '';
    	this.password = '';
    	this.code = '';
      this.first2 = false;
  	},
  	//点击了提交按键
  	commitRe() {
  		//获取填入的手机号，检测是否为空或者不是11位
  		if(this.phonenumber == '' || this.phonenumber.length != 11 || this.password < 8 || this.code == ''){
        //提示错误
        this.first2 = true
        return
  		}
  		//以上验证没问题
  		//验证验证码
  		this.varifyCode()
  	},
  	varifyCode() {
		//验证验证码是否正确
		let config = {
        headers:{
    	'X-Bmob-Application-Id': 'c6df199bdc19ff4ab05d20d5a8c9e9eb',
			'X-Bmob-REST-API-Key': 'e6471431bc68976ccea467b4cf1ac101',
			'Content-Type': 'application/json'
        }
        };
        var parama2 = {
        	'mobilePhoneNumber':this.phonenumber,
        };
        axios.post('https://api2.bmob.cn/1/verifySmsCode/'+this.code,parama2,config).then((response)=>{
				if(response.status == 200){
					//验证成功
					//执行数据库修改操作，更新users 表中的userPwd字段
					this.updataPwd()
				}
  		}).catch((err)=>{
  			this.wrongMsg = '验证码不正确';
  			this.first2 = true;
  			return;
  		});
  	},
  	//该方法手机号是否已经注册过
  	hasPhoneNumber() {
  		let param = {
  			phoneNum:this.phonenumber
  		}
  		axios.get('/users/register',{
  			params:param
  		}).then((response)=>{
  			let res = response.data
  			if(res.status == 0 && res.result.count > 0){
  				//该用户存在，说明手机号注册过
  				this.getCodeMethod()
  			}else if(res.status ==0 && res.result.count == 0){
  				//该用户不存在，提示用户先注册
  				this.wrongMsg = '请先注册'
  				this.first2 = true
  				return
  			}else {
  				this.wrongMsg = '有点点错误~'
  				this.first2 = true
  				return
  			}
  		})
  	},
  	getCode() {
  		if(this.phonenumber == '' || this.phonenumber.length != 11){
  			this.wrongMsg = '请填入正确的手机号'
  			this.first2 == true
  			return
  		}else{
	  		//获取验证码前判断是否已注册过该号码
	  		this.hasPhoneNumber()
  		}
  		/*if(this.hasPhone == true){
  			//获取验证码
  			this.getCodeMethod()
  		}*/
  	},
  	getCodeMethod() {
  		if(!this.canClick)return;
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
  	},
  	updataPwd() {
		var parama = new URLSearchParams();
		let config = {
		  headers:{'Content-Type':'application/x-www-form-urlencoded'}
		};
		parama.append('phoneNum',this.phonenumber);
		parama.append('userPwd',this.password);
		let that = this
		axios.post('/users/updatapwd',parama,config).then((response)=>{
			let res = response.data;
			if(res.status == 0){
				//修改成功
				this.second2 = true
				this.$router.push({path:'/'})
			}
		});
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
	top: 10%;
	left: 10%;
}
.button-login {
	position: relative;
	top: 10%;
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
