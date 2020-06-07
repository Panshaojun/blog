import { MyApi } from '@/api/config'
import { message } from '@/plugins/element'

interface FileInfo {
    id: number;
    eid: number;
    name: string;
    created: number;
    src: string;
}

export class FileApi extends MyApi {
    _data: Array<FileInfo> = [];//  1.保存所有的文件   或者   2.重新编辑文章已经上传的文件
    _updData: Array<FileInfo> = [];//  1.保存所有的文件   或者   2.重新编辑文章已经上传的文件
    _upload: Array<FileInfo> = [];//保存文章编辑中上传的文件
    all(m?: string) {
        MyApi.get('admin/file_all', {}, (data: any) => {
            this._data = data;
            m ? message({
                message: m,
                type: 'success'
            }) : null;
        })
    }
    del(params: any, callback: Function) {
        MyApi.post('admin/file_del', params, callback)
    }

    get data() {
        return this._data;
    }


    dataToUp(id: number) {
        const temp = [];
        for (const i of this._data) {
            if (i.eid === id) temp.push(i)
        }
        this._updData = temp;
    }
    getUp() {
        const temp: Array<any> = [];
        for (const i of this._updData) {
            temp.push(i.id)
        }
        return temp
    }
    addUp(obj: any) {
        this._upload.push(obj)
    }
    delUp(params: any, index: number) {
        MyApi.get('admin/file_del', params, (data: any) => {
            if (!data.err) {
                this.table = index;
                message({
                    message: '删除成功',
                    type: 'success'
                })
            } else {
                message.error('删除错误)');
            }
        })
    }
    get table() {
        if (this._data.length) {
            const temp = [];
            for (const i of this._updData) {
                temp.push(i);
            }
            for (const i of this._upload) {
                temp.push(i);
            }
            return temp;
        }
        return this._upload;
    }
    set table(index: any) {
        if ((index + 1) > this._updData.length) {
            this._updData.splice(index, 1);
        } else {
            this._upload.splice(index - this._updData.length, 1);
        }
    }


}