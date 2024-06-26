# SVKM

## Варианты установки: 

- собрать проект и запустить локально с помощью `$ npm install` и `$ npm start`
- забрать `latest` [docker-образ с GHCR](https://github.com/AlexZeDim/svkm/pkgs/container/svkm) через команду `docker pull ghcr.io/alexzedim/svkm:latest`
- собрать в docker-образ самому через команду `npm build:docker`

Манифест для `docker-compose` поможет запустить всё необходимое окружение `mongodb`.

### Зайти на локальный адрес по выделенному (3000) порту из `app.module.ts` [localhost:3000/api/docs](http://localhost:3000/api/docs)

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
`libs` - Зависимые компоненты и ресурсы для приложения, DAO, DTO, constants, utils

1.  CRUD-api. Если хочется от-масштабировать решение, то, можно закрыть за внешним балансировщиком запросов, вроде nginx, раскатить его в `replicas: N` и юзать [`robin-round`](https://en.wikipedia.org/wiki/Round-robin_scheduling) что-бы раскидывать в зависимости от `RPS` запросы по N-контейнерам в инфре.
2. Для логгирования используется стандартный `nest-logger`, можно добавить отдельный сервис, с коннектором и слать логи в ELK, Grafana...
3. Здесь нет шифрования env-ов, но можно управлять `env` через yml-манифест. Просто-потому-что ENV-не-резиновые. [В моем соседнем репозитории лежит пример работы с шифрованием](https://github.com/AlexZeDim/cmnw/blob/master/libs/configuration/src/postgres.config.ts).
4. В библиотеке `db` есть `entity` для `postgres` и `schema` для `mongo`. По итогам, была выбрана mongo из-за более документо-ориентированного подхода к данным, pipeline для поиска и поддержки текстовых индексов.
При большом желании, можно реализовать логику работы с обоими базами данных, через DAO. Но здесь это overkill. 
5. В качестве cache механики для `read` эндпоинтов используется локальная память приложения через `hashmap`. Можно добавить `TTL` кэш-механику через `Redis` через `EX` параметр хранения ключей.

### ..можно ещё много всего улучшить и принести нового, больше логики для валидации, больше DTO...

Но главное, вовремя сделать и остановится. Тестовое, — как раз поможет составить представление об архитектурном подходе, а тесты в jest — о работоспобности логики. 

## License

[MIT licensed](LICENSE).
