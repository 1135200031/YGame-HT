<template>
  <div id="app">
    <div  v-if="$store.state.user">
      <com-one></com-one>
    </div>
    <div v-else>
      <com-two ></com-two>
    </div>



  </div>
</template>

<script>
  import Nav from './components/Nav'
  import Login from './components/Login'
  import store from './vuex/store.js'

export default {
  name: 'App',
  store,
  data(){
    return{

    }
  },
  components:{
     'com-one':Nav,
    'com-two':Login

  },
  methods:{
     show(){

     }
  }
}
</script>

<style>
  *{
    list-style: none;
    margin:0;
    padding:0;
  }
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}


</style>

