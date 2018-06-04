<template>
  <div>
    <!-- 个人分类管理页面整体内容 -->
    <el-row class="content">
      <!-- 添加个人分类 -->
      <el-row>
        <el-col class="marginTopHalfEm" :span="4">评论管理</el-col>
      </el-row>
      <el-row class="content">
        <el-tabs type="border-card">
          <el-tab-pane label="我评论的">
            <!-- 我评论的 -->
            <template v-if="myComment.length !== 0">
              <div>
                <el-card v-for="(item,id) in myComment" v-bind:key="id">
                  <el-row>
                    <el-col :span="1">
                      我
                    </el-col>
                    <el-col :span="6">
                      {{item.createTime}}
                    </el-col>
                    <el-col :span="2">评论了</el-col>
                    <el-col :span="2">{{item.blogger.nickName}}</el-col>
                    <el-col :span="2">的文章</el-col>
                    <el-col :span="9"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.blog.bloggerId+'/'+item.blog.id}">{{item.blog.title}}</router-link></el-col>
                    <el-col :span="1" :offset="1"><a href="#" class="aTagWithoutLine" @click="deleteComment(item.id)">删除</a></el-col>
                  </el-row>
                  <!-- 评论的具体内容 -->
                  <el-card class="marginTop1em">
                    <el-row class="textLeft">
                      {{item.content}}
                    </el-row>
                  </el-card>

                </el-card>
              </div>
            </template>
            <template v-else-if="myComment.length === 0">
              暂时没有任何评论
            </template>
          </el-tab-pane>
          <el-tab-pane label="评论我的">
            <!-- 评论我的 -->
            <template v-if="commentMe.length !== 0">
              <div>
                <el-card v-for="(item,id) in commentMe" v-bind:key="id">
                  <el-row>
                    <el-col :span="2">
                      {{item.blogger.nickName}}
                    </el-col>
                    <el-col :span="6">
                      {{item.createTime}}
                    </el-col>
                    <el-col :span="2">回复了</el-col>
                    <el-col :span="1">你</el-col>
                    <el-col :span="2">的文章</el-col>
                    <el-col :span="9"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.blog.bloggerId+'/'+item.blog.id}">{{item.blog.title}}</router-link></el-col>
                    <el-col :span="1" :offset="1"><a href="#" class="aTagWithoutLine" @click="deleteComment(item.id)">删除</a></el-col>
                  </el-row>
                  <!-- 评论的具体内容 -->
                  <el-card class="marginTop1em">
                    <el-row class="textLeft">
                      {{item.content}}
                    </el-row>
                  </el-card>
                </el-card>
              </div>
            </template>
            <template v-else-if="commentMe.length === 0">
              暂时没有任何评论
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-row>
  </div>
</template>
<script>
  import message from '../../common/message'
  export default {
    methods: {
      getMyCommentList () {
        this.$http.get('/api/blog/v1/comment/getMyComment').then((successData) => {
          this.myComment = successData.data.data;
          console.info(this.myComment)
        })
      },
      getCommentMeList () {
        this.$http.get('/api/blog/v1/comment/getCommentMe').then((successData) => {
          this.commentMe = successData.data.data;
          console.info(this.commentMe)
        })
      },
      deleteComment (id) {
        this.$http.get('/api/blog/v1/comment/deleteComment?id=' + id).then((successData) => {
          this.dataInit()
          message.infoMsg('删除成功','评论已成功删除')
        })
      },
      dataInit () {
        this.getMyCommentList()
        this.getCommentMeList()
      }
    },
    data () {
      return {
        myComment: [],
        commentMe: []
      }
    },
    created () {
      this.dataInit()
    },
    mounted () {

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
  .textLeft{
    text-align: left;
  }
  .textCenter{
    text-align: center;
  }
  .marginBottom1em{
    margin-bottom: 1em;
  }
</style>
