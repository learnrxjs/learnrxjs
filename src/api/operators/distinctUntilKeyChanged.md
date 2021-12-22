---
title: distinctUntilKeyChanged
---

Возвращает поток, который отправляет все элементы, отправляемые потоком, отличающиеся от предыдущих, используя свойство, доступ к которому осуществляется с помощью ключа, предоставленного для проверки отличий этих двух элементов.

## Сигнатура

```typescript
distinctUntilKeyChanged<T, K extends keyof T>(key: K, compare?: (x: T[K], y: T[K]) => boolean): MonoTypeOperatorFunction<T>distinctUntilKeyChanged<T, K extends keyof T>(key: K, compare?: (x: T[K], y: T[K]) => boolean): MonoTypeOperatorFunction<T>
```

## Описание

Если предусмотрена функция компаратора, то каждому элементу будет необходимо проверить, должно ли это значение отправляться или нет.

Если функция компаратора не предусмотрена, то по умолчанию используется проверка на равенство.

## Параметры

| Название | Описание |
|-|-|
| key | Строковый ключ для поиска свойств объекта каждого элемента. |
| compare | *Опционально*. По умл.: `undefined`.<br> Опциональная функция сравнения, вызываемая для проверки отличия нового элемента от предыдущего в источнике. |

## Примеры

Пример сравнения имён людей.

```typescript
import { of } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
 
 interface Person {
    age: number,
    name: string
 }
 
of<Person>(
    { age: 4, name: 'Foo'},
    { age: 7, name: 'Bar'},
    { age: 5, name: 'Foo'},
    { age: 6, name: 'Foo'},
  ).pipe(
    distinctUntilKeyChanged('name'),
  )
  .subscribe(x => console.log(x));
 
// displays:
// { age: 4, name: 'Foo' }
// { age: 7, name: 'Bar' }
// { age: 5, name: 'Foo' }
```

Пример сравнения первых букв имён.

```typescript
import { of } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
 
interface Person {
    age: number,
    name: string
 }
 
of<Person>(
    { age: 4, name: 'Foo1'},
    { age: 7, name: 'Bar'},
    { age: 5, name: 'Foo2'},
    { age: 6, name: 'Foo3'},
  ).pipe(
    distinctUntilKeyChanged('name', (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3)),
  )
  .subscribe(x => console.log(x));
 
// displays:
// { age: 4, name: 'Foo1' }
// { age: 7, name: 'Bar' }
// { age: 5, name: 'Foo2' }
```

## Полезные ссылки

- 📰 Официальная документация: [distinctUntilKeyChanged](https://rxjs.dev/api/operators/distinctUntilKeyChanged)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pipeable/distinctUntilKeyChanged.ts
