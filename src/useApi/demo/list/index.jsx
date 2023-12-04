import { useApi } from '@ihccc/hooks';
import { query, create, update, remove, randomGet } from './services';
import './global';

function Demo() {
  const user = useApi(query);

  const userCreate = useApi(create, {
    onSuccess: () => user.run(),
  });

  const userUpdate = useApi(update, {
    onSuccess: () => user.run(),
  });

  const userRemove = useApi(remove, {
    onSuccess: () => user.run(),
  });

  const loading =
    userRemove.loading ||
    userUpdate.loading ||
    userCreate.loading ||
    user.loading;

  // console.log('🚀 Component Rendered!', user.data);

  return (
    <div>
      <span style={{ marginRight: 20 }}>
        loading: {JSON.stringify(loading)}
      </span>
      <button onClick={() => userCreate.run(randomGet())}>新增</button>
      <ul>
        {user.data.list.map((u) => (
          <li key={u.id}>
            <span
              title={u.description}
              style={{ display: 'inline-block', width: '120px' }}
            >
              {u.name}
            </span>
            <button
              onClick={() => userUpdate.run({ ...u, name: '🐠' + u.name })}
            >
              更新
            </button>
            <button onClick={() => userRemove.run(u)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Demo;
