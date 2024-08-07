#!/bin/bash

default: release

dev:
#	docker run --name adsvlog-mongo -d -p 27017:27017 mongo
#	docker run --name localhost -d -p 6379:6379 redis
#	docker container start adsvlog-mongo
#	docker container start adsvlog-redis
	npm run dev

build:
	docker build --no-cache -t rest-api rest-api
	docker build --no-cache -t auth-server auth-server
	docker build --no-cache -t web-app web-app
	docker compose up

release: build