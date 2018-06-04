<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.aTagWithoutLine{
  text-decoration: none;
  color: black;
  font-family: 黑体;
}
.textBlue{
  color: blue;
}
.textRed{
  color: red;
}
.text12px{
  size: 12px;
}
</style>
