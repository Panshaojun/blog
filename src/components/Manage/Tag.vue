<template>
  <main>
    <el-row style="margin-bottom:10px;">
      <el-button-group>
        <el-button icon="el-icon-refresh" @click="tags.all('刷新成功')">刷新</el-button>
        <el-button icon="el-icon-search" @click="searchBtn = true;">查找标签</el-button>
      </el-button-group>
    </el-row>

    <div class="tags">
      <el-tag
        :key="tag.id"
        v-for="tag in tags.data"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        <el-tooltip class="item" effect="dark" content="点击标签编辑" placement="top">
          <span @click="tempTag.name=tag.name,tempTag.id=tag.id,updateBtn=true;">{{tag.name}}</span>
        </el-tooltip>
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="tempTag.name"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
    </div>

    <el-dialog title="编辑标签" :visible.sync="updateBtn" width="40%">
      <el-form ref="form" :model="tempTag" label-width="80px" @submit.native.prevent>
        <el-form-item label="旧名：">{{tempTag.name}}</el-form-item>
        <el-form-item label="新名：">
          <el-input v-model="tempTag.newName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateBtn = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查找标签" :visible.sync="searchBtn" width="40%">
      <el-input v-model="searchInfo" placeholder="请输入标签关键字" style="margin:0 0 20px 0"></el-input>
      <el-tag
        :key="tag.id"
        v-for="tag in searchData"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        <el-tooltip class="item" effect="dark" content="点击标签编辑" placement="top">
          <span @click="tempTag.name=tag.name,tempTag.id=tag.id,updateBtn=true;">{{tag.name}}</span>
        </el-tooltip>
      </el-tag>
    </el-dialog>
  </main>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {
  updateBtn = false;
  searchBtn = false;
  searchInfo = "";
  searchData: Array<any> = [];
  @Watch("searchInfo") function(val: string) {
    if (val) {
      this.searchData = [];
      const reg = new RegExp(val, "i");
      const temp=[]
      for (const i of this.tags.data) {
        if (i.name.search(reg) !== -1) temp.push(i);
      }
      this.searchData = temp;
    } else {
      this.searchData = [];
    }
  }
  get tags() {
    return (this.$root as any).Meta;
  }
  tempTag = {
    id: 0,
    name: "",
    newName: null,
    type: "tag"
  };
  inputVisible = false;
  handleClose(tag: any) {
    this.tags.del({ ids: [tag.id] }, (data: boolean) => {
      if (data) {
        this.$message({ type: "success", message: "删除成功！" });
        if (this.searchBtn) {
          this.searchData = [];
          const reg = new RegExp(this.searchInfo, "i");
          for (const i of this.tags.data) {
            if (i.name.search(reg) !== -1) this.searchData.push(i);
          }
        }
        this.tags.all();
      } else {
        this.$message.error(`删除失败！`);
      }
    });
  }
  showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      (this.$refs.saveTagInput as any).$refs.input.focus();
    });
  }
  handleInputConfirm() {
    const inputValue = this.tempTag.name;
    this.tempTag.newName = null;
    if(inputValue){
      const parmas={type:'tag',name:inputValue};
      this.tags.add(this.tempTag, (data: any) => {
          if (data) {
            this.$message({ type: "success", message: "添加成功！" });
            this.tags.all();
          } else {
            this.$message.error(`标签已经存在（不能和分类同名）`);
          }
        })
    }
    this.inputVisible = false;
    this.tempTag.name = "";
  }
  handleUpdate() {
    if (this.tempTag.newName === "") this.$message.error(`不能为空哦`);
    else {
      const parmas = { id: this.tempTag.id, name: this.tempTag.newName };
      this.tags.upd(parmas, (data: any) => {
        if (data) {
          this.$message({ type: "success", message: "修改成功！" });
          this.tags.all();
          this.updateBtn = false;
        } else {
          this.$message.error(`标签已经存在（不能和分类同名）`);
        }
      });
    }
  }
  handleSearch() {
    this.searchBtn = false;
  }
}
</script>

<style scoped lang='less'>
.tags {
  padding: 20px;
  .el-tag + .el-tag {
    margin: 5px 10px;
  }
  .button-new-tag {
    margin: 0 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
}
.item {
  cursor: pointer;
}
</style>