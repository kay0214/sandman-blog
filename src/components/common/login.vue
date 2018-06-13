<template>
  <div style='margin-top:200px'>
    <el-row>
      <!-- 根据屏幕大小设置登录大小 -->
      <el-col :offset='div_offset' :span='div_span'>
        <el-card class='box-card'>
          <div slot='header'>
            <span>SANDMAN 登录</span>
          </div>
          <div id='login' class='login_div'>
            <el-form ref='form' label-width='60px' label-position='right' label-suffix=':'>
              <el-form-item label='用户名'>
                <el-input v-model='username' type="string"></el-input>
              </el-form-item>
              <el-form-item label='密码'>
                <el-input v-model='password' type='password'></el-input>
              </el-form-item>
              <el-checkbox v-model="rememberMe">一周内记住我</el-checkbox>
            </el-form>
            <el-row type='flex' justify='center'>
              <el-button type='primary' @click='login' style='width: 250px'>登录</el-button>
            </el-row>
            <el-row>
              <el-col :span="12"><a @click='forgetPasswd'>忘记密码</a></el-col>
              <el-col :span="6" :offset="6"><a @click='toRegister'>注册</a></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import ElementUI from 'element-ui'
export default {
  methods: {
    login () {
      this.$http.post('/api/blog/v1/user/login', 'username=' + this.username + '&password=' + this.password + '&rememberMe=' + this.rememberMe).then((successData) => {
        if (successData.data.code !== 200) {
          return // 请求登录接口返回code!=200,停留在本页面提示用户重新登录
        }
        if (successData) { // 登录成功跳转到首页
          this.globalObj_.userName = this.username
          this.globalObj_.isLogin = true
          if(this.from === 'register'){
            this.$router.push('/main')
          }else{
            this.$router.go(-1)
          }

        }
      })
    },
    forgetPasswd () {
      alert('联系管理员吧')
    },
    toRegister () {
      this.$router.push('/register')
    }
  },
  data () {
    return {
      // 样式值
      div_offset: 10,
      div_span: 4,
      // 数据值
      password: '',
      username: '',
      from: '',
      rememberMe: false
    }
  },
  mounted () {
    this.from = this.$route.params.from
    if (screen.width < 800) {
      this.div_offset = 2
      this.div_span = 20
    }

  }
}

</script>
