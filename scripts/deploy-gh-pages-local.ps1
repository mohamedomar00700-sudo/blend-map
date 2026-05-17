# Deploy without GitHub Actions (when billing blocks Actions).
# Then: repo Settings → Pages → Deploy from branch → gh-pages → / (root)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "Building..."
npm run build:pages
if ($LASTEXITCODE -ne 0) { throw "build:pages failed" }

Write-Host "Pushing dist/client to gh-pages branch..."
npx --yes gh-pages@6 -d dist/client -m "deploy static site"
if ($LASTEXITCODE -ne 0) { throw "gh-pages publish failed" }

Write-Host ""
Write-Host "Published. Set GitHub Pages source:"
Write-Host "  Settings → Pages → Deploy from a branch → gh-pages → / (root)"
Write-Host "URL: https://mohamedomar00700-sudo.github.io/blend-map/"
