#!/bin/bash

echo "Checking Docker Desktop..."

# Start Docker Desktop if it isn't running
if ! docker info >/dev/null 2>&1; then
    echo "Starting Docker Desktop..."
    open -a Docker

    echo "Waiting for Docker..."
    until docker info >/dev/null 2>&1
    do
        sleep 2
    done
fi

echo "Docker is running."

echo "Starting PostgreSQL..."
docker compose up -d postgres

echo "Starting Express..."
npm run dev:server