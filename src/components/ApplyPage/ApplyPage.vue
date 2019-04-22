<template>
  <div>
  <p class="new-text"><span class="back" @click="back"><</span><span class="text">新好友申请</span></p>
  <div class="new-container" v-for = "(item,index) in applyList" :key="index" v-show="item.agree == 1" @click="goPersonal(item)">
  	<img :src="item.avatar" class="img">
  	<span class="app-nick">{{item.nickName}}</span>
  	<div class="detail-btn" @click="agreeApply(item)">同意</div>
  	<div class="detail-btn2" @click="rejectApply(item)">忽略</div>
  </div>
  <p class="tip-text" v-show="applyList.length < 1">还没有添加消息~~</p>
	<p class="new-text"><span class="text2">已添加好友</span></p>
	<div class="new-container2"  v-for = "(item,index) in applyList" :key="index" v-show="item.agree == 2" @click="goPersonal(item)">
		<img :src="item.avatar" class="img">
		<span class="app-nick">{{item.nickName}}</span>
		<div class="detail-btn3">已同意</div>
	</div>
  <p class="tip-text" v-show="applyList.length < 1">暂时还没有添加好友哦~~，快去添加好友畅聊吧~~</p>
  </div>
</template>

<script>
import axios from 'axios'
import { MessageBox,Field,Button,Toast  } from 'mint-ui'
export default {
  name: 'ApplyPage',
  data () {
    return {
      applyList:[]
    }
  },
  components:{
    Toast
  },
  mounted(){
	this.getApply()
  },
  methods:{
  	back() {
  		this.$router.go(-1)
  	},
  	getApply() {
	  let param = {
        userId:this.$store.state.myId
      }
      axios.get('/apply/applied',{
        params:param
      }).then((response)=>{
        let res = response.data;
          if(res.status == 0){
            this.applyList = res.result.list
          }
      })
  	},
    //修改添加状态
    updataStatus(item) {
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('fromId',item.fromId);
      parama.append('toId',item.toId);
      let that = this
      axios.post('/apply/updatestatus',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //返回插入成功的信息
          Toast({
            message: '已同意',
            position: 'middle',
            duration: 2000
          });
          this.getApply()
        }
      });
    },
    //添加进对方好友列表
    addFriend(userId,friendId) {
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('friendId',friendId);
      let that = this
      axios.post('/users/addfriend',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
        }
      });
    },
    agreeApply(item) {
      //用户点击了同意按键，将两个id的用户信息中的friends数组中插入对方的id
      //将该条请求中的agree设置为2（已同意）
      this.updataStatus(item);
      //分别修改两个id的用户对象中的friends数组，插入对方的id
      let userId = this.$store.state.myId;
      let friendId = item.fromId;
      //console.log(userId+ " "+friendId)
      this.addFriend(userId,friendId);
      this.addFriend(friendId,userId);    
    },
    //点击了忽略按键
    rejectApply(item) {
      //请求后端删除对应请求
      let param = {
        fromId:item.fromId,
        toId:  item.toId
      }
      axios.get('/apply/delapply',{
        params:param
      }).then((response)=>{
        let res = response.data;
          if(res.status == 0){
            this.getApply()
          }
      })
    },
    goPersonal(item) {
      this.$router.push({path: '/personal', query: {personId: item.fromId}})
    }
  },
  activated() {
  	this.getApply()
  }
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
.new-text {
	height: 50px;
	width: 100%;
	background-color: rgb(237,237,237);
	font-size: 17px;
	text-align: center;
}
.text {
	height: 50px;
	line-height: 50px;
	color: #000;
}
.text2 {
	height: 50px;
	line-height: 50px;
	color: #000;
}
.back {
	position: fixed;
	left: 20px;
	height: 50px;
	line-height: 50px;
	color: #000;
	font-weight: 600;
	font-size: 30px;
}
.new-container {
	width:100%;
	height: 70px;
	border-bottom: .5px solid #000;
	margin-bottom: 50px;
}
.new-container2 {
	width:100%;
	height: 70px;
	border-bottom: .5px solid #000;
}
.img {
	height:50px;
	width: 50px;
	border-radius: 7px;
	margin-top: 10px;
	margin-left: 15px;
}
.app-nick {
	font-size: 15px;
	color: rgb(199,199,205);
	margin-left: 20px;
}
.detail-btn {
  font-size: 13px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  float: right;
  margin-right: 15px;
  height: 20px;
  width: 45px;
  margin-top: 15px;
  border:1px solid red;
  text-align: center;
  color: red;
  border-radius: 5px;
}
.detail-btn2 {
  font-size: 13px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  float: right;
  margin-right: 15px;
  height: 20px;
  width: 45px;
  margin-top: 15px;
  border:1px solid red;
  text-align: center;
  color: red;
  border-radius: 5px;
}
.detail-btn3 {
  font-size: 13px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  float: right;
  margin-right: 15px;
  height: 20px;
  width: 45px;
  margin-top: 15px;
  border:1px solid grey;
  text-align: center;
  color: grey;
  border-radius: 5px;
}
.tip-text {
  height: 100px;
  width: 100%;
  color: rgb(199,199,205);
  font-size: 15px;
  text-align: center;
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
}
</style>
