<template>
  <div>
    <!-- 个人分类管理页面整体内容 -->
    <el-row class="content">
      <!-- 添加个人分类 -->
      <el-row>
        <el-col class="marginTopHalfEm" :span="4">个人分类管理</el-col>
        <el-col :span="6" :offset="10">
          <el-input v-model="categoryName" placeholder="输入分类名称" clearable></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="addCategory" round plain>添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 用户所有个人分类列表 -->
      <el-row class="marginTop1em">
        <el-card :body-style="{ padding: '0.5em' }">
          <div slot="header" class="marginBottom1em">
            <el-col :span="1">排序</el-col>
            <el-col :span="4">分类</el-col>
            <el-col :span="4" :offset="7">操作</el-col>
            <el-col :span="2">文章数</el-col>
            <el-col :span="6">时间</el-col>
          </div>
          <template v-for='(item,id) in allCategory'>
            <div v-bind:key="id">
              <el-row class="marginTop1em">
                <el-col :span="1"><i class="el-icon-caret-bottom"></i></el-col>
                <el-col :span="4">{{item.categoryName}}</el-col>
                <el-col :span="4" :offset="7">修改：删除</el-col>
                <el-col :span="2">{{item.blogCount}}</el-col>
                <el-col :span="6">{{item.createTime | formatDate}}</el-col>
              </el-row>
            </div>
          </template>
        </el-card>
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
      addCategory () {
        if(!this.isSame()){
          this.$http.get('/api/blog/v1/category/createCategory?categoryName=' + this.categoryName).then((successData) => {
            this.getCategoryList()
          })
        }else{
          //弹框提示，类型名相同
          message.errorMsg('分类名相同', '请您重新输入分类名称')
        }
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getCategoryList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getCategoryList()
      },
      getCategoryList () {
        this.$http.get('/api/blog/v1/category/getCategoryListByBloggerId?pageNumber=' + this.currentPage + '&size=' + this.pageSize).then((successData) => {
          this.allCategory = successData.data.data.categoryList;
          this.totalSize = successData.data.data.totalRow

        })
      },
      isSame () {
        let isSame = false
        for (let i = 0; i < this.allCategory.length; i++) {
          // 判断输入的分类名是否与已经存在的一致
          let categoryName = this.allCategory[i].categoryName
          if(categoryName === this.categoryName){
            isSame = true
            return isSame
          }
        }
        return isSame
      }

    },
    data () {
      return {
        allCategory: [],
        categoryName: '',
        //分页插件数据
        currentPage: 1,
        pageSize: 10,
        totalSize: 0
      }
    },
    created () {
      this.getCategoryList()
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
