#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

# Check if the argument is provided
if [ $# -eq 0 ]; then
   echo -e "${RED}Usage: $0 <go-file>${NC}\n"
   exit 1
fi

# The Go file to watch
GO_FILE=$1

# Check if the file exists
if [ ! -f "$PWD/$GO_FILE" ]; then
   echo -e "${RED}File $PWD/$GO_FILE does not exist.${NC}\n"
   exit 1
fi

echo -e "${YELLOW}\nWatching for changes... ${NC}\n"
go run "$PWD/$GO_FILE"

# Use inotifywait to watch for file changes
while inotifywait -e close_write "$PWD/$GO_FILE" 2>/dev/null; do
#   clear
#   echo -e "${YELLOW}\nDetected changes in $GO_FILE. Running the file...${NC}\n"
   clear
   echo -e "${YELLOW}\nWatching for changes... ${NC}\n"
   go run "$PWD/$GO_FILE"
done
