<template>
  <div style='margin-top:8em'>
    <el-row>
      <!-- 根据屏幕大小设置大小 -->
      <el-col :offset='div_offset' :span='div_span'>
        <el-card class='box-card'>
          <div slot='header'>
            <span>SANDMAN 注册</span>
          </div>
          <div id='login' class='login_div'>
            <el-form ref='form' label-width='60px' label-position='right' label-suffix=':'>
              <el-form-item label='用户名'>
                <el-input v-model='username' type="text"></el-input>
              </el-form-item>
              <el-form-item label='密码'>
                <el-input v-model='password' type='password'></el-input>
              </el-form-item>
              <el-form-item label='手机号'>
                <el-input v-model='mobile' type='number'></el-input>
              </el-form-item>
              <el-form-item label='邮箱'>
                <el-row>
                  <el-col :span='24'>
                    <el-input v-model='email' type='text'>
                      <el-button v-bind:disabled="emailBtnDisable" slot="append" @click="send_mail">{{sendEmail}}</el-button>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label='验证码'>
                <el-input v-model='validateCode' type="text"></el-input>
              </el-form-item>
            </el-form>
            <el-row type='flex' justify='center'>
              <el-button type='primary' @click='register' style='width: 120px'>注册</el-button>
              <el-button type='primary' @click='goBack' style='width: 120px'>返回</el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import message from '../../common/message'
import verify from '../../common/verify'
export default {
  methods: {
    register () {
      this.$http.post('/api/sandman/v1/user/createUser', { userName: this.username, password: this.password, mobile: this.mobile, email: this.email, validateCode: this.validateCode }).then((successData) => {
        alert('注册成功')
        this.$router.push('/login')
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    send_mail () { // 向email发送注册验证码
      if (!verify.correctEmail(this.email)) { // 校验email的正确性，正确则发送验证码，不正确则提示并return
        message.errorMsg('邮箱地址不正确', '请输入正确的电子邮箱地址')
        return
      }
      // 验证电子邮箱地址是否被其他用户绑定,未被绑定才发送验证码
      let unused = this.emailUnused(this.email) // 0:未传入联系方式；1:联系方式已经被绑定；2:联系方式未被绑定
      if (unused) { // 邮箱未被其他用户绑定
        // 如果email校验通过，就开启倒计时并发送验证码
        this.setTime()
        this.$http.post('/api/sandman/v1/validateCode/sendValidateCode', { contact: this.email }) // 发送验证码，不需要回调函数
      }
    },
    emailUnused (email) { // 验证邮箱是否未被使用，未被使用返回true，否则返回false
      let exist
      this.$http.get('/api/sandman/v1/user/contactExist?contact=' + this.email).then((response) => { // 发送验证码，不需要回调函数
        exist = response.data.exist
        if (exist !== undefined && exist === 2) {
          return true
        } else {
          return false
        }
      })
    },
    setTime () { // 邮件发送倒计时
      var sec = 60
      var self = this
      var interval = setInterval(function () {
        sec--
        if (sec > 0) {
          self.sendEmail = sec + '秒后重发'
          self.emailBtnDisable = true
        } else {
          clearInterval(interval)
          self.sendEmail = '发送验证码'
          self.emailBtnDisable = false
        }
      }, 1000)
    }
  },
  data () {
    return {
      // js数据值
      // countdown: 60,
      // 样式值
      div_offset: 8,
      div_span: 8,
      // 数据值
      emailBtnDisable: false,
      sendEmail: '发送验证码',
      username: '',
      password: '',
      mobile: '',
      email: '',
      validateCode: ''
    }
  },
  mounted () {
    if (screen.width < 800) {
      this.div_offset = 2
      this.div_span = 20
    }
  }
}
</script>
