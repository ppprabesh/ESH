# Everest Souvenir House

An e-commerce platform for authentic Nepali souvenirs and handicrafts.

## Features

- Modern and responsive design
- Product catalog with categories
- Admin dashboard for product management
- Secure authentication system

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma (Database ORM)
- JWT Authentication
- ImageKit.io (Image Storage)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ppprabesh/ESH.git
cd ESH
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="your_imagekit_url_endpoint"
```

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
EverestSouvenirHouse/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard routes
│   ├── api/               # API routes
│   └── ...                # Other pages
├── components/            # React components
├── lib/                   # Utility functions and configurations
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
