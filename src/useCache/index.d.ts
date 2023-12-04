

export interface TOpts {
  /**
   * 缓存命名空间名称
   */
  storage: string;
  /**
   * 是否启用，默认不启用
   */
  defaultEnable: boolean;
  /**
   * 有效时间
   */
  freshTime: number;
  /**
   * 同步数据的回调方法
   */
  onSyncData?: Function;
}

export interface TServiceConfig {
  /**
   * 保存数据的索引
   */
  key: string;
  /**
   * 请求方法
   */
  query: (params: any) => Promise<unknown>;
  /**
   * 请求参数
   */
  params?: {};
  /**
   * 默认值
   */
  defaultData: any;
  /**
   * 格式化响应数据的方法
   */
  format: (response: any) => any;
  /**
   * 数据有效期
   */
  freshTime: number;
  /**
   * 是否在启用后自动请求，或者是一个方法
   */
  auto?: boolean | Function;
  /**
   * 轮询时间，大于0才会启用
   */
  intervalTime?: number;
}

export interface TSaveData {
  value: any;
  updateTime: number;
  freshTime?: number;
}
