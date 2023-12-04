import React from 'react';
import { useApi } from '@ihccc/hooks';
import { token, userInfo } from './services';
import './global';

function Demo() {
  const [loginData, setLoginData] = React.useState({});

  const login = useApi(token, {
    auto: !!loginData.username,
    params: loginData,
    format: (res) => res.data,
  });

  const user = useApi(userInfo, {
    auto: loginData.username && login.data,
    initialData: {},
    params: { username: loginData.username },
    format: (res) => res.data,
  });

  // console.log('🚀 Component Rendered!', login, user);

  return (
    <div>
      <span style={{ marginRight: 20 }}>
        loading: {login.loading || user.loading ? '⏳' : '✅'}
      </span>
      <h2>token: </h2>
      <p>{JSON.stringify(login.data)}</p>
      <h2>user: </h2>
      <p>{JSON.stringify(user.data)}</p>
      <div>
        <button
          onClick={() => {
            setLoginData({ username: 'MR.BABY', password: '123456' });
          }}
        >
          登录
        </button>
      </div>
    </div>
  );
}

export default Demo;
