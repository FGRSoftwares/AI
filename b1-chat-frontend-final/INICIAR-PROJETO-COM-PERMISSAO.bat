@echo off
echo Ajustando permissões para scripts do PowerShell...

powershell -Command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"

echo.
echo Instalando dependências...
npm install

echo.
echo Iniciando o servidor de desenvolvimento...
npm run dev

pause
