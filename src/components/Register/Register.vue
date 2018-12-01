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
  	</div>
	<div class="button-login">
		<md-button class="md-primary button-login2" @click="Register">Sign up</md-button>
	</div>
	<md-dialog-alert
      :md-active.sync="first2"
      md-content="Something wrong"
      md-confirm-text="get!"
      />
	<md-dialog-alert
      :md-active.sync="second2"
      md-content="Registered successfully"
      md-confirm-text=""/>
  </div>
</template>

<script>
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
    }
  },
  methods:{
  	Register() {
	 	if(this.phonenumber != '' || this.password != ''|| this.confirm != '' || this.code != '' ){
	 		if (this.phonenumber.length() >= 3 && this.password == this.confirm){
	 			this.second2 = true;
	 			setTimeout(()=>{
	 				this.second2 = false;
	 			},1000);
	 		}else{
	 			this.first2 = true;
	 		}
	 	}else{
 			this.first2 = true;
	 	}
  	},
  	back() {
  		this.$router.go(-1);
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
</style>
