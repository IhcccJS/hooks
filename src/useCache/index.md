---
nav: hooks
title: useCache
group: 
  title: 缓存
  order: 1
---

# 缓存处理 useCache

## useInitCache + useCache

管理本地缓存、接口数据缓存的hooks

### useInitCache

初始化缓存数据，在全局使用

#### 参数

- 第一个参数：config

| 名称          | 类型      | 默认值      | 描述                                                                           |
| ------------- | --------- | ----------- | ------------------------------------------------------------------------------ |
| storage       | `string`  | `undefined` | 本地缓存localstorage的名称，不设置就不会保存到本地                             |
| defaultEnable | `boolean` | `undefined` | 是否启用，默认不启用；因为涉及到请求接口数据，你需要在合适的时机进行启用和禁用 |
| freshTime     | `number`  | `undefined` | 所有数据的本地缓存有效期，单位 `ms`                                            |

- 第二个及后面的参数：cacheConfig

| 名称          | 类型                | 默认值      | 描述                                         |
| ------------- | ------------------- | ----------- | -------------------------------------------- |
| key           | `string`            | `undefined` | 数据名称                                     |
| query         | `function`          | `undefined` | 请求方法                                     |
| defaultData   | `any`               | `undefined` | 默认数据                                     |
| params        | `object`            | `undefined` | 请求默认参数                                 |
| format        | `function`          | `undefined` | 格式化请求结果，需要返回你想要的数据格式     |
| requestOnInit | `boolean\|function` | `undefined` | 是否在初始化时立即执行请求                   |
| intervalTime  | `number`            | `undefined` | 轮询执行请求的时间，大于0才会启用，单位 `ms` |
| freshTime     | `number`            | `undefined` | 此数据的本地缓存有效期，单位 `ms`            |

#### 结果

返回结果是一个对象，下面仅列出 `useInitCache` 特有的返回方法，它包含 `useCache` 中所有的返回结果，其余的参考 [`useCache`](#useCache)

| 名称      | 类型                     | 描述           |
| --------- | ------------------------ | -------------- |
| setParams | `function (key, params)` | 设置参数并请求 |

### useCache

消费缓存数据，在页面使用

#### 参数

- `storage` ：在 `useInitCache` 中设置的 `storage` 名称，如果在 `useInitCache` 中没有设置名称，这个值就不需要传入

#### 结果

返回结果是一个对象

| 名称    | 类型                              | 描述                                                         |
| ------- | --------------------------------- | ------------------------------------------------------------ |
| get     | `function (key, defaultData)`     | 获取数据值                                                   |
| set     | `function (key, data, freshTime)` | 设置数据值                                                   |
| refresh | `function ()`                     | 执行所有请求刷新缓存数据                                     |
| request | `EventEmiter`                     | 请求方法的集合，可以使用 `request[key]` 来获取对应的请求方法 |

`request` 是一个事件监听器，你可以使用以下方式监听请求回调

```jsx | pure
// 监听任意请求
request.on('before', (cacheConfig) => {})
request.on('success', (cacheConfig, response) => {})
request.on('error', (cacheConfig, error) => {})

// 监听单个请求，其中key是cacheConfig设置的key
request.on('key/before', (cacheConfig) => {})
request.on('key/success', (cacheConfig, response) => {})
request.on('key/error', (cacheConfig, error) => {})

// 监听get和set
request.on('get', (key, defaultData) => {})
request.on('set', (key, data, freshTime) => {})
```
