# Установка

## ES6

```shell
npm install rxjs
```

Импортирование основной функциональности:

```js
import * as rxjs from 'rxjs';

rxjs.of(1, 2, 3);
```

Импортирование только нужных вам операторов:

```js
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1,2,3).pipe(map(x => x + '!!!')); // etc
```

Если подключается как внешне как библиотека:

```js
const { of } = rxjs;
const { map } = rxjs.operators;

of(1,2,3).pipe(map(x => x + '!!!')); // etc
```

## CommonJS

Если вы получаете ошибку как `TS2304: Cannot find name 'Promise'` или `TS2304: Cannot find name 'Iterable'` при использовании RxJS то скорее всего вам нужно установить несколько дополнительных тайпингов(typings)

1. Для пользователей `typings`

```shell
typings install es6-shim --ambient
```

2. Если вы не используете `typings` то интерфейсы будут скопированы из `/es6-shim/es6-shim.d.ts`

3. Добавьте описания типов в вам tsconfig.hson

## CDN

Для CDN мы используем [unpkg](https://unpkg.com/):

- Для RxJS 5.0.0-beta-1 до beta.11: https://unpkg.com/@reactivex/rxjs@version/dist/global/Rx.umd.js

- Для RxJS 5.0.0-beta-12 и выше: https://unpkg.com/@reactivex/rxjs@version/dist/global/Rx.js

- Для RxJS 6.0.0 и выше: https://unpkg.com/@reactivex/rxjs@version/dist/global/rxjs.umd.js


