import { useApi } from '@ihccc/hooks';

// 统一配置请求后的处理选项
useApi.setConfig({
  // debug: true,
  dessert: {
    rows: {
      auto: true,
      initialData: { total: 0, rows: [] },
      verify: (response) =>
        typeof response.total === 'number' && Array.isArray(response.rows),
      format: (response) => response,
      message: (pass, response) => !pass && (response.message || '查询失败！'),
    },
  },
});
