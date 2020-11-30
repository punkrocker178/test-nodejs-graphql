# Apollo tutorial

This is the fullstack app for the [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

## File structure

The app is split out into two folders:
- `start`: Starting point for the tutorial
- `final`: Final version

From within the `start` and `final` directories, there are two folders (one for `server` and one for `client`).

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd final/server && npm i && npm start
```

and

```bash
cd final/client && npm i && npm start
```

```bash
docker run -it --rm  -p 8888:4000 -v /fullstack-tutorial/start/server/:/app -w /app node:12.18.3-stretch npm i && npm start
```

```bash
docker run -it --rm  -p 8889:80 -v /fullstack-tutorial/start/client/:/app -w /app node:12.18.3-stretch npm i && npm start
```
