<template>
  <main id="main">
    <h1>{{ essay.title }}</h1>
    <p class="info">
      <span class="show">
        <i class="el-icon-date"></i>
        <span>&nbsp;&nbsp;{{essay.date}}</span>
      </span>
      <span class="show">
        <i class="el-icon-edit"></i>
        <span>&nbsp;&nbsp;{{$root.User.__adminInfo.name}}</span>
      </span>
    </p>
    <div v-html="text"></div>
  </main>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
declare const marked: any;
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
  text: any = null;
  @Prop() essay: any;
  created() {
    this.text = marked(this.essay.text);
  }
}
</script>

<style scoped lang='less'>
#main {
  margin: 0 auto;
  width: 1200px;
  >h1{
    text-align: center;
    margin: 10px;
  }
  .info {
    font-size: 13px;
    text-align: center;
    color: rgba(0, 0, 0, 0.7);
    .show {
      margin: 0 20px;
    }
  }
  >div{
    padding: 20px 0;
    >h1{
      border-bottom: solid 1px gray;
    }
    
  }
  img{
      width: 100%;
      height: 100%;
    }
}
</style>