# Publish to /docs on main (no gh-pages branch needed).
# After push: Settings → Pages → Deploy from branch → main → /docs
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

Write-Host "Building for GitHub Pages..."
npm run build:pages
if ($LASTEXITCODE -ne 0) { throw "build:pages failed" }

$docs = Join-Path $root "docs"
if (Test-Path $docs) { Remove-Item -Recurse -Force $docs }
New-Item -ItemType Directory -Path $docs | Out-Null
Copy-Item -Path (Join-Path $root "dist\client\*") -Destination $docs -Recurse -Force

if (-not (Test-Path (Join-Path $docs "index.html"))) {
  throw "docs/index.html missing after build"
}

Write-Host "Committing docs/ to main..."
git add docs/ .github/ vite.config.ts package.json src/ scripts/ public/ deploy-github.ps1
git add -A
git status --short
$null = git diff --cached --quiet 2>$null
if (-not $?) {
  git commit -m "deploy: add docs folder for GitHub Pages"
}
git push origin main

Write-Host ""
Write-Host "Done. In GitHub Pages settings choose:"
Write-Host "  Source: Deploy from a branch"
Write-Host "  Branch: main"
Write-Host "  Folder: /docs"
Write-Host ""
Write-Host "URL: https://mohamedomar00700-sudo.github.io/blend-map/"
