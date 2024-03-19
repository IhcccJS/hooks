---
nav: hooks
title: useApi
group: 
  title: 请求
  order: 1
---

# 请求处理 useApi

<!-- 基本使用

<code src="./demo/basic/index.jsx"></code> -->
<!-- 
常规列表

<code src="./demo/list/index.jsx"></code> -->

<!-- 依赖请求

<code src="./demo/login/index.jsx"></code> -->

## useApi 参数

```
useApi(api, config);
```

| 字段   | 类型                      | 描述                                   |
| :----- | :------------------------ | -------------------------------------- |
| api    | `() => Pormise<response>` | 请求方法，需要返回 `Pormise<response>` |
| config | `TConfig`                 | 请求配置项                             |

### TConfig 参数

| 字段          | 类型                                           | 描述 |
| :------------ | :--------------------------------------------- | ---- |
| auto          | `Boolean`                                      |      |
| defaultParams | `Object`                                       |      |
| params        | `Object`                                       |      |
| initialData   | `Object`                                       |      |
| verify        | `(response) => pass: Boolean`                  |      |
| format        | `(response) => FormatData: any`                |      |
| message       | `(pass, response, payload) => false \| string` |      |
| onSuccess     | `(FormatData) => any`                          |      |
| onFail        | `(response) => any`                            |      |
| onFinish      | `(response) => any`                            |      |

## useApi 结果

| 字段    | 类型         | 描述 |
| :------ | :----------- | ---- |
| params  | `Object`     |      |
| loading | `Boolean`    |      |
| data    | `FormatData` |      |
| error   | `any`        |      |
| mutate  | `() => {}`   |      |
| run     | `() => {}`   |      |
| refresh | `() => {}`   |      |

## useApi.setConfig 参数

| 字段        | 类型      | 描述 |
| :---------- | :-------- | ---- |
| debug       | `Boolean` |      |
| dessert     |           |      |
| verify      |           |      |
| messageType |           |      |
| onMessage   |           |      |
