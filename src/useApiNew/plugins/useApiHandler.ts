import React from 'react';

import type { IPlugin, IConfig } from '../index.d';

const useApiHandler: IPlugin<any, any[]> = (fetchInstance, fetchOptions) => {
  console.log(fetchInstance);
  const { initialData, paramsDeps, verify, format, message, onPass, onFail, globalConfig } = fetchOptions;
  const { messageType, onMessage, verify: verifyGlobal } = globalConfig as IConfig;
  const lastDataRef = React.useRef(initialData);

  const verifyFn = verify || verifyGlobal;

  React.useEffect(() => {
    if (paramsDeps) fetchInstance.run(paramsDeps);
  }, [JSON.stringify(paramsDeps)]);

  return {
    onSuccess: async (res, params) => {
      // useRequest 在 onSuccess 之前就已经设置 data 为接口相应的完整结果了
      // 这里重置数据到上一次的状态，避免data返回的是未 format 的数据结果
      fetchInstance.setState({ data: lastDataRef.current });

      const pass = verifyFn?.(res, fetchOptions);
      const msg = !message ? false : message(pass, res, params);

      if (msg) {
        onMessage?.(msg, pass ? messageType?.[0] : messageType?.[1]);
      }

      if (pass) {
        const formatedData = (await format?.(res, fetchInstance.state.data, params)) || res;
        fetchInstance.setState({ data: formatedData });
        onPass?.(formatedData || res, params);

        lastDataRef.current = formatedData;
      } else {
        onFail?.(res, params);
      }
    },
    onError: (error) => {
      onMessage?.(error, messageType?.[2]);
    },
  };
};

useApiHandler.onInit = ({ initialData }) => {
  return {
    data: initialData,
  };
};

export default useApiHandler;
