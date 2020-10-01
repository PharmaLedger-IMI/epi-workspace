#!/bin/bash

docker build -t pharmaledger/epi "$(dirname $(readlink -f $0))" --no-cache --network host
