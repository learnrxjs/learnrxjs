# Введение

RxJS библиотека для объединения асинхронных и событийно-ориентированных программ использующих потоки наблюдателей. Библиотека предоставляет основной тип Observable, его производные (Observer, Scheduler, Subject), а так же операторы похожие на [Array#extras](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.6) (map, filter, reduce, every и др.) позволяющие обрабатывать асинхронные события как коллекции.

> Думайте об RxJS как о Lodash для событий

ReactiveX объединяет паттерн [Наблюдатель](https://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)) c паттерном [Итератор](https://ru.wikipedia.org/wiki/%D0%98%D1%82%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)) и [функциональное программирование с коллекциями](https://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions) чтобы помочь вам в управлении потоком событий.

Ниже список основных понятий RxJS:

- **Observable**: представляет неизменяеменяемый поток данных
- **Observer**: объект, методы которого знают как обрабатывать данные полученные из Observable
- **Subscription**: содержит данные о выполнении Observable, используется в первую очередь для отмены исполнения потока (как `removeEventListener`)
- **Операторы**: чистые функции позволяющие в функциональном стиле работать со значениями как операторы `map`, `filter`, `concat`, `reduce` и др.
- **Subject**: похож на EventEmmiter, единственный способ передачи значений нескольким наблюдателям
- **Schedulers**: позволяют откладывать выполнение с помощью `setTimeout` или `requestAnimationFrame` и др.

## Простой пример

Стандартный способ прослушивания событий:

```js
document.addEventListener('click', () => console.log('CНажатоlick!'));
```

Используя RxJS вы создаете observable:

```js
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('Click'));
```

## Чистота

Использование чистых функций, делает код более безопасным, а RxJS очень мощным инструментом. Обычно вы создаете грязную функцию, которая меняет состояние вашего кода и это опасно.

```js
let count = 0;

document.addEventListener('click', () => console.log(`Clicked ${++count} times`));
```

Используя RxJS вы изолируете ваше состояние:

```js
import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    scan(count => count + 1, 0)
  )
  .subscribe(count => console.log(`Clicked ${count} times`));
```

Оператор `scan` работает как reduce у массивов. Он использует значение пришедшее как аргумент функции и возвращает новое значение, которое станет аргументом для этой же функции, но уже при следующем вызове.

## Поток

RxJS имеет большой выбор операторов, помогающие контролировать данные потока.

Ниже приведена реализация программы разрешающая только один клик в секунду на чистом Javascript:

```js
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;

document.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Нажато ${++count} раз(а)`);
    lastClick = Date.now();
  }
});
```

То же самое на RxJS:

```js
import { fromEvent } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    scan(count => count + 1, 0)
  )
  .subscribe(count => console.log(`Нажато ${count} раз(а)`));
```

Такие операторы как filter, delay, debounceTime, take, takeUntil, distinct, distinctUntilChanged тоже могут контроллировать поток.

## Данные

RxJS так же предоставляет операторы для трансформирования данных.

Ниже приведен способ сложения координаты по оси X вашего курсора с предыдущимы координатами на чистом JavaScript:

```js
let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;

document.addEventListener('click', event => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(count);
    lastClick = Date.now();
  }
});
```

То же самое на RxJS:

```js
import { fromEvent } from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe(count => console.log(count));
```

pluck, pairwise, sample и др. операторы так же могут изменять данные 
