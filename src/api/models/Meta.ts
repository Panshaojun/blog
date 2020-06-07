import { MyApi } from '@/api/config'
import { message } from '@/plugins/element'

//服务器数据类型映射
interface MetaInfo {
  id: number;
  name: string;
  type: string;
  description: string;
  count: number;
  parent: number;
}

interface CategoryInfo extends MetaInfo {
  children: Array<CategoryInfo>;
}

export class MetaApi {
  __category: Array<CategoryInfo> = [];
  __tag: Array<MetaInfo> = [];
  get category(){
    return this.__category
  }
  constructor() {
    this.all();
  }
  all(m?: string) {
    MyApi.get('visitor/meta_all', {}, (data: any) => {
      m ? message({
        message: m,
        type: 'success'
      }) : null;
      const categorys: Array<CategoryInfo> = [];
      const tags: Array<MetaInfo> = [];
      for (const i of data) {
        i.type === 'category' ? categorys.push(i) : tags.push(i);
      }
      this.__category = this.parseCategory(categorys, 0);
      this.__tag=tags;
    })
  }
  add(parmas: any, callback: Function) {
    MyApi.get('admin/meta_add', parmas, callback)
  }
  upd(parmas: any, callback: Function) {
    MyApi.get('admin/meta_upd', parmas, callback)
  }
  del(parmas: any, callback: Function) {
    MyApi.get('admin/meta_del', parmas, callback)
  }

  /********* category相关 *********/
  //Category表
  get tableCategory() {
    let temp: any = this.__category;
    for (let i = 1, j = this._path.length; i < j; i++) {
      temp = temp[this._path[i].index].children;
    }
    return temp;
  }
  //解析Category
  parseCategory(data: any, flag: number) {
    const temp: Array<CategoryInfo> = [];
    for (let i = 0, j = data.length; i < j; i++) {
      if (data[i].parent === flag) temp.push(data[i]);
    }
    for (let i = 0; i < temp.length; i++) {
      temp[i].children = this.parseCategory(data, temp[i].id);
    }
    return temp;
  }
  //路径
  _path: any = [{ name: '所有分类', index: null, id: 0 }];
  get path() {
    return this._path;
  }
  pathPush(info: any) {
    this._path.push(info);
  }
  pathGo(index: number) {
    this._path.splice(index + 1, this._path.length - index - 1);
  }
  //选项
  get options() {
    return this.parseOption(this.__category);
  }
  parseOption(obj: Array<CategoryInfo>) {
    const temp: any = [];
    for (let i = 0, j = obj.length; i < j; i++) {
      const { id, name } = obj[i];
      if (obj[i].children.length !== 0) {
        temp.push({ value: id, label: name, children: this.parseOption(obj[i].children) });
      } else {
        temp.push({ value: id, label: name });
      }
    }
    return temp;
  }


  /********* tag相关 *********/
  get options2(){
    const temp: any=[];
    for(const i of this.__tag){
      temp.push({value:i.id,label:i.name})
    }
    return temp;
  }
  get data(){
    const temp: Array<any>=[];
    for(const i of this.__tag){
      temp.push({id:i.id,name:i.name})
    }
    return temp;
  }

}






