<template>
  <div>
	<div class="list-header">
	  	<span class="list-back-icon" @click="back"><</span>
	  	<p class="list-title">关注</p>
    </div>
    <div class="attention-item" v-for="(item,index) in attentionlist" :key="index" v-if="attentionlist.length" @click="goPersonalPage(item)">
    	<img :src="item.avatar" class="attention-item-avatar">
    	<p class="attention-item-nick">{{item.nickName}}</p>
    	<div class="detail-btn">已关注</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Attention',
  data () {
    return {
      attentionlist:[],
    }
  },
  methods:{
  	back() {
  		this.$router.go(-1);
  	},
    getAttentions() {
      let param = {
        userId:this.$store.state.myId
      }
      axios.get('/attention/getattention',{
        params:param
      }).then((response)=>{
        let res = response.data;
          if(res.status == 0){
            this.attentionlist = res.result.list
          }
      })
    },
    goPersonalPage(item) {
      this.$router.push({path: '/personal', query: {personId: item.attentionId}})
    }
  },
  activated() {
    this.getAttentions()
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
.list-header {
	height: 40px;
	width: 100%;
	position: relative;
	background-color: rgb(157,163,173);
}
.list-back-icon {
	height: 40px;
	line-height: 40px;
	margin-left: 20px;
	font-size: 25px;
	color: #000;
}
.list-title {
	width: 60px;
	position: absolute;
	top: 25%;
	left: 50%;
	margin-left: -30px;
	font-size: 15px;
	text-align: center;
}
.attention-item {
  position: relative;
	height: 70px;
	width: 100%;
	display: inline-flex;
	border-bottom: 10px solid rgb(245,245,248);
}
.attention-item-avatar {
	height: 40px;
	width: 40px;
	border-radius: 5px;
	margin-top: 15px;
	margin-left: 17px;
}
.attention-item-nick {
	height: 70px;
	padding-left: 10px;
	line-height: 70px;
}
.detail-btn {
  position: absolute;
  top: 21px;
  right: 50px;
  font-size: 13px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 24px;
  width: 45px;
  border:1px solid rgb(157,163,173);
  text-align: center;
  color: rgb(157,163,173);
  border-radius: 5px;
}
</style>
