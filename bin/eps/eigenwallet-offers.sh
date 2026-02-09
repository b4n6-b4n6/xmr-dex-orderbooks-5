#!/bin/bash

output_file_name="$1"
output=$(
  curl \
    --no-progress-meter \
    -m 15 \
    https://api.eigenwallet.org/api/list
)
exit_status=$?

if [ $exit_status -eq 0 ]; then
  echo "$output" | jq . > $output_file_name
else
  echo "$exit_status"
fi
