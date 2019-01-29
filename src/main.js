// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import store from './store/store'
import 'vue-material/dist/vue-material.min.css'
import fastclick from 'fastclick'
import 'material-design-icons/iconfont/material-icons.css'
import Mint from 'mint-ui';

//引入mint_UI
Vue.use(Mint);

//引入vuematerial
Vue.use(VueMaterial)

//fastclick绑定body
Vue.config.productionTip = false
fastclick.attach(document.body);

//vue-socket
import VueSocketIO from 'vue-socket.io'
//import socketio from 'socket.io-client'
//Vue.use(VueSocketio,socketio('http://localhost:8082'))

Vue.use(new VueSocketIO({
    //debug: true,
    connection: 'http://localhost:8989',
}))

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  created(){
  	if(localStorage.getItem("isLogin") === null){
  		localStorage.setItem("isLogin",'');
  	}
  	this.$store.state.isLogin = localStorage.getItem('isLogin');
  },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
    //根据字段判断是否路由过滤
    if (to.matched.some(record => record.meta.auth)) {
        if (localStorage.getItem('isLogin')!== '') {
          //console.log('heooo');
            next()
        } else {
            //防止无限循环
            if (to.name === 'Login') {
                next();
                return
            }
            next({
                path: '/',
            });
        }
    } else {
        next()//若点击的是不需要验证的页面,则进行正常的路由跳转
    }
});

