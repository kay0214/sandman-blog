<template>
  <!-- 内容左侧栏目 博主个人资料 -->
  <el-col :span="6" :offset="1">
    <el-card :body-style="{ padding: '0.5em' }">
      <el-row class="card-header"><h5>个人资料</h5></el-row>
      <el-row style="text-align: left">
        <!-- 左上角个人资料圆角头像 -->
        <el-col :span="4">
          <img width="50px" style="border-radius: 100%" height="50px" :src="blogger.imageUrl"/>
        </el-col>
        <!-- 左上角个人资料昵称 -->
        <el-col :span="6" :offset="1" style="margin-top: 1em">
          {{blogger.nickName}}
        </el-col>
      </el-row>
    </el-card>
    <el-card :body-style="{ padding: '0.5em'}">
      <el-row style="margin-top: 1em">
        <!-- 原创 -->
        <el-col :span="6">
          <el-row>原创</el-row>
          <el-row>{{blogger.originalBlogCount}}</el-row>
        </el-col>
        <!-- 转载 -->
        <el-col :span="6">
          <el-row>转载</el-row>
          <el-row>{{blogger.transferBlogCount}}</el-row>
        </el-col>
        <!-- 访问 -->
        <el-col :span="6">
          <el-row>访问</el-row>
          <el-row>{{blogger.visitCount}}</el-row>
        </el-col>
        <!-- 评论 -->
        <el-col :span="6">
          <el-row>评论</el-row>
          <el-row>{{blogger.commentCount}}</el-row>
        </el-col>
      </el-row>
    </el-card>
    <!-- 博主的5条最新文章 -->
    <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
      <!-- 最新文章头部 -->
      <el-row class="card-header"><h5>最新文章</h5></el-row>
      <div class="text-left" v-if="newBlog.length > 0">
        <li class="text-left" v-for="(item,id) in newBlog" v-bind:key="id"><router-link tag="a" target="_blank" class="aTagWithoutLine" :to="{path:'/details/'+item.blogger.id+'/'+item.id}">{{item.title}}</router-link></li>
      </div>
      <have-no-data v-if="newBlog.length === 0"></have-no-data>
    </el-card>
    <!-- 博主的个人分类 -->
    <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
      <!-- 个人分类头部 -->
      <el-row class="card-header"><h5>个人分类</h5></el-row>
      <div class="text-left">
        <el-row v-for="(item,id) in userCategory" v-bind:key="id" class="marginTopHalfem">
          <el-col :span="6">{{item.categoryName}}</el-col>
          <el-col :span="2" :offset="15">{{item.blogCount}}篇</el-col>
        </el-row>
      </div>
      <have-no-data v-if="userCategory.length === 0"></have-no-data>
    </el-card>
    <!-- 博主的日期归档 -->
<!--    <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
      &lt;!&ndash; 日期归档头部 &ndash;&gt;
      <el-row class="card-header"><h5>日期归档</h5></el-row>
      <div class="text-left">
        <li>这是日期归档</li>
        <li>这是日期归档</li>
        <li>这是日期归档</li>
        <li>这是日期归档</li>
        <li>这是日期归档</li>
      </div>
    </el-card>-->
    <!-- 博主的热门文章 -->
    <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
      <!-- 热门文章头部 -->
      <el-row class="card-header"><h5>热门文章</h5></el-row>
      <div class="text-left">
        <el-row class="text-left marginTop1em" v-for="(item,id) in hotBlog" v-bind:key="id">
          <el-col><router-link class="aTagWithoutLine" tag="a" target="_blank" :to="{path:'/details/'+item.blogger.id+'/'+item.id}">{{item.title}}</router-link></el-col>
          <el-col><font size="1" color="#999">阅读量：{{item.clickCount}}</font></el-col>

        </el-row>
      </div>
      <have-no-data v-if="hotBlog.length === 0"></have-no-data>
    </el-card>
    <!-- 博主的最新评论 -->
    <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
      <!-- 最新评论头部 -->
      <el-row class="card-header"><h5>最新评论</h5></el-row>
      <div class="text-left">
        <el-row class="text-left marginTop1em" v-for="(item,id) in newComment" v-bind:key="id">
          <el-col><router-link class="aTagWithoutLine" tag="a" target="_blank" :to="{path:'/details/'+item.bloggerId+'/'+item.blogId}">{{item.blog.title}}</router-link></el-col>
          <el-col><font size="2" color="#999"><router-link tag="a" target="_blank" class="aTagWithoutLine" :to="{path:'/userPage/'+item.bloggerId}">{{item.blogger.nickName}}</router-link> : {{item.content}}</font></el-col>
        </el-row>
      </div>
      <have-no-data v-if="newComment.length === 0"></have-no-data>
    </el-card>
    <MyFooter></MyFooter>
  </el-col>
</template>

<script>
  import HaveNoData from "./HaveNoData";
  export default {
    components: {HaveNoData},
    methods: {
      download (id) {
        window.open(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
      },
      getNewBlog (bloggerId) {
        this.$http.get('/api/blog/v1/blog/findByBloggerId?pageNumber=1&size=5&order=createTime&sortType=desc&bloggerId=' + bloggerId).then((successData) => {
          this.newBlog = successData.data.data.blogList;
        })
      },
      getHotBlog (bloggerId) {
        this.$http.get('/api/blog/v1/blog/findByBloggerId?pageNumber=1&size=5&order=clickCount&sortType=desc&bloggerId=' + bloggerId).then((successData) => {
          this.hotBlog = successData.data.data.blogList;
        })
      },
      getNewComment (bloggerId) {
        this.$http.get('/api/blog/v1/comment/getCommentMe?pageNumber=1&size=5' + '&bloggerId=' + bloggerId).then((successData) => {
          this.newComment = successData.data.data.commentList;
        })
      },
      getUserCategory (bloggerId) {
        this.$http.get('/api/blog/v1/category/getAllCategoryByBloggerId?bloggerId=' + bloggerId).then((successData) => {
          this.userCategory = successData.data.data;
        })
      },
      getKeyWord (keyWord) {
        this.$router.push({name:'searchBlogList',params: {keyWord: keyWord}})
      },
      getBloggerInfo (bloggerId) {
        this.$http.get('/api/blog/v1/blogger/getBloggerById?id=' + bloggerId).then((success) => {
          this.blogger = success.data.data
          this.$emit('getBloggerInfo',this.blogger)
        })
      }
    },
    data () {
      return {
        // 样式值
        div_offset: 1,
        div_span: 22,
        // 数据值
        keyWord: '',
        imgCard: [],
        newBlog: [],
        hotBlog: [],
        newComment: [],
        userCategory: [],
        blogger: ''
        // 搜索框内容设置

      }
    },
    created () {
      let bloggerId = this.$route.params.bloggerId
      this.getBloggerInfo(bloggerId)
      this.getNewBlog(bloggerId) // 获取最新的5篇文章
      this.getHotBlog(bloggerId)
      this.getUserCategory(bloggerId)
      this.getNewComment(bloggerId)
    },
    mounted () {
      if (screen.width < 800) {
        this.div_offset = 2
        this.div_span = 20
      }
    }
  }
</script>

<style scoped>
  .content{
    margin-top: 1em;
  }
  .card-header{
    margin-top: -1em;
    text-align: left;
  }
  .text-left{
    text-align: left;
  }
  .text-left li{
    margin-bottom: 0.5em;
    list-style: none;
  }
  .blog-type{
    float: left;
    display: inline-block;
    margin-top: 0.5em;
    margin-right: 1em;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 12px;
    border-radius: 50%;
  }
  .type-1{
    color: #ca0c16;
    border: 1px solid #f4ced0;
  }
  .type-2{
    color: #86ca5e;
    border: 1px solid #e7f4df;
  }
  .keyword{
    text-decoration: none;
    margin-left: 4px;
    margin-right: 8px;
    padding: 0 8px;
    height: 24px;
    min-width: 24px;
    line-height: 24px;
    border: 1px solid #ccc;
    border-radius: 100px;
    color: #4d4d4d;
    text-align: center;
  }
</style>
