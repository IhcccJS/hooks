import type { DependencyList } from 'react';

export interface TObject {
  [key: string]: any;
}

export interface TResponse {
  [key: string]: any;
}

export type TVerifyFunction = (
  response: TResponse,
  config: TApiOption,
) => boolean;

export type TFormatFunction = (response: TResponse, params: TObject) => any;

export type TResponseFunction = (response: TResponse) => any;

export type TMessageFunction = (
  pass: boolean,
  response: TResponse,
  params: TObject,
) => boolean | string;

// export interface TDessertConfig {
//   query: TApiOption,
//   create: TApiOption,
//   update: TApiOption,
//   remove: TApiOption
// }

export interface TApiOption {
  /**
   * dessert 处理类型
   */
  type?: string;
  /**
   * 是否自动请求
   */
  auto?: boolean;
  /**
   * 默认数据
   */
  initialData?: any;
  /**
   * 默认参数，仅在默认请求时生效
   */
  defaultParams?: TObject;
  /**
   * 初始参数，每次请求都会携带
   */
  params?: TObject;
  /**
   * 校验方法，检测请求是否是成功状态
   */
  verify?: TVerifyFunction;
  /**
   * 依赖请求参数列表
   */
  deps?: DependencyList;
  /**
   * 格式化响应结果
   */
  format?: TFormatFunction;
  /**
   * 请求提醒消息
   */
  message?: TMessageFunction;

  /**
   * 成功响应的回调
   */
  onSuccess?: TResponseFunction;

  onFail?: TResponseFunction;

  onError?: Function;

  [key: string]: any;
}

export interface TGlobalConfig {
  debug?: boolean;
  dessert?: { [name: string]: TApiOption };
  verify: TVerifyFunction;
  messageType: string[];
  onMessage: (message: string, type: string) => any;
}

export type TMapConfig = Map<string, TGlobalConfig>;

export interface TApiConfig extends TApiOption {}

export type TApiService = (params: TObject) => Promise<TResponse>;
