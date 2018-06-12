<template>
  <div>
    <!-- 头部菜单栏 -->
    <MyHeader :one-key-word="keyWord" v-on:getKeyWord="getKeyWord" v-on:getUserInfo="getUserInfo"></MyHeader>
    <!-- 整体页面内容 -->
    <el-row class="content">
      <el-col :span="10" :offset="1">
        <el-card class="content">
          <div slot="header" class="clearfix">
            <span>博客信息修改</span>
          </div>
          <el-row class="content">
            <el-col :span="4">
              头像设置:
            </el-col>
            <el-col :span="4">
              <el-upload
                class="avatar-uploader"
                action="http://39.104.80.30:8081/api/blog/v1/blogger/modifyAvatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :with-credentials="true">
                <img width="80px" height="80px" v-if="blogger.imageUrl" :src="blogger.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="upload-text">点击上传</div>
              </el-upload>

            </el-col>
          </el-row>
          <el-row class="content">
            <el-col :span="4">用户名:</el-col>
            <el-col :span="4">{{blogger.userName}}</el-col>
          </el-row>
          <el-row class="content">
            <el-col :span="4">博客昵称:</el-col>
            <el-col :span="4">{{blogger.nickName}}</el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="10" :offset="1">
        <el-card class="content">
          <div slot="header" class="clearfix">
            <span>账号信息修改</span>
          </div>
          <el-row class="content">
            <el-col :span="4">用户名:</el-col>
            <el-col :span="4">{{user.userName}}</el-col>
          </el-row>
          <el-row class="content">
            <el-col :span="4">密码:</el-col>
            <el-col :span="4">********</el-col>
          </el-row>
          <el-row class="content">
            <el-col :span="4">账号昵称:</el-col>
            <el-col :span="4">{{user.nickName}}</el-col>
          </el-row>
          <el-row class="content">
            <el-col :span="4">邮箱:</el-col>
            <el-col :span="4">{{user.email}}</el-col>
          </el-row>
          <el-row class="content">
            <el-col :span="4">手机号:</el-col>
            <el-col :span="4">{{user.mobile}}</el-col>
          </el-row>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>
<script>
  export default {
    methods: {
      dataInit () {
        this.$http.get('/api/blog/v1/blogger/getBloggerById?id=' + this.user.id).then((response) => {
          if (response.data.code === 200) {
            this.blogger = response.data.data
          }
        })
      },
      getKeyWord (keyWord) {
        this.$router.push({name:'searchBlogList',params: {keyWord: keyWord}})
      },
      getUserInfo (user) {
        this.user = user
        this.dataInit()
      },
      handleAvatarSuccess (response) { // 头像修改成功时，立即更新博主信息
        this.blogger = response.data
      }
    },
    data () {
      return {
        // 样式值
        div_offset: 1,
        div_span: 22,
        // 数据值
        blogger: '',
        user: ''
        // 搜索框内容设置
      }
    },
    created () {

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
  .avatar-uploader .el-upload {
    border: 1px dashed #000000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #000000;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    border: 1px dashed #000000;
    width: 80px;
    height: 80px;
    display: block;
  }
  .upload-text{
    margin-top: -1.3em;
    z-index: 2;
    position: absolute;
    background-color: gray;
    width: 82px;
    height: 15px;
    font-size: 12px;
    opacity: 0.8;
  }
</style>
