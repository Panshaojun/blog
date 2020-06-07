<template>
  <div>
    <el-row style="margin-bottom:10px;">
      <el-button-group>
        <el-button icon="el-icon-folder-opened" @click="toggle=true;selectData=[]">全部文件</el-button>
        <el-button icon="el-icon-takeaway-box" @click="toggle=false;selectData=[]">临时保管箱</el-button>
        <el-button icon="el-icon-search" @click="handleFind">查找文件</el-button>
      </el-button-group>
    </el-row>
    <el-row style="font-size:14px;margin:5px 0">
      对选中项操作：
      <el-button size="mini" i="el-icon-delete" @click="handleDel" type="warning">删除</el-button>
    </el-row>

    <div v-show="toggle">
      <el-table
        :data="file.data"
        style="width: 100%"
        border
        v-loading="false"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称" width="300">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column label="所在文章">
          <template slot-scope="scope">
            <p v-if="scope.row.eid===0">
              <span class="el-icon-takeaway-box"></span>临时保管箱
            </p>
            <p v-else>
              <el-link type="primary">{{$root.Essay.getTitle(scope.row.eid)}}</el-link>
            </p>
          </template>
        </el-table-column>

        <el-table-column label="上传日期" width="200">
          <template slot-scope="scope">
            <p>{{ $root.date(scope.row.created) }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-show="!toggle">
      <el-table
        :data="boxFile"
        style="width: 100%"
        border
        v-loading="false"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column label="上传日期" width="200">
          <template slot-scope="scope">
            <p>{{ $root.date(scope.row.created) }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="查找附件" :visible.sync="searchBtn" width="80%">
      <el-input v-model="searchInfo" placeholder="请输入附件名称关键字" style="margin:0 0 20px 0"></el-input>
      <el-table :data="searchData" style="width: 100%" border v-loading="false">
        <el-table-column label="名称" width="210">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column label="所在文章">
          <template slot-scope="scope">
            <p v-if="scope.row.eid===0">
              <span class="el-icon-takeaway-box"></span>临时保管箱
            </p>
            <p v-else>
              <el-link type="primary">{{$root.Essay.getTitle(scope.row.eid)}}</el-link>
            </p>
          </template>
        </el-table-column>

        <el-table-column label="上传日期" width="160">
          <template slot-scope="scope">
            <p>{{ $root.date(scope.row.created) }}</p>
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
  toggle = true;
  searchBtn = false;
  searchData: any = [];
  searchInfo = "";

  @Watch("searchInfo") function(val: string) {
    if (val) {
      this.searchData = [];
      const reg = new RegExp(val, "i");
      const temp = [];
      for (const i of this.file.data) {
        if (i.name.search(reg) !== -1) temp.push(i);
      }
      this.searchData = temp;
    } else {
      this.searchData = [];
    }
  }
  handleFind() {
    this.searchInfo = "";
    this.searchBtn = true;
  }
  get boxFile() {
    const temp = [];
    for (const i of this.file.data) {
      if (i.eid === 0) temp.push(i);
    }
    return temp;
  }
  get file() {
    return (this.$root as any).File;
  }

  //删除相关
  selectData: any = [];
  boxSelectData: any = [];
  handleSelectionChange(val: any) {
    if (this.toggle) {
      this.selectData = val;
    } else {
      this.boxSelectData = val;
    }
  }
  handleDel() {
    if (!this.selectData.length) {
      this.$message.error(`请选择要删除的行！`);
      return;
    }
    const ids: any = [];
    const srcs: any = [];
    for (const i of this.selectData) {
      ids.push(i.id);
      srcs.push(i.src);
    }
    this.file.del({ ids, srcs }, (data: any) => {
      if (data) {
        this.$message({ type: "success", message: "删除成功！" });
        this.file.all();
      } else {
        this.$message.error(`删除失败！`);
      }
    });
  }
  handleDel2(row: any) {
    this.file.del({ srcs: [row.src],ids: [row.id] }, (data: any) => {
      if (data) {
        this.$message({ type: "success", message: "删除成功！" });
        this.searchBtn = false;
        this.file.all();
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