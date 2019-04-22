<template>
  <div>
    <div class="awsomeswipercontainer">
      <swiper :options="swiperOption" class="awsomeswipercontainer2" >
        <swiper-slide class="swip" v-for="(item,index) in img" :key="index"><img :src="item" class="item-img" @click.stop="goDetail(index)"></swiper-slide>
      </swiper>
    </div>
  </div>

</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name:'bestslider',
    data() {
      return {
        swiperOption: {
          slidesPerView: 2.5,
          spaceBetween:0,
          freeMode: true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          pagination: {
            clickable: true
          }
        }
      }
    },
    components:{
      swiper,
      swiperSlide,
    },
    props:{
      img:Array,
    },
    methods:{
      goDetail(index) {
        //console.log(item)
        this.$emit('checkImg',{
          index:index,
          list:this.img
        })
      }
    }
  }
</script>
<style scoped>
  .awsomeswipercontainer {
    width: 100%;
    overflow-x: auto;
  }
  .awsomeswipercontainer2 {
    height: 130px;
    white-space: nowrap;
    font-size: 0;
    text-align: center;
  }
  .swip {
    box-sizing: border-box;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    display: inline-block;
    width: 200px;
    height: 100%;
    margin-left: 3px;
    border-radius: 6px;
  }
  .item-img {
    width: 120px;
    height: 120px;
    border-radius: 5px;
  }
</style>