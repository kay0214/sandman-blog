<template>
  <div>
    <el-container>
      <el-header>
        <!-- 头部菜单栏 -->
        <el-menu
          :default-active="activeIndex"
          class="el-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
<!--
          <img align="left" width="50px" height="50px" src="http://39.104.80.30/spkIMG/sandman/blog/content/7/20180530152641ED5D0ECCB7034FC5ACBC753BD9ECCA33.jpg"/>
-->
          <el-menu-item index="/main">首页</el-menu-item>
          <el-menu-item index="/gold"><i class="el-icon-download"></i>下载</el-menu-item>
          <el-menu-item index="/writeBlog"><i class="el-icon-document"></i>博客</el-menu-item>
          <el-menu-item index="/upload"><i class="el-icon-share"></i>论坛</el-menu-item>
          <el-menu-item v-if="!isLogin" style="float: right" index="/register">注册</el-menu-item>
          <el-menu-item v-if="!isLogin" style="float: right" index="/login">登录</el-menu-item>
          <el-menu-item v-else-if="isLogin" style="float: right" index="/logout">{{userName}}</el-menu-item>

          <div class="index-search">
            <el-input type="text" v-model="keyWord" placeholder="搜索资源关键词" clearable>
              <el-button slot="append" type="primary" @click="findBlogsByKeyWord" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-menu>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  props: ['oneKeyWord','activeTopMenu'],
  methods: {
    handleSelect (key, keyPath) {

      if (key === '/logout') {
        this.$http.get('/api/blog/v1/user/logout')
        this.userName = ''
        this.isLogin = false
        return
      }
      if(!this.isLogin){ //未登录
        if(key === '/writeBlog'){
          this.$router.push('/login')
          return
        }
      }
      this.activeIndex = key
      console.info('active = ' + this.activeIndex)
      this.$router.push(key)
    },
    findBlogsByKeyWord () {
      this.$emit('getKeyWord',this.keyWord)
    },
    getUserInfo () {
      this.$http.get('/api/blog/v1/user/getCurUserInfo').then((response) => {
        if (response.data.code === 200) {
          this.userName = response.data.data.userName
          this.isLogin = true
        }
      })
    }
  },
  data () {
    return {
      activeIndex: '/main', // 初始化时menu的active
      isLogin: false,
      userName: '',
      keyWord: ''
    }
  },
  mounted () {
    let key = this.oneKeyWord
    if(key !== null && key !== '' && key !== undefined){
      this.keyWord = key
    }
    let activeTopMenu = this.activeTopMenu
    if(activeTopMenu !== null && activeTopMenu !== '' && activeTopMenu !== undefined){
      this.activeIndex = activeTopMenu
    }
    this.getUserInfo()

  }
}
</script>

<style scoped>
  .index-search{
    float: right;
    margin-top: 0.8em
  }
  .el-container{
    margin-top: -1em;
    margin-right: -2em;
    margin-left: -2em;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
</style>
