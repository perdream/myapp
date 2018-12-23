import Vue from 'vue'
import Router from 'vue-router'
import Login from './../components/Login'
import MainPage from './../components/MainPage/MainPage'
import Register from './../components/Register/Register'
import Message from './../components/Messages/Message'
import MessageDetail from './../components/MessageDetail/MessageDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta:{index:0},
      component: Login
    },
    {
    	path:'/mainpage',
    	name:'MainPage',
      meta:{index:2,auth:true},
    	component:MainPage
    },
    {
      path:'/register',
      name:'Register',
      meta:{index:1},
      component:Register
    },
    {
      path:'/message',
      name:'Message',
      meta:{index:3,auth:true},
      component:Message,
    },
    {
      path:'/message/messagedetail',
      component: MessageDetail,
      meta:{index:4,auth:true},
    }
  ]
})
