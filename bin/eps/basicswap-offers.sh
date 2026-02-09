#!/bin/bash

output_file_name="$1"
output=$(
  curl \
    --no-progress-meter \
    --proxy socks5h://localhost:9050 \
    -m 25 \
    http://ismqxpn6cqx5knkzrs2w6vpf56mnaevgw2kaogxjasuqkma3je5vd6qd.onion/btc-xmr.json
)
exit_status=$?

if [ $exit_status -eq 0 ]; then
  echo "$output" > $output_file_name
else
  echo "$exit_status"
fi