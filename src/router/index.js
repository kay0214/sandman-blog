import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/common/main'
import details from '@/components/common/Details'
import MyHeader from '@/components/header/MyHeader'
import searchBlogList from '@/components/common/SearchBlogList'
import userPage from '@/components/common/UserPage'
import blogIndex from '@/components/blogger/BlogIndex'
import writeBlog from '@/components/blogger/WriteBlog'
import blogManage from '@/components/blogger/BlogManage'
import commentManage from '@/components/blogger/CommentManage'
import categoryManage from '@/components/blogger/CategoryManage'
import login from '@/components/common/login'
import register from '@/components/common/register'
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
      path: '/searchBlogList/:keyWord',
      name: 'searchBlogList',
      component: searchBlogList
    },
    {
      path: '/userPage/:bloggerId',
      name: 'userPage',
      component: userPage
    },
    {
      path: '/blogIndex',
      name: 'blogIndex',
      component: blogIndex,
      children: [
        {
          path: '/writeBlog',
          name: 'writeBlog',
          component: writeBlog
        },
        {
          path: '/blogManage',
          name: 'blogManage',
          component: blogManage
        },
        {
          path: '/commentManage',
          name: 'commentManage',
          component: commentManage
        },
        {
          path: '/categoryManage',
          name: 'categoryManage',
          component: categoryManage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
