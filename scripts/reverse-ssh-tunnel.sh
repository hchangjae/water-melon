#!/bin/bash

# Configuration
SSH_USER=ubuntu
SSH_HOST=hcj.on
LOCAL_PORT=5432
REMOTE_PORT=5432
KEY_PATH=/Users/hcj/keys/default.pem

# Check if script argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 path_to_script"
    exit 1
fi

SCRIPT_PATH=$1

cleanup() {
  echo "Cleaning up... $SSH_PID"
  kill $SSH_PID
  exit
}

# SIGINT 시그널 (Ctrl+C)을 받으면 cleanup 함수 실행
trap cleanup SIGINT


# Check if script argument is yarn dev
if [ "$1" == "yarn dev" ]; then
    ssh -N -L $LOCAL_PORT:localhost:$REMOTE_PORT $SSH_USER@$SSH_HOST -i $KEY_PATH &
    SSH_PID=$!
    bash $SCRIPT_PATH
    kill $SSH_PID
    exit 0
fi


# Start the reverse SSH tunnel
echo "Starting SSH tunnel..."
ssh -N -L $LOCAL_PORT:localhost:$REMOTE_PORT $SSH_USER@$SSH_HOST -i $KEY_PATH &
SSH_PID=$!

# check if tunnel is running
if ! pgrep -f "ssh -f -N -L $LOCAL_PORT:localhost:$REMOTE_PORT $SSH_USER@$SSH_HOST -i $KEY_PATH" >/dev/null 2>&1; then
    echo "SSH tunnel is not running. Exiting..."
    exit 1
else
    echo "SSH tunnel is established!"
fi

# Execute the provided script
echo "Running the provided script: $SCRIPT_PATH"
bash $SCRIPT_PATH

# Kill the SSH tunnel
echo "Closing the SSH tunnel..."
pkill -f "ssh -f -N -L $LOCAL_PORT:localhost:$REMOTE_PORT $SSH_USER@$SSH_HOST -i $KEY_PATH"

echo "Done."