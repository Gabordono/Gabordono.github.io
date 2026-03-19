@echo off
chcp 65001 >nul
title GitHub Pages Deploy - Gabordono.github.io

echo ============================================
echo   GitHub Pages Deploy szkript
echo   Gabordono.github.io
echo ============================================
echo.

:: --- 1. Projekt mappára ugrás ---
cd /d "E:\portoflio projektek\Porfolio weblap"
if %errorlevel% neq 0 (
    echo [HIBA] Nem talalom a projekt mappat!
    echo Ellenorizd az eleresi utat: E:\portoflio projektek\Porfolio weblap
    pause
    exit /b 1
)
echo [OK] Projekt mappa megtalalva

:: --- 2. Git ellenőrzés ---
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [HIBA] A Git nincs telepitve!
    echo Telepitsd innen: https://git-scm.com/download/win
    echo Telepites utan futtasd ujra ezt a szkriptet.
    pause
    exit /b 1
)
echo [OK] Git telepitve van

:: --- 3. Node / npm ellenőrzés ---
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [HIBA] Az npm nincs telepitve!
    echo Telepitsd a Node.js-t innen: https://nodejs.org
    pause
    exit /b 1
)
echo [OK] npm elerheto

:: --- 4. Függőségek telepítése ---
echo.
echo [...] npm install futtatasa...
npm install
if %errorlevel% neq 0 (
    echo [HIBA] npm install sikertelen!
    pause
    exit /b 1
)
echo [OK] Fuggosegek telepitve

:: --- 5. gh-pages telepítése ---
echo.
echo [...] gh-pages csomag telepitese...
npm install gh-pages --save-dev
if %errorlevel% neq 0 (
    echo [HIBA] gh-pages telepitese sikertelen!
    pause
    exit /b 1
)
echo [OK] gh-pages kesz

:: --- 6. Git repo inicializálás / remote beállítás ---
echo.
echo [...] Git beallitasa...

git rev-parse --git-dir >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Git inicializalas...
    git init
    git branch -M main
)

git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Remote hozzaadasa...
    git remote add origin https://github.com/Gabordono/Gabordono.github.io.git
)
echo [OK] Git repo bekotve

:: --- 7. Első push main branchre ---
echo.
echo [...] Forras kod feltoltese (main branch)...
git add .
git commit -m "portfolio deploy" >nul 2>&1
git push -u origin main
if %errorlevel% neq 0 (
    echo [FIGYELEM] Push sikertelen vagy mar nincs uj valtozas - folytatom...
)
echo [OK] Forras kod feltoltve

:: --- 8. Deploy! ---
echo.
echo [...] Build es deploy a gh-pages branchre...
npm run deploy
if %errorlevel% neq 0 (
    echo.
    echo [HIBA] Deploy sikertelen! Leggyakoribb ok:
    echo  - Hianyzik a src/data/portfolioRiskCode.ts fajl
    echo  - Build hiba van a kodban (futtasd: npm run build)
    pause
    exit /b 1
)

:: --- 9. Kész! ---
echo.
echo ============================================
echo   DEPLOY SIKERES!
echo ============================================
echo.
echo Az oldalad elerheto lesz par perc mulva itt:
echo https://gabordono.github.io
echo.
echo NE FELEDD: GitHub-on Settings - Pages -
echo Branch: gh-pages - Save !
echo.
pause
