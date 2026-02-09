#!/bin/bash

rsync \
  -r \
  -v \
  . \
  --exclude node_modules \
  --exclude build \
  --exclude public/sources \
  --exclude .git \
  root@monero-orderbooks:/root/
