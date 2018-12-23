<template>
  <div class="container">
  	<title-bar></title-bar>
  	<scroll-view class="wrapper">
  	<div class="wrapper-container">
  		<md-list class="md-triple-line">
			<md-list-item @click="goMessageDetail">
				<md-avatar>
				  <img src="https://placeimg.com/40/40/people/1" alt="People">
				</md-avatar>

				<div class="md-list-item-text">
				  <span>Ali Connors</span>
				  <span>Brunch this weekend?</span>
				  <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
				</div>

				<md-button class="md-icon-button md-list-action">
				</md-button>
			</md-list-item>

	      <md-divider class="md-inset"></md-divider>

	      <md-list-item>
	        <md-avatar>
	          <img src="https://placeimg.com/40/40/people/6" alt="People">
	        </md-avatar>

	        <div class="md-list-item-text">
	          <span>me, Scott, Jennifer</span>
	          <span>Summer BBQ</span>
	          <p>Wish I could come, but I'm out of town this week. :(</p>
	        </div>

	        <md-button class="md-icon-button md-list-action">
	        </md-button>
	      </md-list-item>

	      <md-divider class="md-inset"></md-divider>

	      <md-list-item>
	        <md-avatar>
	          <img src="https://placeimg.com/40/40/people/5" alt="People">
	        </md-avatar>

	        <div class="md-list-item-text">
	          <span>Sandra Adams</span>
	          <span>Oui oui</span>
	          <p>Do you have Paris recommendations? Have you visited good places?</p>
	        </div>

	        <md-button class="md-icon-button md-list-action">
	        </md-button>
	      </md-list-item>
    	</md-list>
		
	    <!--test scroll一-->
    	<md-list class="md-triple-line">
			<md-list-item>
				<md-avatar>
				  <img src="https://placeimg.com/40/40/people/1" alt="People">
				</md-avatar>

				<div class="md-list-item-text">
				  <span>Ali Connors</span>
				  <span>Brunch this weekend?</span>
				  <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
				</div>

				<md-button class="md-icon-button md-list-action">
				</md-button>
			</md-list-item>

	      <md-divider class="md-inset"></md-divider>

	      <md-list-item>
	        <md-avatar>
	          <img src="https://placeimg.com/40/40/people/6" alt="People">
	        </md-avatar>

	        <div class="md-list-item-text">
	          <span>me, Scott, Jennifer</span>
	          <span>Summer BBQ</span>
	          <p>Wish I could come, but I'm out of town this week. :(</p>
	        </div>

	        <md-button class="md-icon-button md-list-action">
	        </md-button>
	      </md-list-item>

	      <md-divider class="md-inset"></md-divider>

	      <md-list-item>
	        <md-avatar>
	          <img src="https://placeimg.com/40/40/people/5" alt="People">
	        </md-avatar>

	        <div class="md-list-item-text">
	          <span>Sandra Adams</span>
	          <span>Oui oui</span>
	          <p>Do you have Paris recommendations? Have you visited good places?</p>
	        </div>

	        <md-button class="md-icon-button md-list-action">
	        </md-button>
	      </md-list-item>
	      <md-list-item>
	        <md-avatar>
	          <img src="https://placeimg.com/40/40/people/6" alt="People">
	        </md-avatar>

	        <div class="md-list-item-text">
	          <span>me, Scott, Jennifer</span>
	          <span>Summer BBQ</span>
	          <p>Wish I could come, but I'm out of town this week. :(</p>
	        </div>

	        <md-button class="md-icon-button md-list-action">
	        </md-button>
	      </md-list-item>

	      <md-divider class="md-inset"></md-divider>
    	</md-list>
    	<!--test scroll二-->
    	<md-list class="md-triple-line">
			<md-list-item>
				<md-avatar>
				  <img src="https://placeimg.com/40/40/people/1" alt="People">
				</md-avatar>

				<div class="md-list-item-text">
				  <span>Ali Connors</span>
				  <span>Brunch this weekend?</span>
				  <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
				</div>

				<md-button class="md-icon-button md-list-action">
				</md-button>
			</md-list-item>

	      <md-divider class="md-inset"></md-divider>

	      <md-list-item>
	        <md-avatar>
	          <img src="https://placeimg.com/40/40/people/6" alt="People">
	        </md-avatar>

	        <div class="md-list-item-text">
	          <span>me, Scott, Jennifer</span>
	          <span>Summer BBQ</span>
	          <p>Wish I could come, but I'm out of town this week. :(</p>
	        </div>

	        <md-button class="md-icon-button md-list-action">
	        </md-button>
	      </md-list-item>

	      <md-divider class="md-inset"></md-divider>

	      <md-list-item>
	        <md-avatar>
	          <img src="https://placeimg.com/40/40/people/5" alt="People">
	        </md-avatar>

	        <div class="md-list-item-text">
	          <span>Sandra Adams</span>
	          <span>Oui oui</span>
	          <p>Do you have Paris recommendations? Have you visited good places?</p>
	        </div>

	        <md-button class="md-icon-button md-list-action">
	        </md-button>
	      </md-list-item>
	      <md-list-item>
	        <md-avatar>
	          <img src="https://placeimg.com/40/40/people/6" alt="People">
	        </md-avatar>

	        <div class="md-list-item-text">
	          <span>me, Scott, Jennifer</span>
	          <span>Summer BBQ</span>
	          <p>Wish I could come, but I'm out of town this week. :(</p>
	        </div>

	        <md-button class="md-icon-button md-list-action">
	        </md-button>
	      </md-list-item>

	      <md-divider class="md-inset"></md-divider>
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
export default {
  name: 'Message',
  data () {
    return {
    }
  },
  components:{
  	TitleBar,
  	ScrollView,
  	BottomBar
  },
  methods:{
  	goMessageDetail() {
  		this.$router.push({
  			path:'/message/messagedetail',
  			 query: {
			  A: 'a'
			},
  		});
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
</style>
