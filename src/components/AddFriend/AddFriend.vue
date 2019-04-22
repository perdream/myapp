<template>
  <div>
	<div class="list-header">
	  	<span class="list-back-icon" @click="back"><</span>
	  	<p class="list-title">添加好友</p>
    </div>
	<div class="input-container" @click="search" v-if="!showSear">
      <img src="@/assets/images/search.png" class="search-icon">
      <p class="number-text">手机号</p>
    </div>
    <div class="input-container2" v-if="showSear">
      <input class="input-class" autofocus="autofocus" v-model="phone"/>
      <p class="cancel-btn" @click="cancel">取消</p>
    </div>
    <div class="tip-container" v-show="phone" @click="searchUser">
    	<img src="@/assets/images/search2.png" class="search2-icon">
    	<p class="tip-text"><span style="color:#000;font-weight: bold;">搜索：</span >&nbsp&nbsp{{phone}}</p>
    </div>
    <p class="tip" v-show="hasuser">该用户不存在哦~~</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddFriend',
  data () {
    return {
    	showSear:false,
    	phone:'',
    	hasuser:false,
    }
  },

  methods:{
  	back(){
  		this.phone = '';
  		this.showSear = false;
  		this.hasuser = false;
  		this.$router.push({path:'/mainpage'});
  	},
  	search() {
  		this.showSear = true;
  	},
  	cancel() {
  		this.showSear = false;
  		this.phone = '';
  	},
  	searchUser() {
  		//点击查询是否存在phone用户
		var param = {
			phoneNum: this.phone,
		}
		var that = this
		//请求后端，验证用户phone和password
		axios.get('/users/information',{
			params:param
		}).then((response)=>{
			var res = response.data;
			if(res.status == 0&& res.result.count > 0){
				//存在该用户跳转到个人页
				this.$router.push({path: '/personal', query: {personId: res.result.list[0]._id}});
				this.phone = '';
				this.hasuser = false;
			}else{
				//不存在该用户，显示不存在用户字样
				this.hasuser = true
			}
		})
  	}
  },
}
</script>
<style scoped>
*{
  padding:0;
  margin:0;
  list-style: none;
  text-decoration: none;
  border-spacing: 0px;

}
.list-header {
	height: 80px;
	width: 100%;
	position: relative;
	background-color: rgb(237,237,237);
}
.list-back-icon {
	height: 40px;
	line-height: 50px;
	margin-left: 20px;
	font-size: 25px;
	color: #000;
}
.list-title {
	width: 80px;
	position: absolute;
	top: 25%;
	left: 50%;
	margin-left: -30px;
	font-size: 18px;
	text-align: center;
	font-weight: 600;
}
.input-container {
	height: 46px;
	width: 100%;
}
.input-class {
	height: 99%;
	width: 80%;
	font-size: 20px;
	padding-left: 5px;
	border: none;
	float: left;
}
.search-icon {
	float: left;
	margin-top: 11px;
	margin-left: 25px;
}
.number-text {
	float: left;
	height: 46px;
	line-height: 46px;
	margin-left: 20px;
	color: rgb(199,199,205);
	font-size: 20px;
}
.tip-container {
	height: 50px;
	width: 100%;
}
.search2-icon {
	float: left;
	margin-top: 9px;
	margin-left: 25px;
}
.tip-text {
	float: left;
	height: 46px;
	line-height: 46px;
	margin-left: 20px;
	color: rgb(26,173,25);
	font-size: 15px;
}
.input-container2 {
	height: 46px;
	width: 100%;
	border-bottom: 1px solid grey;
	background: rgb(157,163,173);
}
.cancel-btn {
	height:46px;
	line-height: 46px;
	float: left;
	width: 40px;
	font-size: 15px;
	margin-left: 20px;
}
.tip {
	height: 200px;
	width: 100%;
	line-height: 200px;
	text-align: center;
	font-size: 20px;
	color: rgb(157,163,173);
}
</style>
