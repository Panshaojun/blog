<template>
  <div id="comment">
    <div>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="发表您的看法"
        v-model="commentInfo.text"
        style="margin:20px 0"
      ></el-input>
      <el-col :offset="22">
        <el-button type="primary" @click="comment">发表评论</el-button>
      </el-col>
    </div>
    <div>
      <h4>{{$root.Essay.comment.length}}条评论</h4>
      <el-card class="comment" v-for="i of $root.Essay.comment" :key="i.id" shadow="hover">
        <el-row>
          <el-col :span="1">
            <el-popover
              placement="top-start"
              title="个人信息"
              width="200"
              trigger="hover"
            >
            <div>
              <p>邮箱{{i.mail}}</p>
              <p>主页{{i.url}}</p>
            </div>
            <el-avatar :src="$root.host+'/'+i.head" slot="reference">
            </el-avatar>
            </el-popover>
          </el-col>
          <el-col :span="20">
            <div class="name">{{i.name}}</div>
            <span class="time">{{$root.date(i.created)}}</span>
          </el-col>
          <el-col :span="3">
            <div class="reply" @click="reply(i.id,i.name)">回复</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="text" v-if="i.status==='public'">{{i.text}}</el-col>
          <el-col class="text" v-else>
            <span class="comment_del">【评论已经被删除】</span>
          </el-col>
        </el-row>

        <el-row v-for="j in i.children" :key="j.id">
          <el-col class="commentChirld">
            <span @click="reply(j.id,j.name)" class="replyChirld" v-if="j.status==='public'">回复</span>
            {{j.name}}
            <span v-if="typeof j.parent!=='number'">回复 {{j.parent[0].name}}：</span>
            <span v-else>：</span>
            <span v-if="j.status==='public'">{{j.text}}</span>
            <span class="comment_del" v-else>【评论已经被删除】</span>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <el-dialog
      :title="commentInfo.placeholder"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-input type="textarea" :rows="3" v-model="commentInfo.text"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="comment">回复</el-button>
      </span>
    </el-dialog>
  </div>
</template> 
<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  dialogVisible = false;
  commentInfo = {
    eid: 0,
    placeholder: "发表您的看法",
    text: "",
    parent: 0
  };
  created() {
    (this.commentInfo as any).eid = (this.$root as any).Essay.essay.id;
  }
  reply(id: number, name: string) {
    this.dialogVisible = true;
    this.commentInfo.parent = id;
    this.commentInfo.placeholder = `回复  ${name}`;
  }
  comment() {
    if ((this.$root as any).User.user.name === "") {
      (this.$root as any).login = true;
      return;
    }
    if (this.commentInfo.text === "")
      return this.$message({ type: "warning", message: "请填写信息" });
    const parmas: any = Object.assign(
      {
        created: (this.$root as any).date(),
        supports: 0
      },
      this.commentInfo,
      (this.$root as any).User.user
    );
    delete parmas.placeholder;
    (this.$root as any).Essay.addComment(parmas, (data: boolean) => {
      if (data) {
        (this.$root as any).Essay.refreshComment();
        this.dialogVisible = false;
        this.commentInfo.text = "";
        this.commentInfo.parent = 0;
        this.$message({ type: "success", message: "评论成功" });
      } else {
        this.$message.error("抱歉出现了点问题");
      }
    });
  }
  handleClose(done: Function) {
    this.commentInfo.text = "";
    done();
  }
}
</script>

<style scoped lang='less'>
#comment {
  padding: 20px;
  width: 1200px;
  margin: 0 auto;
  .comment_del {
    color: #d4381f;
  }
  .name {
    font-weight: bold;
    font-size: 14px;
    position: relative;
    top: 3px;
  }
  .time {
    font-size: 12px;
    color: gray;
  }
  .reply {
    font-weight: bold;
    font-size: 14px;
    float: right;
    color: #d86445;
    cursor: pointer;
  }
  .comment {
    margin: 8px 0;
    position: relative;
  }
  .text {
    padding: 10px 0 20px 0;
  }
  .commentChirld {
    padding: 10px 60px 10px 10px;
    position: relative;
    background-color: gainsboro;
    font-size: 13px;
  }
  .replyChirld {
    position: absolute;
    right: 10px;
    top: 10px;
    color: green;
    cursor: pointer;
  }
}
</style>