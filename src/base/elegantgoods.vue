<template>
  <div>
    <div class="container" v-for="item in livelist" @click="goDetail(item._id)">
      <div class="avartar-name">
        <div class="avartaer">
          <img :src="item.avatar" class="avartaer-img">
        </div>
        <div class="nameg">
          <span class="name1">{{item.title}}</span>
          <span class="name2">{{item.time}}</span>
        </div>
      </div>
      <div class="goods-img">
        <best-slider :img="item.imageUrls" @checkImg="checkImg"></best-slider>
      </div>
      <div class="goods-detail">
        <p class="goods-detail-text">{{item.text}}</p>
      </div>
      <div class="from-zan">
        <span class="fromwhere"><span class="fromarea">来自</span>{{item.nickName}}</span>
        <span></span>
        <span></span>
      </div>
      <div class="divider"></div>
    </div>
  </div>

</template>

<script>
import bestSlider from './../base/bestslider'
export default {
  name: 'elegantgoods',
  props:{
    livelist:Array,
  },
  components:{
    bestSlider,
  },
  methods:{
    checkImg(para) {
      //console.log(para);
      this.$emit('checkImg2',para)
    },
    goDetail(id) {
      this.$router.push({path: '/livedetail', query: {paicheNo: id}})
    }
  }

}
</script>
<style scoped>
.container {
  position: relative;
  height: 300px;
  width: 100%;
}
.avartar-name {
  height: 20%;
  width: 100%;
  display: flex;
  overflow: hidden;
}
.goods-img {
  height: 40%;
  width: 100%;
  margin-top: 10px;
  overflow: hidden;
}
.goods-detail {
  height: 20%;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid rgb(244,244,244);
  margin-top: 3%;
}
.from-zan {
  height: 13%;
  width: 100%;
  overflow: hidden;
  font-size: 13px;
  font-family:Microsoft YaHe;
  position: relative;
}
.avartaer {
  width: 20%;
  height: 100%;
  text-align: center;
  margin-left: 5px;
}
.nameg {
  flex: 1;
  margin-left: 10px;
  overflow: hidden;
  font-family:Microsoft YaHe;
}
.avartaer-img {
  width: 50%;
  zoom: 1;
  height: auto;
  border-radius: 5px;
  margin-top: 15%;
}
.name1 {
  display: block;
  height: 38%;
  width: 100%;
  font-size: 15px;
  margin-top: 7px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.name2 {
  height: 50%;
  width: 100%;
  display: block;
  font-size: 10px;
}
.goods-detail-text {
  width: 100%;
  height: 72%;
  margin:10px 10px 5px 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding:0 5px;
  font-family:Microsoft YaHe;
}
.divider {
  width: 100%;
  height: 2%;
  background-color: rgb(244,244,244);
}
.fromwhere {
  position: absolute;
  top: 50%;
  left: 10px;
  margin-top: -8px;
  color: #00BFFF;
}
.fromarea {
  margin-right: 10px;
}
</style>