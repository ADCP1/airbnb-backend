#!/bin/bash

source "$(pwd)/scripts/wait-for-mongo.sh"

exec npm start # Responds to SIGTERM signal
