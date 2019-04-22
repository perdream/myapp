<template>
  <div>
    <title-bar></title-bar>
    <div class="mine-header" :style="{'background':'url('+this.$store.state.avatar+')'}">
    </div>
    <img :src="avatar"  @click.prevent='showchoosebar' id="newClassImg" class="mine-icon">
    <span class="mine-title">{{nickName}}</span>
    <span class="mine-title2">{{des}}</span>
      <md-list>
        <md-list-item style="height:80px;line-height:80px;margin-top:10px;" @click="goEdit">
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">个人信息</span>
        </md-list-item>

        <md-list-item style="height:80px;line-height:80px;">
          <md-icon>delete</md-icon>
          <span class="md-list-item-text" @click="goAttention">我的关注</span>
        </md-list-item>

        <md-list-item style="height:80px;line-height:80px;">
          <md-icon>error</md-icon>
          <span class="md-list-item-text">问题反馈</span>
        </md-list-item>

        <md-list-item style="height:80px;line-height:80px;">
          <md-icon>supervisor_account</md-icon>
          <span class="md-list-item-text" @click="goMessage">消息中心</span>
        </md-list-item>
      </md-list>
  	<bottom-bar></bottom-bar>
    <transition name="normal">
      <div class="choose" v-show="showchoose">
        <ul class="ul_choose">
          <li class="li_choose">
            拍照
            <input type="file" accept="image/*" capture="camera" class="elbom" id="takephotos" @click='takephoto'/>
          </li>
          <li class="li_choose">
            从相册中选择
            <input type="file" accept="image/*" multiple="multiple" id="uploaderInput" class="elbom" @click='addPic'/>
          </li>
          <li class="line_li">
          </li>
          <li class="li_choose" @click='close_choose_shade'>
            取消
          </li>
        </ul>
      </div>
    </transition>
    <transition name="shadow">
      <div class="shade" v-show='show_shade' @click='close_choose_shade'>
      </div>
    </transition>
  </div>
</template>

<script>
import TitleBar from './../../base/TitleBar'
import BottomBar from './../../base/BottomBar'
import 'jquery'
import axios from 'axios'
export default {
  name: 'Mine',
  data () {
    return {
      showchoose:false,
      show_shade:false,
      picArr:[],
      token:'',
      avatar:'',
      nickName:'',
      des:'',
    }
  },
  components:{
    TitleBar,
    BottomBar,
  },
  sockets: {
    connect: function() {
      console.log("mine界面监听");
    },

  },
  methods: {
    goEdit() {
      this.$router.push({path:'/information'});
    },
    goMessage() {
      this.$router.push({path:'/message'});
    },
    //打开头像选择
    showchoosebar(){
      this.showchoose = true;
      this.show_shade = true;
    },
    //关闭头像选择
    close_choose_shade () {
      this.showchoose = false;
      this.show_shade = false;
    },
    addPic(e){
      var that = this;
      this.picArr.pop();
      //获取input DOM对象
      var input = $("#uploaderInput");
      input.unbind('change').on('change', function (e) {
            var file = input[0].files;
            that.picArr.push(file[0]);
        var reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = function (e) {
                $("#newClassImg").attr("src",this.result);
              };
            that.close_choose_shade()
            that.getUploadToken()
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
          that.uploadImgToQiniu(that.picArr[0])
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
                let imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            },
        }).then(data =>{
            var url = 'http://yun.lan.perdream.cn/' + data.data.key
            //将图片存入数据库：修改对应用户的avatar
            //console.log(url)
            //http://po6mzjm9a.bkt.clouddn.com/FvaYwFq-Tk9QE6_HgvRg0Zx6Hdvu
            this.updataAvatar(url)
        }).catch(function(err) {
            //上传失败
        });
    },
    updataAvatar(url) {
      //将用户userId,头像url传入后端，用于修改用户头像url
      let userId = this.$store.state.myId
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('avatar',url);
      let that = this
      axios.post('/users/updataavatar',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //修改头像成功
          //console.log(res)
          let userId = JSON.parse(localStorage.getItem('isLogin')).list[0]._id
          var parama = new URLSearchParams();
          let config = {
              headers:{'Content-Type':'application/x-www-form-urlencoded'}
          };
          parama.append('userId',userId);
          axios.post('/users/getUserInformation',parama,config).then((response)=>{
            let res = response.data;
            if(res.status == 0){
              that.avatar = res.result.list.avatar
              that.$store.commit('updataAvatar',res.result.list.avatar);
              //修改缓存中的个人中的头像信息
              let user = {
                'avatar':res.result.list.avatar
              }
              localStorage.setItem("avatar",JSON.stringify(user));
              //console.log(JSON.parse(localStorage.getItem('avatar')))
              that.updataCollectAvatar(res.result.list.avatar)
              that.updataCommentAvatar(res.result.list.avatar)
              that.updataTchAvatar(res.result.list.avatar)
              that.updataLiveAvatar(res.result.list.avatar)
              that.updataAttentionAvatar(res.result.list.avatar)
              that.updataApplyAvatar(res.result.list.avatar)
              that.updataRecentAvatar(res.result.list.avatar)
              that.$socket.emit('refreshTitle');
            }
          });
        }
      })
    },
    //修改collects中的集合头像
    updataCollectAvatar(url) {
      let userId = this.$store.state.myId
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('avatar',url);
      axios.post('/collect/updataavatar',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
          }
        });
    },
    //修改comment评论表中的对应头像
    updataCommentAvatar(url) {
      let userId = this.$store.state.myId
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('avatar',url);
      axios.post('/comment/updataavatar',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
          }
        });
    },
    //修改技术贴表中的对应头像
    updataTchAvatar(url) {
      let userId = this.$store.state.myId
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('avatar',url);
      axios.post('/technique/updataavatar',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
          }
        });
    },
     //修改生活贴表中的对应头像
    updataLiveAvatar(url) {
      let userId = this.$store.state.myId
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('avatar',url);
      axios.post('/live/updataavatar',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
          }
        });
    },
   //修改收藏表中的对应头像
    updataAttentionAvatar(url) {
      let userId = this.$store.state.myId
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('avatar',url);
      axios.post('/attention/updataavatar',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
          }
        });
    },
    //修改最近聊天表中的对应头像
    updataApplyAvatar(url) {
      let userId = this.$store.state.myId
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('avatar',url);
      axios.post('/apply/updataavatar',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
          }
        });
    },
    //修改申请表中的对应头像
    updataRecentAvatar(url) {
      let userId = this.$store.state.myId
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',userId);
      parama.append('avatar',url);
      axios.post('/recent/updataavatar',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
          }
        });
    },
    takephoto (e) {
      this.close_choose_shade();
      var that = this;
      this.picArr.pop();
      //获取input DOM对象
      var input = $("#takephotos");
      input.unbind('change').on('change', function (e) {
        var file = input[0].files;
        that.picArr.push(file[0]);
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function (e) {
          $("#newClassImg").attr("src",this.result);
        };
        that.close_choose_shade()
        that.getUploadToken()
      });
    },
    goAttention() {
      this.$router.push({path:'/attention'});
    },
  },
  activated() {
    let userId = JSON.parse(localStorage.getItem('isLogin')).list[0]._id
    var parama = new URLSearchParams();
    let config = {
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
    };
    parama.append('userId',userId);
    axios.post('/users/getUserInformation',parama,config).then((response)=>{
      let res = response.data;
      if(res.status == 0){
        this.avatar = res.result.list.avatar
        this.nickName = res.result.list.userName
        this.des = res.result.list.des
      }
    });
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
.md-list-item-content {
  min-height: 80px;
}
.mine-header {
  height: 100px;
  width: 100%;
  overflow: hidden;
  filter: blur(9px);
  background-repeat: no-repeat;
}
.mine-icon {
  position: absolute;
  top: 90px;
  left: 20px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  z-index: 1;
}
.mine-title {
  position: absolute;
  top: 90px;
  left: 80px;
  font-size: 17px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: #000;
}
.mine-title2 {
  position: absolute;
  top: 115px;
  left: 80px;
  font-size: 17px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: rgb(199,199,205);
}
.choose {
  width: 100%;
  height: 130px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
  background-color: white;
  font-family: Microsoft YaHe;
  font-weight: 600;
  color: #222;
}
.ul_choose {
  height: 100%;
  width: 100%;
}
.li_choose {
  position: relative;
  width: 100%;
  height: 42px;
  text-align: center;
  line-height: 42px;
  border-bottom: 1px solid #888888;
}
.line_li {
  height: 5px;
  width: 100%;
  background-color: black;
  opacity: 0.5;
}
.normal-enter-active, .normal-leave-active{
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.86, 0.18, 0.82, 1.32)
}

.normal-enter, .normal-leave-to {
    opacity: 0;
    transform: translate3d(0, -100px, 0);
    transform: translate3d(0, 100px, 0);
}
.shade {
  height:100%;
  width: 100%;
  position: absolute;
  top:0;
  left: 0;
  z-index: 2;
  opacity: 0.8;
  background-color: #444444;
}
.shadow-enter-active, .shadow-leave-active{
  opacity: 1;
  transition: all 0.3s
}
.shadow-enter,.shadow-leave-to{
  opacity: 0;
}
.elbom {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
