import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'

import {  Meta, Essay, File, Comment,User,Options } from '@/api'
Vue.config.productionTip = false

const host="http://localhost:1337"
export const myBlog= new Vue({
  router,
  render: h => h(App),
  data: {
    login:false,
    host,
    Meta,
    Essay,
    File,
    Comment,
    User,
    Options
  },
  methods: {
    date(date?: number): any {
      if (date) {
        const time = new Date(date * 1000);
        let month: any = time.getMonth() + 1;
        let d: any = time.getDate();
        let h: any = time.getHours();
        let m: any = time.getMinutes();
        let s: any = time.getSeconds();
        month = month < 10 ? '0' + month : month;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return `${time.getFullYear()}-${month}-${d}  ${h}:${m}:${s}`;
      } else {
        return Math.round(new Date().getTime()/1000).toString();
      }
    }
  }
}).$mount('#app')
