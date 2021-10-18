---
title: "combineLatest"
date: "Created"
type: "function"
status: "stable"
---

# CombineLatest

## Сигнатура

```typescript
combineLatest<O extends ObservableInput<any>, R>(
  sources: O[],
  resultSelector?: (...args: ObservedValueOf<O>[]) => R,
  scheduler?: SchedulerLike
): Observable<R>
```

## Описание

`combineLatest` объединяет данные пришедшие из Observable-ов полученные из аргументов функции. Это делает путем подписки на каждый пришедший Observable, и всякий раз когда один из Observable-ов испускает новое значение, `combineLatest` объединяет самые последние значения из других Observable-ов в один список. Таким образом если вы передеали `n`-ное количество Observable-ов, то вам всегда будет возвращаться список длинной в `n`, а значения в нем будут в том же порядке в котором вы передовали Observable-ы.

`combineLatest` может принимать как список Observable-ов так и как аргументы функции. В случае если вы не знаете сколько у вас будет Observable-ов которые вы будете объединять лучше использовать список. Если вы передадите пустой список, то `combineLatest` сразу же завершится.

Чтобы конечный результат в виде списке всегда имел одну и ту же длину, `combineLatest` не отправляет никаких значений пока все переданные Observable не отправят хотя бы одно значение. Это так же означение что если один из Observable-ов начал слать новые значения до того как другие прислали хотя бы одно, то все его значения будут утряны за исключением последнего. С другой стороны если один из Observable-ов завершится так и испустив ни одного значения `combineLatest` завершится (от переводчика: это поведение [имеет странность](https://github.com/ReactiveX/rxjs/issues/4745)). Так же если один из переданных Observable-ов не испускал никаких значений и не завершился, то `combineLatest` никогда не испустит значения и не завершится.

## Параметры

- `sources`
  
  Список Observable-ов значения которых будут агрегироваться

- ~~`resultSelector`~~ *Deprecated*
  
  Функция мутирующая поступающие значения. Вместо этого аргумента лучше использовать оператор [`map`](api/operators/pipeable/map)

- ~~`scheduler`~~ *Deprecated*
  
  Тип планировщика. Вместо этого аргумента лучше использовать операторы `subscribeOn` или `observeOn`

## Примеры

### Пример 1: Объединение 3-х интервалов

```typescript
// RxJS v6+
import { timer, combineLatest } from 'rxjs';

// timerOne emits first value at 1s, then once every 4s
const timerOne$ = timer(1000, 4000);
// timerTwo emits first value at 2s, then once every 4s
const timerTwo$ = timer(2000, 4000);
// timerThree emits first value at 3s, then once every 4s
const timerThree$ = timer(3000, 4000);

// when one timer emits, emit the latest values from each timer as an array
combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
  ([timerValOne, timerValTwo, timerValThree]) => {
    /*
      Example:
    timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
    timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
    timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
  */
    console.log(
      `Timer One Latest: ${timerValOne},
     Timer Two Latest: ${timerValTwo},
     Timer Three Latest: ${timerValThree}`
    );
  }
);
```

### Пример 2: Объединение событий клика с двух кнопок

```typescript
// RxJS v6+
import { fromEvent, combineLatest } from 'rxjs';
import { mapTo, startWith, scan, tap, map } from 'rxjs/operators';

// elem refs
const redTotal = document.getElementById('red-total');
const blackTotal = document.getElementById('black-total');
const total = document.getElementById('total');

const addOneClick$ = id =>
  fromEvent(document.getElementById(id), 'click').pipe(
    // map every click to 1
    mapTo(1),
    // keep a running total
    scan((acc, curr) => acc + curr, 0),
    startWith(0)
  );

combineLatest(addOneClick$('red'), addOneClick$('black')).subscribe(
  ([red, black]: any) => {
    redTotal.innerHTML = red;
    blackTotal.innerHTML = black;
    total.innerHTML = red + black;
  }
);
```

## Полезные ссылки

- 📰 Официальная документация: [combineLatest](https://rxjs.dev/api/index/function/combineLatest)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/combineLatest.ts
