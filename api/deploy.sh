#!/bin/bash

# Sanjeevani Workshop - Hostinger Deployment Script

echo "🚀 Starting deployment process for Hostinger..."

# Step 1: Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Step 2: Build and export frontend
echo "🏗️ Building and exporting frontend..."
npm run build

# Step 3: Install PHP dependencies  
echo "🐘 Installing PHP dependencies..."
cd api
composer install --no-dev --optimize-autoloader
cd ..

# Step 4: Create environment file
echo "⚙️ Setting up environment configuration..."
if [ ! -f .env ]; then
    cp api/.env.production .env
    echo "📝 Created .env file. Please update it with your actual Razorpay credentials!"
else
    echo "✅ .env file already exists"
fi

# Step 5: Show deployment summary
echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps for Hostinger deployment:"
echo "1. Update .env file with your actual Razorpay keys"
echo "2. Upload contents of 'out/' directory to public_html/"
echo "3. Upload 'api/' directory to public_html/api/"
echo "4. Upload .env file to public_html/"
echo ""
echo "📁 Files ready for upload:"
echo "   • Frontend: out/ → public_html/"
echo "   • Backend: api/ → public_html/api/"
echo "   • Config: .env → public_html/"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Happy deploying!"
