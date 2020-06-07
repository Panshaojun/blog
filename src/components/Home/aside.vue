<template>
  <div>
    <el-card class="box-card" id="aside" shadow="never">
      <el-row>
        <el-input placeholder="搜索文章" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-row>
      <el-row>
        <h4>
          标签&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="el-icon-collection-tag"></i>
        </h4>
        <el-col>
          <el-tag type="success" v-for="i of meta.data" :key="i.id">{{i.name}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <h4>
          分类&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="el-icon-folder-opened"></i>
        </h4>
        <category :temp="meta.category"></category>
      </el-row>
    </el-card>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
import category from './category.vue'
@Component({components:{category}})
export default class extends Vue {
  search = "";
  handleSearch(){
    this.$router.push({path:'/Search'});
    (this.$root as any).Essay.searchByTitle(this.search);
  }
  get meta(){
    return (this.$root as any).Meta;
  }
}
</script>

<style scoped lang='less'>
#aside {
  h4 {
    margin: 30px 0 10px;
  }
  .el-tag {
    margin: 5px;
  }
}
</style>