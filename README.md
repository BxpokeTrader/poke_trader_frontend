# Application

Poke Trader is a public platform to evaluate trade Pokemons.

[https://bx-poketrader.herokuapp.com/](https://bx-poketrader.herokuapp.com/)

# Execute APP

```shell
$ npm install
```

```shell
$ npm start
```

If you use docker, run:

```shell
$ docker build -t sample:dev .
```

```shell
$ docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm sample:dev
```
