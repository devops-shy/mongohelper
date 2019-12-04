'use strict';

import { MongoBase, ConnectOptions, ConnectedState } from './MongoBase';
import { Collection } from 'mongodb'; 

/**
 * 数据库连接基类
 */
export class MongoHelper {
    protected _col: Collection
    private _colName: string

    constructor() {
    } 
    async connect(opts: ConnectOptions) {
        this._colName = opts.collectionname;
        await MongoBase.Instance.connect(opts);
        if (MongoBase.Instance.CLIENT) {
            this._col = MongoBase.Instance.CLIENT.db(opts.dbname).collection(opts.collectionname);
        }
    }
    /**
     * 查询数据
     * 返回结果为数组
     * @param filter 选择器
     * @param fields 字段选项
     * @param sortopts 排序选项
     */
    async find(filter: object = {}, fields: object = { "_id": 0 }, sortopts: object = {}) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.find(filter, fields).sort(sortopts).toArray();
    }
    /**
     * 查询数据
     * 只返回符合条件的第一个数据
     * @param filter 选择器 
     * @param fields 字段选项
     * @param sortopts 排序选项
     */
    async findOne(filter: object = {}, fields: object = { "_id": 0 }, sortopts: object = {}) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.findOne(filter, {
            fields: fields,
            sort: sortopts
        });
    }
    /**
     * 按页查询数据
     * @param filter 选择器
     * @param offset 偏移量
     * @param pagecount 查询数据最大个数
     * @param fields 字段选项
     * @param sortopts 排序选项
     */
    async findByPage(filter: object = {}, offset: number = 0, pagecount: number = 20, fields: object = { "_id": 0 }, sortopts: object = {}) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.find(filter, fields).sort(sortopts).skip(offset).limit(pagecount).toArray();
    }
    /**
     * 更新数据
     * @param filter 选择器
     * @param update 更新对象
     * @param multi 是否更新多条记录
     */
    async update(filter: object, update: object, multi: boolean = true, upsert: boolean = false) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.update(filter, { "$set": update }, {
            multi: multi,
            upsert: upsert
        });
    }
    /**
    * 更新数据
    * @param filter 选择器
    * @param update 更新对象
    * @param multi 是否更新多条记录
    */
    async nativeUpdate(filter: object, update: object, multi: boolean = true) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.update(filter, update, {
            multi: multi
        });
    }
    /**
     * 
     * @param filter 选择器
     * @param update 更新的对象
     * @param upsert 如果不存在，是否插入
     */
    async updateOne(filter: object, update: object, upsert: boolean = true) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.updateOne(filter, { "$set": update }, {
            upsert: upsert
        });
    }

    /**
     * 更新一个对象，调用SDK原生方法，中间不做任务处理
     * @param filter 选择器
     * @param update 更新对象
     * @param upsert 如果对象不存在，是否插入
     */
    async nativeUpdateOne(filter: object, update: object, upsert: boolean = true) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.updateOne(filter, update, {
            upsert: upsert
        });
    }

    /**
     * 只删除第一条符合条件的对象
     * 如果未指定选择器，那么将删除集合中全部数据
     * @param filter 筛选器
     */
    async deleteOne(filter: object = {}) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.deleteOne(filter);
    }
    /**
     * 删除多条符合条件的对象
     * 如果未指定选择器，那么将删除集合中全部数据
     * @param filter 筛选器
     */
    async deleteMany(filter: object = {}) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.deleteMany(filter);
    }

    /**
     * 插入记录
     * 此插入并不会检测重复值
     * @param docs 记录
     */
    async insert(docs: object) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.insert(docs);
    }

    /**
    * 插入记录
    * 此插入并不会检测重复值
    * @param docs 记录
    */
    async insertMany(docs: object[]) {
        if (!this._col) {
            return Promise.reject("数据集合不存在:" + this._colName);
        }
        return this._col.insertMany(docs);
    }

    /**
     * 获取集合中数据个数
     * @param filter 选择器
     */
    async count(filter: object = {}) {
        return this._col.count(filter);
    }

    /**
     * 去重
     * @param field 字段
     * @param query 查询对象
     */
    async distinct(field: string, query: object = {}) {
        return this._col.distinct(field, query);
    }

}

