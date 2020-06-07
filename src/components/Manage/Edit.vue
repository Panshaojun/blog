<template>
  <main id="editer">
    <input type="text" ref="copy" class="copy" />
    <el-row>
      <el-col :span="18">
        <div>
          <el-input placeholder="请输入标题" v-model="essay.temp.title"></el-input>
        </div>
        <el-divider></el-divider>
        <Markdown v-model="essay.temp.text" />
      </el-col>
      <el-col :span="5" :offset="1">
        <el-card shadow="never">
          <el-form ref="form">
            <el-form-item>
              <h4>
                允许评论:&nbsp;&nbsp;
                <el-switch
                  v-model="essay.temp.allowComment"
                  active-color="#909EFF"
                  inactive-color="grey"
                ></el-switch>
              </h4>
            </el-form-item>
            <el-form-item>
              <el-badge :value="file.table.length" class="item">
                <el-button size="small" @click="dialogVisible=true">附件</el-button>
              </el-badge>
            </el-form-item>
            <el-form-item>
              <el-cascader
                v-model="categorys"
                placeholder="请选择分组"
                :options="meta.options"
                :props="{ multiple: true, checkStrictly: true }"
                clearable
                filterable
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-select v-model="tags" placeholder="添加标签" multiple>
                <el-option
                  v-for="item in meta.options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="essay.temp.date"
                type="date"
                placeholder="选择文章日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="essay.temp.status" placeholder="公开">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <transition name="el-zoom-in-top">
                <el-input
                  v-show="essay.temp.status==='cipher'"
                  placeholder="请输入密码"
                  v-model="essay.temp.password"
                  show-password
                  maxlength="10"
                ></el-input>
              </transition>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="18">
        <el-button-group style="padding:10px 0;float:right">
          <el-button type="info" icon="el-icon-edit-outline" @click="handleDraft">保存为草稿</el-button>
          <el-button
            type="primary"
            icon="el-icon-success"
            @click="handlePublish"
          >{{essay.temp.id===0?'发布该文章':'修改文章'}}</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-dialog title="附件管理" :visible.sync="dialogVisible" width="60%">
      <el-upload
        :show-file-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :with-credentials="true"
        drag
        action="http://localhost:1337/admin/file_add"
        multiple
        style="margin: 0 30%"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <el-row>
        <el-table :data="file.table" style="width: 100%" stripe>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-tooltip content="复制成markdown格式" placement="top">
                <i class="el-icon-copy-document" @click="handleCopy(scope.row)"></i>
              </el-tooltip>
              <el-tooltip content="设置成封面" placement="top" style="margin-right:5px">
                <i class="el-icon-picture-outline" @click="handleCover(scope.row)"></i>
              </el-tooltip>
              <el-tooltip content="删除该文件" placement="top">
                <i class="el-icon-delete" @click="handleDel(scope.row,scope.$index)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width="250"></el-table-column>
          <el-table-column prop="src" label="路径"></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </main>
</template>

<script>
import Markdown from "vue-meditor";
export default {
  name: "editer",
  components: {
    Markdown
  },
  data() {
    return {
      dialogVisible: false,
      tags: [], //格式是[1,2,3]
      categorys: [], //格式是[ [1], [2] ,[3] ]
      options: [
        {
          value: "public",
          label: "公开"
        },
        {
          value: "private",
          label: "私密"
        },
        {
          value: "cipher",
          label: "密码"
        }
      ]
    };
  },
  created(){
    if(this.$parent.manage!=='修改文章'){
      this.file._updData=[];
    }
  },
  methods: {
    //文件相关
    handleSuccess(response, file, fileList) {
      if (response.err) {
        this.$message.error(response.info);
      } else {
        this.$message({
          type: "success",
          message: "上传成功！"
        });
        this.file.addUp(Object.assign({}, response));
      }
    },
    handleError() {
      this.$message.error("请检查网络设置");
    },
    handleDel(row, index) {
      this.file.delUp(row, index);
    },
    handleCopy(row) {
      this.$refs.copy.value = `![此处改为你想设置的名字](${this.$root.host}/${row.src})`;
      this.$refs.copy.select();
      document.execCommand("Copy");
      this.$message({
        type: "success",
        message: "复制成功，快去粘贴吧"
      });
    },
    handleCover(row){
      this.essay.__temp.cover=row.src;
      this.$message({
        type: "success",
        message: "设置封面成功"
      });
    },

    //文章相关
    handleDraft() {
      if (!this.essay.temp.title)
        return this.$message({ type: "warning", message: "请填写标题！" });
      if (!this.essay.temp.text)
        return this.$message({ type: "warning", message: "请填内容！" });
      this.essay.temp.status = "draft";
      this.handlePublish();
    },
    getMeta() {
      const temp = [];
      for (const i of this.categorys) {
        temp.push(i[0]);
      }
      for (const j of this.tags) {
        temp.push(j);
      }
      return temp;
    },
    handlePublish() {
      if (!this.essay.temp.title)
        return this.$message({ type: "warning", message: "请填写标题！" });
      if (!this.essay.temp.text)
        return this.$message({ type: "warning", message: "请填内容！" });
      if (this.essay.temp.id === 0) {
        this.essay.add(this.file.getUp(), this.getMeta(), data => {
          if (data) {
            this.$message({ type: "success", message: "发布成功" });
            this.essay.init();
            this.file._upload = [];
            this.tags = [];
            this.categorys = [];
          } else {
            this.$message.error("发布失败");
          }
        });
      } else {
        this.essay.upd(this.file.getUp(), this.getMeta(), data => {
          if (data) {
            this.$message({ type: "success", message: "更新成功" });
            this.essay.all();
            this.essay.init();
            this.tags = [];
            this.categorys = [];
          } else {
            this.$message.error("更新失败");
          }
        });
      }
    }
  },
  computed: {
    file: function() {
      return this.$root.File;
    },
    essay: function() {
      return this.$root.Essay;
    },
    meta: function() {
      return this.$root.Meta;
    }
  }
};
</script>

<style scoped lang='less'>
#editer {
  position: relative;
  padding: 10px;
  width: 100%;
  #e-setting {
    position: absolute;
    right: 0;
    top: 50px;
  }
  .copy {
    position: fixed;
    top: -1000px;
  }
  .el-table i {
    cursor: pointer;
    font-size: 25px;
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>