<template>
  <div>
    <div class="back">
      <span class="back2" @click="backToMine"><</span>
    </div>
    <!--个人信息-->
    <mt-field label="昵称" :placeholder="userInformation.userName" v-model="username" class="name"></mt-field>
    <mt-field label="手机号" :placeholder="userInformation.phoneNum" type="tel" v-model="phone"></mt-field>
    <mt-field label="自我介绍" :placeholder="userInformation.des" type="textarea" rows="4" v-model="introduction"></mt-field>
    <mt-button size="large" class="btn-commit" plain @click="commit">确认更改</mt-button>     
  </div>
</template>

<script>
import { Field,Toast} from 'mint-ui';
import axios from 'axios'
export default {
  name: 'Information',
  data () {
    return {
      username:'',
      phone:'',
      introduction:'',
      userInformation:'',
    }
  },
  components:{
    Toast,
    Field
  },
  sockets: {
    //不能改,j建立连接自动调用connect
    connect: function() {
      //与socket.io连接后回调
      console.log("56565");
    },
  },
  activated() {
    this.getUserInformation()
  },
  methods: {
    backToMine() {
      this.$router.push({path:'/mine'});
      this.username = '';
      this.phone = '';
      this.introduction = '';
    },
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
          this.userInformation = res.result.list[0];
          console.log(this.userInformation)
        }
      })
    },
    //修改users表信息
    updateUserInfo(url){
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',this.$store.state.myId);
      parama.append('userName',this.username);
      parama.append('phoneNum',this.phone);
      parama.append('des',this.introduction);
      let that = this
      axios.post(url,parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          Toast({
            message: '修改成功',
            position: 'middle',
            duration: 2000
          })
        }
      });
    },
    commit() {
      if(this.username != this.userInformation.userName || this.phone != this.userInformation.phoneNum || this.introduction != this.userInformation.des){
        if(this.username == ''){
          this.username = this.userInformation.userName
        }
        if(this.introduction == ''){
          this.introduction = this.userInformation.des
        }
        if(this.phone == ''){
          this.phone = this.userInformation.phoneNum
        }else if(this.phone.length != 11){
          Toast({
            message: '请输入11位手机号',
            position: 'middle',
            duration: 2000
          })
          return
        }
        //修改users表
        let userUrl = '/users/updatainformation'
        this.updateUserInfo(userUrl)
        //修改技术贴表
        let tchUrl = '/technique/updatainformation'
        this.updateUserInfo(tchUrl)
        //修改recents表
        let recUrl = '/recent/updatainformation'
        this.updateUserInfo(recUrl)
        //修改message表
        let msgUrl = '/message/updatainformation'
        this.updateUserInfo(msgUrl)
        //修改live表
        let liveUrl = '/live/updatainformation'
        this.updateUserInfo(liveUrl)
        //修改collect表
        let colUrl = '/collect/updatainformation'
        this.updateUserInfo(colUrl)
        //修改attention表
        let attenUrl = '/attention/updatainformation'
        this.updateUserInfo(attenUrl)
        //修改apply表
        let appUrl = '/apply/updatainformation'
        this.updateUserInfo(appUrl)
        this.$socket.emit('updataNick',this.username);
      }
    }
  }
}
</script>
<style scoped>
.name {
  margin-top: 30px;
}
.back {
  height: 30px;
  width: 100%;
  margin-top: 10px;
}
.back2 {
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  margin-left: 15px;
}
.btn-commit {
  position: fixed;
  bottom:20px;
}
</style>