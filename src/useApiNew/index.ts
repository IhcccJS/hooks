import { useRequest, useMemoizedFn } from 'ahooks';
import { config, setConfig } from './config';
import useApiHandler from './plugins/useApiHandler';
import type { Service } from 'ahooks/es/useRequest/src/types';
import type { IOptions } from './index.d';

// auto, type, initialData, verify, format, message, onSuccess, onFail
function useApi<TData, TParams extends any[]>(
  service: Service<unknown, any[]>,
  opts?: IOptions<TData, TParams>,
) {
  const { auto, type, defaultParams, ...options } = opts || {};

  const request = useRequest(
    service,
    {
      manual: !auto,
      defaultParams:
        !defaultParams || Array.isArray(defaultParams)
          ? defaultParams
          : [defaultParams],
      ...(!type ? {} : config.dessert?.[type]),
      ...options,
      globalConfig: config,
    },
    [useApiHandler],
  );

  return {
    ...request,
    setData: useMemoizedFn(
      (data?: TData | ((oldData?: TData) => TData | undefined)) =>
        request.mutate(data),
    ),
  };
}

useApi.setConfig = setConfig;

export default useApi;
