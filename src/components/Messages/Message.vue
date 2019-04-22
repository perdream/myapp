<template>
  <div class="container">
  	<title-bar></title-bar>
	  	<scroll-view class="wrapper">
		  	<div class="wrapper-container">
          <div class="apply-container" @click="goAppyPage">
            <img src="@/assets/images/apply.png" class="apply-icon">
            <p :class="{ 'apply-text': showapply, 'apply-text2': !showapply}">{{showapply==true?'有新好友请求':'暂无添加消息'}}</p>
          </div>
		  		<md-list class="md-triple-line" v-for="(item,index) in recentList" :key="index" v-if="recentList.length >=1" @click="goMessageDetail(item)">
		  			<slider-delete @msg-from-child="delRecent(item)">
						<md-list-item  >
								<md-avatar>
								<img :src="item.avatar" alt="People">
								</md-avatar>

								<div class="md-list-item-text">
								  <span>{{item.fromNickName}}</span>
								  <p>{{item.text}}</p>
								</div>
								<md-button class="md-icon-button md-list-action">
									<p v-show="item.num > 0" class="numclass">{{item.num > 99 ?'99+':item.num}}</p>
								</md-button>
								<md-divider class="md-inset"></md-divider>
						</md-list-item>
					</slider-delete>
			      <!--<md-divider class="md-inset"></md-divider>-->
			    </md-list>
			</div>
		</scroll-view>
	  	<bottom-bar></bottom-bar>
  </div>
</template>

<script>
import TitleBar from './../../base/TitleBar'
import BottomBar from './../../base/BottomBar'
import ScrollView from './../../base/scroll'
import SliderDelete from './../../base/SliderDelete'
import axios from 'axios'
export default {
  name: 'Message',
  data () {
    return {
    	/*chatlist:[
	    	{	
	    		id:1,
	    		avatar:'https://placeimg.com/40/40/people/6',
	    		s1:'me, Scott, Jennifer',
	    		s2:'Summer BBQ',
	    		p:"Wish I could come, but I'm out of town this week. :("
	    	},
    	]*/
    	recentList:[],
      from:'',
      text:'',
      fromName:'',
      avatar:'',
      tip:false,
      showapply:false,
    }
  },
  components:{
  	TitleBar,
  	ScrollView,
  	BottomBar,
  	SliderDelete
  },
  activated(){
  	//页面每次载入都重新获取最近聊天数据（recent）,只获取isdel==2的数据，即没标记删除的条目
  	this.getRecent();
  },
  sockets: {
      //不能改,j建立连接自动调用connect
      connect: function() {
        //与socket.io连接后回调
        console.log("我是message页面");
      },
      //服务端发来resvmsg
      resvmsg(value) {
        if(value.to == this.$store.state.myId){
          //console.log(value)
          this.from = value.from;
          this.fromName = value.fromName;
          this.text = value.msg;
          this.avatar = value.avatar;
          //console.log(this.from+' '+this.fromName)
          this.hasRecent()
        }
      },
      resvappy(value) {
        if(value.toId == this.$store.state.myId){
          //将缓存信息保存在本地
          localStorage.setItem("apply",JSON.stringify(value));
          this.showapply = true
        }
      },
    },
  methods:{
    //删除最近聊天条目
    delRecent(item) {
      let param = {
        userId:this.$store.state.myId,
        fromId:item.fromId
      }
      axios.get('/recent/delrecent',{
          params:param
      }).then((response)=>{
        let res = response.data;
          if(res.status == 0){
            this.getRecent()
          }
        })
    },
  	goMessageDetail(item) {
      //将对应未读消息数值为零
      this.updataNum0();
  		this.recentList = [];
  		this.$router.push({
  			path:'/message/messagedetail',
  			 query: {
          id: item.fromId,
          userName: item.fromNickName,
          avatar:item.avatar
			},
  		});
  	},
    //查看是否已经存在这样一条recent数据
    hasRecent() {
      //当前用户id
      let userId = this.$store.state.myId;
      //调用查询recent集合的接口，查看是否存在这两个条件对用的数据
      let param = {
        userId:userId,
        fromId:this.from
      }
      axios.get('/recent/hasrecent',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0&&res.result.count > 0){
          //调用后端接口，改变未读条数num值
        //存在该数据，则调用更新该条数据的接口，修改条目中的text文本
        var parama = new URLSearchParams();
        let config = {
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
        };
        parama.append('userId',this.$store.state.myId);
        parama.append('fromId',this.from);
        parama.append('text',this.text);
        axios.post('/recent/updatarecent',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
            this.updataNum()
          }
        })
        }else{
          //不存在数据，调用存储接口，保存userid、fromid、text、fromNickName、isdel=2、num=0、avatar
          var parama = new URLSearchParams();
          let config = {
              headers:{'Content-Type':'application/x-www-form-urlencoded'}
          };
          parama.append('userId',this.$store.state.myId);
          parama.append('fromId',this.from);
          parama.append('text',this.text);
          parama.append('fromNickName',this.fromName);
          parama.append('isdel',2);
          parama.append('num',1);
          parama.append('avatar',this.avatar);
          let that = this
          axios.post('/recent/addrecent',parama,config).then((response)=>{
            let res = response.data;
            if(res.status == 0){
              //添加最近聊天条目成
               this.getRecent()
            }
          });
        }
      })
    },
  	getRecent() {
  		let userId = this.$store.state.myId
	    let param = {
	      userId:userId,
	    }
	    axios.get('/recent/getrecent',{
	        params:param
	    }).then((response)=>{
		    let res = response.data;
	        if(res.status == 0){
	          this.recentList = res.result.list
	        }
        })
  	},
    updataNum() {
      var parama = new URLSearchParams();
          let config = {
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
          };
          parama.append('userId',this.$store.state.myId);
          parama.append('fromId',this.from);
          axios.post('/recent/updatanum',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
            this.getRecent()
        }
      })
    },
    updataNum0(){
          var parama = new URLSearchParams();
          let config = {
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
          };
          parama.append('userId',this.$store.state.myId);
          parama.append('fromId',this.from);
          axios.post('/recent/updatanum0',parama,config).then((response)=>{
          let res = response.data;
          if(res.status == 0){
            this.getRecent()
        }
      })
    },
    goAppyPage() {
      this.showapply = false;
      this.$router.push({
        path:'/applypage'
      })
    }
  }
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
    list-style: none;                                             
}
.md-divider {
	background-color: rgba(0,0,0,0.06);
}
.wrapper {
	height: 100%;
    overflow: hidden;
}
.wrapper-container {
  padding-bottom: 100px;
  background: rgba(0,0,0,.01);
}
.md-list-item-text {
	min-width: 70%;
}
.numclass {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  padding-top: 2px;
  padding-right: 2px;
  padding-left: 2px;
}
.apply-container {
  width: 100%;
  height: 60px;
  background-color: pink;
}
.apply-icon {
  float: left;
  margin-left: 20px;
  margin-top: 14px;
}
.apply-text {
  float:left;
  margin-left: 25px;
  color: red;
}
.apply-text2 {
  float:left;
  margin-left: 25px;
  color: grey;
}
</style>
