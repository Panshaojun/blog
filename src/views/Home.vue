<template>
<div>
    <homeHeader></homeHeader>
    <el-row style="width: 1200px;margin:0 auto;padding: 20px 0">
        <el-col :span="16">
            <myThumbnail :data="$root.Essay.data"></myThumbnail>
        </el-col>
        <el-col :span="7" :offset="1">
            <myAside></myAside>
        </el-col>
    </el-row>
    <myFooter></myFooter>
</div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import homeHeader from '@/components/Home/Header.vue'
import myThumbnail from '@/components/Home/Thumbnail.vue'
import myAside from '@/components/Home/aside.vue'
import myFooter from '@/components/Footer.vue'
import { Component, Vue } from 'vue-property-decorator';
@Component({components:{
    homeHeader,
    myThumbnail,
    myAside,
    myFooter
}})
export default class extends Vue {
    created(){
        this.$route.meta.login=true;
    }
}
</script>

<style scoped lang='less'>
</style>