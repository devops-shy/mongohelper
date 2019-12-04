'use strict';
/**
 * 数据集
 * Copyright(c) 2016-2017 liumurong
*/

import { MongoHelper } from '../mongo/mongohelper';   


/**
 * 数据集
 */
export class MatrixSetClient extends MongoHelper {

    /**
     * 数据集
     */
    constructor() {
        super();
    }

    /**
     * 连接数据库
     */
    async connect() {
        await super.connect({
            collectionname: "xiaomoxian",
            dbname:"balala"
        });
    }

    /**
     * 插入或者更新数据集
     * @param matrixset 数据集
     */
    async insertMatrixset(xiaomoxian: XiaoMuoXian) {
        return super.updateOne({ mid: xiaomoxian.id }, xiaomoxian);
    }

    /**
     * 获取全部数据集
     * @param filter 检索条件
     */
    async getMatrixset(filter: object = {}) {
        return super.find(filter, undefined, { id: -1 });
    }
 
 

    /**
     * 获取数据集详细信息
     * @param id 数据集ID
     */
    async getMatrixsetByMatrixsetId(id: string, filter: object = {}) {
        return super.findOne(extend({
            mid: id
        }, filter));
    }
 
    /**
     * 删除数据集
     * @param id 数据集ID
     */
    async removeMatrixsetByMatrixsetId(id: string, filter: object = {}) {
        return super.deleteOne( extend({
            id: id
        }, filter));
    }
 
}

 function extend(ori, target) {
    if (ori && target) {
        for (var key in target) {
            ori[key] = target[key];
        } 
    }
    return ori;
};

interface XiaoMuoXian {
    id: number,
    name: string,
    age: number,
    job: string,
    mood: string
}