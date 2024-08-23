# Service API

## Overview

Service API adalah backend service yang dibangun untuk mengelola authentication, user, blog, comment. API ini di-deploy menggunakan Railway dan Github Actions serta didokumentasikan dengan Swagger.

## Features

- **Authorization**: Mengelola autentikasi, dan otorisasi.
- **User**: Mengelola user, update user, update profile.
- **Post**: Mengelola postingan content.
- **Comment**: Menglola comment postingan content. (process)

## API Documentation

Untuk dokumentasi lengkap mengenai endpoint yang tersedia, silakan akses Swagger UI di link berikut:

- **Swagger Docs**: [https://library-service-be-production.up.railway.app/api/v1/docs/](https://library-service-be-production.up.railway.app/api/v1/docs/)

## Deployment

API ini di-deploy menggunakan Railway dan dapat diakses melalui link berikut:

- **API Base URL**: [https://library-service-be-production.up.railway.app/](https://library-service-be-production.up.railway.app/)

## Getting Started

### Prerequisites

- Node.js (v14 atau lebih baru)
- NPM atau Yarn
- PostgreSQL & Prisma ORM

### Installation

1. **Clone repository** ini ke lokal Anda:

   ```bash
   git clone https://github.com/username/library-service-be.git
   cd library-service-be
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Buat file `.env`** dan tambahkan variabel environment yang dibutuhkan:

   ```env
   PORT=3001
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PUBLIC_KEY_IMAGE_KIT=your_public_key_kit_image
   PRIVATE_KEY_IMAGE_KIT=your_private_key_kit_image
   URL_ENDPOINT_IMAGE_KIT=your_url_endpoint_kit_image
   ```

4. **Jalankan migrasi database**:

   ```bash
   npx prisma migrate deploy
   ```

5. **Jalankan server**:

   ```bash
   npm start
   ```

6. Akses API di `http://localhost:3001/api/v1`.

### Usage

Setelah server berjalan, Anda bisa mulai mengakses endpoint API melalui tools seperti Postman atau melalui Swagger UI.
