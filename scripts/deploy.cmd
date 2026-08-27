@echo off
REM ============================================================
REM Windows shim for "npm run deploy".
REM In cmd/PowerShell, PATH resolves bare "bash" to System32's
REM WSL stub bash.exe (hangs silently when no distro), so locate
REM the real Git Bash by absolute path instead.
REM Usage: npm run deploy [-- --dry-run | -- --yes | -- "msg"]
REM ============================================================
setlocal
set "GB="
for %%P in (
    "%ProgramFiles%\Git\bin\bash.exe"
    "%ProgramFiles(x86)%\Git\bin\bash.exe"
    "%LocalAppData%\Programs\Git\bin\bash.exe"
) do (
    if exist %%P if not defined GB set "GB=%%~P"
)
if not defined GB (
    echo [deploy] Git Bash not found. Install Git for Windows, or run inside Git Bash: bash scripts/deploy.sh
    exit /b 1
)
"%GB%" scripts/deploy.sh %*
