# SVKM

## Варианты установки: 

- собрать проект и запустить локально с помощью `$ npm install` и `$ npm start`
- забрать `latest` docker-образ с GHCR через команду `docker pull`
- собрать в docker-образ самому через команду `npm docker:build`

Манифест для `docker-compose` поможет запустить всё необходимое окружение `mongodb`.

### Добавить .ENV 
```dotenv
NODE_ENV=production
MONGO_CONNECTION=mongodb://svkm:svkm-mongo-node-1@127.0.0.1:27017/admin?authSource=admin&readPreference=primary
```

## Тесты

Лежат в файле `app.controller.spec.ts`, написаны на jest, запускаются оттуда-же.

## Архитектура, комментарии и TODOs

- apps

`app.controller` - DTO, валидация через `@декораторы`
`app.service` - основная логика приложения

- libs

Зависимые компоненты и ресурсы для приложения.

1. Речь шла о простом CRUD-api. Если хочется от-масштабировать решение, то:

- добавить [нативной поддержки worker-ов](https://nodejs.org/api/cluster.html#cluster), через `node-cluster`
- можно разделить API-layer и `serivce` layer, добавить очередь сообщений через rabbit-mq, bull-mq...
- закрыть за внешним балансировщиком запросов, вроде nginx, и юзать [`robin-round`](https://en.wikipedia.org/wiki/Round-robin_scheduling) что-бы раскидывать `RPS` по N-контейнерам в инфре.

2. Для логгирования используется стандартный `nest-logger`, можно добавить отдельный сервис, с коннектором и слать логи в ELK, Grafana...
3. Можно добавить шифрование env-ов или управлять `env` через yml-манифест. Просто-потому-что ENV-не-резиновые.
4. В библиотеке `db` есть `entity` для `postgres` и `schema` для `mongo`. По итогам, была выбрана mongo из-за более документо-ориентированного подхода к данным и поддержки текстовых индексов.
При большом желании, можно реализовать логику работы с обоими базами данных, через DAO. Но здесь это overkill. 
5. В качестве cache механики для `read` эндпоинтов используется локальная память приложения через `hashmap`. Можно добавить  `TTL` кэш-механику через `Redis` через `EX` параметр хранения ключей. Классика.

## License

[MIT licensed](LICENSE).
