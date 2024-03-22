FROM node:18.14-alpine

LABEL org.opencontainers.image.title = "SVKM"
LABEL org.opencontainers.image.vendor = "AlexZeDim"
LABEL org.opencontainers.image.source = "https://github.com/AlexZeDim/svkm"

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package.json ./

RUN npm install

COPY . .

RUN nest build

CMD ["node"]
