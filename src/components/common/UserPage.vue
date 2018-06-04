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
          <el-col :offset="1"><h1 style="text-align: left">{{blogger.nickName}}的博客</h1></el-col>

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
                  <el-row>{{blogger.nickName}}</el-row>
                </el-col>
                <!-- 转载 -->
                <el-col :span="6">
                  <el-row>转载</el-row>
                  <el-row>{{blogger.nickName}}</el-row>
                </el-col>
                <!-- 访问 -->
                <el-col :span="6">
                  <el-row>访问</el-row>
                  <el-row>{{blogger.nickName}}</el-row>
                </el-col>
                <!-- 评论 -->
                <el-col :span="6">
                  <el-row>评论</el-row>
                  <el-row>{{blogger.nickName}}</el-row>
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
            <!-- 博文数据循环 -->
            <template v-for='(item,id) in thisBlog'>
              <!-- 博文数据 -->
              <el-card v-bind:key="id" :body-style="{ padding: '0.5em' }" style="padding:1em">
                  <!-- 标题 -->
                  <el-row style="text-align: left"><h2>
                    <router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">{{item.title}}</router-link>
                  </h2></el-row>
                  <!-- 摘要 -->
                  <el-row style="text-align: left">{{item.summary}}</el-row>
                  <!-- 用户头像，nickName，发表时间 ------  阅读数，评论数  -->
                  <el-row style="text-align: left;margin-top: 1em">
                    <!-- 发表时间 -->
                    <el-col :span="8">{{item.createTime}}</el-col>
                    <!-- 阅读数 -->
                    <el-col :span="2" :offset="12">{{item.clickCount}} 阅读</el-col>
                    <!-- 评论数 -->
                    <el-col :span="2"> {{item.replayCount}} 评论</el-col>
                  </el-row>
              </el-card>
            </template>
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
        thisBlog: [],
        blogger: ''
        // 搜索框内容设置

      }
    },
    created () {
      let bloggerId = this.$route.params.bloggerId
      console.info('bloggerId'+bloggerId)
      this.$http.get('/api/blog/v1/blog/findByBloggerId?bloggerId=' + bloggerId).then((successData) => {
        this.thisBlog = successData.data.data.blogList;
        this.blogger = this.thisBlog[0].blogger
        console.info(this.blogger.nickName)
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
