import dessert from './dessert';
import { TObject, TApiOption, TGlobalConfig, TApiConfig } from './index.d';

const defaultApiConfig: TGlobalConfig = {
  verify: (response, config) => {
    // successCode 支持数组，可以同时设置多个
    const responseCode = response?.code;
    if (Array.isArray(config.successCode))
      return config.successCode.includes(responseCode);
    return responseCode == config.successCode;
  },
  messageType: ['success', 'warning', 'error'],
  onMessage: (message: string, type: string) => {
    if (type === defaultApiConfig.messageType?.[1]) window.alert(message);
    if (type === defaultApiConfig.messageType?.[2])
      window.alert('请求出错了！');
  },
};

const _apiConfig = new Map<string | number, any>([
  ['dessert', dessert],
  ['verify', defaultApiConfig.verify],
  ['messageType', defaultApiConfig.messageType],
  ['onMessage', defaultApiConfig.onMessage],
]);

const defaultConfig = {
  initialData: null,
  successCode: '0',
};

function setApiConfig(config: TGlobalConfig) {
  Object.entries(config).forEach(([key, value]) => {
    const conf = _apiConfig.get(key);
    _apiConfig.set(
      key,
      typeof conf === 'object' ? Object.assign(conf, value) : value,
    );
  });
  if (config.debug) console.log('[🧰 配置项]: ', _apiConfig);
}

function getApiConfig(config: TApiOption): TApiConfig {
  const dessertConfig = _apiConfig.get('dessert') as TObject;
  const dessertOption = dessertConfig[config?.type || ''];

  if (!config && !dessertOption) {
    console.warn(
      `你是否是想使用 dessert 配置来处理请求？但是你传递的 type，它不在已配置的 dessert 列表内：[${Object.keys(
        dessertConfig,
      )}]！`,
    );
  }
  return Object.assign({}, defaultConfig, dessertOption, config);
}

export default {
  get: getApiConfig,
  set: setApiConfig,
  config: _apiConfig,
};
