#!/bin/bash

# Fix PostgreSQL repository issue and prepare server
# Run this first to fix the apt repository error

set -e

echo "🔧 Fixing server repository issues..."

# Remove the problematic PostgreSQL repository
echo "Removing old PostgreSQL repository..."
sudo rm -f /etc/apt/sources.list.d/pgdg.list
sudo rm -f /etc/apt/sources.list.d/postgresql.list

# Clean apt cache
echo "Cleaning apt cache..."
sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*

# Update package lists
echo "Updating package lists..."
sudo apt-get update

echo "✅ Repository issues fixed!"
echo "Now you can run the server setup script again."

