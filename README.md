# Brian Dump

## Development

We use Lerna to manage our awesome mono repo.

Doku: https://github.com/lerna/lerna/blob/master/README.md (hint: click on the links to see readmes for the actual commands)

### Prerequisites

You have to use `yarn` for package resolution and running the project.

```
$ npm i -g yarn
```

Have a docker container of elastic search running:

```
$ docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.5.2
```

### Development

```
$ yarn bootstrap
$ yarn start:dev
```

## Add a new package

If you want to add a package use `lerna add <npm_package> apps/*` to install it in all apps for example.

You can also install a npm package for a single lerna package (app) like this `lerna add moment apps/webclient`.
