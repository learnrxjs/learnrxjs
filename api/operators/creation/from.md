# From

## Сигнатура

```typescript
from<O extends ObservableInput<any>>(input: O, scheduler: SchedulerLike): Observable<ObservedValueOf<O>>
```

## Описание

Создает Observable на основе определнных структур данных такие как:

- [список](https://developer.mozilla.org/ru/docs/Словарь/Массив)
- список-подобные (Array-like), например [DOM NodeList](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwi-t7yTvv3nAhXK8uAKHXX5B8MQFjAAegQIARAB&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fru%2Fdocs%2FWeb%2FAPI%2FNodeList&usg=AOvVaw1GRrDrDIJCR1Qrqxzktk00), [DOM HtmlCollection](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwiRpdKdvv3nAhWMGBQKHS9ECncQFjAAegQIAxAB&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fru%2Fdocs%2FWeb%2FAPI%2FHTMLCollection&usg=AOvVaw16cJSDngcDHEODba34hyzR), [Map](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=2ahUKEwjk0t2kvv3nAhUND2MBHVjDDrEQFjABegQIAxAB&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fru%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FMap&usg=AOvVaw3jcm-vInf1HyFeanTLCGQv), [Set](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwj4qbqvvv3nAhWLlxQKHclXBRYQFjAAegQIARAB&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fru%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FSet&usg=AOvVaw1YWqBm2ORFOUHXOf9dmX2F)
- [Promise](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwi5yri2vv3nAhWOiFwKHZ4LB0oQFjAAegQIARAB&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fru%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FPromise&usg=AOvVaw2g3Vhh0YrU5VqSfstrTCgX)
- [итератор](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=2ahUKEwiageK8vv3nAhU5QkEAHSh9CbwQFjABegQIAhAB&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fru%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FIterators_and_Generators&usg=AOvVaw1j7VaqAFqwgZ1VVrwqlT_X)
- Observable-подобные

  Имеющие символ [observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/symbol/observable.ts#L11)

## Параметры

- `input`

  Объект, который нужно превратить в Observable

- ~~`scheduler`~~ *Depricated*

  Тип планировщика. Лучше использовать функцию `scheduled`

## Примеры

### Пример 1: Конвертация списока

```typescript
import { from } from 'rxjs';

const array = [10, 20, 30];
const result = from(array);

result.subscribe(x => console.log(x));

// Logs:
// 10
// 20
// 30
```

### Пример 2: Конвертация итератора

```typescript
import { from } from 'rxjs';
import { take } from 'rxjs/operators';

function* generateDoubles(seed) {
   let i = seed;
   while (true) {
     yield i;
     i = 2 * i; // double it
   }
}

const iterator = generateDoubles(3);
const result = from(iterator).pipe(take(10));

result.subscribe(x => console.log(x));

// Logs:
// 3
// 6
// 12
// 24
// 48
// 96
// 192
// 384
// 768
// 1536
```

### Пример 3: Конвертация Promise

```typescript
// RxJS v6+
import { from } from 'rxjs';

//emit result of promise
const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
const subscribe = promiseSource.subscribe(val => console.log(val));
```

### Пример 4: Конвертация Map

```typescript
// RxJS v6+
import { from } from 'rxjs';

//works on js collections
const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');

const mapSource = from(map);
//output: [1, 'Hi'], [2, 'Bye']
const subscribe = mapSource.subscribe(val => console.log(val));
```

## Полезные ссылки

## Полезные ссылки

- 📰 Официальная документация: [from](https://rxjs.dev/api/index/function/from)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/from.ts

