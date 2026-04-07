@echo off
cd /d "C:\Users\rachel.reintjes\Documents\pm-action-tracking-dashboard"
if not exist node_modules (
  npm install
)
npx vite --port 3003
