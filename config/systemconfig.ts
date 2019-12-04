
import * as path from 'path'; 
import * as fs from 'fs';

/**
 * SpringCloud微服务架构配置
 */
export interface Eureka {
    host: string
    port: number
    servicepath: string
}
/**
 * Mongodb数据库链接配置
 */
export interface Mongo {
    name: string
    connstring: string
}

/**
 * MySql
 */
export interface Mysql {
    name: string,
    host: string,
    port: number,
    dbname: string,
    user: string,
    pwd: string
}

/**
 * Redis
 */
export interface Redis {
    name: string
    connstring: string
}

/**
 * 日志持久化类型
 * @value 1:控制台   2:MongoDB数据库    4:云平台
 */
export interface Log {
    persistencetype: number
}

/**
 * JasCF日志接口配置
 */
export interface JasCF {
    gatewayhost: string,
    gatewayport: number,
    frameworkservicename: string,
    logservicename: string
}

/**
 * 系统配置
 */
export interface Config {
    servicename: string
    servicehome: string
    serviceport: number
    eureka: Eureka
    mongo: Mongo
    mysql: Mysql
    redis: Redis
    log: Log
    jascf: JasCF
}


/**
 * 系统配置
 */
export class SystemConfig {

    private static _configFilePath = path.join(__dirname, "../config.json")
    private static _config: Config;

    /**
     * 设置配置文件的路径
     */
    static set configFilePath(val: string) {
        this._configFilePath = val;
    }

    /**
     * 初始化数据
     */
    private static initConfig() {
 
    }

  
    /**
     * 获取mongo参数
     */
    static get mongo(): Mongo {
        if (!this._config) {
            this.initConfig();
        }
        return this._config.mongo;
    }
    /**
     * 设置mongo参数
     */
    static set mongo(mongo: Mongo) {
        if (!this._config) {
            this.initConfig();
        }
        this._config.mongo = mongo;
    }
    /**
     * 获取mysql参数
     */
    static get mysql(): Mysql {
        if (!this._config) {
            this.initConfig();
        }
        return this._config.mysql;
    }
    /**
     * 设置Mysql参数
     */
    static set mysql(mysql: Mysql) {
        if (!this._config) {
            this.initConfig();
        }
        this._config.mysql = mysql;
    }
    /**
     * 获取redis参数
     */
    static get redis(): Redis {
        if (!this._config) {
            this.initConfig();
        }
        return this._config.redis;
    }
    /**
     * 设置redis参数
     */
    static set redis(redis: Redis) {
        if (!this._config) {
            this.initConfig();
        }
        this._config.redis = redis;
    }
    /**
     * 获取日志参数
     */
    static get log(): Log {
        if (!this._config) {
            this.initConfig();
        }
        return this._config.log;
    }
    /**
     * 设置日志参数
     */
    static set log(log: Log) {
        if (!this._config) {
            this.initConfig();
        }
        this._config.log = log;
    }

    /**
     * 获取JASCF云平台参数
     */
    static get jascf(): JasCF {
        if (!this._config) {
            this.initConfig();
        }
        return this._config.jascf;
    }
    /**
     * 设置JASCF云平台参数
     */
    static set jascf(jas: JasCF) {
        if (!this._config) {
            this.initConfig();
        }
        this._config.jascf = jas;
    }
    /**
     * 获取服务名
     */
    static get serviceName(): string {
        if (!this._config) {
            this.initConfig();
        }
        return this._config.servicename;
    }
    /**
     * 设置服务名
     */
    static set serviceName(servicename: string) {
        if (!this._config) {
            this.initConfig();
        }
        this._config.servicename = servicename;
    }

    /**
    * 获取服务主页
    */
    static get serviceHome(): string {
        if (!this._config) {
            this.initConfig();
        }
        return this._config.servicehome;
    }
    /**
     * 设置服务主页
     */
    static set serviceHome(servicehome: string) {
        if (!this._config) {
            this.initConfig();
        }
        this._config.servicehome = servicehome;
    }
    /**
    * 获取服务端口
    */
    static get servicePort(): number {
        if (!this._config) {
            this.initConfig();
        }
        return this._config.serviceport;
    }
    /**
     * 设置服务端口
     */
    static set servicePort(port: number) {
        if (!this._config) {
            this.initConfig();
        }
        this._config.serviceport = port;
    }

    /**
     * 保存配置文件内容到本地
     */
    static saveConfig() {
        if (this._config) { 
        }
    }

}





