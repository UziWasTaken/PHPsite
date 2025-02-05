const { execSync } = require('child_process');

try {
  // Generate Prisma Client
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate');

  // Push database schema
  console.log('Pushing database schema...');
  execSync('npx prisma db push');

  // Build Next.js application
  console.log('Building Next.js application...');
  execSync('next build');

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 