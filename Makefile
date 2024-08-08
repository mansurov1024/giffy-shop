#!/bin/bash

default: release

build:
	docker build --no-cache -t rest-api rest-api
	docker build --no-cache -t auth-server auth-server
	docker build --no-cache -t web-app web-app
	docker compose up

release: build
