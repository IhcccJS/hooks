---
nav: hooks
title: useQuery
group: 
  title: 请求
  order: 1
---

# 批量请求处理

处理页面批量查询请求，常用于统计页面

## useQuery 参数

```ts
function useQuery (services: TServices, opts: TOpts = {}): TQueryResult;
```

| 字段     | 类型                                      | 描述         |
| :------- | :---------------------------------------- | ------------ |
| services | `Record<string, () => Pormise<response>>` | 请求方法合集 |
| config   | `IConfig`                                 | 请求配置项   |

### IConfig 参数

| 字段          | 类型                                  | 描述                     |
| :------------ | :------------------------------------ | ------------------------ |
| initialData   | `Record<string, any>`                 | 请求对应的初始数据       |
| defaultParams | `Record<string, Record<string, any>>` | 请求对应的初始参数       |
| format        | `Record<string, (response) => any>`   | 请求对应的格式化处理方法 |
| onSuccess     | `Record<string, (response) => any>`   | 请求对应的成功回调       |

### TQueryResult

| 字段      | 类型                                                    | 描述                             |
| :-------- | :------------------------------------------------------ | -------------------------------- |
| data      | `Record<string, any>`                                   | 数据                             |
| loading   | `Record<string, boolean>`                               | 加载状态                         |
| params    | `Record<string, Record<string, any>>`                   | 请求参数                         |
| setParams | `(params: Record<string, Record<string, any>>) => void` | 设置新的请求参数，触发对应的请求 |
| query     | `(type: string) => void`                                | 重新发起一个请求                 |
