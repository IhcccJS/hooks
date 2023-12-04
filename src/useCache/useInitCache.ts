import React from 'react';
import { useUnmountedRef } from 'ahooks';
import cache from './cache';
import request from "./request";
import useCache from "./useCache";
import { TOpts, TServiceConfig } from "./index.d";

function useInitCache (opts: TOpts) {
  const { storage, freshTime, onSyncData } = opts || {};
  const requestList = Array.prototype.slice.call(arguments, 1) as TServiceConfig[];
  const enableName = '__enable__';

  const store = useCache(storage);

  const enableRef = React.useRef<boolean>(false);
  const [queryKey, setQueryKey] = React.useState<string>();

  const timer = React.useRef<{ [key: string]: NodeJS.Timer | undefined }>({});
  const params = React.useRef<{ [key: string]: any }>({});
  const initRequest = React.useRef<boolean>(false);
  const [updateKey, runUpdate] = React.useState<any>({});
  const unmounted = useUnmountedRef();

  const setLocalEnable = React.useCallback((status: boolean) => {
    if (unmounted.current || !store) return;
    enableRef.current = status;
    store.set(enableName, status);
    runUpdate({});
  }, []);

  const setParams = React.useCallback((key: string, data: any) => {
    if (unmounted.current) return;
    params.current[key] = data;
    setQueryKey(key + '-' + Date.now());
  }, []);

  const clearTimer = React.useCallback(() => {
    Object.keys(timer.current).forEach((key) => {
      clearInterval(timer.current[key]);
      timer.current[key] = void 0;
    });
  }, []);

  const handleSyncData = React.useCallback((...args: any[]) => {
    enableRef.current && onSyncData && onSyncData(...args, request, requestList.length);
  }, []);

  React.useEffect(() => {
    // 监听参数变化，执行请求
    if (queryKey) {
      const [key] = queryKey.split('-');
      request[key](params.current[key]);
    }
  }, [queryKey]);

  React.useEffect(() => {
    if (unmounted.current || !enableRef.current) return;
    enableRef.current = store.get(enableName);
    return () => request.offAll();
  }, [updateKey]);

  React.useEffect(() => {
    cache.initStore(storage, handleSyncData);

    // 初始化请求方法
    if (initRequest.current) return;
    requestList.forEach((item) => {
      if (typeof item.query !== 'function' && !store.get(item.key)) {
        if (item.defaultData) store.set(item.key, item.defaultData, item.freshTime || freshTime);
        return;
      }
      request[item.key] = async function query (params: any) {
        try {
          request.emit('before', item);
          request.emit(item.key + '/before', item);

          const response = await item.query(Object.assign({}, item.params, params));

          request.emit('success', item, response);
          request.emit(item.key + '/success', item, response);

          const data = (item.format && item.format(response)) || response;
          store.set(item.key, data, item.freshTime || freshTime);
          // if (Array.isArray(item.next)) item.next.forEach((key) => request[key]());
          // if (typeof item.next === 'string') request[item.next]();
          return response;
        } catch (error) {
          request.emit('error', item, error);
          request.emit(item.key + '/error', item, error);
        }
      };
    });
    initRequest.current = true;
    runUpdate({});
  }, []);

  React.useEffect(() => {
    // 执行初始请求，添加请求计时器
    if (!enableRef.current || !initRequest.current) return clearTimer();
    requestList.forEach((item) => {
      if (typeof item.query !== 'function') return;
      const cacheData = store.get(item.key);
      if (
        item.auto === true ||
        (typeof item.auto === 'function' && item.auto(cacheData)) ||
        (item.auto === void 0 && !cacheData)
      ) {
        request[item.key]();
        if (item.intervalTime && item.intervalTime > 0) {
          timer.current[item.key] = setInterval(() => {
            request[item.key]();
          }, item.intervalTime);
        }
      }
    });
    return clearTimer;
  }, [updateKey]);

  return {
    ...store,
    getEnable: () => enableRef.current,
    setEnable: setLocalEnable,
    setParams,
  };
}

export default useInitCache;
