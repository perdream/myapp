<template>
  <div class="container">
    <title-bar></title-bar>
    <mt-search
    cancel-text="取消"
    placeholder="搜索" 
    v-model="searchValue"
    >
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
            <md-card @click.native="goDetail(item._id)" v-for="(item,index) in tchlist" :key="index" >
              <md-card-header>
                <md-avatar>
                  <img :src="item.avatar" alt="Avatar">
                </md-avatar>
                <div class="md-title">{{item.nickName}}</div>
                <div class="md-subhead">{{item.time}}</div>
              </md-card-header>
              <md-card-content>
                <h3>{{item.title}}</h3>
                <p class="content-dsc">{{item.text}}</p>
              </md-card-content>
                <!--<md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon >favorite</md-icon>
                  </md-button>

                  <md-button class="md-icon-button collect-ico">
                    <md-icon @click.native="collectTie">bookmark</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon >share</md-icon>
                  </md-button>
              </md-card-actions>-->
            </md-card>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <div class="container3">
              <scroll-view class="wrapper2">
                <elegant-goods :livelist="livelist" @checkImg2="checkImg2">
                </elegant-goods>
              </scroll-view>
            </div>
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
        <div class="commit" @click="commitEdit">
          提交
        </div>
        <input type="text" placeholder="题目" class="content-title" v-model="tchtitle"/>
        <div class="introduction" v-if="this.active=='tab-container2'">
          <mt-field placeholder="自我介绍" type="textarea" rows="4" v-model="introduction"></mt-field>
        </div>
        <textarea rows="10" cols="30" v-else class="tch-container" placeholder="输入帖子内容" v-model="tchmodel">
        </textarea>
        <div class="imagecontainer" v-if="this.active=='tab-container2'">
          <div v-for="(item,index) in picArr2" :key="index">
            <img :src="item" class="img">
          </div>
        </div>
        <div class="addimage" v-if="this.active=='tab-container2'">添加图片
          <input type="file" accept="image/*" multiple="multiple" id="uploaderInput" class="elbom" @click='addPic'/>
        </div>
      </div>
    </transition>
    <mint-swiper v-show="showMswiper" :mintData="mintData" :defaultindex = "defaultindex" @closeCheck="closeCheck"></mint-swiper>
    <div class="search-container" v-show="showSearch">
      <div class="collect-container" v-for="(item,index) in searchData" :key="index" @click="goDetail2(item)">
        <div class="collect-title">{{item.title}}</div>
        <p class="collect-content">{{item.text}}</p>
        <div>
          <img :src="item.avatar" class="collect-icon">
          <span class="collect-name">{{item.nickName}}</span>
          <span>{{(item.time).substring(0,10)}}</span>
        </div>
      </div>
    </div>
    <bottom-bar ></bottom-bar>
  </div>
</template>

<script>
import 'jquery'
import ScrollView from './../../base/scroll'
import TitleBar from './../../base/TitleBar'
import BottomBar from './../../base/BottomBar'
import elegantGoods from './../../base/elegantgoods'
import MintSwiper from './../../base/MintSwiper'
import axios from 'axios'
import { Indicator } from 'mint-ui';
import { MessageBox,Field,Button,Toast  } from 'mint-ui'
export default {
  name: 'MainPage',
  data () {
    return {
      active:'tab-container1',
      shadow:false,
      shadowedit:false,
      introduction:'',
      tchmodel:'',//技术区帖子内容
      tchtitle:'',//技术区帖子标题
      tchlist:[],//技术贴列表
      picArr2:[],//在选择图片页面展示的图片数组
      picList:[],//需要上传的图片数组
      token:'',
      imageUrls:[],
      livelist:[],//生活区列表
      showMswiper:false,
      mintData:[],
      defaultindex:0,
      searchValue:'',
      showSearch:false,
      products:[],
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
          //this.$store.commit('saveMsg2',value);
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
    MessageBox,
    elegantGoods,
    Toast,
    MintSwiper,
    Indicator
  },
  created() {
    //console.log("mounted");
    Indicator.open();
    //页面挂载时，请求首页数据
    this.getTchList()
    //页面挂载时请求生活区帖子数据
    this.getLiveList()
    //若是生活区帖子，则向后端请求七牛上传的Token
    this.getUploadToken();
  },
  activated(){
    this.getTchList()
    //页面挂载时请求生活区帖子数据
    this.getLiveList()
  },

  //监听搜索框内容
  watch:{
    searchValue:function(newvs,oldvs){
      if(!newvs){
        //关闭搜索展示框
        this.showSearch = false;
      }else {
        this.showSearch = true
      }
    }
  },
  //动态计算数据
  computed: {
    searchData: function() {
      this.products = this.tchlist.concat(this.livelist)
      var searchValue = this.searchValue;

      if (searchValue) {
        return this.products.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return String(product[key]).toLowerCase().indexOf(searchValue) > -1
          })
        })
      }

      return this.products;
    }
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
      this.tchtitle = '';
      this.tchmodel = '';
      this.shadow = true;
      this.shadowedit = true;
      console.log('click');
      console.log(this.active);
    },
    goDetail2(item) {
      if(item.isLive == 0){
        this.$router.push({path: '/detail', query: {paicheNo: item._id}})
      }else {
        this.$router.push({path: '/livedetail', query: {paicheNo: item._id}})
      }  
    },
    //关闭编辑界面
    closeEdit() {
      //判断title和内容是否为空，若为空则直接关闭编辑界面，否则弹出提示框
      if(this.tchtitle == '' && this.tchmodel == ''){
          this.shadow = false;
          this.shadowedit = false;
          return
      }
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
    //点击提交按键触发的事件
    commitEdit() {
      //若用户点击了提交但是title或者content其中一个未填写，则Toast
      if(this.tchtitle == '' || this.tchmodel == '' && this.active == 'tab-container1'){
        Toast({
          message: '存在空白未填',
          position: 'middle',
          duration: 2000
        });
        return
      }
      if((this.tchtitle == '' || this.introduction == '') && this.active == 'tab-container2'){
        Toast({
          message: '存在空白未填',
          position: 'middle',
          duration: 2000
        });
        return
      }
       MessageBox.confirm('', { 
         message: '确定提交吗？', 
         title: '提示', 
         confirmButtonText: '确定', 
         cancelButtonText: '取消' 
         }).then(action => { 
         if (action == 'confirm') { //确认的回调
            //console.log(JSON.parse(localStorage.getItem('isLogin')));
            let data = JSON.parse(localStorage.getItem('isLogin'));
            //console.log(this.tchmodel);
            //判断当前tab是属于哪个区，不同区请求不同的后端接口
            if(this.active=='tab-container1') {
              var parama = new URLSearchParams();
              let config = {
                  headers:{'Content-Type':'application/x-www-form-urlencoded'}
              };
              parama.append('id',data.list[0]._id);
              parama.append('avatar',data.list[0].avatar);
              parama.append('nickName',data.list[0].userName);
              parama.append('title',this.tchtitle);
              parama.append('text',this.tchmodel);
              parama.append('time',new Date());
              parama.append('isLive',0);
              let that = this
              axios.post('/technique/savetch',parama,config).then((response)=>{
                let res = response.data;
                if(res.status == 0){
                  //返回插入成功的信息
                  //console.log(res.result.list[res.result.count-1])
                  //获取数据库返回的所有帖子，并取最后一条（即最新一条帖子）加入tchList进行显示
                  this.tchlist.unshift(res.result.list[res.result.count-1])
                }
              });
            }else {
              //console.log(this.token)
              //调用uploadImgToQiniu方法上传图片
              //http://po6mzjm9a.bkt.clouddn.com/FlaSyfe_G1b9xeYQSnpuvYV02SAa
              if(this.picList.length > 0){
                for(var i=0 ; i < this.picList.length ; i++) {
                  this.uploadImgToQiniu(this.picList[i]);
                }
              }
              /*var that = this;
              setTimeout(function(){
                that.saveLive();
                that.picList = [];
                that.picArr2 = [];
                that.tchtitle = '';
                that.introduction = '';
                that.imageUrls = [];
              },4000)*/

              //console.log(this.imageUrls[0]);
            }
            this.shadow = false;
            this.shadowedit = false;
         }
         }).catch(err => { 
         if (err == 'cancel') {     //取消的回调
          return
         } 
       })
    },
    tab1() {
      this.active = 'tab-container1'
    },
    tab2() {
      this.active = 'tab-container2'
    },
    //获取技术区的所有帖子，并且倒序展示，目的是为了让最新的数据展示在页面最上面
    getTchList() {
      let that = this;
      axios.get('/technique/techList',{}).then((response)=>{
        let res = response.data;
        if(res.status == 0){
           that.tchlist = res.result.list.reverse()
           Indicator.close();
        }
      })
    },
    //跳转帖子的详情，并携带参数id(id为帖子的唯一主键)
    goDetail(id) {
      //console.log("go to detail");
      this.$router.push({path: '/detail', query: {paicheNo: id}})
    },
    //点击添加图片按键触发的方法
    addPic(e){
      var that = this;
      //获取input DOM对象
      var input = $("#uploaderInput");
      input.unbind('change').on('change', function (e) {
        var file = input[0].files;
        if(that.picList.length < 6){
          that.picList.push(file[0])
        }
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        var img = new Image;
        reader.onload = function (e) {
          //$("#newClassImg").attr("src",this.result);
          //判断用户选择的图片是否已到达六张，若是则弹出Toast
          if(that.picArr2.length >= 6){
              Toast({
                message: '最多选择6张图片哦',
                position: 'middle',
                duration: 2000
              });
            return
          };
          /*var width = 200,quality = 0.8,
          canvas = document.createElement("canvas"),
          drawer = canvas.getContext("2d");
          img.src = this.result; 
          img.onload = function() {
            canvas.width = width;
            canvas.height = width * (img.height / img.width)
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            that.picList.push(canvas.toDataURL("image/png", quality));
          }*/
          that.picArr2.push(this.result)
        };
      });
    },
    getUploadToken() {
      let that = this;
      axios.get('/live/getToken',{}).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //console.log(res.result.token)
          that.token = res.result.token;
          //console.log(that.token)
        }
      });
    },
     //上传图片到七牛
    uploadImgToQiniu(file){
      //console.log(this.token)
        let that = this;
        const axiosInstance = axios.create({withCredentials: false});    //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
        let data = new FormData();
        data.append('token', this.token);     //七牛需要的token，叫后台给，是七牛账号密码等组成的hash
        data.append('file', file);
        axiosInstance({
            method: 'POST',
            url: 'http://upload-z1.qiniup.com',  //上传地址
            data: data,
            timeout:30000,      //超时时间，因为图片上传有可能需要很久
            onUploadProgress: (progressEvent)=> {
                //imgLoadPercent 是上传进度，可以用来添加进度条
                let imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            },
        }).then(data =>{
            //上传成功...  (登录七牛账号，找到七牛给你的 URL地址) 和 data里面的key 拼接成图片下载地址
            //console.log(data.data.key)
            //图片地址拼接
            var url = 'http://yun.lan.perdream.cn/' + data.data.key
            this.imageUrls.push(url)
            //console.log(this.imageUrls.length)
            //console.log(this.picList.length)
            if(this.imageUrls.length == this.picList.length){
                this.saveLive();
            }
        }).catch(function(err) {
            //上传失败
        });
    },
    saveLive() {
      //console.log(this.imageUrls)
      let data = JSON.parse(localStorage.getItem('isLogin'));
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('id',data.list[0]._id);
      parama.append('avatar',data.list[0].avatar);
      parama.append('nickName',data.list[0].userName);
      parama.append('title',this.tchtitle);
      parama.append('text',this.introduction);
      parama.append('time',new Date());
      for (var i=0;i<this.imageUrls.length;i++) {
        parama.append('imageUrls',this.imageUrls[i]);
      }    
      parama.append('isLive',1);
      let that = this
      axios.post('/live/savelive',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          that.picList = [];
          that.picArr2 = [];
          that.tchtitle = '';
          that.introduction = '';
          that.imageUrls = [];
          //返回插入成功的信息
          //console.log(res.result.list[res.result.count-1])
          //获取数据库返回的所有帖子，并取最后一条（即最新一条帖子）加入tchList进行显示
          console.log(res)
          that.livelist.unshift(res.result.list[res.result.count-1])
          //将显示图片数组和上传数据的数组以及title和内容置空
        }
      });
    },
    getLiveList() {
      let that = this;
      axios.get('/live/livelist',{}).then((response)=>{
        let res = response.data;
        if(res.status == 0){
           that.livelist = res.result.list.reverse()
        }
      })
    },
    checkImg2(item) {
      this.mintData = item.list;
      this.showMswiper = true;
      this.defaultindex = item.index;
      //console.log(item)
    },
    closeCheck() {
      this.showMswiper = false;
      this.mintData = [];
      this.defaultindex = 0;
    },
  },
}
</script>
<style scoped>
* { touch-action: none; 
 }
.container {
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    bottom: 0;                                           
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
.container3 {
  height: 100%;
  width: 100%;                 
}
.wrapper2 {
  height: 100%;
  overflow: hidden;
}
.introduction {
  margin-top: 15px;
  height:120px;
}
.mint-cell-wrapper {
  font-size: 20px;
}
.imagecontainer {
  min-height: 180px;
  width: 100%;
  background:#888;
}
.addimage {
  position: relative;
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 42px;
  border-bottom: 1px solid #888888;
}
.tch-container {
  width: 100%;
  height: 100%;
  margin:40px 0;
  border: none;
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding:15px;
}
.content-dsc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin:0 10px;
  font-size: 15px;
  color:rgb(5, 27, 40);
  font-family:Microsoft YaHe;
}
.content-title {
  margin-top: 35px;
  height: 40px;
  width: 100%;
  border: none;
  padding:0 15px;
}
.imagecontainer div {
  border:1px solid grey;
  text-align: center;
  display: inline-block;
  width: 30%;
  margin-left: 6px;
  margin-bottom: 11px;
  margin-top: 5px;
}
.img {
  max-height: 80px;
}
.elbom {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.collect-ico {
  height: 40px;
  width: 40px;
  background-color: blue;
}
.search-container {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 56px;
  background-color: #F2F2F2;
}
.collect-container {
  height: 80px;
  margin:10px 15px;
  border-radius: 7px;
  padding: 10px 12px 5px 15px;
  background-color: pink;
  flex-direction: column;

}
.collect-title {
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 600;
    display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
    padding:0;
  margin:0;
  list-style: none; 
}
.collect-content {
  font-size: 12px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: grey;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding: 5px 0 4px 0;
    padding:0;
  margin:0;
  list-style: none; 
}
.collect-icon {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
.collect-name {
  padding: 0 2px;
  color: rgb(44,140,205);
}
</style>
