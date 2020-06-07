<template>
  <div id="user">
    <header>
      <header>
        <div class="opt">
          <i class="el-icon-s-home" @click="$router.push({name:'Home'})">主页</i>
          <i class="el-icon-circle-close" @click="logout">登出</i>
        </div>
      </header>
    </header>
    <nav></nav>
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
  logout() {
    (this.$root as any).User.logout();
    this.$router.push({ name: "Home" });
  }
}
</script>

<style scoped lang='less'>
#user {
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
    padding-top: 70px;
    margin: 0 auto;
    width: 1200px;
  }
}
</style>