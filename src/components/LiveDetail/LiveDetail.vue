<template>
  <div>
    <div class="back">
      <span class="back2" @click="backToTch"><</span>
    </div>
    <div class="detail-head">
      <p class="detail-title">{{list.title}}</p>
      <p class="detail-time">{{list.time}}</p>
    </div>
    <div class="detail-author">
      <img :src="list.avatar" class="detail-author-avatar" @click="goPersonalPage">
      <span class="detail-nick">{{list.nickName}}</span>
      <div class="detail-btn" @click="collectTie">{{hascollect==1?'取消':'收藏'}}</div>
    </div>
    <div class="detail-imgs" v-for="(item,index) in list.imageUrls" :key="index">
      <img :src="item">
    </div>
    <div class="detail-content">
      <p class="detail-contents">{{list.text}}</p>
    </div>
    <comment :list="list"></comment>
  </div>
</template>

<script>
import axios from 'axios'
import comment from './../../base/comment'
import { MessageBox,Field,Button,Toast  } from 'mint-ui'
export default {
  name: 'LiveDetail',
  data () {
    return {
      list:[],
      hascollect:0,
      userId:JSON.parse(localStorage.getItem('isLogin')).list[0]._id,
      btntext:'收藏'
    }
  },
  components:{
    comment,
    MessageBox,
    Toast
  },
  methods: {
    backToTch() {
      this.$router.go(-1);
      this.list=[];
    },
    getLive() {
      let param = {
        id:this.$route.query.paicheNo
      }
      axios.get('/live/liveData',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0 && res.result.count > 0){
          //console.log(res.result.list[0]);
          this.list = res.result.list[0]
        }
      })
    },
    //发送后端，查询collections表，是否存在该帖子，以此判断是否收藏过
    checkCollected() {
      let param = {
        tieId:this.$route.query.paicheNo,
        userId:this.userId
      }
      axios.get('/collect/hascllected',{
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
    //执行加载数据的方法
    fetchData2(){
      this.getLive();
      this.checkCollected()
    },
    //点击收藏按键，收藏该贴，向后端存储当前用户id、帖子id、帖子title、帖子content、帖子发表人avatar、帖子发表人nickName //帖子发表时间time
    collectTie() {
      //console.log(this.list)
      let data = JSON.parse(localStorage.getItem('isLogin'));
      if(this.hascollect == 1){
        //用户已经收藏过该帖子，再次点击弹出框，提示用户是否删除收藏
         MessageBox.confirm('', { 
         message: '确定要取消收藏吗？', 
         title: '提示', 
         confirmButtonText: '确定', 
         cancelButtonText: '取消' 
         }).then(action => { 
         if (action == 'confirm') {     //确认的回调
          //调用取消收藏的方法
          this.disCollectedMethod()
         }
         }).catch(err => { 
         if (err == 'cancel') {     //取消的回调
          return
         } 
         });
      }else{
        //用户未收藏过该帖子，点击进行收藏
        //调用请求后端的插入数据库收藏集合的方法
        //console.log(this.hascollect)
        this.collectMethod(data)
      }
    },
     //该方法是收藏的执行方法
    collectMethod(data) {
      //  收藏该贴，向后端存储当前用户id、帖子id、帖子title、帖子content、帖子发表人avatar、帖子发表人nickName帖子发表时间time
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userId',data.list[0]._id);
      parama.append('toId',this.list.id);
      parama.append('title',this.list.title);
      parama.append('tieId',this.list._id);
      parama.append('text',this.list.text);
      parama.append('nickName',this.list.nickName);
      parama.append('avatar',this.list.avatar);
      parama.append('time',this.list.time);
      parama.append('isLive',1);
      let that = this
      axios.post('/collect/collectTie',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //返回插入成功的信息
          Toast({
            message: '收藏成功',
            position: 'middle',
            duration: 2000
          });
          //改变按键字样
          this.hascollect = 1;
        }
      });
    },
     //取消收藏的方法
    disCollectedMethod() {
      let param = {
        tieId:this.$route.query.paicheNo,
        userId:this.userId
      }
      axios.get('/collect/discollect',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //console.log(res.msg)
          Toast({
            message: '取消收藏',
            position: 'middle',
            duration: 2000
          })

          //改变按键样式
          this.hascollect = 0
        }
      })
    },
    //跳转发帖人的个人页面
    goPersonalPage() {
      this.$router.push({path: '/personal', query: {personId: this.list.id}})
    }
  },
  mounted(){
    this.getLive();
  },
  created() {
    var self = this;
    self.fetchData2();
  },
  //监听路由变化，执行fetchData
  watch:{
    '$route':'fetchData2'
  }
}
</script>
<style scoped>
.back {
  height: 30px;
  width: 100%;
  margin-top: 10px;
  border-bottom: 1px solid #ebebeb;
}
.back2 {
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  margin-left: 15px;
}
.detail-head {
  min-height: 60px;
  width: 100%;
}
.detail-title {
  margin:0 15px;
  padding-top: 10px;
  font-size: 18px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.detail-time {
  font-size: 10px;
  margin-left: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.detail-author {
  position: relative;
  height: 50px;
  margin-top: 10px;
  background-color: #ebebeb;
}
.detail-author-avatar {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  position: absolute;
  top:50%;
  left: 15px;
  margin-top: -13px;
}
.detail-nick {
  font-size: 13px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  margin-left: 50px;
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
.detail-content {
  width: 100%;
}
.detail-contents {
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 17px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.detail-imgs {
  width: 100%;
  padding: 25px 10px 10px 10px;
}
</style>
