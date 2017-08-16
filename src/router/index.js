import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: require('../components/goods/goods.vue')
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: require('../components/ratings/ratings.vue')
    },
    {
      path: '/sellers',
      name: '/sellers',
      component: require('../components/sellers/sellers.vue')
    },
    {
      path: '*',
      redirect: {name: 'goods'}
    }
  ],
  linkActiveClass: 'active'
})
