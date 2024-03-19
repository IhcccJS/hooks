import React from 'react';

import type { IPlugin, IConfig } from '../index.d';

const useApiHandler: IPlugin<any, any[]> = (fetchInstance, fetchOptions) => {
  // console.log(fetchInstance);
  const {
    initialData,
    paramsDeps,
    verify,
    format,
    message,
    onPass,
    onFail,
    globalConfig,
  } = fetchOptions;
  const {
    messageType,
    onMessage,
    verify: verifyGlobal,
  } = globalConfig as IConfig;

  const verifyFn = verify || verifyGlobal;

  React.useEffect(() => {
    console.log(fetchInstance);

    if (paramsDeps) fetchInstance.run(paramsDeps);
  }, [JSON.stringify(paramsDeps)]);

  return {
    onSuccess: async (res, params) => {
      // 重置数据到空状态
      fetchInstance.setState({ data: initialData });

      const pass = verifyFn?.(res, fetchOptions);
      const msg = !message ? false : message(pass, res, params);

      if (msg) {
        onMessage?.(msg, pass ? messageType?.[0] : messageType?.[1]);
      }

      if (pass) {
        const formatedData = await format?.(res);

        if (formatedData) fetchInstance.setState({ data: formatedData });

        onPass?.(formatedData || res, params);
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
