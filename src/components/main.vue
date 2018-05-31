<template>
  <div>
    <!-- 头部菜单栏 -->
    <MyHeader :one-key-word="keyWord" v-on:getKeyWord="getKeyWord"></MyHeader>
    <!-- 整体页面内容 -->
    <el-row>
      <!-- 内容左侧栏目 -->
      <el-col :span="5">
        <el-input type="text" placeholder="搜索资源关键词1" clearable></el-input>
      </el-col>
      <!-- 内容 -->
      <el-col :span="14" class="content">
        <!-- 轮播图数据 -->
        <template>
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="(item,index) in imgCard" :key="index">
              <a v-bind:href="item.url" target="_blank">
                <img v-bind:src="item.imgUrl"/>
                <h1>{{item.title}}</h1>
              </a>
            </el-carousel-item>
          </el-carousel>
        </template>
        <!-- 博文数据循环 -->
        <template v-for='(item,id) in blogData'>
          <div v-bind:key="id">
            <!-- 标题 -->
            <el-row style="text-align: left"><h2>
              <router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">{{item.title}}</router-link>
            </h2></el-row>
            <!-- 摘要 -->
            <el-row style="text-align: left">{{item.summary}}</el-row>
            <!-- 用户头像，nickName，发表时间 ------  阅读数，评论数  -->
            <el-row style="text-align: left;margin-top: 1em">
              <!-- 用户头像 -->
              <el-col :span="2">
                <img width="30px" height="30px" v-bind:src="item.blogger.imageUrl"/>
              </el-col>
              <!-- 用户昵称 -->
              <el-col :span="4">{{item.blogger.nickName}}</el-col>
              <!-- 发表时间 -->
              <el-col :span="8">{{item.createTime}}</el-col>
              <!-- 阅读数 -->
              <el-col :span="2" :offset="6">{{item.clickCount}} 阅读</el-col>
              <!-- 评论数 -->
              <el-col :span="2"> {{item.replayCount}} 评论</el-col>
            </el-row>
          </div>
        </template>
      </el-col>
      <!-- 内容右侧栏目 -->
      <el-col :span="5">
        <el-input type="text" placeholder="搜索资源关键词3" clearable></el-input>
      </el-col>
    </el-row>

    <!-- 分页插件 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        // this.queryResource()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        // this.queryResource()
      },
      download (id) {
        window.open(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
      },
      findBlogsByKeyWord () { // 根据关键词查询，模糊搜索
        this.$http.get('/api/blog/v1/blog/findByKeyWord?pageNumber=' + this.currentPage + '&size='+ this.pageSize + '&keyWord=' + this.keyWord).then((successData) => {
          this.blogData = successData.data.data;
          console.info(this.blogData)
        })
      },
      getAllCarousel () { // 首页轮播图
        this.$http.get('/api/blog/v1/carousel/getAllCarousel').then((successData) => {
          this.imgCard = successData.data.data;
          console.info(this.imgCard)
        })
      },
      dataInit () {
        this.findBlogsByKeyWord()
        this.getAllCarousel()
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
        blogData: [],
        currentPage: 1,
        pageSize: 10,
        totalSize: 0
        // 搜索框内容设置

      }
    },
    created () {
      this.keyWord = this.$route.params.keyWord
      this.dataInit()
      console.info(this.keyWord)
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
  .aTagWithoutLine{
    text-decoration: none;
  }
</style>
