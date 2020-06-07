<template>
  <div id="app">
    <router-view />
    <el-dialog :title="title" :visible.sync="$root.login" width="40%" :before-close="handleClose">
      <el-form
        ref="form"
        :model="login"
        label-width="60px"
        v-loading="loading"
        v-show="title==='用户登录'"
      >
        <el-form-item label="账号">
          <el-input v-model="login.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="login.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input placeholder="请输入内容" v-model="login.yzm">
            <template slot="append">
              <div v-html="verifyImg" @click="getVerify"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-link
            type="primary"
            style="position: absolute;right: 10px;top:50px"
            @click="handleVisitor"
          >以游客身份游览</el-link>
          <el-button-group style="float:right;">
            <el-button type="primary" @click="toRegister">注册</el-button>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>

      <el-form
        ref="form"
        :model="register"
        label-width="80px"
        v-loading="loading"
        v-show="title==='用户注册'"
      >
        <el-form-item label="输入账号">
          <el-input v-model="register.username" clearable maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="输入密码">
          <el-input v-model="register.password" show-password maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="再次输入">
          <el-input v-model="register.passAgain" show-password maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="register.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="register.mail"></el-input>
        </el-form-item>
        <el-form-item label="主页">
          <el-input v-model="register.url"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input placeholder="请输入内容" v-model="register.yzm">
            <template slot="append">
              <div v-html="verifyImg" @click="getVerify"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group style="float:right;">
            <el-button type="primary" @click="handleRegister">注册</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>

      <el-form
        ref="form"
        :model="visitor"
        label-width="80px"
        v-loading="loading"
        v-show="title==='游客模式'"
      >
        <p style="margin-bottom:30px;font-size:13px;">
          欢迎
          <span style="color:red;font-weight:bold">{{user.__user.name}}</span>
          ！您可选择性输入以下信息，别人浏览您的评论时将会显示您的信息
        </p>
        <el-form-item label="邮箱">
          <el-input v-model="visitor.mail"></el-input>
        </el-form-item>
        <el-form-item label="主页">
          <el-input v-model="visitor.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group style="float:right;">
            <el-button type="primary" @click="handleVisitorInfo">确认</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
import { message } from "./plugins/element";
@Component
export default class extends Vue {
  created() {
    this.getVerify();
  }
  get user() {
    return (this.$root as any).User;
  }
  loading = false;
  title = "用户登录";
  verifyImg = "";
  handleClose() {
    (this.$root as any).login = false;
    this.loading = false;
    this.title = "用户登录";
    this.login.username = "";
    this.login.password = "";
    this.login.yzm = "";
    this.register.username = "";
    this.register.password = "";
    this.register.passAgain = "";
    this.register.name = "";
    this.register.mail = "";
    this.register.url = "";
    this.register.yzm = "";
    this.visitor.mail = "";
    this.visitor.url = "";
  }

  //用户登录
  login = {
    username: "",
    password: "",
    yzm: ""
  };
  timer: any = null;
  handleLogin() {
    if (this.login.username.length < 3 || this.login.password.length < 6)
      return this.$message.error("账户长度至少3位，密码长度至少达6位");
    if (this.login.yzm.length !== 4)
      return this.$message.error("验证码长度应为4位");
    this.loading = true;
    this.timer = setTimeout(() => {
      this.loading = false;
      this.handleClose();
      this.$message.error("登录时间过长，超过5s自动关闭");
    }, 5000);
    this.user.login(Object.assign({}, this.login), (data: any) => {
      clearInterval(this.timer);
      this.timer = null;
      this.loading = false;
      if (data.err) {
        this.$message.error(data.info);
      } else {
        this.user.__user = data.info;
        this.handleClose();
        this.$message({
          type: "success",
          message: `登录成功,欢迎您：${data.info.name}`
        });
      }
    });
  }

  //用户注册
  register: any = {
    username: "",
    password: "",
    passAgain: "",
    name: "",
    mail: "",
    url: "",
    yzm: ""
  };
  toRegister() {
    this.title = "用户注册";
    this.getVerify;
  }
  handleRegister() {
    if (this.register.username.length < 3 || this.register.password.length < 6)
      return this.$message.error("账户长度至少3位，密码长度至少达6位");
    if (this.register.password !== this.register.passAgain)
      return this.$message.error("两次输入的密码不一致");
    if (this.register.yzm.length !== 4)
      return this.$message.error("验证码长度应为4位");
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 5000);
    const params = Object.assign({}, this.register);
    delete params.passAgain;
    this.user.register(params, (data: any) => {
      this.loading = false;
      if (data.err) {
        this.$message.error(data.info);
      } else {
        this.user.__user = data.info;
        this.handleClose();
        this.$message({
          type: "success",
          message: `注册成功,欢迎您：${data.info.name}`
        });
      }
    });
  }
  getVerify() {
    this.user.verify((data: any) => {
      this.verifyImg = data;
    });
  }

  //游客登录
  visitor = {
    mail: "",
    url: ""
  };
  handleVisitorInfo() {
    this.loading = true;
    this.user.__user.mail = this.visitor.mail;
    this.user.__user.url = this.visitor.url;
    this.handleClose();
  }
  handleVisitor() {
    this.title = "游客模式";
    this.user.loginByVisitor();
  }
}
</script>

<style scoped lang='less'>
</style>