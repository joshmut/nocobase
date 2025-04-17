#!/bin/bash
set -e

echo "📦 Installing production dependencies..."
yarn install --production

echo "📊 Initializing demo data..."
yarn demo:init || echo "✅ Demo data already initialized or skipped"

echo "🚀 Launching NocoBase..."
yarn start
