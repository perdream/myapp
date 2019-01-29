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
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation">
      <!--<md-toolbar class="md-transparent md-drawer2" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>-->
      <md-card-header>
        <md-avatar>
          <img src="https://placeimg.com/40/40/people/5" alt="Avatar">
        </md-avatar>
        <div class="md-title">{{userInformation.userName}}</div>
        <div class="md-subhead">{{userInformation.des}}</div>
      </md-card-header>

      <md-list>
        <md-subheader>Navigation</md-subheader>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>supervisor_account</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>
      </md-list>

      <!--friends-->
      <scroll-view class="wrapper2">
        <!--<div class="wrapper-container2">-->
          <md-list >
            <md-subheader>Friends</md-subheader>
            <md-list-item v-for="(item,index) in friends" :key="index" @click="goMessageDetail(item._id,item.userName)" >
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
          <!--</div>-->
          </scroll-view>
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
          this.getUserFriends(param);
        }
      })
    },
    //获取用户朋友
    getUserFriends(param) {
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
    goMessageDetail(param1,param2) {
      this.showNavigation = false;
      this.$router.push({
          path:'/message/messagedetail',
           query: {
            id: param1,
            userName: param2
        },
      });
    }
  },
  computed: {
    messageList() {
      return this.$store.state.messageList
    }
  },
  watch: {
    messageList(val) {
      this.$refs.changePop.change(val);
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
</style>
