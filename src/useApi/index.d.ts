import type { DependencyList } from 'react';

import type Fetch from 'ahooks/es/useRequest/src/Fetch';
import type { Options, Plugin, Service, PluginReturn } from 'ahooks/es/useRequest/src/types';

export interface IObject {
  [key: string]: any;
}

export interface IConfig {
  dessert?: { [key: string]: IOptions };
  verify?: (res: TData, config: IOptions) => boolean;
  messageType?: string[];
  onMessage?: (message?: any, type?: string) => any;
}

export interface IOptions<TData, TParams extends any[]> extends Options {
  auto?: boolean;
  type?: string;
  initialData?: any;
  defaultParams?: TParams;
  paramsDeps?: TParams;
  globalConfig?: IConfig;
  verify?: (res: TData, config: IOptions) => boolean;
  format?: (res: TData, params: TParams) => any;
  message?: (pass?: boolean, res: TData, payload: TParams) => string;
  onPass?: (res: TData, payload: TParams) => any;
  onFail?: (res: TData, payload: TParams) => any;
  cacheKey?: string;
}

export type IPlugin<TData, TParams extends any[]> = {
  (fetchInstance: Fetch<TData, TParams>, options: IOptions<TData, TParams>): PluginReturn<TData, TParams>;
  onInit?: (options: IOptions<TData, TParams>) => Partial<FetchState<TData, TParams>>;
};
