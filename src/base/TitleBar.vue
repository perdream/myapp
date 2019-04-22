<template>
  <div>
    <pop ref="changePop"></pop>
  	<md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <span class="menus">=</span>
      </md-button>
      <md-app>
        <md-app-toolbar class="md-primary">
          <span class="md-title">My Title</span>
        </md-app-toolbar>
      </md-app>
      <img src="@/assets/images/plus2.png" class="addfriend-icon" @click="goAddFriend">
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation">
      <!--<md-toolbar class="md-transparent md-drawer2" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>-->
      <md-card-header>
        <md-avatar>
          <img :src="userInformation.avatar" alt="Avatar" @click="goPersonalPage">
        </md-avatar>
        <div class="md-title">{{userInformation.userName}}</div>
        <div class="md-subhead">{{userInformation.des}}</div>
      </md-card-header>
      <!--friends-->
        <!--<div class="wrapper-container2">-->
          <scroll-view class="wrapper2">
          <md-list >
            <md-subheader>Friends</md-subheader>
              <md-list-item v-for="(item,index) in friends" :key="index" @click="goMessageDetail(item._id,item.userName,item.avatar)" >
                <md-avatar>
                  <img :src="item.avatar">
                </md-avatar>

                <div class="md-list-item-text">
                  <span>{{item.userName}}</span>
                </div>
                <!--<md-badge class="md-primary" md-content="12" md-dense>
                  <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">chat_bubble</md-icon>
                  </md-button>
                </md-badge>-->
              </md-list-item>
          </md-list>
          </scroll-view>
          <!--</div>-->
    </md-drawer>
  </div>
</template>

<script>
import ScrollView from './scroll'
import axios from 'axios'
import pop from './pop'
export default {
  name: 'TitleBar',
  data () {
    return {
      showNavigation: false,
      showSidepanel: false,
      userInformation:'',
      friends:[],
    }
  },
  components:{
    ScrollView,
    pop
  },
  mounted() {
    if(this.$store.state.userid){
      this.getUserInformation();
    }
  },
  sockets: {
    //不能改,j建立连接自动调用connect
    connect: function() {
      //与socket.io连接后回调
      console.log("我是TitleBar");
    },
    resvupNick(value) {
      this.getUserInformation()
    },
    refreshTitle(value) {
      this.getUserInformation()
    }
  },
  methods:{
    //获取用户信息
    getUserInformation() {
      var param = {
        //传入登录用户的电话
        phoneNum: this.$store.state.userid,
      }
      axios.get('/users/information',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0 && res.result.count > 0){
          //console.log(res.result.list[0]);
          this.userInformation = res.result.list[0];
          this.getUserFriends();
        }
      })
    },
    //获取用户朋友
    getUserFriends(param) {
      var param = {
        //根据id 查找好友
        id: this.$store.state.myId,
      }
      axios.get('/users/friends',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0 && res.result.count > 0){
          this.friends = res.result.list;
        }
      })
    },

    //跳转聊天界面
    goMessageDetail(param1,param2,param3) {
      this.showNavigation = false;
      this.$router.push({
          path:'/message/messagedetail',
           query: {
            id: param1,
            userName: param2,
            avatar:param3

        },
      });
    },
    goPersonalPage() {
      this.$router.push({path: '/personal', query: {personId: JSON.parse(localStorage.getItem('isLogin')).list[0]._id}})
      this.showNavigation = false;
    },
    goAddFriend() {
      this.$router.push({path:'/addfriend'})
    }
  },
  computed: {
    messageList() {
      return this.$store.state.messageList
    }
  },
  watch: {
    messageList(val) {
      //console.log(this.$route.path)
      if(this.$route.path != '/message/messagedetail'){
        this.$refs.changePop.change(val);
      }else {
        return
      }
    },
    showNavigation(){
      this.getUserInformation();
    }
  }
}
</script>
<style scoped>
.md-toolbar {
  background-color: #383835;
  color: #fff;
}
.menus {
  width: 40px;
  color: #fff;
  font-size: 35px;

}
.md-drawer {
 background:#F5F5F5;
}
.md-drawer2 {
  background:#F5F5F5;
  color: #000;
  margin-top: 10px;
}
.md-list-item{
  margin-top: 20px;
  border-bottom: 1px solid grey;
}
.md-card-header{
  margin-top: 20px;
  margin-bottom:-15px;
}
.md-subheader {
  color: #00BBFF;
  padding-top:30px;
}
.wrapper2 {
  height: 100%;
  overflow: hidden;
}
.wrapper-container2 {
  background: rgba(0,0,0,.01);
}
.container {
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    bottom: 0;
    text-align: center;                                              
}
.addfriend-icon {
  position: fixed;
  right: 30px;
  line-height: 56px;
  height: 25px;
  width: 25px;
}
</style>
