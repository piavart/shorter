# Shorter 🔗

A service for creating short links with click analytics.

## ⚡ Features

- ✅ **Short link creation** - converting long URLs into short codes
- ✅ **Redirect** - automatic redirection to the original URL
- ✅ **Click statistics** - tracking the number of clicks for each link

## 🛠 Technologies

- **Backend:** Node.js, TypeScript
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **HTTP Framework:** Express.js

## 🚀 Installation and Setup

### Prerequisites

- Docker
- Docker Compose

### Quick Start

```bash
# Clone the repository
git clone https://github.com/piavart/shorter.git

# Navigate to project directory
cd shorter

# Run with Docker Compose
docker-compose up
```

## 📖 API Documentation

### Create Short Link
POST /shorten

Request Body:

```json
{
  "url": "https://example.com/very/long/url/that/needs/to/be/shortened"
}
```

Response:

```json
{
  "shortCode": "1750078170308"
}
```

### Redirect by Short Link

GET /:shortCode

Automatically redirects to the original URL.

Example: GET /1750078170308 → redirect to <https://example.com/very/long/url/>...

### Get Statistics

GET /stats/:shortCode

Response:

```json
{
  "shortCode": "1750078170308",
  "url": "https://example.com/very/long/url/that/needs/to/be/shortened",
  "stats": {
    "clicksCount": 1
  }
}
```

## Architecture Overview

Entry point: src/index.ts

AppController handles all incoming requests, responsible for request processing, calling the appropriate service, and forming responses.

The application's business logic is executed within separate services:

- CreateShortCodeService - handles new code registration functionality, encapsulates the logic for generating new codes (currently just a timestamp) and other necessary functionality
- ShortCodeService - handles logic for other requests
