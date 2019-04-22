<template>
  <div>
    <div class="title-bar">
      <p class="title-text">评论
        <md-icon class="comment-icon" @click.native="showEdit">collections_bookmark</md-icon>
      </p>
    </div>
    <div class="comment-container" v-for="(item,index) in commentlist" :key="index" v-if="commentlist">
      <div class="comment-avatar"><img :src="item.avatar" class="img" @click="goPersonalPage(item)"></div>
      <div class="comment-text">
        <p class="nickName">{{item.nickName}}<span class="time">{{(item.time).substring(0,9)}}</span></p>
        <p class="comment-text" @click="childComment(item)">{{item.text}}</p>
        <div class="comment-back" v-if="item.childComments.length > 0">
          <p class="comment-back-text" v-for="(item1,index1) in item.childComments" :key="index1" ><span class="comment-back-up">{{item1.nickName}}<span v-show="item1.level != 1"><span v-show="item1.nickName != item1.toName"> 回复 {{item1.toName}}</span></span>:</span><span @click="postTirdComment(item1,item)">&nbsp{{item1.text}}</span></p>
        </div>
      </div>
    </div>
        <!--<div class="comment-container">
      <div class="comment-avatar"><img src="https://placeimg.com/40/40/people/1" class="img"></div>
      <div class="comment-text">
        <p class="nickName">weixin_41541925 <span class="time">12小时前</span></p>
        <p class="comment-text">我加上年终奖才16，一年半</p>
        <div class="comment-back">
          <p class="comment-back-text"><span class="comment-back-up">XYQ689: </span>我也是，感觉他们动不动三四十K的，好屌</p>
          <p class="comment-back-text"><span class="comment-back-up">XYQ689: </span>我也是，感觉他们动不动三四十K的，好屌</p>
          <p class="comment-back-text"><span class="comment-back-up">XYQ689 回复 weixin_41556565 : </span>6k肯定不是在北上广深</p>
        </div>
      </div>
    </div>-->
    <div class="showdow" v-if="showshadow" @click="closeEditPage">
    </div>
    <div class="text-container" v-if="showeditpage">
      <transition name="showparams">
        <div>
          <textarea rows="10" cols="30" class="tch-container" :placeholder="placeholder" v-model="text" ref="textarea2">
          </textarea>
          <mt-button size="large" class="btn-commit" type="primary" @click="commitComment">提交评论</mt-button>
        </div>
       </transition>
    </div>
  </div>
</template>

<script>
import { MessageBox,Field,Button,Toast  } from 'mint-ui'
import axios from 'axios'
export default {
  name: 'comment',
  data () {
    return {
      showeditpage:false,
      showshadow:false,
      text:'',
      mark:0,
      commentlist:[],
      fromId:'',//主贴的子评论的用户id
      toId:'',//z主贴的子评论中评论对象的id
      placeholder:'输入评论',
      level:1,
      mainId:'',
    }
  },
  props:{
    list:Object
  },
  methods:{
    showEdit() {
      this.placeholder = "输入评论"
      this.showeditpage = true;
      this.showshadow = true;
      //console.log(this.list._id)
    },
    closeEdit() {
      this.showshadow = false;
      this.showeditpage = false;
    },
    closeEditPage() {
      if(this.text == ''){
        this.showshadow = false;
        this.showeditpage = false;
        return
      }
       MessageBox.confirm('', { 
       message: '确定退出编辑吗？', 
       title: '提示', 
       confirmButtonText: '确定', 
       cancelButtonText: '取消' 
       }).then(action => { 
       if (action == 'confirm') {     //确认的回调
          this.text = '';
          this.showshadow = false;
          this.showeditpage = false;
       }
       }).catch(err => { 
       if (err == 'cancel') {     //取消的回调
        return
       } 
       });
    },
    commitComment() {
      //判断用户输入的信息是否为空
      if(this.text == ''){
        Toast({
          message: '请输入评论',
          position: 'middle',
          duration: 2000
        });
        return
      }
      //用户输入不为空，将用户id 头像 昵称 时间 评论内容 评论的帖子id 传给后端
      //获取当前用户信息（从缓存中获取）
      let data = JSON.parse(localStorage.getItem('isLogin'));
      if(this.mark == 0){
        if(this.placeholder == '输入评论'){
          this.saveMainComment(data)
        }else {
          this.commitChildComment(data)
        }
        
      }
      //console.log(data.list[0]);
      //this.$refs.textarea.placeholder = '评论某某人'
      //console.log(this.$refs.textarea.placeholder)
    },
    saveMainComment(data) {
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('userid',data.list[0]._id);
      parama.append('avatar',this.$store.state.avatar);
      parama.append('nickName',data.list[0].userName);
      parama.append('text',this.text);
      parama.append('time',new Date());
      parama.append('tieId',this.list._id);
      let that = this
      axios.post('/comment/saveTie',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //返回插入成功的信息
          this.text = '';
          this.closeEdit();
          this.commentlist = res.result.list;
        }
      });
    },
    getComments() {
      let param = {
        tieId:this.list._id
      }
      axios.get('/comment/commentList',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          this.commentlist = res.result.list
        }
      })
    },
    //评论主评论的步骤：1:弹出编辑框，并且根据评论的用户是否为主评论的发帖人修改placeholder
    childComment(item) {
      //弹出框
      this.showEdit()
      //修改placeholder
      this.placeholder = `评论 ${item.nickName}`
      this.toId = item.userId
      this.toName = item.nickName
      this.mainId = item._id
    },
    commitChildComment(data) {
      //向后端传入的数据格式{fromId,toId(默认为主贴发帖人id),text,nickName,toName}
      /*let param = {
        fromId:data.list[0]._id,
        toId:this.toId,
        text:this.text,
        nickName:data.list[0].userName,
        toName:this.toName
      }*/
      var parama = new URLSearchParams();
      let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
      };
      parama.append('fromId',data.list[0]._id);
      parama.append('toId',this.toId);
      parama.append('text',this.text);
      parama.append('nickName',data.list[0].userName);
      parama.append('toName',this.toName);
      parama.append('level',this.level);
      parama.append('mainId',this.mainId);
      let that = this
      axios.post('/comment/saveCild',parama,config).then((response)=>{
        let res = response.data;
        if(res.status == 0){
          //返回插入成功的信息
          this.getComments();
          this.text = '';
          this.closeEdit();
        }
      });
    },
    postTirdComment(item1,item) {
      //弹出框
      this.showEdit()
      //修改placeholder
      this.placeholder = `回复 ${item1.nickName}`
      //console.log('回复'+item.nickName)
      this.toId = item1.toId
      this.toName = item1.nickName
      this.level = 2
      this.tieId = item.tieId
      this.mainId = item._id
    },
    goPersonalPage(item) {
      console.log(item)
      this.$router.push({path: '/personal', query: {personId: item.userId}})
    }
  },
  components:{
    Button
  },
  watch: {
    list() {
      this.getComments()
    }
  }
}
</script>
<style scoped>
*{
  padding:0;
  margin:0;
  list-style: none;
}
.title-bar {
  height: 33px;
  width: 100%;
}
.title-text {
  height:33px;
  line-height: 33px;
  color: rgb(189,103,200); 
  font-size: 18px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-left: 15px;
}
.comment-icon {
  float: right;
  color: black;
  margin-right: 25px;
  margin-top: 5px;
}
.comment-container {
  width: 100%;
  display: inline-flex;
  margin-top: 9px;
}
.comment-avatar {
  width: 45px;
  text-align: center;
}
.img {
  height: 25px;
  width: 25px;
  margin-top: 9px;
  border-radius: 50%;
}
.comment-text {
  flex: 1;
  margin-right: 15px;
}
.nickName {
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: rgb(44,140,205);
}
.time {
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: rgb(189,103,200); 
  margin-left: 15px;
}
.comment-text {
  margin-top: 7px;
  margin-bottom: 10px;
  font-size: 17px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.comment-back {
  width: 100%;
  background-color: rgb(245,245,248);
  padding: 10px 0;
  border-radius: 3px;
}
.comment-back-text {
  font-size: 17px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin:5px 15px 10px 8px;
}
.comment-back-up {
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: rgb(44,140,205);
}
.edit-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.tch-container {
  width: 100%;
  height: 100%;
  margin:40px 0;
  border: none;
  font-size: 20px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding:15px;
  z-index: 1200;
}
.text-container {
  position: fixed;
  bottom: 80px;
  height: 200px;
  width: 100%;
  z-index: 1200;
}
.btn-commit {
  position: fixed;
  bottom: 0;
  z-index: 1200;
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
.showdow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0,0,0,0.8);
}
</style>
