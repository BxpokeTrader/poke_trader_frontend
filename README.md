# Application

Poke Trader is a public platform to evaluate trade Pokemons. More infos about the project are described at the backend repository: [PokeTrader Backend](https://github.com/BxpokeTrader/poke_trader_backend)

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
