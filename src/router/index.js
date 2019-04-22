import Vue from 'vue'
import Router from 'vue-router'
import Login from './../components/Login'
import MainPage from './../components/MainPage/MainPage'
import Register from './../components/Register/Register'
import Message from './../components/Messages/Message'
import MessageDetail from './../components/MessageDetail/MessageDetail'
import Add from './../components/Add/Add'
import Mine from './../components/Mine/Mine'
import Information from './../components/Information/Information'
import Detail from './../components/Detail/Detail'
import LiveDetail from './../components/LiveDetail/LiveDetail'
import Personal from './../components/Personal/Personal'
import TieList from './../components/TieList/TieList'
import Attention from './../components/Attention/Attention'
import AddFriend from './../components/AddFriend/AddFriend'
import ApplyPage from './../components/ApplyPage/ApplyPage'
import Forget from './../components/Forget/Forget'

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
      meta:{index:4,auth:true},
      component:Message,
    },
    {
      path:'/message/messagedetail',
      component: MessageDetail,
      meta:{index:5,auth:true},
    },
    {
      path:'/add',
      name: 'Add',
      meta:{index:3,auth:true},
      component: Add
    },
    {
      path:'/mine',
      name: 'Mine',
      meta:{index:5,auth:true},
      component: Mine
    },
    {
      path:'/information',
      name: 'Information',
      meta:{index:6,auth:true},
      component: Information
    },
    {
      path:'/detail',
      name: 'Detail',
      meta:{index:6,auth:true},
      component: Detail
    },
    {
      path:'/livedetail',
      name: 'LiveDetail',
      meta:{index:6,auth:true},
      component: LiveDetail
    },
    {
      path:'/personal',
      name: 'Personal',
      meta:{index:7,auth:true},
      component: Personal
    },
    {
      path:'/tielist',
      name:'TieList',
      meta:{index:8,auth:true},
      component:TieList
    },
    {
      path:'/attention',
      name:'Attention',
      meta:{index:6,auth:true},
      component:Attention
    },
    {
      path:'/addfriend',
      name:'AddFriend',
      meta:{index:6,auth:true},
      component:AddFriend
    },
    {
      path:'/applypage',
      name:'ApplyPage',
      meta:{index:6,auth:true},
      component:ApplyPage
    },
    {
      path:'/forget',
      name:'Forget',
      meta:{index:1,auth:true},
      component:Forget
    }
  ]
})
