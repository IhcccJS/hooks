import React from 'react';
import { useUpdate, useMemoizedFn } from 'ahooks';
import _apiConfig from './config';
import { TApiService, TApiConfig } from './index.d';

function useApi(api: TApiService, config: TApiConfig) {
  const apiConfig = _apiConfig.get({
    ...config,
    type: api.name?.replace('bound ', ''),
  });

  const { verify, format, message, onSuccess, onFail } = apiConfig;

  // console.log("apiConfig: ", api.name, apiConfig);

  const stateRef = React.useRef({
    defaultParams: apiConfig.defaultParams,
    params: {},
    data: apiConfig.initialData,
    loading: false,
    error: null,
  });

  if (config?.params) stateRef.current.params = config?.params;

  const stateDependencies = React.useRef({
    error: false,
    data: false,
    loading: false,
  });

  const update = useUpdate();

  const request = useMemoizedFn(async () => {
    if (stateRef.current.loading) return;

    const onBefore = _apiConfig.config.get('onBefore');
    const onAfter = _apiConfig.config.get('onAfter');
    const messageType = _apiConfig.config.get('messageType');
    const onMessage = _apiConfig.config.get('onMessage');

    const payload = Object.assign(
      {},
      stateRef.current.defaultParams,
      stateRef.current.params,
    );

    onBefore && onBefore(payload);

    try {
      stateRef.current.loading = true;
      if (stateDependencies.current.loading) update();

      const response = await api(payload);

      stateRef.current.loading = false;
      const verifyFn = verify || _apiConfig.config.get('verify');
      const pass = !verifyFn ? !!response : verifyFn(response, apiConfig);

      if (pass) {
        const result =
          (!format ? response : await format(response, payload)) ||
          apiConfig.initialData;
        stateRef.current.data = result;
        onSuccess && onSuccess(result);
      } else {
        onFail && onFail(response);
      }

      const tipInfo = !message ? false : message(pass, response, payload);
      if (tipInfo) onMessage?.(tipInfo, pass ? messageType[0] : messageType[1]);
    } catch (error) {
      const { onError } = apiConfig;
      stateRef.current.error = error as null;
      onMessage?.(error, messageType[2]);
      onError && onError(error);
    }

    onAfter && onAfter();

    update();
  });

  // 直接修改
  const setData = React.useCallback((data: any) => {
    stateRef.current.data =
      typeof data === 'function' ? data(stateRef.current.data) : data;
    update();
  }, []);

  // 执行请求
  const run = React.useCallback(
    async (nextParams?: any) => {
      stateRef.current.params = Object.assign({}, nextParams);
      return await request();
    },
    [request],
  );

  const refresh = React.useCallback(async () => {
    return await request();
  }, [request]);

  React.useEffect(() => {
    if (apiConfig.auto) {
      run();
    }
  }, [apiConfig.auto, ...(config?.deps || [])]);

  return {
    run,
    // once, 仅执行一次
    refresh,
    setData,
    mutate: setData,
    get params() {
      return Object.assign(
        {},
        stateRef.current.defaultParams,
        stateRef.current.params,
      );
    },
    get error() {
      stateDependencies.current.data = true;
      return stateRef.current.error;
    },
    get data() {
      stateDependencies.current.data = true;
      return stateRef.current.data;
    },
    get loading() {
      stateDependencies.current.loading = true;
      return stateRef.current.loading;
    },
  };
}

useApi.setConfig = _apiConfig.set;

export default useApi;
