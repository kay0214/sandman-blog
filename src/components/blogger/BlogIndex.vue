<template>
  <div id="main">
    <MyHeader :one-key-word="keyWord" v-on:getKeyWord="getKeyWord"></MyHeader>
    <!-- 网页整体内容 -->
    <el-row class="content">
      <!-- 左侧菜单栏 -->
      <div>

      </div>
      <el-col :span="4" class="leftMenu">
        <div align='left'>
          <el-menu :default-active='this.$route.path' @select='handleSelect' background-color="#e9e9e9">
            <el-menu-item index='/writeBlog'><i class="el-icon-edit"></i>写博客</el-menu-item>
            <el-menu-item index='/blogManage'><i class="el-icon-edit-outline"></i>文章管理</el-menu-item>
            <el-menu-item index='/commentManage'><i class="el-icon-news"></i>评论管理</el-menu-item>
            <el-menu-item index='/categoryManage'><i class="el-icon-tickets"></i>个人分类管理</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <!-- 右侧子页面内容 -->
      <el-col :span="20">
        <div style='margin-top: 20px'>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    methods: {
      handleSelect (key) {
        this.$router.push(key)
      },
      getKeyWord (keyWord) {
        this.$router.push({name:'searchBlogList',params: {keyWord: keyWord}})
      }
    },
    data () {
      return {
        keyWord: ''
      }
    },
    created () {

    },
    mounted () {

    },
    watch: {

    }
  }
</script>
<style scoped>
  .content{
    margin: 2em;
    border: 1px solid #e9e9e9;
  }
  .active-color{
    background: red;
  }
  .leftMenu{
    background-color: #e9e9e9;
    height: 45em;
  }
</style>
