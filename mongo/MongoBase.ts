'use strict';

import { MongoClient, Db } from 'mongodb';
import { SystemConfig } from '../config/systemconfig';

export interface ConnectOptions {
    collectionname: string,
    dbname:string
}

/**
 * 数据库链接状态
 */
export enum ConnectedState {
    disconnected = 0,
    connecting = 1,
    connected = 2
}

/**
 * 数据库连接池
 */
export class MongoBase {

    // 数据库链接对象
    protected client: MongoClient
    private static _instance: MongoBase;
    private _stat: ConnectedState;

    private constructor() {
        this._stat = ConnectedState.disconnected;
    }

    /**
     * 链接数据库
     */
    async connect(opts: ConnectOptions) {
        switch (this._stat) {
            case ConnectedState.connected:              // 数据库已经链接，直接返回
                return;
            case ConnectedState.connecting:             // 正在链接中，请等待返回
                await new Promise((resolve, reject) => { setTimeout(() => { resolve(); }, 1000) }); // 等待一秒
                await this.connect(opts);               // 这样会不会导致回调过多，直接造成进程崩溃？？？？？
                break;
            case ConnectedState.disconnected:           // 未链接或者链接失败了
            default:
                let connectString = SystemConfig.mongo.connstring;
                this._stat = ConnectedState.connecting;
                this.client = await new MongoClient(connectString);
                await this.client.connect().catch((err)=>{
                    return null;
                })
                this._stat = this.client ? ConnectedState.connected : ConnectedState.disconnected;
                if (this._stat) {
                    this.client.once("close", () => {
                        this._stat = ConnectedState.disconnected;
                        this.client.close(true);
                    });
                    this.client.once("error", () => {
                        this._stat = ConnectedState.disconnected;
                        this.client.close(true);
                    });
                    this.client.once("timeout", () => {
                        this._stat = ConnectedState.disconnected;
                        this.client.close(true);
                    });
                }
                break;
        }
    }
    /**
     * 获取数据库链接实例
     */
    get CLIENT(): MongoClient {
        return this.client;
    }

    static get Instance(): MongoBase {
        if (!this._instance) {
            this._instance = new MongoBase();
        }
        return this._instance;
    }

    /**
     * 断开链接 
     */
    async disConnect() {
        // todo
    }

}

