import { MyApi } from '@/api/config'
import { message } from '@/plugins/element'

interface CommentInfo {
    cid: number;
    eid: number;
    uid: number;
    name: string;
    head: string;
    mail: string;
    url: string;
    created: number;
    text: string;
    parent: number;
    supports: number;
    status: string;
}

export class CommentApi {
    __data: Array<CommentInfo> = [];
    get data() {
        const temp=[];
        for(const i of this.__data){
            if(i.status!=='destroyed')temp.push(i)
        }
        return temp;
    }
    all(m: string) {
        MyApi.get('admin/comment_all', {}, (data: any) => {
            this.__data = data;
            m ? message({
                message: m,
                type: 'success'
            }) : null;
        })
    }
    del(parmas: any, callback: Function) {
        MyApi.post('admin/comment_del', parmas, callback)
    }
}