<p align="center">
  <a href="https://github.com/calcom/cal.com">
   <img src="https://github.com/user-attachments/assets/6e0b84f5-5f2b-414a-9fde-8c64c4a6e72d" alt="Logo">
  </a>

  <h3 align="center">opal</h3>

  <p align="center">
    A Distributed Video Transcoding Application
    <br />
    <a href="https://opal.kewalkhondekar.dev">Website</a>
    ·
    <a href="https://scalloped-anise-dc9.notion.site/Opal-28b52ef0c8b6803e832acb8160fa5895">Document</a>
  </p>
</p>
<br/>

# Opal – Distributed Video Transcoding Platform
Opal is a fully event-driven, distributed video processing system that enables seamless browser-based screen recording, multipart uploads, multi-resolution FFmpeg transcoding, AI-powered transcripts, and automated video delivery pipelines.

## Monorepo Structure (Turborepo)
 ```sh
     apps/
     ├── web/          # Next.js app (UI recording client + Restfull API)
     ├── consumer/     # SQS queue consumer (launches transcoding tasks)
     └── transcoder/   # FFmpeg worker running inside ECS container

     docker/
     ├── Dockerfile.web
     ├── Dockerfile.consumer
     └── Dockerfile.transcoder

     packages/
     ├── ui/           # Shared UI components (optional)
     ├── config/       # Shared config/env helpers
     └── db/           # Shared database
   ```

## Prerequisites
You need:

- Node.js 18+
- pnpm (recommended)
- Docker (no docker-compose)
- AWS CLI configured
- FFmpeg (optional for local transcoder testing)
- PostgreSQL database

## 📥 Clone the Repository

```bash
git clone https://github.com/kewalkhondekar25/opal
cd opal
```
  
## Environment Variables

Each app has its own .env file:

apps/web/.env
```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
ACCESS_KEY=
SECRET_ACCESS_KEY=
BUCKET=
FINAL_BUCKET=
REGION=
DOMAIN=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
STRIPE_CONFIGURATION_ID=
STRIPE_WEBHOOK_SECRET=
```

apps/consumer/.env
```sh
REGION=
ACCESS_KEY=
SECRET_ACCESS_KEY=
BUCKET=
FINAL_BUCKET=
QUEUE_URL=
DATABASE_URL=
ECS_TASK_DEFINATION=
ECS_CLUSTER=
ECS_SUBNETS=
ECS_SECURITY_GROUP=
OPENAI_API_KEY=
CONTAINER_DESIRED_COUNT=
```
packages/db/.env
```sh
DATABASE_URL=
```

## Install Dependencies
```sh
pnpm install
```

## Running Locally (Without Docker)

Web App (Next.js)

```sh
cd apps/web
pnpm run dev
```

Consumer

```sh
cd apps/consumer
pnpm run dev
```

Transcoder

```sh
cd apps/transcoder
pnpm run dev
```

## Running With Docker

1. Build Images
   
  Web (Nextjs)
  ```sh
    docker build -f ./docker/Dockerfile.web -t opal-web .
  ```
  Consumer
   ```sh
    docker build -f ./docker/Dockerfile.consumer -t opal-consumer .
   ```
  
  Transcoder
  ```sh
    docker build -f ./docker/Dockerfile.transcoder -t opal-transcoder .
  ```
2. Run Containers

  Web (Next.js)
  ```sh
    docker run -d -p 3000:3000 --env-file apps/web/.env opal-web
  ```
  Consumer
  ```sh
    docker run -d -p 3000:3000 --env-file apps/consumer/.env opal-consumer
  ```
  Transcoder
  ```sh
    docker run -d -e-nv-file apps/consumer/.env opal-consumer
  ```


## Useful Turborepo Commands

Run everything:
```sh
pnpm run dev
```

Build:
```sh
pnpm run build
```

Clean:
```sh
pnpm run clean
```
