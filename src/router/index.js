import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Tables from '@/components/Tables'
import Peoples from '@/components/Peoples'
import Films from '@/components/Films'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter (to, from, next) {
        next()
      }
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables,
      beforeEnter (to, from, next) {
        next()
      }
    },
    {
      path: '/peoples',
      name: 'Peoples',
      component: Peoples,
      beforeEnter (to, from, next) {
        next()
      }
    },
    {
      path: '/films',
      name: 'Films',
      component: Films,
      beforeEnter (to, from, next) {
        next()
      }
    }
  ]
})
