<template>
    <div>
	    <transition name="outline">
	      <div class="popup" v-if="popupVisible" @click="goMessageDetail(msg.from,msg.fromName,$store.state.avatar)">
	        <div class="popup-title">
	          <img src="@/assets/images/comment.png" class="popup-img">
	          <span class="popup-name">{{msg.fromName}}</span>
	        </div>
	        <div class="popup-content">
	          <p class="popup-msg">{{msg.msg}}</p>
	        </div>
	      </div>
	    </transition>
    </div>
</template>

<script>
export default {
  name: 'pop',
  data () {
    return {
    	popupVisible:false,
    	msg:'',
    }
  },
  methods:{
    goMessage() {
      this.$router.push({path:'/message'});
    },
    goHome() {
      this.$router.push({path:'/mainpage'});
    },
    showPop() {
      //console.log("click");
      console.log(this.$route.path);
      if(this.$route.path != '/message/messagedetail'){
        this.popupVisible = true;
        setTimeout(() => {
          this.popupVisible = false;
        }, 2000); 
      }
    },
    change(val) {
    	this.msg = val[val.length-1];
    	//console.log(this.msg[this.msg.length-1]);
    	if(this.msg.from == this.$store.state.myId){
    		return
    	}else{
    		console.log(this.msg);
    		this.showPop();
    	}
    },
    //跳转聊天界面
    goMessageDetail(param1,param2,param3) {
      this.$router.push({
          path:'/message/messagedetail',
           query: {
            id: param1,
            userName: param2,
            avatar:param3
        },
      });
    }
  }
}
</script>
<style scoped>
.popup {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  height: 60px;
  z-index: 200;
  border-radius: 10px;
  background-color: rgba(254,254,254,0.98);
}

/*弹出消息窗口动画*/
.outline-enter-active {
  animation: nav .5s ease-in-out;
}
.outline-enter {
  animation: nav .5s ease-in-out;
}
.outline-leave-active {
  animation: nav .5s ease-in-out reverse;
}
@keyframes nav {
  0% {
    opacity: 0;
    transform: translate(0,-100%);
  }
  100% {
    opacity: 1;
    transform: translate(0,0);
  }
} 
.popup-title {
  width: 100%;
  height: 45%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  text-align: center;
}
.popup-content {
  position: relative;
  width: 100%;
  height: 55%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.popup-img {
  position: absolute;
  top: 5px;
  left: 10px;
}
.popup-name {
  position: absolute;
  top: 6px;
  left: 40px;
  font-size: 15px;
  color: #333;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 500;
}
.popup-msg {
  position: absolute;
  top:0;
  left: 10px;
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  color: #333;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 500;
}
</style>
