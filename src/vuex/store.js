import  Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const  store=new Vuex.Store({
  state:{
    count:1,
    user:false,
    name:null
  },
  mutations:{
    add(state){
      state.count++
    },
    exit(state){
      sessionStorage.setItem('user',null);
      state.name = null;
      state.user = false;
    },
    login(state){
      state.user=false
    },
    userStatus(state,user){
      if (user){
        state.name=user;
        state.user=true;
      }else if (user == null){
        sessionStorage.setItem('user',null);
        state.name = null;
        state.user = false;
      }
    }

  },

});

export  default  store
