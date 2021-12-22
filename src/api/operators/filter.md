---
title: filter
---

Фильтрует значения на основании критерия

> 💡 Если вы хотите завершить Obsevable когда функция-критерий вернет `false` используйте `takeWhile`

## Сигнатура

```typescript
filter<T>(predicate: (value: T, index: number) => boolean, thisArg?: any): MonoTypeOperatorFunction<T>
```

## Параметры

<dl>
  <dt><code>project</code></dt>
  <dd>Функция критерий, если возвращает <code>true</code> то значение проходит фильтрацию и идет дальше по потоку, если <code>false</code> то значение не попадет к подписчику</dd>
</dl>

<dl>
 <dt><code>thisArg</code></dt>
 <dd>Не обязательный параметр. По умолчанию <code>undefined</code>, определяет контекст <code>this.</code> в функции <code>project</code></dd>
</dl>

## Примеры

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//filter out non-even numbers
const example = source.pipe(filter(num => num % 2 === 0));
//output: "Even number: 2", "Even number: 4"
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));
```

## Полезные ссылки

- 📰 Официальная документация: [filter](https://rxjs.dev/api/operators/filter)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/filter.ts
