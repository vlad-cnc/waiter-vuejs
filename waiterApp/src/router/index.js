import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Orders from '@/components/Orders'
import HomePage from '@/components/HomePage'
import PlaceOrder from '@/components/PlaceOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/place-order',
      name: 'place-order',
      component: PlaceOrder
    }
  ]
})
