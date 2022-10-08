#!/bin/bash

term() { 
  exit 1
}

trap term SIGTERM

echo "Waiting for Mongo to be running..."

max_wait=100
sleep_time=3
waited=0

while ! curl -fs http://mongo:27017 -o /dev/null; do
  sleep $sleep_time
  if (( waited > max_wait )); then
    echo "Waited too long for Mongo, aborting!"
    exit 1
  fi
  (( waited += $sleep_time ))
done
