<template>
    <div id="login-bg">
       <div id="bg-bor">
          <div id="bor-top-logo">
            <img src="./../assets/yougame.png" alt="" id="bor-img1">
            <img src="./../assets/logogu_03.png" alt="" id="bor-img2">
          </div>
          <div id="bor-mid-login">
             <div>
               <span>账号 ： </span><input placeholder="请输入账号" type="text" id="user" v-model="username"  autocomplete="off">
             </div>
            <div>
              <span>密码 ： </span><input  placeholder="请输入密码" type="password" id="pass" v-model="password"   autocomplete="new-password">
            </div>
        <button @click="sign" id="truelogin">登&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp录</button>
          </div>
       </div>
    </div>
</template>

<script>
  import store from './../vuex/store.js'
    export default {
        name: "Login",
        data(){
          return{
              username:'',
            password:''
          }
        },
        store,
        methods:{
          sign(){
            let a=this.username;
            let b=this.password;
            this.$axios({
              method:'get',
              url:'http://localhost:8081/managelogin',
              params:{
                 user:a,
                pass:b
              }
            })
              .then((res)=>{
                if(this.username==res.data.data[0].ma_name){
                  this.$store.state.name=res.data.data[0].ma_nickname;
                  sessionStorage.setItem('user',a);
                  this.$store.commit('login');
                  this.$router.push({path:'/home'});
                }else{

                  this.username='';
                  this.password='';
                  alert('账号或者密码错误')
                }

              }).catch((err)=>{
                if(this.username==''){
                  this.username='';
                  this.password='';
                  alert('账号不能为空')
                }else if(this.password==''){
                  this.username='';
                  this.password='';
                  alert('密码不能为空')
                }else if(this.username==''&&this.password==''){
                  this.username='';
                  this.password='';
                  alert('账号和密码不能为空')
                }else{
                  this.username='';
                  this.password='';
                  alert('账号或者密码错误')
                }

            });

          }
        }
    }
</script>

<style scoped>
   #login-bg{
     width: 1366px;
     height: 672px;
     background: url("./../assets/login4.jpg") ;
     background-size:100% 100%;
   }
  #bg-bor{
    width: 400px;
    height: 500px;

    position: absolute;
    left: 60%;
    top:13%;
  }
  #bor-top-logo{

     width: 380px;
    height: 55px;
    line-height: 55px;
    margin: 20px 10px 0 10px;
   }
  #bor-img1{
     width: 200px;
    height: 55px;
  }
   #bor-img2{
    float: right;
     width: 180px;
     height: 55px;
   }
  #bor-mid-login{
    width: 380px;
    height: 200px;
    margin: 20px 10px 0 10px;
    text-align: center;
    color: rgba(253,160,1,0.75);
  }
   #bor-mid-login div{
     background: url('./../assets/loginx.png');
     background-size:100% 100%;
     margin-top: 50px;
     border-radius: 10px ;
   }


  #user{
    background:rgba(0,0,0,0);
    border: 0;
    padding: 10px 8px;
    outline: none;
    width: 250px;
    color: rgba(253,160,1,0.75);
    border-radius: 10px ;
  }
  #pass{
    background:rgba(0,0,0,0);
    border: 0;
    padding: 10px 8px;
    outline: none;
    width: 250px;
    color: rgba(253,160,1,0.75);
    border-radius: 10px ;

  }
  #truelogin{
    width: 200px;
    height: 55px;
    background: url('./../assets/loginx.png');
    background-size:100% 100%;
    outline: none;
    border-radius: 10px ;
    color: rgba(253,160,1,0.75);
    border: 0;

    font-size: 20px;
    text-align: center;
    cursor: pointer;
    margin-top: 50px;

  }

</style>
