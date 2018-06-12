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
          <UserDetils></UserDetils>
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
                <el-col class="text-left" :span="8">{{thisBlog.createTime | formatDate}}</el-col>
                <!-- 博文阅读数 -->
                <el-col :span="4" :offset="12">阅读数 : {{thisBlog.clickCount}}</el-col>
              </el-row>
              <!-- 博文标题头 与 博文正文的 横线阻隔 -->
              <hr/>
              <!-- 博文正文 -->
              <el-row class="content">
                <div class="text-left" v-html="thisBlog.content"></div>
              </el-row>
              <!-- 博客关键词 -->
              <div  v-if="thisBlog.keyWord!==''" class="content">
                <div class="keyword-tag">关键词 :</div>
                <div v-for="(item,id) in keyWords" v-bind:key="id">
                  <router-link class="keyword" :to="{path:'/searchBlogList/'+item}">{{item}}</router-link>
                </div>
              </div>

            </el-card>
            <el-card class="marginTop2em">
              <el-row>
                <el-col :span="2" class="marginTop1em">评论:</el-col>
                <el-col :span="22" id="comment"><el-input type="textarea" v-model="content" placeholder="你想对作者说点什么？" clearable></el-input></el-col>
              </el-row>
              <el-row class="marginTop1em">
                <el-col :span="2" :offset="22"><el-button size="small" type='primary' @click='commentBlog(thisBlog.id)'>评论</el-button></el-col>
              </el-row>
            </el-card>
            <!-- 评论内容 -->
            <el-card v-if="commentList.length>0">
              <el-card v-for="(item,id) in commentList" v-bind:key="id">
                <el-row>
                  <el-col :span="2"><img class="avatar" :src="item.blogger.imageUrl"/></el-col>
                  <el-col :span="4" class="text-left"><router-link class="aTagWithoutLine" :to="{path:'/userPage/'+item.blogger.id}">{{item.blogger.nickName}}</router-link></el-col>
                  <el-col :span="8">{{item.createTime | formatDate}}</el-col>
                  <el-col :span="2">#{{id+1}}楼</el-col>
                  <el-col :span="2" :offset="6"><a href="#comment" class="aTagWithoutLine" @click="replay(item.id,item.blogger.nickName)">回复</a></el-col>
                </el-row>
                <!-- 评论具体内容 -->
                <el-row>
                  <el-col class="comment-content">{{item.content}}</el-col>
                </el-row>
                <!-- 评论的回复内容 -->
                <el-row class="replay" v-if="item.commentList!==null" v-for="(items,ids) in item.commentList" v-bind:key="ids">
                  <el-row>
                    <el-col :span="2"><img class="avatar" :src="items.blogger.imageUrl"/></el-col>
                    <el-col :span="4" class="text-left"><router-link class="aTagWithoutLine" :to="{path:'/userPage/'+items.blogger.id}">{{items.blogger.nickName}}</router-link></el-col>
                    <el-col :span="2" class="text-left">回复</el-col>
                    <el-col :span="4" class="text-left">{{items.parentName}}</el-col>
                    <el-col :span="8">{{items.createTime | formatDate}}</el-col>
                    <el-col :span="2" :offset="2"><a href="#comment" class="aTagWithoutLine" @click="replay(items.id,items.blogger.nickName)">回复</a></el-col>
                  </el-row>
                  <!-- 评论具体内容 -->
                  <el-row>
                    <el-col class="replay-content">{{items.content}}</el-col>
                  </el-row>
                </el-row>
              </el-card>

            </el-card>
          </el-col>

        </el-row>

      </el-col>

    </el-row>
  </div>
</template>
<script>
  import message from "../../common/message";
  import {formatDate} from '../../common/dateFormat'
  export default {
    methods: {
      download (id) {
        window.open(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
      },
      commentBlog (blogId) {
        if(this.thisBlog.isForbiddenComment === 1){
          message.errorMsg('评论失败','该博客禁止评论')
          return

        }
        this.getUserInfo()
        console.info(blogId)
        let regex = /\[replay\].*\[\/replay\]\n/
        let params
        if(this.content.match(regex)){
          console.info('找到回复的人了')
          let content = this.content.replace(regex,'')
          params = 'blogId=' + blogId + '&content=' + content + '&parentId=' + this.commentId + '&parentName='
            + this.parentName + '&replayed=0'
        }else{
          console.info('没找到回复的人')
          params = 'blogId=' + blogId + '&content=' + this.content + '&replayed=0' + '&parentId=0'
        }
        this.$http.post('/api/blog/v1/comment/commentBlog', params).then((successData) => {
          if (successData.data.code !== 200) {
            return // 请求登录接口返回code!=200,停留在本页面提示用户重新登录
          }
          if (successData.data.code === 200) {
            this.dataInit(blogId)
            this.content = ''
          }
        })
      },
      getUserInfo () {
        this.$http.get('/api/blog/v1/user/getCurUserInfo').then((response) => {
          if (response.data.code !== 200) {
            this.$router.push('/login')
            return
          }
        })
      },
      replay (commentId,nickName) {
        this.getUserInfo()
        this.commentId = commentId
        this.parentName = nickName
        this.content = '[replay]' + nickName + '[/replay]\n'
      },
      dataInit (blogId) {
        this.$http.get('/api/blog/v1/blog/getBlogById?id=' + blogId).then((successData) => {
          this.thisBlog = successData.data.data;
          this.keyWords = this.thisBlog.keyWord.split(' ')
        })
        this.$http.get('/api/blog/v1/comment/getCommentByBlogId?blogId=' + blogId).then((successData) => { // 获取本文章的评论内容
          this.commentList = successData.data.data;
        })
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
        keyWords: [],
        keyWord: '',
        content: '',
        commentId: '',
        parentName: '',
        thisBlog: {
          blogger: {
            nickName: ''
          }
        },
        commentList:[]
        // 搜索框内容设置

      }
    },
    created () {
      let bloggerId = this.$route.params.bloggerId
      let blogId = this.$route.params.blogId
      console.info('blogId:::::::' + blogId)
      this.dataInit(blogId)
    },
    mounted () {
      if (screen.width < 800) {
        this.div_offset = 2
        this.div_span = 20
      }
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date,'yyyy年MM月dd日 hh:mm:ss');
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
    display: inline-block;
    word-break: break-all;
    float: left;
  }
  .keyword-tag{
    float: left;
    margin-right: 1em;
    margin-top: 4px;
  }
  .marginTop2em{
    margin-top: 2em;
  }
  .avatar{
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
  .comment-content{
    text-align: left;
    text-indent: 2em;
    margin-top: 1em;
  }
  .replay{
    margin-left: 2em;
    border-left: 4px solid #e0e0e0;
    margin-top: 1em;
/*    margin: 2em;
    border:1px solid black;*/
  }
  .replay-content{
    margin-top: 1em;
    text-indent: 2em;
    text-align: left;
  }
  .marginTop1em{
    margin-top: 0.5em;
  }
</style>
