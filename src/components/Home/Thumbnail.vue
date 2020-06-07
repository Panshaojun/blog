<template>
  <div id="thumbnail">
    <el-card
      class="box-card"
      shadow="hover"
      :body-style="{ padding: '0px' }"
      v-for="i of show"
      :key="i.id"
    >
      <div v-if="i.status==='public'">
        <img v-if="i.cover" :src="$root.host+'/'+i.cover" alt />
        <div class="info" @click="_go(i)">
          <el-row>
            <span class="show">
              <i class="el-icon-time"></i>
              <span>{{i.date}}</span>
            </span>
          </el-row>
          <h2>{{i.title}}</h2>
          <p>{{i.text}}</p>
        </div>
      </div>
      <div v-else-if="i.status==='cipher'">
        <div class="cipher">
          <el-input placeholder="该文章已经被加密，请输入密码" v-model="key" class="input-with-select">
            <el-button slot="append" icon="el-icon-key" @click="_key(i)"></el-button>
          </el-input>
        </div>
      </div>
    </el-card>
    <div v-if="data.length===0" class="err">抱歉找到没有文章</div>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="data.length"
      :page-size="4"
      :current-page.sync="index"
      :hide-on-single-page="hide"
      style="margin:0 auto;"
    ></el-pagination>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop() data: any;
  index = 1;
  get show() {
    const temp: any = [];
    const j = this.index * 4;
    for (let i = j - 4; i < j; i++) {
      if (this.data[i]) temp.push(this.data[i]);
    }
    return temp;
  }
  get hide() {
    return this.data.length <= 4 ? true : false;
  }
  _go( data: any) {
    (this.$root as any).Essay.essay = data;
    this.$router.push({ path:'/Essay' });
  }

  //解锁
  key = "";
  _key(i: any) {
    if (this.key === i.password) {
      this._go(i);
    } else {
      this.$message.error('抱歉您输入的密码有误')
    }
  }
}
</script>

<style scoped lang='less'>
#thumbnail {
  > .el-card {
    margin: 0 0 20px 0;
    img {
      width: 100%;
    }
    .info {
      cursor: pointer;
      padding: 50px 100px;
      .el-row {
        padding-bottom: 40px;
        font-size: 13px;
      }
      h2 {
        padding-bottom: 30px;
      }
      p {
        display: -webkit-box;
        font-size: 14px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 30px;
        height: 90px;
        font-weight: bold;
      }
    }
    .show {
      margin-right: 20px;
    }
    .cipher {
      width: 100%;
      height: 300px;
      padding: 100px 150px;
    }
  }
  .err {
    padding: 150px 0;
    text-align: center;
    font-size: 30px;
  }
}
</style>