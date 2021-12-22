---
title: map
---

Применяет функцию `project` для каждого значения Observable и возвращает новое значение

## Сигнатура

```typescript
map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R>
```

## Параметры

<dl>
  <dt><code>project</code></dt>
  <dd>Функция которая будет применена для каждого значения <code>value</code>. <code>index</code> указывает на индекс этого значения, начинающийся с 0 после того как на Observable подпишутся</dd>
</dl>

<dl>
 <dt><code>thisArg</code></dt>
 <dd>Не обязательный параметр. По умолчанию <code>undefined</code>, определяет контекст <code>this.</code> в функции <code>project</code></dd>
</dl>

## Возвращает

`OperatorFunction<T, R>` 

## Примеры

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
 Описание//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//add 10 to each value
const example = source.pipe(map(val => val + 10));
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));
```

## Полезные ссылки

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- 📰 Официальная документация: [map](https://rxjs.dev/api/operators/map)
- 📁 Исходный код: [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts#L45](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts#L45)
