<template>
  <div>
  	<div class="person-head-container">
  	</div>
  	<img :src="finalList[0].avatar" class="header-img">
  	<div class="person-head-nick-container">
  		<p class="person-head-nick">{{finalList[0].nickName}}</p>
  	</div>
  	<div class="detail-btn" v-if="!sign" @click="addAttention">{{hascollect == 1?'已关注':'关注'}}</div>
  	<img src="@/assets/images/add.png" class="person-head-adduser-icon" v-if="!added" @click="addFriend">
  	<span class="person-head-back-icon" @click="back"><</span>
  	<div class="person-center">
  		<div class="person-clauses-container">
  			<div class="person-clauses-container1" @click.nactive="goTieList(0)">
  				<img src="@/assets/images/message.png" class="person-clauses-container1-icon"><span class="lable">技术贴</span>
  				<span class="person-clauses-tie2">{{tchList.length}} 篇 &nbsp&nbsp&nbsp></span>
  			</div>
  			<div class="person-clauses-container2" @click.nactive="goTieList(1)">
  				<img src="@/assets/images/blog.png" class="person-clauses-container1-icon"><span class="lable">生活贴</span>
  				<span class="person-clauses-tie">{{liveList.length}} 篇 &nbsp&nbsp&nbsp></span>
  			</div>
  		</div>
  		<span class="person-dynamic">最新动态</span>
  	</div>
  	<div class="person-blog-container" v-for="(item,index) in finalList" :key="index" @click="goDetail(item)">
  		<p class="person-blog-title">{{item.title}}</p>
  		<p class="person-blog-content">{{item.text}}</p>
  		<span class="person-blog-time">{{item.time}}</span>
  	</div>
  </div> 
</template>

<script>
import axios from 'axios'
import { MessageBox,Field,Button,Toast  } from 'mint-ui'
export default {
  name: 'Personal',
  data () {
    return {
    	personId:'',
    	tchList:[],
    	liveList:[],
    	finalList:[],
    	sign:false,
    	hascollect:0,
      added:false,
    }
  },
  components:{
    MessageBox,
    Toast
  },
  methods:{
  	back() {
  		this.$router.go(-1);
  		this.finalList = [];
  	},
  	//获取某个用户的技术贴
  	getPersonTch() {
		let param = {
			id:this.personId,
		}
		axios.get('/technique/getpersontch',{
			params:param
		}).then((response)=>{
	        let res = response.data;
	        if(res.status == 0){
	        	this.tchList = res.result.list.reverse();
	        	//若返回的数组长度大于等于3，则取三个最新的帖子
	        	if(res.result.count >= 3){
					this.finalList = this.finalList.concat(this.tchList.slice(0,3))
	        	}else {
	        		this.finalList = this.finalList.concat(this.tchList)
	        	}
	        }
	    })
  	},
  	getPersonLive() {
		let param = {
			id:this.personId,
		}
		axios.get('/live/getpersonlive',{
			params:param
		}).then((response)=>{
	        let res = response.data;
	        if(res.status == 0){
	        	this.liveList = res.result.list.reverse();
	        	if(res.result.count >= 3){
					this.finalList = this.finalList.concat(this.liveList.slice(0,3))
	        	}else {
	        		this.finalList = this.finalList.concat(this.liveList)
	        	}
	        }
	        //console.log(this.finalList)
	        //this.$router.push({path: '/detail', query: {paicheNo: id}})
	    })
  	},
  	goDetail(item) {
  		if(item.isLive == 1){
  			this.$router.push({path: '/livedetail', query: {paicheNo: item._id}})
  		}else {
  			this.$router.push({path: '/detail', query: {paicheNo: item._id}})
  		}
  	},
  	goTieList(islive) {
  		this.$router.push({path: '/tielist', query: {paicheNo: this.personId,islive:islive}})
  	},
    addAttention() {
      if( this.hascollect == 1){
        //点击弹出框，提示用户是否取消关注
         MessageBox.confirm('', { 
         message: '确定要取消关注吗？', 
         title: '提示', 
         confirmButtonText: '确定', 
         cancelButtonText: '取消' 
         }).then(action => { 
         if (action == 'confirm') {     //确认的回调
          //调用取消收藏的方法
          this.disAttentionMethod()
         }
         }).catch(err => { 
         if (err == 'cancel') {     //取消的回调
          return
         } 
         });
        return
      }
      this.goAttention()
    },
  	goAttention() {
	  var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',this.$store.state.myId);
      parama.append('attentionId',this.personId);
      parama.append('nickName',this.finalList[0].nickName);
      parama.append('avatar',this.finalList[0].avatar);
      let that = this
      axios.post('/attention/addattention',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //返回插入成功的信息
          Toast({
            message: '关注成功',
            position: 'middle',
            duration: 2000
          });
          //改变按键字样
          this.hascollect = 1;
        }
      });
  	},
    disAttentionMethod() {
      let param = {
        attentionId:this.personId,
        userId:this.$store.state.myId
      }
      axios.get('/attention/disattention',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //console.log(res.msg)
          Toast({
            message: '取消关注成功',
            position: 'middle',
            duration: 2000
          })

          //改变按键样式
          this.hascollect = 0
        }
      })
    },
    //发送后端，查询attentions表，是否收关注过该用户
    checkCollected() {
      let param = {
        attentionId:this.personId,
        userId:this.$store.state.myId
      }
      axios.get('/attention/hasattentioned',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //console.log(res.result.count)
          if(res.result.count > 0){
            this.hascollect = 1
          }else {
            this.hascollect = 0
          }
        }
      })
    },
   //获取用户朋友
    getUserFriends() {
      //判断是否是目前用户的好有列表中
      let friends = JSON.parse(localStorage.getItem('isLogin')).list[0].friends
      console.log(friends)
      if(friends.indexOf(`${this.$route.query.personId}`) !== -1){
        //已经是好有，隐藏添加按键
        this.added = true
      }else {
        if(this.personId != this.$store.state.myId){
          this.added = false
        }
      }
    },
    //点击了添加好友的按键
    addFriend() {
      //请求后端保存申请的接口
      this.addApply();
      
    },
    addApply(){
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('fromId',this.$store.state.myId);
      parama.append('toId',this.personId);
      parama.append('agree',1);
      parama.append('nickName',this.$store.state.username);
      parama.append('avatar',this.$store.state.avatar );
      axios.post('/apply/addapply',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0 || res.status == 2){
          //返回插入成功的信息
          Toast({
            message: '发送申请成功',
            position: 'middle',
            duration: 2000
          });
          //向后端发送socket
          this.$socket.emit('apply',res.result);
        }
      });
    }
  },
  /*mounted() {
  	this.personId = this.$route.query.personId
  	this.getPersonTch()
  },*/
  activated() {
  	this.personId = this.$route.query.personId
  	//获取当前用户id
  	var userid = JSON.parse(localStorage.getItem('isLogin')).list[0]._id;
  	//判断查看用户是否为当前用户，即自己看自己
  	this.sign = this.personId == this.$store.state.myId?true:false;
    this.added = this.personId == userid?true:false;
  	//调用查询该用户发过的技术帖子的方法
  	this.getPersonTch();
  	//调用查询该用户发过的生活贴的方法
  	this.getPersonLive();
  	this.checkCollected();
    this.getUserFriends();
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
.person-head-container {
	width: 100%;
	height: 200px;
	background-image: url(./../../assets/images/bar.jpg);
	background-repeat: no-repeat;
	background-size: 100%;
	filter: blur(5px);
	overflow: hidden;
}
.header-img {
  position: absolute;
  top: 100px;
  left:50%;
  height: 60px;
  width: 60px;
  margin-left: -30px;
  margin-top: -20px;
  border-radius: 7px;
  z-index: 1;
}
.person-head-nick {
	color: #fff;
}
.person-head-nick-container {
  position: absolute;
  top: 150px;
  left:0;
  width: 100%;
  text-align: center;
}
.person-head-attention-icon {
	position: absolute;
	top: 10px;
	right: 10px;
}
.detail-btn {
	position:absolute;
	top: 20px;
	right: 15px; 
	font-size: 13px;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	height: 20px;
	border:1px solid #fff;
	text-align: center;
	color: #fff;
	border-radius: 5px;
	padding-left: 10px;
	padding-right: 10px;
}
.person-head-adduser-icon {
	position:absolute;
	top: 12px;
	right: 80px; 
	height: 40px;
	width: 40px;
}
.person-head-back-icon {
	position:absolute;
	top: 20px;
	left: 20px; 
	font-size: 25px;
	color: #fff;
}
.person-center {
	height:140px;
	width: 100%;
	background-color: rgb(245,245,248);
	padding-top: 8px;
}
.person-clauses-container {
	height: 82px;
	width: 100%;
	margin-top: 8px;
	background-color: blue;
}
.person-clauses-container1 {
	height: 41px;
	width: 100%;
	background-color: #fff;
	border-bottom: .5px solid rgb(157,163,173);
}
.person-clauses-container2 {
	height: 41px;
	width: 100%;
	background-color: #fff;
}
.person-dynamic {
	height: 40px;
	line-height: 50px;
	margin-left: 15px;
	color: rgb(157,163,173);
}
.person-clauses-container1-icon {
	height: 24px;
	width: 24px;
	margin-bottom: 5px;
	margin-left: 15px;
}
.person-clauses-tie {
	float:right;
	height: 42px;
	line-height: 42px;
	color: rgb(157,163,173);
	font-size: 14px;
	margin-right: 20px;
}
.person-clauses-tie2 {
	float: right;
	margin-right: 20px;
	font-size: 14px;
	color: rgb(157,163,173);
	line-height: 40px;
}
.person-blog-container {
	height: 120px;
	width: 100%;
	border-bottom: .5px solid rgb(157,163,173);
}
.person-blog-title {
	padding: 20px 25px 5px 15px;
	font-size: 17px;
	font-weight: 500px;
	color: rgb(41,45,52);
}
.person-blog-content {
	padding:0px 25px 0px 15px;
	font-size: 15px;
	color: rgb(157,163,173);
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.person-blog-time {
	display: block;
	padding-top: 10px;
	padding-left: 15px;
	font-size: 12px;
	color: rgb(157,163,173);
}
.lable {
	height: 41px;
	line-height: 41px;
	color: rgb(41,45,52);
	font-size: 15px;
	margin-left: 15px;
}
</style>
