#!/bin/bash

IMAGE_NAME="analytics-server"
IMAGE_FILE="analytics-server.tar"

docker build -t $IMAGE_NAME .

docker save -o $IMAGE_FILE $IMAGE_NAME

docker load -i $IMAGE_FILE

docker run -d --name $IMAGE_NAME -p 3000:3000 $IMAGE_NAME

echo "Сервер запущен и доступен на http://localhost:3000"
