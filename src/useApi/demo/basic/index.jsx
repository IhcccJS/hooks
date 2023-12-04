import { useApi } from '@ihccc/hooks';
import { query, create, randomGet } from './services';
import './global';

function Demo() {
  const user = useApi(query);

  const userCreate = useApi(create, {
    onSuccess: () => user.refresh(),
  });

  // console.log('🚀 Component Rendered!', user.data);

  return (
    <div>
      <span style={{ marginRight: 20 }}>
        loading: {JSON.stringify(user.loading)}
      </span>
      <button onClick={() => userCreate.run(randomGet())}>新增</button>
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
