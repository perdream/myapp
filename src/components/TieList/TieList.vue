<template>
  <div>
  <div class="list-header">
  	<span class="list-back-icon" @click="back"><</span>
  	<p class="list-title">{{islive == 0?'技术贴':'生活贴'}}</p>
  </div>
	<div class="person-blog-container" v-for="(item,index) in finalList" :key="index" v-if="finalList.length" @click="goDetail(item)">
  		<p class="person-blog-title">{{item.title}}</p>
  		<p class="person-blog-content">{{item.text}}</p>
  		<span class="person-blog-time">{{item.time}}</span>
  	</div>
  	<p class="tip" v-if="!finalList.length">暂时没发过帖子哦~~</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TieList',
  data () {
    return {
    	personId:'',
    	islive:'',
    	finalList:[],
    }
  },
  methods:{
  	back() {
  		this.$router.go(-1);
  	},
  	//获取某个用户的技术贴
  	getPersonTch() {
		let param = {
			id:this.personId,
		}
		axios.get('/technique/getpersontch',{
			params:param
		}).then((response)=>{
	        let res = response.data;
	        if(res.status == 0){
	        	this.finalList = res.result.list.reverse();
	        }
	    })
  	},
  	getPersonLive() {
		let param = {
			id:this.personId,
		}
		axios.get('/live/getpersonlive',{
			params:param
		}).then((response)=>{
	        let res = response.data;
	        if(res.status == 0){
	        	this.finalList = res.result.list.reverse();
	        }
	        //console.log(this.finalList)
	        //this.$router.push({path: '/detail', query: {paicheNo: id}})
	    })
  	},
  	goDetail(item) {
  		if(item.isLive == 1){
  			this.$router.push({path: '/livedetail', query: {paicheNo: item._id}})
  		}else {
  			this.$router.push({path: '/detail', query: {paicheNo: item._id}})
  		}
  	},
  },
  activated() {
	  	this.personId = this.$route.query.paicheNo;
	  	this.islive = this.$route.query.islive;
	  	//调用响应的获取帖子数据的方法
	  	//根据参数islive判断是技术贴还是生活贴
	  	if( this.islive == 0){
	  		//调用技术贴方法
	  		this.getPersonTch()
	  	}else{
	  		this.getPersonLive()
	  	}

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
	border-bottom: .5px solid rgb(157,163,173);
	position: relative;
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
	font-size: 17px;
	text-align: center;
}
.person-blog-container {
	height: 120px;
	width: 100%;
	border-bottom: .5px solid rgb(157,163,173);
}
.person-blog-title {
	padding: 20px 25px 5px 15px;
	font-size: 17px;
	font-weight: 500px;
	color: rgb(41,45,52);
}
.person-blog-content {
	padding:0px 25px 0px 15px;
	font-size: 15px;
	color: rgb(157,163,173);
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.person-blog-time {
	display: block;
	padding-top: 10px;
	padding-left: 15px;
	font-size: 12px;
	color: rgb(157,163,173);
}
.tip {
	height: 200px;
	width: 100%;
	line-height: 200px;
	text-align: center;
	font-size: 20px;
	color: rgb(157,163,173);
}
</style>
