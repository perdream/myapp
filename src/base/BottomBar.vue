<template>
    <div class="bottom-container">
      <md-bottom-bar md-sync-route>
        <md-bottom-bar-item to="" md-label="Home" @click="goHome" md-icon="home"></md-bottom-bar-item>
        <md-bottom-bar-item to="" md-label="Add" md-icon="add_location" @click="goAdd"></md-bottom-bar-item>
        <md-bottom-bar-item md-label="Message" @click="goMessage" md-icon="message"></md-bottom-bar-item>
        <md-bottom-bar-item to="" md-label="Mine" md-icon="account_circle" @click="goMine"></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
</template>

<script>
export default {
  name: 'BottomBar',
  data () {
    return {
    }
  },
  methods:{
    goMessage() {
      this.$router.push({path:'/message'});
    },
    goHome() {
      this.$router.push({path:'/mainpage'});
    },
    goAdd() {
      this.$router.push({path:'/add'});
    },
    goMine() {
      this.$router.push({path:'/mine'});
    }
  }
}
</script>
<style scoped>
.bottom-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff

}
</style>
