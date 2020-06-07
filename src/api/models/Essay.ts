import { MyApi } from '@/api/config'
import { message } from '@/plugins/element'

interface EssayInfo {
    id: number;
    title: string;
    date: any;
    created: number;
    modified: number;
    text: string;
    status: string;
    cover: string;
    allowComment: boolean;
    password: string;
}

export class EssayApi {
    //编辑文章
    __temp: EssayInfo = {
        id: 0,
        title: '',
        date: new Date(),
        created: 0,
        modified: 0,
        cover: '',
        text: '',
        status: 'public',
        allowComment: true,
        password: ''
    }
    get temp() {
        return this.__temp;
    }
    set temp(obj: any) {
        obj.allowComment = obj.allowComment ? true : false;
        this.__temp = obj;
    }
    init() {
        const time = new Date();
        this.__temp.id = 0;
        this.__temp.title = '';
        this.__temp.date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} `;
        this.__temp.created = 0;
        this.__temp.modified = 0;
        this.__temp.text = '';
        this.__temp.status = 'public';
        this.__temp.allowComment = true;
        this.__temp.password = '';
    }

    //草稿
    get draft() {
        const temp = [];
        for (const i of this.__data) {
            if (i.status === 'draft') temp.push(i)
        }
        return temp;
    }

    //所有文章
    __data: Array<EssayInfo> = [];
    constructor() {
        this.all();
    }
    all(m?: string) {
        MyApi.get('visitor/essay_all', {}, (data: any) => {
            this.data = data;
            m ? message({
                message: m,
                type: 'success'
            }) : null;
        })
    }
    getTitle(id: number) {
        for (const i of this.__data) {
            if (i.id === id) return i.title;
        }
        return '未找到文章'
    }
    set data(data: any) {
        this.__data = data;
    }
    get data() {
        const temp = [];
        for (const i of this.__data) {
            if (i.status === 'public' || i.status === 'cipher') {
                temp.push(i)
            }
        }
        return temp;
    }

    //前端展示
    _tempEssay: any = null;
    _tempComment: Array<any> = [];
    set essay(essay: any) {
        this.getComment(essay.id);
        this._tempEssay = essay;
    }
    get essay() {
        return this._tempEssay;
    }
    //前端评论
    get comment() {
        return this._tempComment;
    }
    refreshComment() {
        this.getComment(this.essay.id);
    }
    getComment(eid: number) {
        MyApi.get('visitor/comment_all', { eid }, (data: any) => {
            this._tempComment = this.parseComment(data, 0);
            for (let i = 0, j = this._tempComment.length; i < j; i++) {
                for (let x = 0, y = this._tempComment[i].children.length; x < y; x++) {
                    this.parseAgain(this._tempComment[i].children, this._tempComment[i].children[x].children)
                }
            }
        });
    }
    parseComment(data: any, flag: number): Array<Comment> {
        const temp: Array<any> = [];
        for (let i = 0, j = data.length; i < j; i++) {
            if (data[i].parent === flag) temp.push(data[i]);
        }
        for (let i = 0; i < temp.length; i++) {
            temp[i].children = this.parseComment(data, temp[i].id);
        }
        return temp;
    }
    parseAgain(p: Array<any>, c: Array<any>) {
        for (const i of c) {
            i.parent = c;
            p.push(i);
            this.parseAgain(p, i.children);
        }
    }
    addComment(params: any, callBack: Function) {
        MyApi.get('visitor/comment_add', params, callBack);
    }
    //前端搜索
    searchData: Array<EssayInfo> = [];
    searchByTitle(str: string) {
        const temp: Array<EssayInfo> = [];
        const reg = new RegExp(str, "i");
        for (const i of this.__data) {
            if (i.title.search(reg) !== -1) {
                if(i.status === 'public' || i.status === 'cipher')temp.push(i);
                
            }
        }
        this.searchData = temp;
    }
    // searchByMeta(id:number){
    //     const temp:Array<EssayInfo>=[];
    //     for(const i of this.__data){
    //         if()
    //     };
    // }


    add(files: any, metas: any, callback: Function) {
        const essay: any = Object.assign({}, this.__temp);
        delete essay.id;
        essay.created = essay.modified = Math.round(new Date().getTime() / 1000).toString();
        essay.allowComment = essay.allowComment ? 1 : 0;
        MyApi.post('admin/essay_add', {
            essay: essay,
            files,
            metas
        }, callback)
    }
    upd(files: any, metas: any, callback: Function) {
        const essay: any = Object.assign({}, this.__temp);
        essay.modified = Math.round(new Date().getTime() / 1000).toString();
        essay.allowComment = essay.allowComment ? 1 : 0;
        MyApi.post('admin/essay_upd', {
            essay: essay,
            files,
            metas
        }, callback)
    }
    del(params: any, callback: Function) {
        MyApi.get('admin/essay_del', params, callback);
    }



}