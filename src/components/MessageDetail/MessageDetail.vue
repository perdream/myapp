<template>
  <div class="container">
    <div class="title-bar">
      <div class="back-message" @click="backMessage">
        <md-icon class="md-primary">keyboard_arrow_left</md-icon>
      </div>
      <div class="title-text">
       {{clientTalk.userName}}
      </div>
    </div>
    <!--来信息弹出框-->
    <!--<transition name="outline">
      <div class="popup" v-show="popupVisible">
        <div class="popup-title">
          <img src="@/assets/images/comment.png" class="popup-img">
          <span class="popup-name">小云</span>
        </div>
        <div class="popup-content">
          <p class="popup-msg">收到一条新消息</p>
        </div>
      </div>
    </transition>-->
    <scroll-view class="wrapper" :scrollToEndFlag="scrollToEndFlag" :messageList="messageList.length" >
      <div class="contact" >
        <div v-for="(item,index) in messageList" :key="index">
          <div class="time-line">{{item.timer}}</div>
          <div class="right" v-if="item.from == `${$store.state.myId}`">
            <div class="right-text">
              <span class="text-right">
                {{item.msg}}
              </span>
            </div>
            <div class="right-avatar">
              <img class="avatar" src="https://placeimg.com/40/40/people/1" alt="People">
            </div>
          </div>
          <div class="left1" v-else>
            <div class="left-avatar">
              <img class="avatar" src="https://placeimg.com/40/40/people/1" alt="People">
            </div>
            <div class="left-text">
              <span class="text-left">
                {{item.msg}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <!--bottom-->
    <div class="bottom">
      <div class="input">
         <input type="text" class="input-container" v-model="sendmessage">
      </div>
      <div class="emoji"> 
        <img src="@/assets/images/emoji.png" class="emoji-img">
      </div>
      <div class="add">
        <img src="@/assets/images/add.png" class="emoji-img">
      </div>
      <button class="btn-send" @click="sendMsg">send</button>
    </div>
  </div>
</template>

<script>
import ScrollView from './../../base/scroll'
import axios from 'axios'
export default {
  name: 'MessageDetail',
  data () {
    return {
    	content:'',
    	text:'',
      sendmessage:'',
      messageList:[],
      clientTime:'',
      scrollToEndFlag:false,
      clientTalk:{},
      id:'',
      from:'',
      to:'',
      msg:'',
      timer:new Date().getYear(),
      msgObj2:'',
    }
  },
  created(){
    this.getMessageList();
  },
  mounted(){
    this.from = this.$store.state.myId;
    this.to = this.clientTalk.id;
    //this.$refs.child.chilFn('我是父元素传过来的')
    //console.log('hello');
    //console.log(this.$route.query);
    this.clientTalk = this.$route.query;
    this.getMessageList();
    /*this.messageList = [
      {
        from:'id13012257584',
        to:'id13012257584',
        timer:'2019-1-12',
        msg:'hello Jom',
      },
      {
        from:'id13012257583',
        to:'id13012257583',
        timer:'2019-1-13',
        msg:'hello Bom',
      },
      {
        from:'id13012257584',
        to:'id13012257584',
        timer:'2019-1-12',
        msg:'hello Jom',
      },
      {
        from:'id13012257583',
        to:'id13012257583',
        timer:'2019-1-13',
        msg:'hello Bom',
      },
      {
        from:'id13012257584',
        to:'id13012257584',
        timer:'2019-1-12',
        msg:'hello Jom',
      },
      {
        from:'id13012257583',
        to:'id13012257583',
        timer:'2019-1-13',
        msg:'hello Bom',
      }
    ]*/
  },
  sockets: {
	    //不能改,j建立连接自动调用connect
	    connect: function() {
	      //与socket.io连接后回调
	      console.log("56565");
	    },
		//服务端向客户端发送news事件
	    news: function(value) {
	     //监听login(后端向前端emit  login的回调)
		console.log(value)
	    },
	    //服务端发来resvmsg
	    resvmsg(value) {
        if(value.to == this.$store.state.myId){
          this.$store.commit('saveMsg',value);
          //console.log('hhh');
        }
	    },
	    /*error() {
	    	console.log('error');
	    }*/
    },
  methods:{
  	/*sendMsg() {
  		//console.log(this.content);
  		this.$socket.emit('sendMsg',{from:this.$store.state.userid,to:'13012257584',msg:this.content})
  	},*/
    sendMsg() {
      //console.log(this.$store.state.resolve);
      if(this.sendmessage == ''){
        return
      };
      this.id = this.getClientId();
      this.from = this.$store.state.myId;
      this.to = this.clientTalk.id;
      this.msg = this.sendmessage;
      let msgObj = {
        id:this.id,
        from:this.from,
        to:this.to,
        timer:this.timer,
        msg:this.sendmessage,
        fromName:this.$store.state.username,
      };
      this.msgObj2 = msgObj;
      this.saveMsg();
      this.messageList.push(msgObj);
      this.sendmessage = '';
      //console.log(msgObj);
      this.scrollToEndFlag = true;
      //this.getClientTime();                                                                   
    },
    backMessage() {
      //this.$destroy();
      this.$router.push({
        path:'/message'
      })
    },
    getClientTime() {
      this.clientTime = new Date();
      //console.log(this.clientTime.getYear());
    },

    //发送后端存储信息
    saveMsg() {
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('id',this.id);
      parama.append('fromName',this.$store.state.username);
      parama.append('from',this.from);
      parama.append('to',this.to);
      parama.append('msg',this.msg);
      parama.append('timer',this.timer);
      axios.post('/message/saveMsg',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          this.$socket.emit('test',this.msgObj2);
        }
      })
    },
    getMessageList() {
      let param = {
        id:this.getClientId()
      }
      axios.get('/message/messageList',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0 && res.result.count > 0){
          //console.log(res.result);
          this.messageList = res.result.list;
          this.$store.commit('getMsg',res.result.list);
        }
      })
    },
    //聊天的两人的id进行排序合并
    getClientId() {
      //let ourId = sort(myId+otherId);
      let ourId = new Array();
      ourId.push(this.clientTalk.id);
      ourId.push(this.$store.state.myId);
      //console.log(ourId.sort().join(''));
      let id = ourId.sort().join('');
      return id;
    },
    /*showPop() {
      //console.log("click");
      //console.log(this.$route.path);
      if(this.$route.path !== '/message/messagedetail'){
        this.popupVisible = true;
        setTimeout(() => {
          this.popupVisible = false;
        }, 2000); 
      }
    }*/
  },
  destroyed () {
  },
  components:{
    ScrollView,
  }
}
</script>
<style scoped>
.container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(144,144,144,0.1);
}
.wrapper {
  height: 100%;
  overflow: hidden;
}
.title-bar {
  position:fixed;
  min-height: 56px;
  width: 100%;
  background-color: #383835;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  overflow: hidden;
  z-index: 100;
}
.back-message {
  height: 56px;
  line-height: 56px;
  color:white;
  font-size: 25px;
  font-weight: 600;
  margin-left: 10px;
}
.title-text {
  position: absolute;
  top: 50%;
  right: 50%;
  height: 100%;
  font-size: 24px;
  margin-top: -10px;
  color: #fff;
  font-weight: 400;
  margin-right: -12px;
}
.contact {
  width:100%;
  padding-top: 66px;
  overflow: hidden;
  padding-bottom: 50px;
}
.left1 {
  width: 100%;
  min-height: 60px;
  margin-bottom: 10px;
  display: flex;
}
.right {
  width: 100%;
  min-height: 60px;
  margin-bottom: 10px;
  display: flex;
}
.left-avatar {
  flex: 1;
  height: 60px;
  text-align: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.left-text {
  flex: 4;
  min-height: 60px;
}
.text-left {
  display: block;
  min-width: 80px;
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 5px;
  max-width: 72%;
  min-height: 50px;
  background: #FFF;
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  border-radius: 10px;
  padding: 15px 12px;
  float: left;
}
.right-text {
  flex: 4;
  min-height: 60px;
  text-align: left;
}
.right-avatar {
  flex: 1;
  height: 60px;
  text-align: center;
}
.text-right {
  display: block;
  margin-top: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  min-width: 80px;
  max-width: 72%;
  min-height: 50px;
  background: #BCEE68;
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  border-radius: 10px;
  padding: 15px 12px;
  float: right;
}
.time-line {
  height: 20px;
  width: 100%;
  text-align: center;
}
.bottom {
  position: fixed;
  display: flex;
  bottom:0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 100;
  box-shadow: 0 -2px 3px -1px #999;
  background: #F5F5F5;
}
.input {
  flex: 7.6;
  text-align: center;
}
.emoji {
  flex: 1;
  text-align: center;
}
.add {
  flex: 1;
}
.emoji-img {
  margin-top: 6px;
}
.input-container {
  width: 90%;
  height: 80%;
  margin-top: 1.5%;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.btn-send {
  flex: 1.4;
  background: #999;
  border: none;
  font-size: 17px;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color:#fff;
}

</style>
