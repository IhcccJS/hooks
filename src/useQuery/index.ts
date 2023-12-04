import React from 'react';
import isEqual from 'lodash/isEqual';
import { useSetState, useUnmountedRef } from 'ahooks';
import { TServices, TOpts } from "./index.d";

/**
 * 批量查询，适用于统计页，大数据页
 * @param {object} services 请求集合
 * @param {object} opts 配置项
 * @member {object} opts.initialData 初始数据
 * @member {object} opts.defaultParams 初始请求参数
 * @member {object} opts.format 格式化方法
 * @member {object} opts.onSuccess 请求成功回调
 */
function useQuery (services: TServices, opts: TOpts = {}) {
  const { initialData = {}, defaultParams = {}, format = {}, onSuccess = {} } = opts;
  const unmountedRef = useUnmountedRef();
  const [oldParams, setOldParams] = useSetState<{ [key: string]: any }>({});
  const [params, setParams] = useSetState<{ [key: string]: any }>(defaultParams);
  const [loading, setLoading] = useSetState<{ [key: string]: boolean }>({});
  const [data, setData] = useSetState<{ [key: string]: any }>(initialData);

  const query = React.useCallback(
    async (type: string) => {
      if (unmountedRef.current) return;
      setLoading({ [type]: true });
      try {
        const res = await services[type](params[type]);
        const data = format[type] ? format[type](res) : res;
        setData({ [type]: data });
        onSuccess[type] && onSuccess[type](data);
      } catch (e) {
        console.error(e);
      }
      setLoading({ [type]: false });
    },
    [params, format],
  );

  const changes = React.useMemo(() => {
    const changeParams: string[] = [];
    Object.keys(params).forEach((key) => {
      if (isEqual(params[key], oldParams[key]) == false) changeParams.push(key);
    });
    return changeParams;
  }, [params]);

  React.useEffect(() => {
    if (!unmountedRef.current && changes.length > 0) {
      changes.forEach(query);
      setOldParams(params);
    }
  }, [changes]);

  return {
    data,
    loading,
    params,
    setParams,
    query,
  };
}

export default useQuery;
