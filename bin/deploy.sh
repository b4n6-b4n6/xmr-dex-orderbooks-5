#!/bin/bash

./bin/upload.sh
ssh root@monero-orderbooks "yarn build"