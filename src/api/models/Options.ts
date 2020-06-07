import { MyApi } from '@/api/config'
import { message } from '@/plugins/element'


export class OptionsApi {
    __option: any = {};
    constructor() {
        this.all();
    }
    all() {
        MyApi.get('visitor/options_all', {}, (data: any) => {
            for(const i of data){
                this.__option[i.key]=i.value;
            }
        })
    }
}