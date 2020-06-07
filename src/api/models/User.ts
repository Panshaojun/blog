import { MyApi } from '@/api/config'
import { message } from '@/plugins/element'
enum Role {
    Visitor = 'visitor',
    Subscriber = 'subscriber',
    Admin = 'admin'
}

interface UserInfo {
    id: number;
    username: string;
    activated: number;
    name: string;
    head: string;
    mail: string;
    url: string;
    group: Role;
    supports: Array<any>;
}

export class UserApi {
    ip = '';
    __data: Array<UserInfo> = [];
    __user: UserInfo = {
        id: 0,
        username: '0',
        activated: 0,
        name: '',
        head: '',
        mail: '',
        url: '',
        group: Role.Visitor,
        supports: []
    }
    __adminInfo: any = null;
    constructor() {
        MyApi.get('visitor/getIp', {}, (ip: any) => {
            this.ip = ip;
        });
        MyApi.get('visitor/getUser', {}, (user: any) => {
            if (user) this.__user = user;
        })
        MyApi.get('visitor/getAdminInfo', {}, (user: any) => {
            if (user) this.__adminInfo = user;
        })
    }
    login(params: any, callback: Function) {
        MyApi.post('visitor/login', params, callback);
    }
    loginByVisitor() {
        this.__user.name = `游客_${((this.ip).split(':')).join('')}`;
    }
    logout() {
        MyApi.get('visitor/logout', {}, (flag: boolean) => {
            if (flag) {
                const temp: UserInfo = {
                    id: 0,
                    username: '0',
                    activated: 0,
                    name: '',
                    head: '',
                    mail: '',
                    url: '',
                    group: Role.Visitor,
                    supports: []
                }
                this.__user = temp;
                message({
                    type: 'success',
                    message: '退出成功！'
                })
            }
        })
    }
    register(params: any, callback: Function) {
        if (!params.name) params.name = `用户_${((this.ip).split(':')).join('')}`
        MyApi.post('visitor/register', params, callback);
    }
    all(m?: string) {
        MyApi.get('admin/user_all', {}, (data: any) => {
            this.__data = data;
            m ? message({
                message: m,
                type: 'success'
            }) : null;
        })
    }
    del(params: any, callback: Function) {
        MyApi.post('admin/user_del', params, callback)
    }
    verify(callback: Function) {
        MyApi.get('visitor/verify', {}, (data: any) => {
            callback(data);
        })
    }
    get data() {
        const temp: any = [];
        for (const i of this.__data) {
            if (i.group === 'admin') continue;
            temp.push(i)
        }
        return temp;
    }
    get user() {
        return {
            uid: this.__user.id,
            name: this.__user.name,
            head: this.__user.head,
            mail: this.__user.mail,
            url: this.__user.url,
            ip: this.ip
        };
    }
    refresh(userInfo: any) {
        this.__user = userInfo;
    }
    updInfo(params: any, callback: Function) {
        if (!params.name) params.name = `用户_${((this.ip).split(':')).join('')}`;
        MyApi.get('users/user_updInfo', params, callback);
    }
    upd(params: any, callback: Function) {
        MyApi.get('users/user_upd', params, callback);
    }
}

