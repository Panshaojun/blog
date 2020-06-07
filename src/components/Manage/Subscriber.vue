<template>
  <div>
    <el-row style="margin-bottom:10px;">
      <el-button-group>
        <el-button icon="el-icon-search" @click="handleFind">查找</el-button>
      </el-button-group>
    </el-row>
    <el-table :data="user.data" style="width: 100%" border v-loading="false">
      <el-table-column label="账户">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>

      <el-table-column label="昵称" width="210">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" width="210">
        <template slot-scope="scope">
          <p>{{ scope.row.mail }}</p>
        </template>
      </el-table-column>

      <el-table-column label="主页" width="310">
        <template slot-scope="scope">
          <p>{{ scope.row.mail }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="handleDel(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="查找文章" :visible.sync="searchBtn" width="80%">
      <el-input v-model="searchInfo" placeholder="请输入文章标题关键字" style="margin:0 0 20px 0"></el-input>
      <el-table :data="searchData" style="width: 100%" border v-loading="false">
        <el-table-column label="账户">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>

      <el-table-column label="昵称" width="210">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" width="210">
        <template slot-scope="scope">
          <p>{{ scope.row.mail }}</p>
        </template>
      </el-table-column>

      <el-table-column label="主页" width="310">
        <template slot-scope="scope">
          <p>{{ scope.row.mail }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="handleDel(scope.row)"></i>
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
      for (const i of this.user.data) {
        if (i.name.search(reg) !== -1||i.username.search(reg) !== -1) temp.push(i);
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

  get user() {
    return (this.$root as any).User;
  }
  handleAdd() {
    (this.$parent as any)._go('/Manage/Edit')
  }
  handleDel(row: any) {
    this.user.del({ ids: [row.id] }, (data: any) => {
      if (data) {
        this.$message({ type: "success", message: "删除成功！" });
        this.user.all();
        this.searchBtn=false;
        this.searchInfo='';
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