import type { IConfig } from './index.d';

export const config: IConfig = {
  dessert: {},
  verify: function <TData>(response: TData, config: any) {
    // successCode 支持数组，可以同时设置多个
    const responseCode = (response as any).code;
    if (Array.isArray(config.successCode)) {
      return config.successCode.includes(responseCode);
    }
    return responseCode == config.successCode;
  },
  messageType: ['success', 'warn', 'error'],
  onMessage: (message?: any, type?: string) => {
    if (type === config.messageType?.[1]) window.alert(message);
    if (type === config.messageType?.[2]) window.alert('请求出错了！');
  },
};

export function setConfig(opts: IConfig) {
  config.dessert = Object.assign({}, config.dessert, opts.dessert);
  if (opts.verify) config.verify = opts.verify;
  if (opts.messageType) config.messageType = opts.messageType;
  if (opts.onMessage) config.onMessage = opts.onMessage;
}
