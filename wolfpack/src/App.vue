
<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container">
      <router-view></router-view>
     
    </div>
  </div>
</template>

<script>

import Navbar from "./components/NavBar";
export default {
  name: 'app',
  components:{
    Navbar
  }
}
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding-top: 50px;
}
</style>
