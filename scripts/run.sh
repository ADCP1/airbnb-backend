#!/bin/bash

source "$(pwd)/scripts/wait-for-mongo.sh"

exec npm run start${DEBUG+:debug} # Responds to SIGTERM signal
