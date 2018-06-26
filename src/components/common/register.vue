<template>
  <div style='margin-top:8em'>
    <el-row>
      <!-- 根据屏幕大小设置大小 -->
      <el-col :offset='div_offset' :span='div_span'>
        <el-card class='box-card'>
          <div slot='header'>
            <span>Blog 注册</span>
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
                <el-input v-model='mobile' type='text'></el-input>
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
      if (this.canRegister()){
        this.$http.post('/api/blog/v1/user/createUser', 'userName=' + this.username + '&password=' + this.password + '&mobile=' + this.mobile + '&email=' + this.email + '&validateCode=' + this.validateCode).then((successData) => {
          if(successData.data.code === 200){
            message.infoMsgBox('注册成功','您已注册成功,欢迎您的使用')
            this.$router.push({name: '/login',params:{from: 'register'}})
          }
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    canRegister () {
      this.canSendEmail()
      if (!verify.correctCode(this.validateCode)) {
        // message.errorMsgBox('验证码不正确', '请输入正确的邮箱验证码')
        message.errorMsg('验证码格式不正确')
        return false
      }
      return true
    },
    canSendEmail () {
      if (!verify.correctUsername(this.username)){
        message.errorMsg('用户名必须是字母数字下划线的6-16位组合')
        // message.errorMsgBox('用户名不正确', '用户名必须是字母数字下划线的6-16位组合')
        return false
      }
      if (!verify.correctPassword(this.password)){
        message.errorMsg('密码必须是字母数字下划线的6-18位组合')
        // message.errorMsgBox('密码不正确', '密码必须是字母数字下划线的6-18位组合')
        return false
      }
      if (!verify.correctMobile(this.mobile)){
        message.errorMsg('手机号码格式不正确')
        // message.errorMsgBox('手机号不正确', '请先输入正确的手机号')
        return false
      }
      if (!verify.correctEmail(this.email)) { // 校验email的正确性，正确则发送验证码，不正确则提示并return
        message.errorMsg('电子邮箱格式不正确')
        // message.errorMsgBox('邮箱地址不正确', '请输入正确的电子邮箱地址')
        return false
      }
      return true
    },
    send_mail () { // 向email发送注册验证码
      if(this.canSendEmail()){
        // 验证电子邮箱地址是否被其他用户绑定,未被绑定才发送验证码
        this.emailUnused(this.email) // 0:未传入联系方式；1:联系方式已经被绑定；2:联系方式未被绑定
      }
    },
    emailUnused () { // 验证邮箱是否未被使用，未被使用返回true，否则返回false
      this.$http.get('/api/blog/v1/user/contactExist?contact=' + this.email).then((response) => { // 发送验证码，不需要回调函数
        if (response.data.data.exist === 2) {
          this.unused = true
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
      validateCode: '',
      unused: false
    }
  },
  mounted () {
    if (screen.width < 800) {
      this.div_offset = 2
      this.div_span = 20
    }
  },
  watch: {
    unused (newValue,oldValue) {
      if (newValue === true) { //邮箱未被其他用户绑定
        // 如果email校验通过，就开启倒计时并发送验证码
        this.setTime()
        this.$http.post('/api/blog/v1/validateCode/sendValidateCode', { contact: this.email }) // 发送验证码，不需要回调函数
        this.unused = false
      }
    }
  }
}
</script>
