<template>
  <div>
  	<md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <span class="menus">=</span>
      </md-button>
      <md-app>
        <md-app-toolbar class="md-primary">
          <span class="md-title">My Title</span>
        </md-app-toolbar>
      </md-app>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent md-drawer2" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  data () {
    return {
      showNavigation: false,
      showSidepanel: false
    }
  }
}
</script>
<style scoped>
.md-toolbar {
  background-color: #383835;
  color: #fff;
}
.menus {
  width: 40px;
  color: #fff;
  font-size: 35px;

}
.md-drawer {
 background:#F5F5F5;
}
.md-drawer2 {
  background:#F5F5F5;
  color: #000;
  margin-top: 10px;
}
.md-list-item{
  margin-top: 20px;
  border-bottom: 1px solid grey;
}
</style>
