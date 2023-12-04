import React from 'react';
import { useUpdate } from 'ahooks';
import cache from './cache';
import request from "./request";

function useCache (storage: string) {
  const update = useUpdate();

  const getCache = React.useCallback(function (key: string, defaultData?: any) {
    request.emit('get', key, defaultData);
    return cache.get.call(cache, storage, key, defaultData);
  }, []);

  const setCache = React.useCallback(function (key: string, value: any, freshTime?: number) {
    request.emit('set', key, value, freshTime);
    cache.set.call(cache, storage, key, value, freshTime);
    update();
  }, []);

  const refresh = React.useCallback(() => {
    Object.keys(request).forEach((key) => {
      request[key]?.();
    });
  }, []);

  return { get: getCache, set: setCache, refresh, request };
}

export default useCache;
