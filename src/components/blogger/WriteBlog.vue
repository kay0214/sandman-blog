<template>
  <div>
    <!-- 写博客页面整体内容 -->
    <el-row class="content">
      <!-- 博文标题 -->
      <el-row>
        <el-input v-model="title" placeholder="输入文章标题" clearable></el-input>
      </el-row>
      <!-- 富文本编辑器 -->
      <div id="editor" class="marginTop1em"></div>
      <!-- keyWord设置 -->
      <el-row class="marginTop1em">
        <el-col :span="2" class="marginTopHalfEm">关键词:</el-col>
        <el-col :span="22">
          <el-input v-model="keyWord" placeholder="输入关键词" clearable></el-input>
        </el-col>
      </el-row>
      <!-- 用户自定义分类 -->
      <el-row class="marginTop1em">
        <el-col :span="2" class="marginTopHalfEm">个人分类:</el-col>
        <el-col :span="4">
          <el-select v-model="selectCategory" placeholder="请选择">
<!--
            <el-option v-for="item in allCategory" v-if="selectCategory === item.categoryName" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
-->
            <el-option v-for="item in allCategory" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 文章类型, 0 原创;1 转载 -->
      <el-row class="marginTop1em">
        <el-col :span="2" class="marginTopHalfEm">文章类型:</el-col>
        <el-col :span="4">
          <el-select v-model="blogType" placeholder="请选择">
            <el-option label="原创" value="0"></el-option>
            <el-option label="转载" value="1"></el-option>
          </el-select>
        </el-col>
        <el-col class="mustSelect" :span="1">*</el-col>
      </el-row>
      <!-- 文章类型, 0 原创;1 转载 -->
      <el-row class="marginTop1em">
        <el-col :span="2" class="marginTopHalfEm">私密:</el-col>
        <el-col :span="2">
          <el-switch v-model="onlyMeRead" active-color="#13ce66" inactive-color="#D8D8D8"></el-switch>
        </el-col>
      </el-row>
      <!-- 发布博客  保存为草稿  返回按钮 -->
      <el-row class="marginTop1em">
        <el-col :span="2" :offset="2" class="marginTopHalfEm">
          <el-button type="primary" @click="publishBlog(false)" round plain>发布博客</el-button>
        </el-col>
        <el-col :span="2" :offset="2" class="marginTopHalfEm">
          <el-button type="primary" @click="publishBlog(true)" round plain>保存为草稿</el-button>
        </el-col>
        <el-col :span="2" :offset="2" class="marginTopHalfEm">
          <el-button type="info" @click="back" round plain>返回</el-button>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
  export default {
    methods: {
      publishBlog (isDraft) {
        console.info(isDraft)
        console.info(this.onlyMeRead)
        console.info(this.blogType)
        console.info(this.selectCategory)
        console.info(this.keyWord)
        console.info(this.title)
        console.info(this.editor.txt.text())
        console.info(this.editor.txt.html())
      },
      back () {
        this.$router.push('/writeBlog')
      }
    },
    data () {
      return {
        editor: '',
        title: '',
        keyWord: '',
        selectCategory: '',
        allCategory: [],
        blogType: '',
        onlyMeRead: ''
      }
    },
    created () {
      let blogId = this.$route.params.blogId
      if(blogId !== null && blogId !== undefined && blogId !== ''){
        this.$http.get('/api/blog/v1/blog/getBlogById?id=' + blogId).then((successData) => {
          let blog = successData.data.data;
          this.title = blog.title
          this.editor.txt.html(blog.content)
          this.selectCategory = blog.categoryId
          if(blog.onlyMeRead === 1){
            this.onlyMeRead = true
          }else{
            this.onlyMeRead = false
          }
          this.blogType = '' + blog.blogType
          this.keyWord = blog.keyWord
        })
      }
      this.$http.get('/api/blog/v1/category/getAllCategoryByBloggerId').then((successData) => {
        this.allCategory = successData.data.data;
      })
    },
    mounted () {
      var E = require('wangeditor')
      this.editor = new E('#editor')
      this.editor.customConfig.uploadImgServer = 'http://localhost:8081/api/blog/v1/blog/uploadContentImg'
      this.editor.customConfig.uploadFileName = 'files'
      this.editor.create()
    }
  }
</script>
<style scoped>
  .content{
    margin: 1em;
  }
  .marginTop1em{
    margin-top: 1em;
  }
  .marginTopHalfEm{
    margin-top: 0.5em;
  }
  .mustSelect{
    margin-top: 1em;
    color: red;
  }
</style>
