import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import details from '@/components/Details'
import MyHeader from '@/components/header/MyHeader'
import searchBlogList from '@/components/SearchBlogList'
import userPage from '@/components/UserPage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      component: main
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/details/:bloggerId/:blogId',
      name: 'details',
      component: details
    },
    {
      path: 'MyHeader',
      name: 'MyHeader',
      component: MyHeader
    },
    {
      path: '/searchBlogList',
      name: 'searchBlogList',
      component: searchBlogList
    },
    {
      path: '/userPage/:bloggerId',
      name: 'userPage',
      component: userPage
    }
  ]
})
