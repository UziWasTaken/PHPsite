# Modern Image Board

A modern, responsive image board application built with PHP, PostgreSQL, and Cloudinary for image storage. Features include image uploads, tagging, pagination, and a clean user interface.

## Features

- Image upload with tags and descriptions
- Cloudinary integration for reliable image storage and delivery
- Responsive grid layout
- Tag-based filtering
- Pagination
- Modern UI with Tailwind CSS

## Requirements

- PHP 8.1 or higher
- PostgreSQL 12 or higher
- Composer
- Node.js (for Vercel deployment)

## Local Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd image-board
```

2. Install dependencies:
```bash
composer install
```

3. Copy `.env.example` to `.env` and configure your environment variables:
```bash
cp .env.example .env
```

4. Create a PostgreSQL database and run the schema:
```bash
psql -U postgres -d your_database_name -f database/schema.sql
```

5. Start the development server:
```bash
php -S localhost:8000 -t public
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set up environment variables in Vercel dashboard:
- DATABASE_URL
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- NEXT_PUBLIC_CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- NEXT_PUBLIC_DOMAIN

## Directory Structure

```
├── public/             # Public files
│   └── index.php      # Main entry point
├── src/               # Source files
│   ├── Config/        # Configuration files
│   └── Models/        # Model classes
├── database/          # Database files
│   └── schema.sql     # Database schema
├── vendor/            # Composer dependencies
├── .env               # Environment variables
├── composer.json      # Composer configuration
└── vercel.json        # Vercel configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 