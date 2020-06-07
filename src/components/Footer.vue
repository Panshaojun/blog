<template>
  <footer>
      <el-divider></el-divider>
      <p><span style="color:#224774">Copyright©</span> <span style="color:#F56C6C">designed by panshaojun</span></p>
  </footer>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {}
</script>

<style scoped lang='less'>
footer{
    width: 95%;
    margin: 0 auto;
    padding: 0 0 10px 0;
    p{
        text-align: center;
        margin-bottom: 30px;
        font-weight: bold;
    }
}
</style>