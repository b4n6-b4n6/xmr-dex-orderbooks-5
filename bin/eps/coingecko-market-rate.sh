#!/bin/bash

output_file_name="$1"
output=$(
  curl \
    --no-progress-meter \
    --proxy socks5h://localhost:9050 \
    -m 25 \
    "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=btc"
)
exit_status=$?

if [ $exit_status -eq 0 ]; then
  echo "$output" > $output_file_name
else
  echo "$exit_status"
fi
