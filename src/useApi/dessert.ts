import { TResponse } from "./index.d";

const query = {
  auto: true,
  initialData: { total: 0, list: [] },
  successCode: "0",
  format: (response: TResponse) => response.data,
  message: (pass: boolean, response: TResponse): boolean | string => !pass && (response.message || "查询失败！"),
};

const create = {
  initialData: {},
  successCode: "0",
  message: (pass: boolean, response: TResponse): boolean | string => !pass && (response.message || "新增失败！"),
};

const update = {
  initialData: {},
  successCode: "0",
  message: (pass: boolean, response: TResponse): boolean | string => !pass && (response.message || "更新失败！"),
};

const remove = {
  initialData: {},
  successCode: "0",
  message: (pass: boolean, response: TResponse): boolean | string => !pass && (response.message || "删除失败！"),
};

const list = {
  initialData: [],
  successCode: "0",
  format: (response: TResponse) => response.list,
  message: (pass: boolean, response: TResponse): boolean | string => !pass && (response.message || "查询失败！"),
};

const profile = {
  initialData: {},
  successCode: "0",
  format: (response: TResponse) => response.data,
  message: (pass: boolean, response: TResponse): boolean | string => !pass && (response.message || "查询失败！"),
};

export default { query, create, update, remove, list, profile };
