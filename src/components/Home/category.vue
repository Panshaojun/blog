<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(obj,index) of temp" :key="obj.id" :title="obj.name" :name="index">
      <category v-if="obj.children.length!==0" :temp="obj.children"></category>
      <div v-else>没有更多了</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({ name: "category" })
export default class extends Vue {
  @Prop() temp: any;
}
</script>

<style scoped lang='less'>
.el-collapse-item__header{
  background-color: blue;
}
</style>