---
nav: hooks
title: useApi
group: 
  title: 请求
  order: 1
---

# 请求处理 useApi

通过添加额外的插件，对 `useRequest ` 进行了扩展

<code src="./demo/basic/index.jsx"></code>

<!-- 常规列表

<code src="./demo/list/index.jsx"></code>

依赖请求

<code src="./demo/login/index.jsx"></code> -->

## useApi 参数

支持 `useRequest` 全部功能

```
useApi(service, config);
```

| 字段    | 类型                      | 描述                                   |
| :------ | :------------------------ | -------------------------------------- |
| service | `() => Pormise<response>` | 请求方法，需要返回 `Pormise<response>` |
| config  | `IConfig`                 | 请求配置项                             |

### IConfig 参数

| 字段                                                   | 类型                                           | 描述                                                        |
| :----------------------------------------------------- | :--------------------------------------------- | ----------------------------------------------------------- |
| type <Badge>扩展</Badge>                               | `string`                                       | dessert 预设的配置索引值                                    |
| auto <Badge>扩展</Badge>                               | `Boolean`                                      | 是否自动发起请求                                            |
| defaultParams <Badge type="warning">可能不兼容</Badge> | `Object`                                       | 默认的参数，每次请求都自动携带                              |
| initialData <Badge>扩展</Badge>                        | `Object`                                       | 初始数据                                                    |
| verify <Badge>扩展</Badge>                             | `(response, IConfig) => pass: Boolean`         | 校验方法，返回校验是否通过                                  |
| format <Badge>扩展</Badge>                             | `(response) => FormatData: any`                | 校验通过，返回格式化数据方法                                |
| message <Badge>扩展</Badge>                            | `(pass, response, payload) => false \| string` | 请求结束返回的提示信息，返回将交由全局 `onMessage` 方法处理 |
| onPass <Badge>扩展</Badge>                             | `(FormatData, params) => any`                  | 校验通过回调                                                |
| onFail <Badge>扩展</Badge>                             | `(response, params) => any`                    | 校验失败回调                                                |
| onSuccess                                              | `(response) => any`                            | 请求成功回调                                                |
| onError                                                | `(response, params) => any`                    | 请求失败回调                                                |
| onFinally                                              | `(response) => any`                            | 请求结束回调                                                |

## useApi 结果

| 字段    | 类型         | 描述                         |
| :------ | :----------- | ---------------------------- |
| params  | `Object`     | 请求参数                     |
| loading | `Boolean`    | 加载状态                     |
| data    | `FormatData` | 数据                         |
| error   | `any`        | 错误信息                     |
| mutate  | `() => {}`   | 手动修改数据，别名 `setData` |
| run     | `() => {}`   | 请求方法                     |
| refresh | `() => {}`   | 刷新请求                     |

## useApi.setConfig 参数

| 字段        | 类型                                                 | 描述                 |
| :---------- | :--------------------------------------------------- | -------------------- |
| debug       | `Boolean`                                            |                      |
| dessert     | `{ key: IConfig }`                                   | 预设配置集合         |
| verify      | `(response, IConfig) => pass: Boolean`               | 预设校验方法         |
| messageType | `['成功名称', '失败名称', '错误名称']`               | 预设信息提示类型列表 |
| onMessage   | `(message: string, type: keyOf<messageType>) => any` | 预设提示信息回调     |
