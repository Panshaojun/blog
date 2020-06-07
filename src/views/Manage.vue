<template>
  <div id="manage">
    <nav>
      <el-collapse accordion v-model="activeName">
        <el-collapse-item name="概览">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            总览
          </template>
          <div @click="_go('/Manage/Overview')">概览</div>
        </el-collapse-item>
        <el-collapse-item name="撰写">
          <template slot="title">
            <i class="el-icon-edit"></i>
            撰写
          </template>
          <div @click="_go('/Manage/Edit')">文章</div>
        </el-collapse-item>
        <el-collapse-item name="管理">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            管理
          </template>
          <div @click="_go('/Manage/Essay')">文章</div>
          <div @click="_go('/Manage/Comment')">评论</div>
          <div @click="_go('/Manage/Category')">分类</div>
          <div @click="_go('/Manage/Tag')">标签</div>
          <div @click="_go('/Manage/File')">文件</div>
          <div @click="_go('/Manage/Subscriber')">用户</div>
        </el-collapse-item>
        <el-collapse-item name="设置">
          <template slot="title">
            <i class="el-icon-setting"></i>
            设置
          </template>
          <div @click="_go('/Manage/Info')">个人资料</div>
        </el-collapse-item>
      </el-collapse>
    </nav>
    <header>
      <span>{{manage}}</span>
      <div class="opt">
        <i class="el-icon-s-home" @click="$router.push({name:'Home'})">主页</i>
        <i class="el-icon-circle-close" @click="logout">登出</i>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  created() {
    (this.$root as any).Comment.all();
    (this.$root as any).Meta.all();
    (this.$root as any).File.all();
    (this.$root as any).User.all();
  }
  manage = "概览";
  activeName = "概览";
  _go(path: string) {
    if (this.$route.path !== path) {
      switch (path) {
        case "/Manage/Overview":
          this.manage = "概览";
          this.activeName = "概览";
          break;
        case "/Manage/updEdit":
          this.manage = "修改文章";
          this.activeName = "撰写";
          path = "/Manage/Edit";
          break;
        case "/Manage/Edit":
          this.manage = "撰写文章";
          this.activeName = "撰写";
          break;
        case "/Manage/Essay":
          this.manage = "文章管理";
          this.activeName = "管理";
          break;
        case "/Manage/Comment":
          this.manage = "评论管理";
          this.activeName = "管理";
          break;
        case "/Manage/Tag":
          this.manage = "标签管理";
          this.activeName = "管理";
          break;
        case "/Manage/Category":
          this.manage = "分类管理";
          this.activeName = "管理";
          break;
        case "/Manage/File":
          this.manage = "文件管理";
          this.activeName = "管理";
          break;
        case "/Manage/Subscriber":
          this.manage = "用户管理";
          this.activeName = "管理";
          break;
        case "/Manage/Info":
          this.manage = "个人资料";
          this.activeName = "设置";
          break;
        default:
          this.activeName = "设置";
      }
      this.$router.push({ path });
    }
  }
  logout() {
    (this.$root as any).User.logout();
    this.$router.push({ name: "Home" });
  }
}
</script>

<style lang='less'>
#manage {
  > header {
    position: fixed;
    left: 0;
    top: -1px;
    background-color: #222d32;
    height: 50px;
    width: 100%;
    color: white;
    line-height: 50px;
    > span {
      font-size: 25px;
      font-weight: bold;
      margin-left: 200px;
    }
    .opt {
      float: right;
      i {
        margin-right: 30px;
        cursor: pointer;
      }
    }
  }
  > main {
    margin: 50px 0 0 180px;
    padding: 15px;
    width: calc(100vw - 180px);
    height: calc(100vh - 50px);
    overflow: auto;
  }
  > nav {
    position: fixed;
    left: 0;
    top: -1px;
    width: 180px;
    height: 101%;
    padding-top: 49px;
    background-color: #222d32;
    .el-collapse-item__header {
      background-color: #222d32;
      color: rgba(255, 255, 255, 0.8);
      border: none;
      font-size: 14px;
      padding-left: 15px;
      > i {
        padding: 0 10px;
      }
      & .is-active {
        color: rgba(255, 255, 255, 1) !important;
      }
    }
    .el-collapse-item__wrap {
      background-color: #2c3b41;
      border: none;
      & .el-collapse-item__content {
        padding-left: 50px;
        line-height: 40px;
        color: white;
        > div {
          cursor: pointer;
        }
      }
    }
  }
}
</style>