# Ajax

## Сигнатура

```typescript
ajax(urlOrRequest: string | AjaxRequest)
```

## Описание

Создает Observable на основе Ajax запроса, при подписке на который выполнается XMLHttpRequest

## Параметры

- `urlOrRequest`

  URL строка или объект типа `AjaxRequest`

```typescript
interface AjaxRequest {
  url?: string;
  body?: any;
  user?: string;
  async?: boolean;
  method?: string;
  headers?: Object;
  timeout?: number;
  password?: string;
  hasContent?: boolean;
  crossDomain?: boolean;
  withCredentials?: boolean;
  createXHR?: () => XMLHttpRequest;
  progressSubscriber?: Subscriber<any>;
  responseType?: string;
}
```

### Поля объекта

- `url`

  URL строка по которой будет выполнен запрос
  
- `body`

  Тела запроса

- `user`

  Логин пользователя использующийся в [userinfo](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#userinfo)
  
  Пример:
  ```text
            userinfo
            ┌──┴───┐
    https://username@www.example.com
  ```

- `password`

  Пароль пользователя использующийся в [userinfo](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#userinfo)
  
  Пример:
  ```text
      https://username:password@www.example.com
  ```

- `async`

  Флаг указывающий на то как выполнять запрос, асинхронно или синхронно. Является парметром `async` метода [`XMLHttpRequest#open`](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/open)

- `method`

  HTTP Метод с которым будет выполняться запрос

- `headers`

  Коллекция полльзовательских HTTP заголовков, которые будут прикреплены к запросу

- `timeout`

  Время в миллисекундах после которого запрос будет отменен. Прокидывается в объект XMLHttpRequest через [одноименное свойство](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest#timeout)

- `hasContent` Нигде не используется
- `crossDomain` 

  В случае если значение `false`, примешивает заголовок к запросу `X-Requested-With` со значением `XMLHttpRequest`, чтобы сервер знал что это AJAX запрос

- `withCredentials`

  Дублирует флаг [`XMLHttpRequest#withCredentials`](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/withCredentials)

- `createXHR`

  Функция возвращающая экземпляр класса `XMLHttpRequest`

- `progressSubscriber`

  Подписчик для получения данных о прогрессе запроса

- `responseType`

  [Тип содержимого](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest#responseType) ответа сервера

## Примеры

### Пример 1: Использование встроенных методов

Для удобства пользователей у функции `ajax` есть встроенные методы описанные интерфейсом [`AjaxCreationMethod`](https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/dom/AjaxObservable.ts#L58), у которых уже указан HTTP метод и принимают ограниченное количество параметров, обратите внимание на метод `getJSON`, выделен в отдельную функцию, так как чаще всего Ajax используют для получаения JSON данных.

```typescript
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const obs$ = ajax.getJSON(`https://api.github.com/users?per_page=5`).pipe(
  map(userResponse => console.log('users: ', userResponse)),
  catchError(error => {
    console.log('error: ', error);
    return of(error);
  })
);
```

### Пример 2: Использование объекта

```typescript
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const users = ajax({
  url: 'https://httpbin.org/delay/2',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'rxjs-custom-header': 'Rxjs'
  },
  body: {
    rxjs: 'Hello World!'
  }
}).pipe(
  map(response => console.log('response: ', response)),
  catchError(error => {
    console.log('error: ', error);
    return of(error);
  })
);
```

## Полезные ссылки

- 📰 Официальная документация: [ajax](https://rxjs.dev/api/ajax/ajax)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/dom/ajax.ts

