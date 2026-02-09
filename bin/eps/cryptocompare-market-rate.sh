#!/bin/bash

output_file_name="$1"
output=$(
  curl \
    --no-progress-meter \
    --proxy socks5h://localhost:9050 \
    -m 25 \
    "https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=BTC"
)
exit_status=$?

if [ $exit_status -eq 0 ]; then
  echo "$output" > $output_file_name
else
  echo "$exit_status"
fi