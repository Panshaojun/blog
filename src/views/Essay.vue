<template>
  <div id="essay">
    <header>
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
    </header>
    <myMain :essay="$root.Essay.essay"></myMain>
    <myComment v-if="allowComment()"></myComment>
    <myFooter></myFooter>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
import myMain from "@/components/Esaay/main.vue"
import myComment from "@/components/Esaay/comment.vue"
import myFooter from '@/components/Footer.vue'
@Component({components:{myMain,myComment,myFooter}})
export default class extends Vue {
  created(){
    if((this.$root as any).Essay.essay){
      window.scrollTo(0, 0);
    }else{
      return this.$router.replace('/Home');
    }
  }
  allowComment(){
    if((this.$root as any).Options.__option.comment&&(this.$root as any).Options.__option.comment==='allow'){
      return true;
    }else{
      return false
    }
  }
}
</script>

<style scoped lang='less'>
#essay{
  background-color: #F6F8FA;
}
header{
    font-size: 30px;
    padding: 10px 40px;
    i{
        cursor: pointer;
    }
}
</style>