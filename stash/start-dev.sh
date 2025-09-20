#!/bin/bash

# Start backend
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
cd ..
npm run dev &
FRONTEND_PID=$!

echo "Backend started with PID: $BACKEND_PID"
echo "Frontend started with PID: $FRONTEND_PID"
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

# Cleanup
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
