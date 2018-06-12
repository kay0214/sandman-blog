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
          <el-input v-model="keyWord" placeholder="关键词用空格分隔" clearable></el-input>
        </el-col>
      </el-row>
      <!-- 用户自定义分类 -->
      <el-row class="marginTop1em">
        <el-col :span="2" class="marginTopHalfEm">个人分类:</el-col>
        <el-col :span="4">
          <el-select v-model="selectCategory" placeholder="请选择">
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
          <el-button type="primary" @click="publishBlog(0)" round plain>发布博客</el-button>
        </el-col>
        <el-col :span="2" :offset="2" class="marginTopHalfEm">
          <el-button type="primary" @click="publishBlog(1)" round plain>保存为草稿</el-button>
        </el-col>
        <el-col :span="2" :offset="2" class="marginTopHalfEm">
          <el-button type="info" @click="back" round plain>返回</el-button>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
  import message from '../../common/message'
  export default {
    methods: {
      publishBlog (isDraft) {
        if(this.title === ''){
          message.errorMsg('标题不能为空','请重新输入文章标题')
          return
        }
        if(this.editor.txt.text() === ''){
          message.errorMsg('内容不能为空','请重新输入文章内容')
          return
        }
        let onlyMeRead
        if(this.onlyMeRead){
          onlyMeRead = 1
        }else{
          onlyMeRead = 0
        }
        if(this.selectCategory === null || this.selectCategory === '' || this.selectCategory === undefined){
          message.errorMsg('个人分类不能为空','请先选择个人分类')
          return
        }
        if(this.blogType === null || this.blogType === '' || this.blogType === undefined){
          message.errorMsg('文章类型不能为空','请先选择文章类型')
          return
        }
        this.$http.post('/api/blog/v1/blog/saveBlog',{id: this.id, title: this.title, content: this.editor.txt.html(), contentNoTag: this.editor.txt.text(), isDraft: isDraft, blogType: this.blogType,
            onlyMeRead: onlyMeRead, categoryId: this.selectCategory, keyWord: this.keyWord}
          ).then((successData) => {
          if (successData.data.code !== 200) {
            return // 请求登录接口返回code!=200,停留在本页面提示用户重新登录
          }
          if (successData.data.code === 200) {
            this.$router.push('/blogManage')
          }
        })
      },
      back () {
        this.$router.push('/writeBlog')
      }
    },
    data () {
      return {
        editor: '',
        blog: '',
        id: '',
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
          this.blog = blog
          this.id = blog.id
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
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.uploadImgServer = 'http://39.104.80.30:8081/api/blog/v1/blog/uploadContentImg'
      // this.editor.customConfig.uploadImgServer = 'http://localhost:8081/api/blog/v1/blog/uploadContentImg'
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
