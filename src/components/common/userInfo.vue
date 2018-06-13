<template>
  <div>
    <!-- 头部菜单栏 -->
    <MyHeader :one-key-word="keyWord" v-on:getKeyWord="getKeyWord"></MyHeader>
    <!-- 整体页面内容 -->
    <el-row class="content">

    </el-row>

  </div>
</template>
<script>
  export default {
    methods: {
      dataInit () {

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
        id: ''
        // 搜索框内容设置
      }
    },
    created () {
      this.id = this.$router.params.id
      this.dataInit()
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
</style>
