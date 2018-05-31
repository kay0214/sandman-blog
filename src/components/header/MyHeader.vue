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
          <el-menu-item index="main">首页</el-menu-item>
          <el-menu-item index="myResources">我的资源</el-menu-item>
          <el-menu-item index="upload">上传资源</el-menu-item>
          <el-menu-item index="download">已下载</el-menu-item>
          <el-menu-item index="gold">积分明细</el-menu-item>
          <el-menu-item style="float: right" index="register">注册</el-menu-item>
          <el-menu-item style="float: right" index="login">登录</el-menu-item>
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
  props: ['oneKeyWord'],
  methods: {
    handleSelect (key, keyPath) {
      console.error(key)
      if (key === 'logout') {
        this.$http.get('/api/sandman/v1/user/logout')
        this.globalObj_.userName = ''
        this.globalObj_.isLogin = false
        this.userName = ''
        this.isLogin = false
        this.activeIndex = 'main'
        this.$router.push('/main')
        return
      }
      this.activeIndex = key
      this.$router.push('/' + key)
    },
    findBlogsByKeyWord () {
      this.$emit('getKeyWord',this.keyWord)
    }
  },
  data () {
    return {
      activeIndex: 'main', // 初始化时menu的active
      isLogin: false,
      userName: '',
      password: '',
      keyWord: ''
    }
  },
  mounted () {
    let key = this.oneKeyWord
    if(key !== null && key !== '' && key !== undefined){
      this.keyWord = key

    }
    this.userName = this.globalObj_.userName
    this.password = this.globalObj_.password
    this.isLogin = this.globalObj_.isLogin
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
