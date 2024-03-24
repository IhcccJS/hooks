import React from 'react';
import { useApi } from '@ihccc/hooks';
import { query, create, randomGet } from '../services';
import '../global';

function Demo() {
  const [username, setUsername] = React.useState();
  // const [exec, setExec] = React.useState(false);
  const user = useApi(query, {
    // auto: exec,
    auto: true,
    // ready: exec,
    // ready: !!username,
    initialData: { list: [] },
    // defaultParams: { username: 'I' },
    // paramsDeps: { username },
    verify: (...args) => {
      console.log('verify', ...args);
      return args[0].code === '0';
    },
    successCode: ['0'],
    message: (...args) => {
      console.log('message', ...args);
      return args[1].message;
    },
    format: (res, data, params) => {
      console.log('format', res, data, params);
      return res.data;
    },
    onPass: (...args) => {
      console.log('onPass', ...args);
    },
    onFail: (...args) => {
      console.log('onFail', ...args);
    },
    onSuccess: (...args) => {
      console.log('onSuccess', ...args);
    },
    onError: (...args) => {
      console.log('onError', ...args);
    },
    onFinally: (...args) => {
      console.log('onFinally', ...args);
    },
  });

  const userCreate = useApi(create, {
    onSuccess: () => user.refresh(),
  });

  if (!window.userQuery) window.userQuery = user;

  console.log('🚀 Component Rendered!', user, user.data);

  return (
    <div>
      <span style={{ marginRight: 20 }}>loading: {JSON.stringify(user.loading)}</span>
      <button onClick={() => userCreate.run(randomGet())}>新增</button>
      <button onClick={() => setUsername(['I', 'M', 'B'][Math.floor(Math.random() * 3)])}>查询</button>
      {/* <button onClick={() => setExec(true)}>查询</button> */}
      <ul>
        {user.data.list.map((u) => (
          <li key={u.id}>
            <span title={u.description}>{u.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Demo;
