<template>
  <div>
    <div class="tongji">
      <h3>概要统计</h3>
      <div>
        目前共有
        <span style="color:red;font-weight:bold">{{ Essay.__data.length }}</span>
        条文章,
        <span style="color:red;font-weight:bold">{{Comment.__data.length}}</span>
        条评论在您的网站中;
      </div>
      <h4>点击以下连接快速开始：</h4>
      <el-row>
        <el-col :span="3">
          <el-link type="primary" @click="$parent._go('/Manage/Edit')">撰写文章</el-link>
        </el-col>
        <el-col :span="3">
          <el-link type="success" @click="$parent._go('/Manage/Essay')">管理网站</el-link>
        </el-col>
        <el-col :span="3">
          <el-link type="warning" @click="$parent._go('/Manage/Info')">个人设置</el-link>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="10" :offset="1">
        <div class="newEssay">
          <h3>最近的新文章</h3>
          <div v-for="i of getFreshEssay()" :key="i.id">{{$root.date(i.created)}}:{{i.title}}</div>
        </div>
      </el-col>
      <el-col :span="10" :offset="2">
        <div class="newComment">
          <h3>最近的新评论</h3>
          <div v-for="i of getFreshComment()" :key="i.cid">{{$root.date(i.created)}}:{{i.text}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  get Essay() {
    return (this.$root as any).Essay;
  }
  get Comment() {
    return (this.$root as any).Comment;
  }
  getFreshEssay() {
    const temp: any = [];
    for (
      let i = this.Essay.__data.length - 1, j = 4;
      i >= 0 && j > 0;
      i--, j--
    ) {
      temp.push(this.Essay.__data[i]);
    }
    return temp;
  }
  getFreshComment() {
    const temp: any = [];
    for (
      let i = this.Comment.__data.length - 1, j = 4;
      i >= 0 && j > 0;
      i--, j--
    ) {
      temp.push(this.Comment.__data[i]);
    }
    return temp;
  }
}
</script>

<style scoped lang='less'>
.tongji {
  padding: 20px;
  h3 {
    padding: 20px 0;
  }
  h4 {
    margin: 30px 0;
  }
}
</style>