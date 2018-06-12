<template>
  <div>
    <el-card class="content">
      <el-row>
        <el-row>
          <el-col>
            有任何意见或者觉得本站不妥，请通过以下方式联系我
          </el-col>
        </el-row>
        <el-row class="marginTop1em contactMe">
          <el-col><i class="el-icon-message"></i><a target="_blank" href="mailto:sunpeikai@yeah.net">sunpeikai@yeah.net</a></el-col>
          <el-col><i class="el-icon-phone"></i>13061408863</el-col>
          <el-col>QQ:929525390</el-col>
        </el-row>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    methods: {

    },
    data () {
      return {

      }
    },
    mounted () {

    }
  }
</script>

<style scoped>
  .content{
    margin-top: 1em;
  }
  .contactMe{
    font-size: 12px;
  }
  .el-footer {
    color: #333;
    text-align: center;
    margin-top: 2em;
    padding-top: 1em;
  }
</style>
