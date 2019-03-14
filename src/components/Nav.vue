
<template>
  <div id="box">
    <div id="top">
     <div>
       <marquee behavior="" direction="left">YouGame后台管理系统</marquee>
     </div>
      <div class="top-name">{{this.name}}</div>
      <div class="top-exit" @click="exitto">退出</div>
      <div><i class="iconfont icon-gerenzhongxin top-pic" ></i></div>
    </div>
    <div>
      <div id="nav-left">
        <h1><img src="../assets/yougame.png" alt=""></h1>
        <ul>
          <router-link to="/home" tag="li"> <i class="iconfont icon-icon-test"></i><span>首&nbsp;页</span></router-link>
          <router-link to="/customer" tag="li"> <i class="iconfont icon-web-icon-"></i><span>用户管理</span></router-link>
          <router-link to="/order" tag="li"><i class="iconfont icon-dingdan" ></i><span>订单管理</span></router-link>
          <router-link to="/games" tag="li"><i class="iconfont icon-youxi" ></i><span>游戏管理</span></router-link>
          <router-link to="/comm" tag="li"><i class="iconfont icon-shangpin1 " ></i><span>商品管理</span></router-link>
          <router-link to="/service" tag="li"><i class="iconfont icon-kefu" ></i><span>客服管理</span></router-link>
          <router-link to="/forum" tag="li"><i class="iconfont icon-luntan" ></i><span>论坛管理</span></router-link>
        </ul>
      </div>
      <div id="nav-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

  import store from './../vuex/store.js'

  export default {
        name: "Nav",
        data(){
          return{
            name:this.$store.state.name
          }
        },
      store,
      methods:{
        exitto(){
          this.$store.state.name='';
          this.$router.push({path:'/Login'});
          this.$store.commit('exit');
        }
      }

    }
</script>

<style scoped lang="less">
  *{
    list-style: none;
  }
  #box{
    width: 1350px;
    margin: 0 auto;
    overflow: hidden;

    }
  #top{
    text-align: center;
    width: 1350px;
    height: 50px;
    background: #1A1E2E;
    color: rgb(153,153,153);
    overflow: hidden;
    :hover{
      color: white;
    }
    marquee{
      width: 600px;
      height: 50px;
      line-height: 50px;
      margin-left: 130px;

  }
    div{
      margin-left: 20px;
      float: left;
      height: 50px;
      line-height: 50px;

    }
    .top-name{
      width: 200px;
      text-align: center;
      margin-left: 280px;
    }
    .top-exit{
      margin-left: -20px;
      cursor: pointer;
    }
    i{
      font-size: 30px;
      margin-left:30px;
    }
  }
   #nav-left{
     text-align: center;
     width: 150px;
     height: 622px;
     float: left;
     color: rgb(153,153,153);
     background: #292E41;
     img{
       width:120px;
       height: 60px;
       margin-top: 10px;
     }
     ul{
       margin: 0 ;
       padding: 0;
       li:hover{
         background: #1A1E2E;
         color: white;
       }
       li{
         padding: 10px;
         margin-bottom:10px;
         i{
           font-size: 24px;
           margin-right: 10px;
           width: 20px;
           transition:all 1s linear;

         }
         span{
           width: 82px;
           display: inline-block;
         }
       }
     }
   }
   #nav-right{
     width: 1200px;
     height: 622px;
     float: left;
     overflow: auto;
     background: rgb(247,254,255);
   }
</style>

