import { sample } from 'lodash';
import { FakeApi } from '@ihccc/utils';

const initData = [
  {
    avatar: '/pdx.jpg',
    name: '派大星',
    username: 'MR.PAI',
    password: '12345678',
    roles: [{ name: '管理员', key: 'admin' }],
    status: '1',
    email: 'pdm@123.com',
    phone: '11223389',
    brithday: '2009-12-01',
    address: '比奇堡',
    description:
      '他是一只粉红色的海星，说话嗓音粗，头脑简单，四肢发达，海绵宝宝的好朋友。',
  },
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
  {
    avatar: '/xlb.jpg',
    name: '蟹老板',
    username: 'MR.XIE',
    password: '12345678',
    roles: [{ name: '管理员', key: 'admin' }],
    status: '1',
    email: 'xlb@123.com',
    phone: '112266778',
    brithday: '2002-08-12',
    address: '比奇堡',
    description: '视财如命。',
  },
];

const user = new FakeApi(initData, {
  queryType: {
    name: 'like',
    username: 'like',
    status: 'is',
    email: 'like',
    phone: 'like',
    address: 'like',
  },
  debug: true,
});

window.user = user;

export const randomGet = () => sample(initData);

export const query = user.query.bind(user);

export const create = user.create.bind(user);
