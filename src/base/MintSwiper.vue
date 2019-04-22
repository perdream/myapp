<template>
    <div class="bottom-container" @click="closeCheck">
      <div class="img-container">
        <mt-swipe :auto="0" :defaultIndex="defaultindex">
          <mt-swipe-item v-for="(item,index) in mintData" :key="index"><img :src="item" class="img"></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="shadow">
      </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  name: 'MintSwiper',
  data () {
    return {
    }
  },
  props:{
    mintData:Array,
    defaultindex:0,
  },
  mounted() {
  },
  methods:{
    //点击阴影像父组件触发closeCheck方法，提示父组件关闭MintSwiper组件
    closeCheck() {
      this.$emit('closeCheck')
    }
  },
  components:{
  	Swipe,
  	SwipeItem
  },
}
</script>
<style scoped>
.bottom-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

}
.img-container {
  min-height:300px;
  width: 100%;
  position: fixed;
  top: 50%;
  bottom:20%;
  left: 0;
  right: 0;
  margin-top: -100px;
  z-index: 1001;
}
.img {
width: auto;
height: auto;
max-width: 100%;
max-height: 100%;
}
.mint-swipe-item {
  text-align: center;
}
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8);
  z-index: 1000;
}
</style>
