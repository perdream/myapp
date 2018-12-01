<template>
  <div class="container">
    <title-bar>
    </title-bar>
    <!--mainpage content-->
    <scroll-view class="wrapper">
      <div class="wrapper-container">
        <md-card>
          <md-card-header>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/1" alt="Avatar">
            </md-avatar>
            <div class="md-title">Title goes here</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header>
          <md-card-media>
            <img src="@/assets/images/card-image-1.jpg" alt="People">
          </md-card-media>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non
          </md-card-content>
            <md-card-actions>
              <md-button class="md-icon-button">
                哈哈
              </md-button>

              <md-button class="md-icon-button">
                哈哈
              </md-button>

              <md-button class="md-icon-button">
                哈哈
              </md-button>
          </md-card-actions>
        </md-card>
        <md-card>
          <md-card-header>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/5" alt="Avatar">
            </md-avatar>
            <div class="md-title">Title goes here</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header>
          <md-card-media>
            <img src="@/assets/images/bar.jpg" alt="People">
          </md-card-media>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non
          </md-card-content>
            <md-card-actions>
              <md-button class="md-icon-button">
                哈哈
              </md-button>

              <md-button class="md-icon-button">
                哈哈
              </md-button>

              <md-button class="md-icon-button">
                哈哈
              </md-button>
          </md-card-actions>
        </md-card>
      </div>
    </scroll-view>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import ScrollView from './../../base/scroll'
import TitleBar from './../../base/TitleBar'
import BottomBar from './../../base/BottomBar'
export default {
  name: 'MainPage',
  data () {
    return {

    }
  },
  components:{
    ScrollView,
    TitleBar,
    BottomBar
  },
  methods:{
    goMessage() {
      this.$router.push({path:'/message'});
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
.wrapper {
  height: 100%;
  overflow: hidden;
}
.wrapper-container {
  padding-bottom: 106px;
  background: rgba(0,0,0,.01);
}
</style>
