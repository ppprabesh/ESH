-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP,
    "image" TEXT
);

CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    UNIQUE("provider", "providerAccountId")
);

CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "expires" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT UNIQUE NOT NULL,
    "expires" TIMESTAMP NOT NULL,
    UNIQUE("identifier", "token")
);

CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT UNIQUE NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT,
    "image" TEXT
);

CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[] NOT NULL DEFAULT '{}',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT[] NOT NULL DEFAULT '{}',
    "size" TEXT[] NOT NULL DEFAULT '{}',
    "material" TEXT[] NOT NULL DEFAULT '{}',
    "attributes" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "_ProductToCategory" (
    "A" TEXT NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "B" TEXT NOT NULL REFERENCES "Category"("id") ON DELETE CASCADE,
    UNIQUE("A", "B")
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Product_slug_idx" ON "Product"("slug");
CREATE INDEX IF NOT EXISTS "Category_slug_idx" ON "Category"("slug");
CREATE INDEX IF NOT EXISTS "_ProductToCategory_B_idx" ON "_ProductToCategory"("B"); 