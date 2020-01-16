# jp-platform

## build staging docker
```
docker build -t platform -f docker/dock_stg/Dockerfile .

docker run -d -it -p 8080:80 --rm --name platform-staging platform

```

## if you want to build production docker
```
docker build -t platform -f docker/dock_prod/Dockerfile .

docker run -d -it -p 8080:80 --rm --name platform-prod platform

```

## maintain page
```
maintain\index.html
```