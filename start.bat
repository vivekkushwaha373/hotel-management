@echo off
echo Starting Hotel & Destination Manager...
echo.

echo Installing dependencies...
npm run install-all

echo.
echo Seeding database...
npm run seed

echo.
echo Starting development servers...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:5173
echo.
npm run dev 