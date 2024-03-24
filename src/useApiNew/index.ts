import { useRequest, useMemoizedFn } from 'ahooks';
import { config, setConfig } from './config';
import useApiHandler from './plugins/useApiHandler';
import type { Service } from 'ahooks/es/useRequest/src/types';
import type { IOptions } from './index.d';

function margeParams(params: any[], defaultParams?: any) {
  if (!Array.isArray(defaultParams)) defaultParams = [defaultParams];

  const result: any[] = [];

  params.forEach((item, index) => {
    if (typeof item === 'object') {
      result.push({ ...defaultParams[index], ...item });
    } else {
      result.push(item);
    }
  });

  return result;
}

// auto, type, initialData, verify, format, message, onSuccess, onFail
function useApi<TData, TParams extends any[]>(service: Service<unknown, any[]>, opts?: IOptions<TData, TParams>) {
  const { auto, type, defaultParams, ...options } = opts || {};

  const request = useRequest(
    service,
    {
      manual: !auto,
      defaultParams: !defaultParams || Array.isArray(defaultParams) ? defaultParams : [defaultParams],
      ...(!type ? {} : config.dessert?.[type]),
      ...options,
      globalConfig: config,
    },
    [useApiHandler],
  );

  return {
    ...request,
    setData: request.mutate,
    runAsync: useMemoizedFn((...params) => {
      return request.runAsync(...margeParams(params, defaultParams));
    }),
    run: useMemoizedFn((...params) => {
      request.run(...margeParams(params, defaultParams));
    }),
    runNext: () => {},
  };
}

useApi.setConfig = setConfig;

export default useApi;
