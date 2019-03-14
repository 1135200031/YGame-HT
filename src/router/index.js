import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Customer from '@/components/Customer.vue'
import Games from '@/components/games.vue'
import Order from '@/components/Order.vue'
import Commodity from '@/components/Commodity.vue'
import Statistics from '@/components/Statistics.vue'
import Service from '@/components/Service.vue'
import Forum from '@/components/Forum.vue'
import Customerone from '@/components/Customerone.vue'
import Login from '@/components/Login.vue'
import store from '@/vuex/store.js'

Vue.use(Router);

let aaa=new Router({
  mode:'history',
  routes: [

    {
      path: '/',
      redirect: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,meta:{auth:true},
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/customer',
      name: 'Customer',
      component: Customer,meta:{auth:true},
    },{
      path: '/customerone',
      name: 'Customerone',
      component: Customerone,meta:{auth:true},
    }, {
      path: '/order',
      name: 'Order',
      component: Order,meta:{auth:true},
    },
    {
      path: '/comm',
      name: 'Commodity',
      component: Commodity,meta:{auth:true},
    },
    {
      path: '/stati',
      name: 'Statistics',
      component: Statistics,meta:{auth:true},
    },
    {
      path: 'service',
      name: 'Service',
      component: Service,meta:{auth:true},
    },  {
      path: '/forum',
      name: 'Forum',
      component: Forum,meta:{auth:true},
    },  {
      path: '/games',
      name: 'Games',
      component: Games,meta:{auth:true},
    }



  ]
});

aaa.beforeEach((to, from, next) => {
  let n=sessionStorage.getItem("user");
  if (to.path === '/Login') {
    next();
    store.commit("userStatus",null);
    return
  }
  if (n !== 'null') {
    store.commit("userStatus",sessionStorage.getItem("user"));
    next();
  } else {
    store.commit("userStatus",null);
    next({
      path: 'Login'
    });
  }
});


export default aaa
