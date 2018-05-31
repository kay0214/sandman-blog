<template>
  <div>
    <!-- 头部菜单栏 -->
    <MyHeader :one-key-word="keyWord" v-on:getKeyWord="getKeyWord"></MyHeader>
    <!-- 整体页面内容 -->
    <el-row>
      <!-- 博客页整体内容 -->
      <el-col style="background-image: url('http://39.104.80.30/spkIMG/sandman/blog/content/7/background.jpg')">
        <!-- 博主nickName -- 左上角 -->
        <el-row>
          <el-col :offset="1"><h1 style="text-align: left">{{thisBlog.blogger.nickName}}的博客</h1></el-col>

        </el-row>
        <!-- 博客详细内容 -->
        <el-row class="content">
          <!-- 内容左侧栏目 博主个人资料 -->
          <el-col :span="6" :offset="1">
            <el-card :body-style="{ padding: '0.5em' }">
              <el-row class="card-header"><h5>个人资料</h5></el-row>
              <el-row style="text-align: left">
                <!-- 左上角个人资料圆角头像 -->
                <el-col :span="4">
                  <img width="50px" style="border-radius: 100%" height="50px" :src="thisBlog.blogger.imageUrl"/>
                </el-col>
                <!-- 左上角个人资料昵称 -->
                <el-col :span="6" :offset="1" style="margin-top: 1em">
                  {{thisBlog.blogger.nickName}}
                </el-col>
              </el-row>
            </el-card>
            <el-card :body-style="{ padding: '0.5em'}">
              <el-row style="margin-top: 1em">
                <!-- 原创 -->
                <el-col :span="6">
                  <el-row>原创</el-row>
                  <el-row>{{thisBlog.blogger.nickName}}</el-row>
                </el-col>
                <!-- 转载 -->
                <el-col :span="6">
                  <el-row>转载</el-row>
                  <el-row>{{thisBlog.blogger.nickName}}</el-row>
                </el-col>
                <!-- 访问 -->
                <el-col :span="6">
                  <el-row>访问</el-row>
                  <el-row>{{thisBlog.blogger.nickName}}</el-row>
                </el-col>
                <!-- 评论 -->
                <el-col :span="6">
                  <el-row>评论</el-row>
                  <el-row>{{thisBlog.blogger.nickName}}</el-row>
                </el-col>
              </el-row>
            </el-card>
            <!-- 博主的5条最新文章 -->
            <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
              <!-- 最新文章头部 -->
              <el-row class="card-header"><h5>最新文章</h5></el-row>
              <div class="text-left">
                <li>这是最新文章</li>
                <li>这是最新文章</li>
                <li>这是最新文章</li>
                <li>这是最新文章</li>
                <li>这是最新文章</li>
              </div>
            </el-card>
            <!-- 博主的个人分类 -->
            <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
              <!-- 个人分类头部 -->
              <el-row class="card-header"><h5>个人分类</h5></el-row>
              <div class="text-left">
                <li>这是个人分类</li>
                <li>这是个人分类</li>
                <li>这是个人分类</li>
                <li>这是个人分类</li>
                <li>这是个人分类</li>
              </div>
            </el-card>
            <!-- 博主的日期归档 -->
            <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
              <!-- 日期归档头部 -->
              <el-row class="card-header"><h5>日期归档</h5></el-row>
              <div class="text-left">
                <li>这是日期归档</li>
                <li>这是日期归档</li>
                <li>这是日期归档</li>
                <li>这是日期归档</li>
                <li>这是日期归档</li>
              </div>
            </el-card>
            <!-- 博主的热门文章 -->
            <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
              <!-- 热门文章头部 -->
              <el-row class="card-header"><h5>热门文章</h5></el-row>
              <div class="text-left">
                <li>这是热门文章</li>
                <li>这是热门文章</li>
                <li>这是热门文章</li>
                <li>这是热门文章</li>
                <li>这是热门文章</li>
              </div>
            </el-card>
            <!-- 博主的最新评论 -->
            <el-card :body-style="{ padding: '0.5em' }" style="margin-top: 1em">
              <!-- 最新评论头部 -->
              <el-row class="card-header"><h5>最新评论</h5></el-row>
              <div class="text-left">
                <li>这是最新评论</li>
                <li>这是最新评论</li>
                <li>这是最新评论</li>
                <li>这是最新评论</li>
                <li>这是最新评论</li>
              </div>
            </el-card>
          </el-col>
          <!-- 博文详细内容 -->
          <el-col :span="14" :offset="1">
            <!-- 博文数据 -->
            <el-card :body-style="{ padding: '0.5em' }" style="padding:1em">
              <!-- 博文标题 -->
              <el-row class="card-header">
                <h1>
                  <span class="blog-type type-1" v-if="thisBlog.blogType==0">原</span>
                  <span class="blog-type type-2" v-if="thisBlog.blogType==1">转</span>
                  {{thisBlog.title}}
                </h1>
              </el-row>
              <!-- 博文日期与阅读数 -->
              <el-row>
                <!-- 博文日期 -->
                <el-col class="text-left" :span="8">{{thisBlog.createTime}}</el-col>
                <!-- 博文阅读数 -->
                <el-col :span="4" :offset="12">阅读数 : {{thisBlog.clickCount}}</el-col>
              </el-row>
              <!-- 博文标题头 与 博文正文的 横线阻隔 -->
              <hr/>
              <!-- 博文正文 -->
              <el-row class="content">
                <div class="text-left">{{thisBlog.content}}</div>
              </el-row>
              <!-- 博客关键词 -->
              <el-row class="content">
                <el-col class="text-left">关键词 :<a href="#" @click="clickKeyWord(thisBlog.keyWord)" class="keyword">{{thisBlog.keyWord}}</a></el-col>
                <!-- <router-link class="keyword text-left" :to="{path:'/main',params:{keyWord: thisBlog.keyWord}}">{{thisBlog.keyWord}}</router-link>  -->
              </el-row>
            </el-card>
          </el-col>

        </el-row>

      </el-col>

    </el-row>

  </div>
</template>
<script>
  export default {
    methods: {
      download (id) {
        window.open(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
      },
      dataInit () {
        this.$http.get('/api/blog/v1/blog/getAllBlog?pageNumber=1&size=10').then((successData) => {
          this.blogData = successData.data.data;
          console.info(this.blogData)
        })
        this.$http.get('/api/blog/v1/carousel/getAllCarousel').then((successData) => {
          this.imgCard = successData.data.data;
          console.info(this.imgCard)
        })
      },
      clickKeyWord (keyWord) {
        // 拿到keyword 去主页搜索
        this.$router.push({name:'searchBlogList',params: {keyWord: keyWord}})
      },
      getKeyWord (keyWord) {
        this.$router.push({name:'searchBlogList',params: {keyWord: keyWord}})
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
        thisBlog: {
          blogger: {
            nickName: ''
          }
        }
        // 搜索框内容设置

      }
    },
    created () {
      let bloggerId = this.$route.params.bloggerId
      let blogId = this.$route.params.blogId
      this.$http.get('/api/blog/v1/blog/getBlogById?id=' + blogId).then((successData) => {
        this.thisBlog = successData.data.data;
      })
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
