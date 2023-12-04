import { getStorage, setStorage } from '@ihccc/utils';
import { TSaveData } from "./index.d";

class LocalStore {
  static defaultName = '__defaultStore__';

  stores: { [key: string]: Map<string, any> };

  syncCallback: { [key: string]: Function };

  constructor () {
    this.stores = Object.create(null);

    this.syncCallback = {};
  }

  initStore (name: string, onSyncData?: Function) {
    this.stores[name || LocalStore.defaultName] = new Map();
    if (!!onSyncData) this.syncCallback[name] = onSyncData;
    if (!!name) this.syncStore(name);
  }

  getStore (name: string) {
    if (!!name && !this.stores[name]) {
      throw new Error('store ' + name + ' is undeclared.');
    }
    return this.stores[name || LocalStore.defaultName];
  }

  // 将 map 保存到本地
  syncStorage (name: string) {
    const data: { [key: string]: any } = {};
    this.getStore(name).forEach((value, key) => {
      data[key] = value;
    });
    setStorage(name, data);
    const callback = this.syncCallback[name];
    callback && callback (data);
  }

  // 将本地数据读取到 map
  syncStore (name: string) {
    const data = getStorage(name, {});
    for (let key in data) this.getStore(name).set(key, data[key]);
    const callback = this.syncCallback[name];
    callback && callback (data);
  }

  /**
   * 根据 key 保存缓存
   * @param {string} name 本地缓存名称
   * @param {string} key 缓存key
   * @param {any} value 数据
   * @param {number} freshTime 有效时间
   * @returns
   */
  set (name: string, key: string, value: any, freshTime?: any) {
    const saveData: TSaveData = { value, updateTime: new Date().getTime() };
    if (freshTime > 0) saveData.freshTime = saveData.updateTime + freshTime;
    this.getStore(name).set(key, saveData);
    if (!!name) this.syncStorage(name);
  }

  /**
   * 根据 key 获取缓存数据
   * @param {string} name 本地缓存名称
   * @param {string} key 缓存key
   * @param {any} defaultData 默认数据
   * @returns
   */
  get (name: string, key: string, defaultData?: any) {
    const currentCache = this.getStore(name).get(key) || {};
    if (currentCache.freshTime && currentCache.freshTime < new Date().getTime()) {
      this.getStore(name).delete(key);
      if (!!name) this.syncStorage(name);
      return defaultData;
    }
    return currentCache?.value;
  }
}

export default new LocalStore();
