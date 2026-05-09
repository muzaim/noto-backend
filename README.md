# Noto Backend

Noto Backend adalah REST API untuk aplikasi note bergaya block editor seperti Notion mini version.  
Backend ini menyediakan authentication, note management, block editor, nested block, realtime websocket, dan audit trail activity.

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

Buat file `.env`

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

Jika menggunakan Docker:

```bash
docker run --name postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=noto \
-p 5432:5432 \
-d postgres
```

---

# Database Restore

Project ini sudah menyediakan file database backup sehingga tidak perlu setup database manual.

Restore database:

```bash
docker exec -i postgres psql -U postgres -d noto < noto.sql
```

Pastikan:

- Container PostgreSQL sudah berjalan
- Database `noto` sudah dibuat
- File `noto.sql` tersedia di root project

---

# Run Project

```bash
npm run start:dev
```

Backend berjalan di:

```txt
http://localhost:8181
```

---

# API Base URL

```txt
http://localhost:8181/api/v1
```

# Swagger

```txt
http://localhost:8181/docs
```
---

# Realtime Features

Menggunakan websocket untuk:

- Realtime note update
- Synchronize antar tab/session
- Live workspace refresh
- Audit trail refresh

---

# Dummy Account

```txt
Email    : admin@yopmail.com
Password : 123456
```

# Author

Made with ❤️ by Muzaim Surya
