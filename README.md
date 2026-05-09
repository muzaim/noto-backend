# Noto Backend

Noto Backend is a REST API for a note-taking application inspired by block editor style apps like Notion.  
This backend provides authentication, note management, block editor features, nested blocks, realtime websocket updates, and audit trail activity.

---

# Features

- JWT Authentication
- Login & Register
- Note management
- Block management
- Nested / sub block
- Checklist block
- Code block
- Image block
- Realtime websocket
- Audit trail activity
- Soft delete
- PostgreSQL database
- TypeORM ORM

---

# Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Socket.IO
- JWT
- Docker
- Swagger

---

# Installation

## Clone Repository

```bash
git clone https://gitlab.com/muzaimsurya16/noto-backend.git
```

```bash
cd noto-backend
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Setup

Create a `.env` file

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=noto

JWT_SECRET=secret
```

---

# PostgreSQL Docker

If you are using Docker:

```bash
docker run --name postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=noto \
-p 5432:5432 \
-d postgres
```

---

# Dummy Database

If you want to use a dummy database, this project already provides one.

Restore database:

```bash
docker exec -i postgres psql -U postgres -d noto < noto.sql
```

Make sure:

- PostgreSQL container is already running
- Database `noto` has been created
- File `noto.sql` exists in the project root

---

# Run Project

```bash
npm run start:dev
```

Backend will run on:

```txt
http://localhost:8181
```

---

# API Base URL

```txt
http://localhost:8181/api/v1
```

---

# Swagger Documentation

```txt
http://localhost:8181/docs
```

---

# Realtime Features

Using websocket for:

- Realtime note updates
- Synchronization between tabs/sessions
- Live workspace refresh
- Audit trail refresh

---

# Dummy Account

```txt
Email    : admin@yopmail.com
Password : 123456
```

---

# Author

Made with ❤️ by Muzaim Surya
