<template>
  <div class="container">
    <title-bar></title-bar>
    <mt-search
    v-model="value"
    cancel-text="取消"
    placeholder="搜索">
    </mt-search>
    <div class="nav">
      <span class="btn1" @click="tab1" :class="this.active=='tab-container1'?'act':'btn1'">技术鱼塘</span>
      <span class="btn1" @click="tab2" :class="this.active=='tab-container2'?'act':'btn1'">生活鱼塘</span>
      <div class="icon-edit" @click="showEdit">
        <md-icon >edit</md-icon>
      </div>
    </div>
    <!--mainpage content-->
    <scroll-view class="wrapper">
      <div class="wrapper-container">
        <mt-tab-container v-model="active"  swipeable  ref="tabvalue">
          <mt-tab-container-item id="tab-container1">
            <md-card>
              <md-card-header>
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="Avatar">
                </md-avatar>
                <div class="md-title">昵称</div>
                <div class="md-subhead">所属区 &nbsp&nbsp<span>1月31日</span></div>
              </md-card-header>
              <md-card-content>
                内容描述
              </md-card-content>
                <md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon >favorite</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >bookmark</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >share</md-icon>
                  </md-button>
              </md-card-actions>
            </md-card>
                    <md-card>
              <md-card-header>
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="Avatar">
                </md-avatar>
                <div class="md-title">昵称</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>
              <md-card-content>
                内容描述
              </md-card-content>
                <md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon >favorite</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >bookmark</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >share</md-icon>
                  </md-button>
              </md-card-actions>
            </md-card>
            <md-card>
              <md-card-header>
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="Avatar">
                </md-avatar>
                <div class="md-title">昵称</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>
              <md-card-content>
                内容描述
              </md-card-content>
                <md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon >favorite</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >bookmark</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >share</md-icon>
                  </md-button>
              </md-card-actions>
            </md-card>
            <md-card>
              <md-card-header>
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="Avatar">
                </md-avatar>
                <div class="md-title">昵称</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>
              <md-card-content>
                内容描述
              </md-card-content>
                <md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon >favorite</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >bookmark</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >share</md-icon>
                  </md-button>
              </md-card-actions>
            </md-card>
            <md-card>
              <md-card-header>
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="Avatar">
                </md-avatar>
                <div class="md-title">昵称</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>
              <md-card-content>
                内容描述
              </md-card-content>
                <md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon >favorite</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >bookmark</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >share</md-icon>
                  </md-button>
              </md-card-actions>
            </md-card>
            <md-card>
              <md-card-header>
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="Avatar">
                </md-avatar>
                <div class="md-title">昵称</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>
              <md-card-content>
                <h3>题目</h3>
                内容描述
              </md-card-content>
                <md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon >favorite</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >bookmark</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >share</md-icon>
                  </md-button>
              </md-card-actions>
            </md-card>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <mt-cell v-for="(n,index) in 5" title="tab-container 2" :key="index"></mt-cell>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </scroll-view>
    <div class="shadow-container" v-show="shadow" @click="closeshadowcontainer"></div>
    <transition name="showparams">
      <div class="param-container" v-show="shadowedit">
        <div class="icon-close" @click="closeEdit">
          <md-icon>close</md-icon>
        </div>
        <div class="commit">
          提交
        </div>
      </div>
    </transition>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import ScrollView from './../../base/scroll'
import TitleBar from './../../base/TitleBar'
import BottomBar from './../../base/BottomBar'
import axios from 'axios'
import { MessageBox } from 'mint-ui'
export default {
  name: 'MainPage',
  data () {
    return {
      active:'tab-container1',
      value:'',
      shadow:false,
      shadowedit:false,
    }
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
  components:{
    ScrollView,
    TitleBar,
    BottomBar,
    MessageBox
  },
  mounted() {
    //console.log("mounted");
  },
  methods:{
    //获取首页展示消息
    goMessage() {
      this.$router.push({path:'/message'});
    },
    closeshadowcontainer() {
      this.closeEdit();
    },
    showEdit() {
      this.shadow = true;
      this.shadowedit = true;
      console.log('click');
    },
    closeEdit() {
       MessageBox.confirm('', { 
       message: '确定退出编辑吗？', 
       title: '提示', 
       confirmButtonText: '确定', 
       cancelButtonText: '取消' 
       }).then(action => { 
       if (action == 'confirm') {     //确认的回调
          this.shadow = false;
          this.shadowedit = false;
       }
       }).catch(err => { 
       if (err == 'cancel') {     //取消的回调
        return
       } 
       });
    },
    tab1() {
      this.active = 'tab-container1'
    },
    tab2() {
      this.active = 'tab-container2'
    }
  },
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
.wrapper {
  height: 100%;
  overflow: hidden;
}
.wrapper-container {
  padding-bottom: 106px;
  background: rgba(0,0,0,.01);
}
.nav {
  width: 100%;
  height: 20px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
}
.btn1 {
  color: #333;
  width: 80px;
  height: 17px;
  line-height: 17px;
  margin-left: 7px;
  padding:5px;
}
.act {
  color: red;
  width: 80px;
  height: 17px;
  line-height: 17px;
  margin-left: 7px;
}
.mint-search {
  height: 50px;
}
.md-card-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  padding-bottom: 6px;
  text-align: left;
}
.md-card-actions {
  height: 30px;
}
.md-icon {
  height: 15px;
  width: 15px;
  min-width:15px;
}
.md-subhead {
  font-size: 5px;
  text-align: left;
}
.md-title {
  text-align: left;
}
.mint-tab-container-item {
  padding-bottom: 75px;
}
.shadow-container {
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 102;
  background-color:rgba(0,0,0,0.6) 
}
/*编辑页面窗口动画*/
.showparams-enter-active{
  animation: pa .5s ease-in-out;
}
.showparams-enter{
  animation: pa .3s ease-in-out;
}
.showparams-leave-active {
  animation: pa .5s ease-in-out reverse;
}
@keyframes pa {
  0% {
    transform:translate(0px, 100%);
  }
  100% {
    transform:translate(0px, 0);
  }
}
.param-container {
  position: fixed;
  top:15%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 103;
  background-color: white;
}
.icon-edit {
  display: inline-block;
  float: right;
  margin-right: 15px;
}
.icon-close {
  float: left;
  margin: 10px 0 0 10px;
}
.commit {
  float: right;
  margin:10px 10px 0 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 15px;
}
</style>
