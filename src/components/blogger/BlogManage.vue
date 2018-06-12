<template>
  <div>
    <!-- 文章管理页面整体内容 -->
    <el-row class="content">

      <!-- 用户所有文章列表 -->
      <el-row class="marginTop1em">
        <!-- 头部 -->
        <el-row>
          <el-col :span="4" class="marginTop1em">文章管理</el-col>
          <!-- 搜索 -->
          <el-col :span="6" :offset="10">
            <el-input v-model="blogTitle" placeholder="输入文章名称" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="findBlogs" round plain>查询</el-button>
          </el-col>
        </el-row>
        <el-row class="content">
          <el-tabs type="border-card">
            <!-- 全部文章 -->
            <el-tab-pane :label="allBlogsSize">
              <template v-if="allBlogs.length !== 0">
                <div>
                  <el-card v-for="(item,id) in allBlogs" v-bind:key="id">
                    <el-row>
                      <!-- 优先显示私密，然后才显示草稿 -->
                      <!-- 私密文章 -->
                      <el-col :span="2">
                        <div class="blogTag" v-if="item.onlyMeRead===1">私密</div>
                        <div v-else-if="item.onlyMeRead===0">
                          <div class="blogTag" v-if="item.isDraft===1">草稿</div>
                        </div>
                      </el-col>
                      <!-- title -->
                      <el-col class="textLeft" :span="12"><a href="#" class="aTagWithoutLine" @click="editBlog(item.id)">{{item.title}}</a></el-col>
                    </el-row>
                    <!-- 原创，时间，阅读数，评论数，查看，删除 -->
                    <el-row class="marginTop1em">
                      <!-- 原创转载标记 -->
                      <el-col :span="1" class="textLeft">
                        <div v-if="item.blogType===0">原创</div>
                        <div v-else-if="item.blogType===1">转载</div>
                      </el-col>
                      <!-- 时间 -->
                      <el-col :span="6" :offset="1">{{item.createTime | formatDate}}</el-col>
                      <!-- 阅读数 -->
                      <el-col :span="1" :offset="1"><i class="el-icon-view"></i>&nbsp;{{item.clickCount}}</el-col>
                      <!-- 评论数 -->
                      <el-col :span="1" :offset="1"><i class="el-icon-document"></i>&nbsp;{{item.replayCount}}</el-col>
                      <!-- 查看删除 -->
                      <div v-if="item.onlyMeRead===1 || item.isDraft===1">
                        <el-col class="textBlue" :span="1" :offset="10"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">查看</router-link></el-col>
                        <el-col class="textRed" :span="1"><a href="#" class="aTagWithoutLine" @click="deleteBlog(item.id)">删除</a></el-col>
                      </div>
                      <div v-else>
                        <el-col class="textBlue" :span="1" :offset="8"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">查看</router-link></el-col>
                        <el-col class="textBlue" :span="2" v-if="item.isForbiddenComment === 0"><a href="#" class="aTagWithoutLine" @click="forbiddenComment(item.id)">禁止评论</a></el-col>
                        <el-col class="textBlue" :span="2" v-if="item.isForbiddenComment === 1"><a href="#" class="aTagWithoutLine" @click="forbiddenComment(item.id)">允许评论</a></el-col>
                        <el-col class="textRed" :span="1"><a href="#" class="aTagWithoutLine" @click="deleteBlog(item.id)">删除</a></el-col>
                      </div>
                    </el-row>

                  </el-card>
                </div>
              </template>
              <template v-else-if="allBlogs.length === 0">
                暂时没有任何文章
              </template>
            </el-tab-pane>

            <!-- 已发表文章 -->
            <el-tab-pane :label="publishBlogsSize">
              <template v-if="publishBlogs.length !== 0">
                <div>
                  <el-card v-for="(item,id) in publishBlogs" v-bind:key="id">
                    <el-row>
                      <!-- 优先显示私密，然后才显示草稿 -->
                      <!-- 私密文章 -->
                      <el-col :span="2">
                        <div class="blogTag" v-if="item.onlyMeRead===1">私密</div>
                        <div v-else-if="item.onlyMeRead===0">
                          <div class="blogTag" v-if="item.isDraft===1">草稿</div>
                        </div>
                      </el-col>
                      <!-- title -->
                      <el-col class="textLeft" :span="12"><a href="#" class="aTagWithoutLine" @click="editBlog(item.id)">{{item.title}}</a></el-col>
                    </el-row>
                    <!-- 原创，时间，阅读数，评论数，查看，删除 -->
                    <el-row class="marginTop1em">
                      <!-- 原创转载标记 -->
                      <el-col :span="1" class="textLeft">
                        <div v-if="item.blogType===0">原创</div>
                        <div v-else-if="item.blogType===1">转载</div>
                      </el-col>
                      <!-- 时间 -->
                      <el-col :span="6" :offset="1">{{item.createTime | formatDate}}</el-col>
                      <!-- 阅读数 -->
                      <el-col :span="1" :offset="1"><i class="el-icon-view"></i>&nbsp;{{item.clickCount}}</el-col>
                      <!-- 评论数 -->
                      <el-col :span="1" :offset="1"><i class="el-icon-document"></i>&nbsp;{{item.replayCount}}</el-col>
                      <!-- 查看删除 -->
                      <div v-if="item.onlyMeRead===1 || item.isDraft===1">
                        <el-col class="textBlue" :span="1" :offset="10"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">查看</router-link></el-col>
                        <el-col class="textRed" :span="1"><a href="#" class="aTagWithoutLine" @click="deleteBlog(item.id)">删除</a></el-col>
                      </div>
                      <div v-else>
                        <el-col class="textBlue" :span="1" :offset="8"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">查看</router-link></el-col>
                        <el-col class="textBlue" :span="2" v-if="item.isForbiddenComment === 0"><a href="#" class="aTagWithoutLine" @click="forbiddenComment(item.id)">禁止评论</a></el-col>
                        <el-col class="textBlue" :span="2" v-if="item.isForbiddenComment === 1"><a href="#" class="aTagWithoutLine" @click="forbiddenComment(item.id)">允许评论</a></el-col>
                        <el-col class="textRed" :span="1"><a href="#" class="aTagWithoutLine" @click="deleteBlog(item.id)">删除</a></el-col>
                      </div>
                    </el-row>

                  </el-card>
                </div>
              </template>
              <template v-else-if="publishBlogs.length === 0">
                暂时没有任何文章
              </template>
            </el-tab-pane>

            <!-- 私密文章 -->
            <el-tab-pane :label="onlyMeReadBlogsSize">
              <template v-if="onlyMeReadBlogs.length !== 0">
                <div>
                  <el-card v-for="(item,id) in onlyMeReadBlogs" v-bind:key="id">
                    <el-row>
                      <!-- 优先显示私密，然后才显示草稿 -->
                      <!-- 私密文章 -->
                      <el-col :span="2">
                        <div class="blogTag" v-if="item.onlyMeRead===1">私密</div>
                        <div v-else-if="item.onlyMeRead===0">
                          <div class="blogTag" v-if="item.isDraft===1">草稿</div>
                        </div>
                      </el-col>
                      <!-- title -->
                      <el-col class="textLeft" :span="12"><a href="#" class="aTagWithoutLine" @click="editBlog(item.id)">{{item.title}}</a></el-col>
                    </el-row>
                    <!-- 原创，时间，阅读数，评论数，查看，删除 -->
                    <el-row class="marginTop1em">
                      <!-- 原创转载标记 -->
                      <el-col :span="1" class="textLeft">
                        <div v-if="item.blogType===0">原创</div>
                        <div v-else-if="item.blogType===1">转载</div>
                      </el-col>
                      <!-- 时间 -->
                      <el-col :span="6" :offset="1">{{item.createTime | formatDate}}</el-col>
                      <!-- 阅读数 -->
                      <el-col :span="1" :offset="1"><i class="el-icon-view"></i>&nbsp;{{item.clickCount}}</el-col>
                      <!-- 评论数 -->
                      <el-col :span="1" :offset="1"><i class="el-icon-document"></i>&nbsp;{{item.replayCount}}</el-col>
                      <!-- 查看删除 -->
                      <div v-if="item.onlyMeRead===1 || item.isDraft===1">
                        <el-col class="textBlue" :span="1" :offset="10"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">查看</router-link></el-col>
                        <el-col class="textRed" :span="1"><a href="#" class="aTagWithoutLine" @click="deleteBlog(item.id)">删除</a></el-col>
                      </div>
                      <div v-else>
                        <el-col class="textBlue" :span="1" :offset="8"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">查看</router-link></el-col>
                        <el-col class="textBlue" :span="2" v-if="item.isForbiddenComment === 0"><a href="#" class="aTagWithoutLine" @click="forbiddenComment(item.id)">禁止评论</a></el-col>
                        <el-col class="textBlue" :span="2" v-if="item.isForbiddenComment === 1"><a href="#" class="aTagWithoutLine" @click="forbiddenComment(item.id)">允许评论</a></el-col>
                        <el-col class="textRed" :span="1"><a href="#" class="aTagWithoutLine" @click="deleteBlog(item.id)">删除</a></el-col>
                      </div>
                    </el-row>

                  </el-card>
                </div>
              </template>
              <template v-else-if="onlyMeReadBlogs.length === 0">
                暂时没有任何文章
              </template>
            </el-tab-pane>

            <!-- 草稿文章 -->
            <el-tab-pane :label="draftBlogsSize">
              <!-- 我评论的 -->
              <template v-if="draftBlogs.length !== 0">
                <div>
                  <el-card v-for="(item,id) in draftBlogs" v-bind:key="id">
                    <el-row>
                      <!-- 优先显示私密，然后才显示草稿 -->
                      <!-- 私密文章 -->
                      <el-col :span="2">
                        <div class="blogTag" v-if="item.onlyMeRead===1">私密</div>
                        <div v-else-if="item.onlyMeRead===0">
                          <div class="blogTag" v-if="item.isDraft===1">草稿</div>
                        </div>
                      </el-col>
                      <!-- title -->
                      <el-col class="textLeft" :span="12"><a href="#" class="aTagWithoutLine" @click="editBlog(item.id)">{{item.title}}</a></el-col>
                    </el-row>
                    <!-- 原创，时间，阅读数，评论数，查看，删除 -->
                    <el-row class="marginTop1em">
                      <!-- 原创转载标记 -->
                      <el-col :span="1" class="textLeft">
                        <div v-if="item.blogType===0">原创</div>
                        <div v-else-if="item.blogType===1">转载</div>
                      </el-col>
                      <!-- 时间 -->
                      <el-col :span="6" :offset="1">{{item.createTime | formatDate}}</el-col>
                      <!-- 阅读数 -->
                      <el-col :span="1" :offset="1"><i class="el-icon-view"></i>&nbsp;{{item.clickCount}}</el-col>
                      <!-- 评论数 -->
                      <el-col :span="1" :offset="1"><i class="el-icon-document"></i>&nbsp;{{item.replayCount}}</el-col>
                      <!-- 查看删除 -->
                      <div v-if="item.onlyMeRead===1 || item.isDraft===1">
                        <el-col class="textBlue" :span="1" :offset="10"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">查看</router-link></el-col>
                        <el-col class="textRed" :span="1"><a href="#" class="aTagWithoutLine" @click="deleteBlog(item.id)">删除</a></el-col>
                      </div>
                      <div v-else>
                        <el-col class="textBlue" :span="1" :offset="8"><router-link class="aTagWithoutLine" :to="{path:'/details/'+item.bloggerId+'/'+item.id}">查看</router-link></el-col>
                        <el-col class="textBlue" :span="2" v-if="item.isForbiddenComment === 0"><a href="#" class="aTagWithoutLine" @click="forbiddenComment(item.id)">禁止评论</a></el-col>
                        <el-col class="textBlue" :span="2" v-if="item.isForbiddenComment === 1"><a href="#" class="aTagWithoutLine" @click="forbiddenComment(item.id)">允许评论</a></el-col>
                        <el-col class="textRed" :span="1"><a href="#" class="aTagWithoutLine" @click="deleteBlog(item.id)">删除</a></el-col>
                      </div>
                    </el-row>

                  </el-card>
                </div>
              </template>
              <template v-else-if="draftBlogs.length === 0">
                暂时没有任何文章
              </template>
            </el-tab-pane>

          </el-tabs>
        </el-row>
        <!-- 分页插件 -->
        <div class="block marginTop1em">
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
      </el-row>
    </el-row>
  </div>
</template>
<script>
  import message from '../../common/message'
  import {formatDate} from '../../common/dateFormat'
  export default {
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        this.getCategoryList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getCategoryList()
      },
      getBlogList () {
        this.$http.get('/api/blog/v1/blog/findAllByBloggerId?pageNumber=' + this.currentPage + '&size=' + this.pageSize).then((successData) => {
          this.allBlogs = successData.data.data.blogList;
          this.totalSize = successData.data.data.totalRow
          this.blogClassify()

        })
      },
      findBlogs () {
        console.info(this.blogTitle)

      },
      editBlog (id) {
        this.$router.push({name:'writeBlog',params: {blogId: id}})
      },
      forbiddenComment (id) { // 将博客设置为禁止评论状态
        this.$http.get('/api/blog/v1/blog/forbiddenComment?id=' + id).then((successData) => {
          this.getBlogList()

        })
      },
      deleteBlog (id) {
        this.$http.get('/api/blog/v1/blog/deleteBlog?id=' + id).then((successData) => {
          this.getBlogList()

        })
      },
      blogClassify () {
        this.clearArr() // 清空所有数组
        for(var i=0;i<this.allBlogs.length;i++){
          let blog = this.allBlogs[i]
          if(blog.isDraft === 1){
            this.draftBlogs.push(blog)
          }
          if(blog.onlyMeRead === 1){
            this.onlyMeReadBlogs.push(blog)
          }
          if(blog.isDraft === 0 && blog.onlyMeRead === 0){
            this.publishBlogs.push(blog)
          }
        }
        this.allBlogsSize = '全部(' + this.allBlogs.length + ')'
        this.publishBlogsSize = '已发表(' + this.publishBlogs.length + ')'
        this.onlyMeReadBlogsSize = '私密(' + this.onlyMeReadBlogs.length + ')'
        this.draftBlogsSize = '草稿箱(' + this.draftBlogs.length + ')'
      },
      clearArr () { // 清空所有数组
        this.draftBlogs.splice(0,this.draftBlogs.length)
        this.onlyMeReadBlogs.splice(0,this.onlyMeReadBlogs.length)
        this.publishBlogs.splice(0,this.publishBlogs.length)
      }

    },
    data () {
      return {
        allBlogs: [],
        publishBlogs: [],
        onlyMeReadBlogs: [], // 私密博客
        draftBlogs: [],
        allBlogsSize: '',
        publishBlogsSize: '',
        onlyMeReadBlogsSize: '',
        draftBlogsSize: '',
        blogTitle: '',
        //分页插件数据
        currentPage: 1,
        pageSize: 10,
        totalSize: 0
      }
    },
    created () {
      this.getBlogList()
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
  .blogTag{
    font-size: 12px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    margin-right: 0.5rem;
    white-space: nowrap;
    border: 1px solid #e9e9e9;
  }
</style>
