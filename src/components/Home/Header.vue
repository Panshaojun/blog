<template>
  <header>
    <nav>
      <el-popover
        placement="top-start"
        title="欢迎登录"
        width="200"
        trigger="hover"
        content="您可以在我的博客登录并更改自己的信息"
        v-if="user.__user.name===''"
      >
        <span class="el-icon-s-custom" slot="reference" @click="$root.login=true"></span>
      </el-popover>

      <div v-if="user.__user.name!==''">
        <el-popover placement="top-start" width="200" trigger="hover" content="退出当前身份">
          <span class="el-icon-switch-button" slot="reference" @click="handleLogout"></span>
        </el-popover>

        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="后台管理"
          v-if="user.__user.group!=='visitor'"
        >
          <span class="el-icon-s-platform" slot="reference" @click="handleManage"></span>
        </el-popover>
      </div>
    </nav>

    <div class="jumbotron">
      <div class="container text-center">
      <h1>
        PS
        <br />J
        <span>个人博客系统</span>
      </h1>
    </div>
    <div class="rectangle-1"></div>
    <div class="rectangle-2"></div>
    <div class="rectangle-transparent-1"></div>
    <div class="rectangle-transparent-2"></div>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>
    <div class="triangle triangle-1">
      <img src="img/obj_triangle.png" alt />
    </div>
    <div class="triangle triangle-2">
      <img src="img/obj_triangle.png" alt />
    </div>
    <div class="triangle triangle-3">
      <img src="img/obj_triangle.png" alt />
    </div>
    <div class="triangle triangle-4">
      <img src="img/obj_triangle.png" alt />
    </div>
    </div>
  </header>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  searchBtn = false;
  searchInfo = "";
  get user() {
    return (this.$root as any).User;
  }
  handleManage() {
    if (this.user.__user.group === "subscriber") {
      this.$router.push({ name: "User" });
    } else {
      this.$router.push({ name: "Manage" });
    }
  }
  handleLogout() {
    this.user.logout();
  }
}
</script>

<style scoped lang='less'>
header {
  > nav {
    position: absolute;
    z-index: 9999;
    width: 100px;
    right: 50px;
    top: 20px;
    color: white;
    span {
      float: right;
      font-size: 25px;
      cursor: pointer;
      margin-left: 10px;
    }
  }

  .jumbotron {
    color: #fff;
    padding-top: 80px;
    padding-bottom: 80px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    position: relative;
    border-radius: 0;
    margin-bottom: 0;
    overflow: hidden;
    min-height: 100vh;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    .jumbotron {
      min-height: 500px;
    }
  }
  .jumbotron .container {
    position: relative;
    z-index: 1;
  }
  .jumbotron:before {
    position: absolute;
    display: block;
    content: "";
    opacity: 0.8;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ff00cc;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #333399, #ff00cc);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #333399, #ff00cc);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .jumbotron h1 {
    position: relative;
    line-height: 0.9;
    font-weight: bold;
    display: inline-block;
    border: 15px solid #fff;
    padding: 30px;
    font-size: 9rem;
    opacity: 0;
    margin-left: 40%;
    animation: 1s fadeInFromTop cubic-bezier(0.785, 0.135, 0.15, 0.86) 1s
      forwards;
    animation-delay: 0.8s;
    >span{
      position: absolute;
      top: 200px;
      right: 0;
      font-size: 25px;
    }
  }

  /*=====  End of BUTTON  ======*/
  /*==========================================
  =            FORM RECTANGLE ETC            =
  ==========================================*/
  .rectangle-1 {
    width: 2000px;
    height: 400px;
    background: #8e2de2;
    background: -webkit-linear-gradient(to right, #4a00e0, #8e2de2);
    background: linear-gradient(to right, #4a00e0, #8e2de2);
    transform-origin: 50% 150% 0;
    position: absolute;
    left: 0;
    top: 25%;
    z-index: 0;
    transform: scale(1) rotate(-10deg);
  }

  .rectangle-2 {
    width: 2000px;
    height: 400px;
    background: #8e2de2;
    background: -webkit-linear-gradient(to right, #4a00e0, #8e2de2);
    background: linear-gradient(to right, #4a00e0, #8e2de2);
    transform-origin: 65% 100% 0;
    position: absolute;
    right: -20%;
    z-index: 0;
    transform: scale(1) rotate(50deg);
  }

  @keyframes fade-in-right {
    from {
      opacity: 0;
      transform: translateX(-100vw) rotate(-15deg);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotate(-15deg);
    }
  }

  @keyframes grow1 {
    from {
      opacity: 0;
      transform: scale(2) rotate(-10deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(-10deg);
    }
  }

  @keyframes grow2 {
    from {
      opacity: 0;
      transform: scale(2) rotate(50deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(50deg);
    }
  }

  @keyframes fadeInFromTop {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .rectangle-1 {
    opacity: 0;
    animation: grow1 ease 1s forwards;
    box-shadow: 0px 20px 30px 0px rgba(9, 21, 54, 0.25) !important;
  }

  .rectangle-2 {
    opacity: 0;
    animation: grow2 ease 1s forwards;
    box-shadow: 0px 20px 30px 0px rgba(9, 21, 54, 0.25) !important;
  }

  .rectangle-transparent-1 {
    width: 500px;
    height: 500px;
    border: 15px solid rgba(255, 255, 255, 0.08);
    position: absolute;
    left: -5%;
    bottom: -10%;
    display: block;
    animation: floating-slow ease-in-out 12s infinite;
  }

  .rectangle-transparent-2 {
    width: 600px;
    height: 600px;
    border: 15px solid rgba(255, 255, 255, 0.08);
    position: absolute;
    right: -10%;
    top: 5%;
    display: block;
    animation: floating-slow ease-in-out 12s infinite;
  }

  .circle-1 {
    width: 50px;
    height: 50px;
    border: 2px solid #fff;
    position: absolute;
    display: block;
    border-radius: 50%;
    transform-origin: 50% 50%;
    left: 5%;
    top: 50%;
    animation: fadeInFromTop 0.5s linear forwards, floating ease 4s infinite;
  }

  .circle-2 {
    width: 70px;
    height: 70px;
    top: 20%;
    left: 83%;
    border: 2px solid #fff;
    position: absolute;
    display: block;
    border-radius: 50%;
    transform-origin: 50% 50%;
    animation: fadeInFromTop 0.5s linear forwards,
      floating ease-in-out 4s infinite;
  }

  .circle-3 {
    top: 80%;
    right: 25%;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    position: absolute;
    display: block;
    border-radius: 50%;
    animation: fadeInFromTop 0.5s linear forwards,
      floating ease-in-out 4s infinite;
  }

  @keyframes floating {
    0% {
      transform: translate(0%, 0%) rotate(25deg);
    }
    25% {
      transform: translate(5%, 15%) rotate(25deg);
    }
    50% {
      transform: translate(10%, 5%) rotate(25deg);
    }
    75% {
      transform: translate(0%, 15%) rotate(25deg);
    }
    100% {
      transform: translate(0%, 0%) rotate(25deg);
    }
  }

  @keyframes floating-slow {
    0% {
      transform: translate(0%, 0%) rotate(25deg);
    }
    25% {
      transform: translate(1%, 3%) rotate(25deg);
    }
    50% {
      transform: translate(2%, 1%) rotate(25deg);
    }
    75% {
      transform: translate(0%, 3%) rotate(25deg);
    }
    100% {
      transform: translate(0%, 0%) rotate(25deg);
    }
  }

  .triangle {
    position: absolute;
  }

  .triangle-1 {
    right: 0;
    animation: fadeInFromTop 0.5s linear forwards,
      floating ease-in-out 6s infinite;
  }
  .triangle-1 img {
    height: 50px;
    width: 50px;
    transform: rotate(30deg);
  }

  .triangle-2 {
    top: 30%;
    left: 20%;
    animation: fadeInFromTop 0.5s linear forwards,
      floating ease-in-out 8s infinite;
  }
  .triangle-2 img {
    width: 75px;
    height: 75px;
    transform: rotate(15deg);
  }

  .triangle-3 {
    top: 80%;
    left: 15%;
    animation: fadeInFromTop 0.5s linear forwards,
      floating ease-in-out 10s infinite;
  }
  .triangle-3 img {
    width: 45px;
    height: 45px;
    transform: rotate(40deg);
  }

  .triangle-4 {
    top: 60%;
    right: 15%;
    animation: fadeInFromTop 0.5s linear forwards,
      floating ease-in-out 5s infinite;
  }
  .triangle-4 img {
    width: 45px;
    height: 45px;
    transform: rotate(-40deg);
  }
}
</style>