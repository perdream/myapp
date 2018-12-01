<template>
  <div>
  	this is main page
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    return {
    }
  },
  created(){
  	console.log(localStorage.getItem('isLogin'));
  }
}
</script>
<style scoped>
</style>
