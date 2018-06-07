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
                      {{item.createTime | formatDate}}
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
              <!-- 分页插件 -->
              <div class="block marginTop1em">
                <el-pagination
                  @size-change="myCommentHandleSizeChange"
                  @current-change="myCommentHandleCurrentChange"
                  :current-page="myCommentCurrentPage"
                  :page-sizes="[4, 6, 8, 10]"
                  :page-size="myCommentPageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="myCommentTotalSize">
                </el-pagination>
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
                      {{item.createTime | formatDate}}
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
              <!-- 分页插件 -->
              <div class="block marginTop1em">
                <el-pagination
                  @size-change="commentMeHandleSizeChange"
                  @current-change="commentMeHandleCurrentChange"
                  :current-page="commentMeCurrentPage"
                  :page-sizes="[4, 6, 8, 10]"
                  :page-size="commentMePageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="commentMeTotalSize">
                </el-pagination>
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
  import {formatDate} from '../../common/dateFormat'
  export default {
    methods: {
      myCommentHandleSizeChange (val) {
        this.myCommentPageSize = val
        this.getMyCommentList()
      },
      myCommentHandleCurrentChange (val) {
        this.myCommentCurrentPage = val
        this.getMyCommentList()
      },
      commentMeHandleSizeChange (val) {
        this.commentMePageSize = val
        this.getCommentMeList()
      },
      commentMeHandleCurrentChange (val) {
        this.commentMeCurrentPage = val
        this.getCommentMeList()
      },
      getMyCommentList () {
        this.$http.get('/api/blog/v1/comment/getMyComment?pageNumber=' + this.myCommentCurrentPage + '&size=' + this.myCommentPageSize).then((successData) => {
          this.myComment = successData.data.data.commentList;
          this.myCommentTotalSize = successData.data.data.totalRow
          console.info(this.myComment)
        })
      },
      getCommentMeList () {
        this.$http.get('/api/blog/v1/comment/getCommentMe?pageNumber=' + this.commentMeCurrentPage + '&size=' + this.commentMePageSize).then((successData) => {
          this.commentMe = successData.data.data.commentList;
          this.commentMeTotalSize = successData.data.data.totalRow
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
        commentMe: [],
        //我评论的分页插件数据
        myCommentCurrentPage: 1,
        myCommentPageSize: 4,
        myCommentTotalSize: 0,
        //评论我的分页插件数据
        commentMeCurrentPage: 1,
        commentMePageSize: 4,
        commentMeTotalSize: 0
      }
    },
    created () {
      this.dataInit()
    },
    mounted () {

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
