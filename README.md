
# @ihccc/hooks

A base react-hooks library.

[![NPM version](https://img.shields.io/npm/v/@ihccc/hooks.svg?style=flat)](https://npmjs.org/package/@ihccc/hooks)
[![NPM downloads](http://img.shields.io/npm/dm/@ihccc/hooks.svg?style=flat)](https://npmjs.org/package/@ihccc/hooks)
[![dumi](https://img.shields.io/badge/docs%20by-dumi-blue)](https://github.com/umijs/dumi)
## Documentation

[Documentation](https://ihccc/hooks)


## Installation

Install `@ihccc/hooks` with npm

```bash
  pnpm i @ihccc/hooks
```

## Usage/Examples

```javascript
import { useApi } from '@ihccc/hooks'

function UserList() {
  const users = useApi(getAllUser, {
    auto: true
  });

  // ...
}
```

## Run Locally

Clone the project

```bash
  git clone https://@ihccc/hooks
```

Go to the project directory

```bash
  cd hooks
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm run dev
```

## Running Tests

To run tests, run the following command

```bash
  pnpm run test
```


## Deployment

To deploy this project run

```bash
  pnpm run deploy
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

