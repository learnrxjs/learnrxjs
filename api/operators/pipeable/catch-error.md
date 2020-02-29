# CatchError

Перехватывает исключение или ошибку в потоке и возвращает новый Observable

## Сигнатура

```typescript
catchError<T, O extends ObservableInput<any>>(selector: (err: any, caught: Observable<T>) => O): OperatorFunction<T, T | ObservedValueOf<O>>
```

## Параметры

<dl>
 <dt><code>selector</code></dt>
 <dd>Функция обработчик ошибки, принимает в качестве аргумента <code>err</code> ошибку и <code>caught</code> исходный Observable, на случай если вы захотите повторить попытку просто его верунув, в другом случае возвращаемый Observable заменит исходный и поток будет продолжен</dd>
</dl>

## Примеры

### Пример 1: Перехват ошибки

```typescript
// RxJS v6+
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//emit error
const source = throwError('This is an error!');
//gracefully handle error, returning observable with error message
const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
//output: 'I caught: This is an error'
const subscribe = example.subscribe(val => console.log(val));
```

### Пример 2: Перехват reject-а Promise-а

```typescript
// RxJS v6+
import { timer, from, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

//create promise that immediately rejects
const myBadPromise = () =>
  new Promise((resolve, reject) => reject('Rejected!'));
//emit single value after 1 second
const source = timer(1000);
//catch rejected promise, returning observable containing error message
const example = source.pipe(
  mergeMap(_ =>
    from(myBadPromise()).pipe(catchError(error => of(`Bad Promise: ${error}`)))
  )
);
//output: 'Bad Promise: Rejected'
const subscribe = example.subscribe(val => console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [catchError](https://rxjs.dev/api/operators/catchError)
- 📁 Исходный код: [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/catchError.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/catchError.ts)
