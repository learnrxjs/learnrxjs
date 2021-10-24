# RxJS на русском

[![Netlify Status](https://api.netlify.com/api/v1/badges/0a53d23d-797a-4590-b924-bc716173b358/deploy-status)](https://app.netlify.com/sites/rxjs-ru/deploys) [![Waliot](https://img.shields.io/badge/Waliot%20Tech-082679?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOxSURBVFiFpZZbiFZVFMd/exxtnGlsnIeisB7GTCYxqJCRHoJ66ToVWBgRTQ8RokQWiT10gYhGigFBAn0oLKLUHqKhAlEp6cELRWFTkBJ01UFLHSdrnJr59XD26dseznx+lwWHs/da67/Wf+291zkbSkSdr65Rd6lH1Sl1XB1RN6p9ZbimRQ3qE+ofXlg+UK9qNmdIks8B3gAejqo/ge3AZ8AoMAdYCqwAlkWfUeDeEMLBZomgvplUt1XtruJ7V9wa1ZPq1c0mH0iSP18j5kr1h4j5Sp3VaPI29ecY6G31AXWb+mPUH1JfUReXYK9TJyL2kUYJPJRU/32VQzepPqu2FPAbo/3LRgm8V0g0pe5R16ur1M3q8cS+qYDvjfppdUEjBNKqT6i3lfh0qe8mfisL9vxA3tMIgTMR/K+6XL3IrCWLfrPUT6Lvt2rawvuiflW9+VuAzjg+DmwB/gYm1P3q3bljCGEKeAaYBq4Flidx/orvefUSaE3Gl8cnlz5gWF0XQhiKJL5TjwCLI4l9hXh96uM15J0GRkII+ykcwB3qreod6t7kUF6fI9XhqH8p0e2xMXk0XYFhYGUIwTwo8AXZ53cN8Fj0Oxffs0sqOwmcjuMO4LLEdo7KVs0F2oAVaU+/lScHCCFMAu/E6Y1VF7QigyGEhSGEhcDHUTcK3A50hhC6QwjdwFBOJF2BUyUBc/tUjQSmAdTZwINR91QIYedMgJaZDGoHMBCnh2okkBOdD7TH8d5qedMVuMHKD+UK4EngmjjfqfbEcUcVAtPxPRnHLcClwLGC36L/R+pYgyd4MImRd8HqRHcg6t5PCkPtM/uvqO5uAV4F/qlSVT3SnoyfAwTuBw6qG9StZFtyfgeprWb3wFqeD0tWIP+hvV6Iu9bsEz+T7K67RLOPleqGRLcq6o6pbQX/ZWa3rRH1c3Uo2YJdjRDYXKxWnaeeLhIrwQaz614u22ZswypyNL57c0UI4QywLk7XxyrP6xb1EmAHldYG+K3u7OrNkf2EhYtrTJzL7+p2dZNZJ5wtOQP9jRBoVUdjgBdK7ANWLihF+cXK3WFMbS/LUQuJtTHIWXVpib1Nvc+s9baog2q/usTKBejFhpInCb5OquqtAdOjHomYw2rnhTC1BDwRA46rT6tzZyC7Wj2VLP2S3B6KgDpJLCL77ebf9nHgU+BwjN0D3AJ0RftPQH8I4Ztm8hZJXKy+PMMpz2VCfU3tKuKbWoECkU7gTuAmYEGM/StwAPgohDBWhvsPNeLhXXZ5QvUAAAAASUVORK5CYII=)](https://github.com/waliot)

Вольный перевод документации [RxJS](https://rxjs.dev) на русский язык.

## TODO

- [ ] Описание всегда писать после сигнатуры
- [ ] Лучше использовать термин "поток" чем Observable

<a href='https://waliot.com'>
  <img src='assets/waliot.svg' width='200'>
</a>

Автор перевода [Sam Bulatov](https://github.com/mephistorine) и [контрибьюторы](https://github.com/waliot/rxjs-ru/graphs/contributors)

## Переведенные операторы

🔥Уже переведено 50+ операторов

- [x] ajax
- [ ] audit
- [x] auditTime
- [x] buffer
- [x] bufferCount
- [x] bufferTime
- [ ] bufferToggle
- [ ] bufferWhen
- [x] catch / catchError
- [x] combineAll
- [x] combineLatest
- [x] concat
- [x] concatAll
- [x] concatMap
- [ ] concatMapTo
- [ ] create
- [x] debounce
- [x] debounceTime
- [x] defaultIfEmpty
- [x] defer
- [x] delay
- [x] delayWhen
- [x] distinct
- [x] distinctUntilChanged
- [x] distinctUntilKeyChanged
- [x] endWith
- [x] tap / do
- [ ] empty
- [x] every
- [x] exhaustMap
- [ ] expand
- [x] filter
- [x] finalize / finally
- [x] find
- [x] first
- [x] forkJoin
- [x] from
- [x] fromEvent
- [ ] generate
- [ ] groupBy
- [x] iif
- [x] ignoreElements
- [x] interval
- [x] last
- [ ] let
- [x] map
- [x] mapTo
- [x] merge
- [x] mergeAll
- [x] mergeMap / flatMap
- [ ] mergeScan
- [ ] multicast
- [x] of
- [ ] partition
- [x] pairwise
- [x] pluck
- [ ] publish
- [ ] race
- [ ] range
- [x] reduce
- [ ] repeat
- [ ] repeatWhen
- [x] retry
- [ ] retryWhen
- [ ] sample
- [x] scan
- [ ] sequenceequal
- [x] share
- [x] shareReplay
- [x] single
- [x] skip
- [ ] skipUntil
- [ ] skipWhile
- [x] startWith
- [x] switchMap
- [ ] switchMapTo
- [x] take
- [x] takeLast
- [x] takeUntil
- [ ] takeWhile
- [ ] throttle
- [ ] throttleTime
- [x] throwError
- [ ] timeInterval
- [ ] timeout
- [ ] timeoutWith
- [x] timer
- [x] toArray
- [ ] toPromise
- [ ] window
- [ ] windowCount
- [ ] windowTime
- [ ] windowToggle
- [ ] windowWhen
- [ ] withLatestFrom
- [x] zip
