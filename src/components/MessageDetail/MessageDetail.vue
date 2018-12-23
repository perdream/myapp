<template>
  <div>
    <md-field>
      <label>Type here!</label>
      <md-input v-model="content"></md-input>
      <span class="md-helper-text">Helper text</span>
    </md-field>
    <button @click="sendMsg">send</button>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'MessageDetail',
  data () {
    return {
    	content:'',
    	text:''
    }
  },
  /*created(){
    console.log('hello');
  },*/
  mounted(){
    //console.log('hello');
    console.log(this.$route.query);
  },
  sockets: {
	    //不能改,j建立连接自动调用connect
	    connect: function() {
	      //与socket.io连接后回调
	      console.log("56565");
	    },
		//服务端向客户端发送news事件
	    news: function(value) {
	     //监听login(后端向前端emit  login的回调)
		console.log(value)
	    },
	    //服务端发来resvmsg
	    resvmsg(value) {
	    	console.log(value)
	    	this.text = value.msg
	    },
	    /*error() {
	    	console.log('error');
	    }*/
    },
    methods:{
    	sendMsg() {
    		//console.log(this.content);
    		this.$socket.emit('sendMsg',{from:this.$store.state.userid,to:'13012257584',msg:this.content})
    	}
    }
}
</script>
<style scoped>
</style>
