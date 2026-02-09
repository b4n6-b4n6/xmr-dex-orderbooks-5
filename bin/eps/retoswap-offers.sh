#!/bin/bash

output_file_name="$1"
output=$(
  curl \
    --no-progress-meter \
    -m 25 \
    https://haveno.markets/market/BTC
)
exit_status=$?

if [ $exit_status -eq 0 ]; then
  echo "$output" > $output_file_name
else
  echo "$exit_status"
fi