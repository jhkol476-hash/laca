@echo off
echo Avvio server locale per il visualizzatore 3D...
echo.

REM Controlla se Python e' installato
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRORE: Python non trovato!
    echo Installa Python da https://www.python.org/
    pause
    exit /b 1
)

REM Avvia il server Python
python server.py

pause

