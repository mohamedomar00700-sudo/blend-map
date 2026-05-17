# Publish site via /docs on main (no gh-pages branch required)
$ErrorActionPreference = "Stop"
& (Join-Path $PSScriptRoot "scripts\deploy-docs-folder.ps1")
