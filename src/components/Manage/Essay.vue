<template>
  <div>
    <el-row style="margin-bottom:10px;">
      <el-button-group>
        <el-button icon="el-icon-takeaway-box" @click="draft=false">所有文章</el-button>
        <el-button icon="el-icon-search" @click="handleFind">查找</el-button>
      </el-button-group>
      <span style="margin-left:50px">
        <el-badge :value="essay.draft.length" class="item">
          <el-button icon="el-icon-takeaway-box" @click="draft=true">草稿箱</el-button>
        </el-badge>
      </span>
    </el-row>
    <el-table :data="essay.data" style="width: 100%" border v-loading="false" v-show="!draft">
      <el-table-column label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="创建日期" width="210">
        <template slot-scope="scope">
          <p>{{ $root.date(scope.row.created) }}</p>
        </template>
      </el-table-column>

      <el-table-column label="修改日期" width="210">
        <template slot-scope="scope">
          <p>{{ $root.date(scope.row.modified) }}</p>
        </template>
      </el-table-column>

      <el-table-column label="分组" width="310">
        <template>
          <p>2222</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="handleUpd(scope.row)"></i>
          <i class="el-icon-delete" @click="handleDel(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="essay.draft" style="width: 100%" border v-loading="false" v-show="draft">
      <el-table-column label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="创建日期" width="210">
        <template slot-scope="scope">
          <p>{{ $root.date(scope.row.created) }}</p>
        </template>
      </el-table-column>

      <el-table-column label="修改日期" width="210">
        <template slot-scope="scope">
          <p>{{ $root.date(scope.row.modified) }}</p>
        </template>
      </el-table-column>

      <el-table-column label="分组" width="310">
        <template>
          <p>2222</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="handleUpd(scope.row)"></i>
          <i class="el-icon-delete" @click="handleDel(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="查找文章" :visible.sync="searchBtn" width="80%">
      <el-input v-model="searchInfo" placeholder="请输入文章标题关键字" style="margin:0 0 20px 0"></el-input>
      <el-table :data="searchData" style="width: 100%" border v-loading="false">
        <el-table-column label="标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="创建日期" width="210">
          <template slot-scope="scope">
            <p>{{ $root.date(scope.row.created) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="修改日期" width="210">
          <template slot-scope="scope">
            <p>{{ $root.date(scope.row.modified) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="分组" width="310">
          <template>
            <p>2222</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="handleUpd(scope.row)"></i>
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
  draft = false;
  searchBtn = false;
  searchData: any = [];
  searchInfo = "";
  @Watch("searchInfo") function(val: string) {
    if (val) {
      this.searchData = [];
      const reg = new RegExp(val, "i");
      const temp = [];
      for (const i of this.essay.data) {
        if (i.title.search(reg) !== -1) temp.push(i);
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

  get essay() {
    return (this.$root as any).Essay;
  }
  handleDel(row: any) {
    this.essay.del({ id: row.id }, (data: any) => {
      if (data) {
        this.$message({ type: "success", message: "删除成功！" });
        this.essay.all();
      } else {
        this.$message.error(`删除失败！`);
      }
    });
  }
  handleUpd(row: any) {
    this.essay.temp = row;
    (this.$root as any).File.dataToUp(row.id);
    (this.$parent as any)._go("/Manage/updEdit");
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