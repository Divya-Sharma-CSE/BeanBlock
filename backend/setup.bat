@echo off
REM BeanBlock Backend Setup Script for Windows

echo.
echo 🚀 BeanBlock Backend Setup
echo ==========================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%
echo.

echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Check if .env exists
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created
    echo.
    echo ⚠️  Please edit .env with your configuration:
    echo    - RPC_URL (Infura, Alchemy, etc.)
    echo    - PINATA_JWT (for IPFS uploads)
    echo    - CONTRACT_ADDRESS (deployed contract)
    echo.
)

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Edit .env with your credentials
echo 2. Run: npm run dev
echo 3. Backend will start on http://localhost:3000
echo.
echo 📚 For more info, see README.md
echo.
pause
