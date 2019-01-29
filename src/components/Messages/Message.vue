<template>
  <div class="container">
  	<title-bar></title-bar>
	  	<scroll-view class="wrapper">
		  	<div class="wrapper-container">
		  		<md-list class="md-triple-line" v-for="(item,index) in chatlist" :key="index">
		  			<slider-delete>
						<md-list-item @click="goMessageDetail" >
								<md-avatar>
								<img src="https://placeimg.com/40/40/people/1" alt="People">
								</md-avatar>

								<div class="md-list-item-text">
								  <span>{{item.s1}}</span>
								  <span>{{item.s2}}</span>
								  <p>{{item.p}}</p>
								</div>
								<md-button class="md-icon-button md-list-action">
									<md-icon class="md-primary">chat_bubble</md-icon>
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
export default {
  name: 'Message',
  data () {
    return {
    	chatlist:[
	    	{	
	    		id:1,
	    		avatar:'https://placeimg.com/40/40/people/6',
	    		s1:'me, Scott, Jennifer',
	    		s2:'Summer BBQ',
	    		p:"Wish I could come, but I'm out of town this week. :("
	    	},
	    	{	
	    		id:2,
	    		avatar:'https://placeimg.com/40/40/people/6',
	    		s1:'me, Scott, Jennifer',
	    		s2:'Summer BBQ',
	    		p:"Wish I could come, but I'm out of town this week. :("
	    	},
	    	{	
	    		id:3,
	    		avatar:'https://placeimg.com/40/40/people/6',
	    		s1:'me, Scott, Jennifer',
	    		s2:'Summer BBQ',
	    		p:"Wish I could come, but I'm out of town this week. :("
	    	},
	    	{	
	    		id:4,
	    		avatar:'https://placeimg.com/40/40/people/6',
	    		s1:'me, Scott, Jennifer',
	    		s2:'Summer BBQ',
	    		p:"Wish I could come, but I'm out of town this week. :("
	    	},
	    	{	
	    		id:5,
	    		avatar:'https://placeimg.com/40/40/people/6',
	    		s1:'me, Scott, Jennifer',
	    		s2:'Summer BBQ',
	    		p:"Wish I could come, but I'm out of town this week. :("
	    	},
	    	{	
	    		id:6,
	    		avatar:'https://placeimg.com/40/40/people/6',
	    		s1:'me, Scott, Jennifer',
	    		s2:'Summer BBQ',
	    		p:"Wish I could come, but I'm out of town this week. :("
	    	},
	    	{	
	    		id:7,
	    		avatar:'https://placeimg.com/40/40/people/6',
	    		s1:'me, Scott, Jennifer',
	    		s2:'Summer BBQ',
	    		p:"Wish I could come, but I'm out of town this week. :("
	    	},
    	]
    }
  },
  components:{
  	TitleBar,
  	ScrollView,
  	BottomBar,
  	SliderDelete
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
</style>
