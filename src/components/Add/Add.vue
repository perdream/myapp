<template>
  <div>
    <title-bar></title-bar>
    <div class="collect-container" v-for="(item,index) in datalist" :key="index" @click="goDetail(item)" v-if="datalist.length > 0">
      <div class="collect-title">{{item.title}}</div>
      <p class="collect-content">{{item.text}}</p>
      <div>
        <img :src="item.avatar" class="collect-icon">
        <span class="collect-name">{{item.nickName}}</span>
        <span>{{(item.time).substring(0,10)}}</span>
      </div>
    </div>
  	<bottom-bar></bottom-bar>
  </div>
</template>

<script>
import TitleBar from './../../base/TitleBar'
import BottomBar from './../../base/BottomBar'
import axios from 'axios'
export default {
  name: 'Add',
  data () {
    return {
      datalist:[]
    }
  },
  components:{
    TitleBar,
    BottomBar
  },
  methods: {
    getCollections() {
      let userId = JSON.parse(localStorage.getItem('isLogin')).list[0]._id;
      let param = {
        userId:userId
      }
      axios.get('/collect/getcollections',{
        params:param
      }).then((response)=>{
        let res = response.data;
        if(res.status == 0 && res.result.count > 0){
          this.datalist = res.result.list
        }
      })
    },
    goDetail(item) {
      this.datalist = [];
      if(item.isLive == 0){
        this.$router.push({path: '/detail', query: {paicheNo: item.tieId}})
      }else {
        this.$router.push({path: '/livedetail', query: {paicheNo: item.tieId}})
      }  
    }
  },
  mounted() {
    this.getCollections()
  },
  activated() {
    this.getCollections()
  }
}
</script>
<style scoped>
*{
  padding:0;
  margin:0;
  list-style: none;
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
}
.collect-content {
  font-size: 12px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: grey;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding: 5px 0;
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
