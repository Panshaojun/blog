import axios from 'axios'
import { message } from '@/plugins/element'
//axios设置
axios.defaults.withCredentials =true;//设置Credentials
axios.defaults.baseURL="http://localhost:1337/"

export class MyApi {
    //服务器请求方式
    static get(url: string, params: any, callback: Function) {
        const p: any = Object.assign({}, params);
        for (const i in p) {
            if (!p[i]) {
                delete p[i];
            }
        }
        axios.get(`${url}`, { params: p }).then((data) => {
            callback(data.data)
        }).catch((err: string) => {
            message.error(`请检查网络:${url}:${err}`);
        })
    }
    static post(url: string, params: any, callback: Function) {
        const p: any = Object.assign({}, params);
        for (const i in p) {
            if (!p[i]) {
                delete p[i];
            }
        }
        axios.post(
            `${url}`,
            params
        ).then((data) => {
            callback(data.data)
        }).catch((err: string) => {
            message.error(`请检查网络，错误详情:${err}`);
        })
    }
}