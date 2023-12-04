import { FakeApi } from '@ihccc/utils';

const initData = [
  {
    avatar: '/hmbb.jpg',
    name: '海绵宝宝',
    username: 'MR.BABY',
    password: '12345678',
    roles: [{ name: '管理员', key: 'admin' }],
    status: '1',
    email: 'hmbb@123.com',
    phone: '11223356',
    brithday: '-8928-06-07',
    address: '比奇堡',
    description:
      '生活在太平洋海底一座被称为比奇堡的城市，身份是蟹堡王餐厅的高级厨师。黄色长方形海绵，其身体构成如同清洁用海绵。',
  },
];

const user = new FakeApi(initData, {
  queryType: {
    username: 'is',
  },
  debug: true,
});

export const token = (...params) => {
  return user.request(
    {
      code: '0',
      data: {
        type: 'bearer',
        token: '91fs8fk9210472x309a56s19dn2z8102d72k8sm11-fhs92x9mm-2ndsa9n0a',
      },
    },
    ...params,
  );
};

export const userInfo = (...params) => {
  return user.profile(...params);
};
