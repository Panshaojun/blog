import { MyApi } from '@/api/config'
import { message } from '@/plugins/element'

interface RelationshipsInfo {
    id: number;
    eid: number;
    mid: number;
}

export class RelationshipsApi {
    __data: Array<RelationshipsInfo> = [];
    constructor(){
        this.all;
    }
    all(m?: string) {
        MyApi.get('visitor/relationships_all', {}, (data: any) => {
            if (data) {
                m ? message({
                    message: m,
                    type: 'success'
                }) : null;
                this.__data=data;
            }
        })
    }
    
}