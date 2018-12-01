<template>
  <div id="app">
  	<transition :name="transitionname">
	  	<keep-alive>
	    	<router-view/>
		    </router-view>
	    </keep-alive>
	</transition>
  </div>
</template>

<script>
export default {
    name: 'App',
    data() {
    	return {
    		transitionname:''
    	}
    },
	watch: {//监听route变化
		$route(to,from){
			if(to.meta.index > from.meta.index){
				this.transitionname = 'slide-left'
			}else{
				this.transitionname = 'slide-right'
			}
		}
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
