#!/bin/bash
name="$(./util/name.sh -1)"

docker run --detach \
    --hostname epi \
    --publish 8080:8080 \
    --name $name \
    --restart always \
    pharmaledger/epi
