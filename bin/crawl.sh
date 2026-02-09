#!/bin/bash

while :
do
  ./bin/eps/eigenwallet-offers.sh ./public/sources/eigenwallet-offers.json
  ./bin/eps/bisq-offers.sh ./public/sources/bisq-offers.json
  ./bin/eps/basicswap-offers.sh ./public/sources/basicswap-offers.json
  ./bin/eps/retoswap-offers.sh ./public/sources/retoswap-offers.html
  cat ./public/sources/retoswap-offers.html | ./bin/parsers/retoswap-offers.mjs ./public/sources/retoswap-offers.json

  ./bin/eps/cryptocompare-market-rate.sh ./public/sources/cryptocompare-market-rate.json
  ./bin/eps/coingecko-market-rate.sh ./public/sources/coingecko-market-rate.json

  ./bin/parsers/mtime-dumper.mjs \
    ./public/sources \
    ./public/sources/mtime-dump.json

  cp -r public/sources build

  echo zzz...
  sleep 2m
done
