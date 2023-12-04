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

  console.log('🚀 Component Rendered!');

  return (
    <div>
      <button onClick={() => userCreate.run(randomGet())}>新增</button>

      <ul>
        {user.data.list.map((u) => (
          <li title={u.description} key={u.id}>
            <div>{u.name}</div>
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
