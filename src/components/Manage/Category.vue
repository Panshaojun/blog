<template>
  <div>
    <el-row style="margin-bottom:10px;">
      <el-button-group>
        <el-button icon="el-icon-refresh" @click="category.all('刷新成功');">刷新</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="handleAdd">添加</el-button>
      </el-button-group>
    </el-row>
    <el-row style="margin:40px 0 10px 0;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(i,key) in category.path" :key="key">
          <span @click="category.pathGo(key)">{{ i.name }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-table :data="category.tableCategory" style="width: 100%" border v-loading="false">
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column label="描述">
        <template slot-scope="scope">
          <p>{{ scope.row.description }}</p>
        </template>
      </el-table-column>

      <el-table-column label="子分类" width="100">
        <template slot-scope="scope">
          <el-link
            type="warning"
            @click="handleChirlden(scope.$index, scope.row)"
          >{{ scope.row.children.length }}</el-link>
        </template>
      </el-table-column>

      <el-table-column label="文章数" width="100">
        <template slot-scope="scope">
          <el-link type="danger">{{ scope.row.count }}</el-link>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-setting" @click="handleUpdate(scope.row)"></i>
          <i class="el-icon-delete" @click="toDel(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="警告！" :visible.sync="btnDel" width="40%">
      <span>此分类下的所有分类将被删除，其包含的文章将重置为无分类，你确认要执行此操作吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnDel = false">取 消</el-button>
        <el-button type="danger" @click="handleDel">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="btnSetting" width="50%">
      <el-form ref="form" :model="tempFrom" label-width="80px">
        <el-form-item label="名称" required>
          <el-input v-model="tempFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="父类">
          <el-cascader
            placeholder="默认无父类，点击选择"
            v-model="value"
            :options="category.options"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="tempFrom.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnSetting = false">取 消</el-button>
        <el-button type="primary" @click="handleAction">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  btnDel = false;
  btnSetting = false;
  loading = true;
  get category(){
    return (this.$root as any).Meta;
  }
  title = "";
  value: any = [];
  tempFrom: any = {
    mid: null,
    name: null,
    type: null,
    description: null,
    count: null,
    parent: null
  };
  handleChirlden(a: any, b: any) {
    this.category.pathPush({ name: b.name, index: a, id: b.id });
  }
  handleAction() {
    if (!this.tempFrom.name) return this.$message.error(`请填写名称！`);
    this.tempFrom.parent=this.value[0];
    if (this.title === "添加") {
      this.category.add(this.tempFrom, (flag: any) => {
        if (flag) {
          this.$message({ message: "添加成功！", type: "success" });
          this.category.all();
          this.btnSetting = false;
        } else {
          this.$message.error(`该分类已存在！`);
        }
      });
    } else {
      this.category.upd(this.tempFrom, (flag: any) => {
        if (flag) {
          this.$message({ message: "修改成功！", type: "success" });
          this.category.all();
          this.btnSetting = false;
        } else {
          this.$message.error(`修改失败,分类名已经存在！`);
        }
      });
    }
  }
  beforOption(t: string) {
    this.btnSetting = true;
    this.title = t;
    this.value = [];
    for (let i = 1, j = this.category.path.length; i < j; i++) {
      this.value.push(this.category.path[i].id);
    }
  }
  handleAdd() {
    this.tempFrom={
    mid: null,
    name: null,
    type: null,
    description: null,
    count: null,
    parent: null
  }
    this.beforOption("添加");
  }
  handleUpdate(obj: any) {
    this.beforOption("修改");
    this.tempFrom = Object.assign({}, obj);
  }
  tempDel: any = [];
  beforDel(obj: any) {
    this.tempDel.push(obj.id);
    if (obj.children.length !== 0) {
      for (let i = 0, j = obj.children.length; i < j; i++) {
        this.beforDel(obj.children[i]);
      }
    }
  }
  toDel(obj: any) {
    this.btnDel = true;
    this.tempDel = [];
    this.beforDel(obj);
  }
  handleDel() {
    this.category.del({ ids: this.tempDel }, (flag: boolean) => {
      if (flag) {
        this.$message({ message: "删除成功", type: "success" });
        this.btnDel=false;
        this.category.all();
      } else {
        this.$message.error(`出现了点毛病，稍后再试！`);
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