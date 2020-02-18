# Map

Применяет функцию `project` для каждого значения Observable и возвращает новое значение

## Сигнатура

📁 Исходный код: [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts#L45](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts#L45)

```ts
map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R>
```

## Параметры

<details>
  <summary>project</summary>
  Функция которая будет применена для каждого значения <code>value</code>. <code>index</code> указывает на индекс этого значения, начинающийся с 0 после того как на Observable подпишутся
</details>

<details>
 <summary>thisArg</summary>
 Не обязательный параметр. По умолчанию <code>undefined</code>, определяет контекст <code>this.</code> в функции <code>project</code>
</details>

## Возвращает

`OperatorFunction<T, R>` 

## Описание

## Примеры

### Пример №1

```ts
// RxJS v6+
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//add 10 to each value
const example = source.pipe(map(val => val + 10));
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));
```

## Рецепты

## Полезные ссылки


