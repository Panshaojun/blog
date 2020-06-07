<template>
  <div>
    <el-row style="margin-bottom:10px;font-weight:bold;">
      对选中项操作：
      <el-button-group>
        <el-button icon="el-icon-delete" @click="handleDel">删除</el-button>
      </el-button-group>
      <div style="float:right">
        <el-button icon="el-icon-search" @click="handleFind">查找</el-button>
      </div>
    </el-row>

    <el-table
      :data="comment.data"
      style="width: 100%"
      border
      v-loading="false"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="评论者" width="210">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column label="评论日期" width="160">
        <template slot-scope="scope">
          <p>{{ $root.date(scope.row.created) }}</p>
        </template>
      </el-table-column>

      <el-table-column label="内容">
        <template slot-scope="scope">
          <p>{{ scope.row.text }}</p>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="查找评论" :visible.sync="searchBtn" width="80%">
      <el-input v-model="searchInfo" placeholder="请输入文章标题关键字" style="margin:0 0 20px 0"></el-input>
      <el-table :data="searchData" style="width: 100%" border v-loading="false">
        <el-table-column label="评论者" width="210">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column label="评论日期" width="160">
          <template slot-scope="scope">
            <p>{{ $root.date(scope.row.created) }}</p>
          </template>
        </el-table-column>

        <el-table-column label="内容">
          <template slot-scope="scope">
            <p>{{ scope.row.text }}</p>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-delete" @click="handleDel2(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {
  //搜索相关
  searchBtn = false;
  searchData: any = [];
  searchInfo = "";

  @Watch("searchInfo") function(val: string) {
    if (val) {
      this.searchData = [];
      const reg = new RegExp(val, "i");
      const temp = [];
      for (const i of this.comment.data) {
        if (i.text.search(reg) !== -1) temp.push(i);
      }
      this.searchData = temp;
    } else {
      this.searchData = [];
    }
  }
  handleFind() {
    this.searchBtn = true;
    this.searchData = [];
  }

  get comment() {
    return (this.$root as any).Comment;
  }

  //删除相关
  selectData: any = [];
  handleSelectionChange(val: any) {
    this.selectData = val;
  }
  handleDel() {
    if (!this.selectData.length) {
      this.$message.error(`请选择要删除的行！`);
      return;
    }
    const temp: any = [];
    for (const i of this.selectData) {
      temp.push(i.id);
    }
    this.comment.del({ ids: temp }, (data: any) => {
      if (data) {
        this.$message({ type: "success", message: "删除成功！" });
        this.comment.all();
      } else {
        this.$message.error(`删除失败！`);
      }
    });
  }
  handleDel2(row: any) {
    this.comment.del({ ids: [row.id] }, (data: any) => {
      if (data) {
        this.$message({ type: "success", message: "删除成功！" });
        this.searchBtn=false;
        this.comment.all();
      } else {
        this.$message.error(`删除失败！`);
      }
    });
  }
}
</script>

<style scoped lang='less'>
.el-breadcrumb__item {
  span {
    cursor: pointer;
  }
}
table {
  i {
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>