<template>
  <div>
    <header>
      <span class="el-icon-arrow-left" @click="$router.go(-1)"></span>
      <div class="search">
        <el-input placeholder="搜索文章" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </header>
    <main>
      <myThumbnail :data="$root.Essay.searchData"></myThumbnail>
    </main>
    <myFooter></myFooter>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
import myThumbnail from '@/components/Home/Thumbnail.vue';
import myFooter from '@/components/Footer.vue'
@Component({components:{
    myThumbnail,
    myFooter
}})
export default class extends Vue {
  input = "";
  handleSearch(){
      (this.$root as any).Essay.searchByTitle(this.input);
  }
}
</script>

<style scoped lang='less'>
header {
  height: 300px;
  width: 100%;
  background-image: linear-gradient(45deg, #753a88, #cc2b5e);
  > span {
    cursor: pointer;
    color: white;
    font-size: 30px;
    margin: 20px;
  }
  .search {
    padding-top: 120px;
    width: 500px;
    margin: 0 auto;
  }
}
main{
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>