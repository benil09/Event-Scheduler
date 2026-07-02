#  🗓️ Event-Scheduler

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.8-lightblue.svg)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express-5.2-green.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)](https://www.postgresql.org/)

**Event-scheduler** is a high-performance, production-ready REST API backend for event scheduling, booking, and user availability management (inspired by Calendly). Built with a clean, decoupled architecture using **Node.js**, **Express**, **TypeScript**, and **Prisma ORM** with **PostgreSQL**.

---

## 🚀 Key Features

*   **User Profiles & Timezones**: Manage hosts, their unique scheduling slugs, and preferences (such as timezones).
*   **Dynamic Event Types**: Custom bookable meeting durations, buffer times (before/after), location types (`online` / `in-person`), locations (e.g., Google Meet, Zoom), and status controls.
*   **Availability Rules**: Granular control of weekly working hours (e.g., Monday 9 AM - 5 PM) tied to timezones.
*   **Availability Exceptions**: Handle custom unavailable dates, holidays, or temporary schedule modifications.
*   **Slots & Bookings Engine**: Automated calendar slots generation and booking management.
*   **Zod Payload Validation**: Strict validation middleware on all write endpoints.
*   **Standardized Error Handling**: Unified REST API responses and HTTP error abstractions.

---

## 🏛️ Project Architecture

The project follows a modular **Controller-Service-Repository** pattern to ensure strict separation of concerns, easy testability, and high maintainability:

```text
 ┌──────────────────┐
 │ Client / Invitee │
 └────────┬─────────┘
          │ HTTP Request
          ▼
 ┌──────────────────┐
 │   Routes Layer   │
 └────────┬─────────┘
          ├──────────────────────────┐
          ▼ (Validate Payload)       ▼ (Verify Header)
 ┌──────────────────┐       ┌──────────────────┐
 │   Validate Mdw   │       │     Auth Mdw     │
 └────────┬─────────┘       └────────┬─────────┘
          │                          │
          └─────────────┬────────────┘
                        ▼ (Call Handler)
              ┌──────────────────┐
              │ Controllers Layer│
              └─────────┬────────┘
                        ▼ (Business Logic)
              ┌──────────────────┐
              │  Services Layer  │
              └─────────┬────────┘
                        ▼ (Database Queries)
              ┌──────────────────┐
              │Repositories Layer│
              └─────────┬────────┘
                        ▼ (ORM Access)
              ┌──────────────────┐
              │   Prisma Client  │
              └─────────┬────────┘
                        ▼ (Query/Mutate)
              ┌──────────────────┐
              │ PostgreSQL DB    │
              └──────────────────┘
```

<details>
<summary>👁️ Click to view Interactive Mermaid Diagram</summary>

```mermaid
graph TD
    Client[Client / Invitee] -->|HTTP Request| Route[Routes Layer]
    Route -->|Validate Payload| Val[Validate Middleware]
    Route -->|Verify Header| Auth[Auth Middleware]
    Route -->|Call Handler| Controller[Controllers Layer]
    Controller -->|Business Logic| Service[Services Layer]
    Service -->|Database Queries| Repository[Repositories Layer]
    Repository -->|ORM Access| Prisma[Prisma Client]
    Prisma -->|Query/Mutate| PostgreSQL[(PostgreSQL Database)]
```

</details>

---

## 📊 Database Schema (Prisma)

The application utilizes a PostgreSQL relational database. Key relations and indexes are defined in [schema.prisma](file:///Users/nil09/Desktop/Lambda5/Event-Scheduler/prisma/schema.prisma):

```text
  ┌────────────────────────┐             ┌────────────────────────┐
  │         users          │             │   availability_rules   │
  ├────────────────────────┤             ├────────────────────────┤
  │ id (PK)                │1  ──────── <│ id (PK)                │
  │ Email                  │             │ userId (FK)            │
  │ name                   │             │ weekday                │
  │ slug                   │             │ startTime              │
  │ timezone               │             │ endTime                │
  │ createdAt / updatedAt  │             │ isActive / timezone    │
  └────────────────────────┘             └────────────────────────┘
              │ 1
              │
              │                               ┌────────────────────────┐
              ├───────────────────────────── <│ availability_exceptions│
              │ 1                             ├────────────────────────┤
              │                               │ id (PK)                │
              │                               │ userId (FK)            │
              │                               │ date / type            │
              │                               │ startTime / endTime    │
              │                               └────────────────────────┘
              │ 1
              ├───────────────────────────── <│      event_types       │
              │ 1                             ├────────────────────────┤
              │                               │ id (PK)                │
              │                               │ hostId (FK)            │
              │                               │ title / description    │
              │                               │ slug / locationType    │
              │                               │ durationMin / isActive │
              │                               └────────────────────────┘
              │                                           │ 1
              │                                           │
              ├─────────────────┐                         │
              │ 1               │ 1                       │
              ▼                 ▼                         ▼
  ┌────────────────────────┐    │            ┌────────────────────────┐
  │        bookings        │    │            │         slots          │
  ├────────────────────────┤    │            ├────────────────────────┤
  │ id (PK)                │    │            │ id (PK)                │
  │ hostId (FK) <──────────┼────┼────────── <│ hostId (FK)            │
  │ eventTypeId (FK) <─────┼────┼────────── <│ eventTypeId (FK)       │
  │ slotId (FK) <──────────┼────┘            │ startAt                │
  │ inviteeEmail           │                 │ endAt                  │
  │ inviteeName / Note     │                 │ status                 │
  │ status / meetLink      │                 └────────────────────────┘
  └────────────────────────┘
```

<details>
<summary>👁️ Click to view Interactive Mermaid Diagram</summary>

```mermaid
erDiagram
    User ||--o{ EventTypes : hosts
    User ||--o{ AvailabilityRule : defines
    User ||--o{ AvailabilityException : exceptions
    User ||--o{ Slot : has_slots
    User ||--o{ Booking : host_bookings
    EventTypes ||--o{ Slot : generates
    EventTypes ||--o{ Booking : booked_under
    Slot ||--o{ Booking : books_slot

    User {
        Int id PK
        String Email UK
        String name
        String slug UK
        String timezone
        DateTime createdAt
        DateTime updatedAt
    }

    EventTypes {
        Int id PK
        Int hostId FK
        String title
        String description
        String slug UK
        String locationType
        String locationValue
        Int durationMin
        Boolean isActive
        Int bufferBeforeMin
        Int bufferAfterMin
        DateTime createdAt
        DateTime updatedAt
    }

    AvailabilityRule {
        Int id PK
        Int userId FK
        Int weekday
        String startTime
        String endTime
        Boolean isActive
        String timezone
        DateTime createdAt
        DateTime updatedAt
    }

    AvailabilityException {
        Int id PK
        Int userId FK
        DateTime date
        String type
        String startTime
        String endTime
        String timezone
        String reason
        DateTime createdAt
        DateTime updatedAt
    }

    Slot {
        Int id PK
        Int hostId FK
        Int eventTypeId FK
        DateTime startAt
        DateTime endAt
        String status
        DateTime createdAt
        DateTime updatedAt
    }

    Booking {
        Int id PK
        Int hostId FK
        Int eventTypeId FK
        Int slotId FK
        String inviteeEmail
        String inviteeNote
        String inviteeName
        String status
        String meetLink
        String calenderEventId
        DateTime cancelledAt
        DateTime createdAt
        DateTime updatedAt
    }
```

</details>

---

## 🛠️ Getting Started

Follow these steps to run the development environment locally:

### 1. Prerequisites
*   Node.js (v18 or higher)
*   Docker & Docker Compose
*   npm (v9 or higher)

### 2. Set Up Environment Variables
Create a `.env` file in the root directory (based on environment config in [src/config/env.ts](file:///Users/nil09/Desktop/Lambda5/Event-Scheduler/src/config/env.ts)):
```env
PORT=8000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
NODE_ENV=development
```

### 3. Spin Up the Database
Start the containerized PostgreSQL database:
```bash
docker compose up -d postgres
```
*(Alternatively, you can run the helper script on macOS/Linux: `./scripts/start-dev.sh`)*

### 4. Database Setup & Seeding
Format, migrate, and seed the database using Prisma commands:
```bash
# Run database formatting, migrations and client generation
npm run prisma:all

# Seed database with sample users and events
npm run prisma:seed
```

### 5. Start the Application
Run the development server with live reload:
```bash
npm run dev
```
The server will start running at `http://localhost:8000`.

---

## 🔌 API Endpoints Reference

### Health Check
*   **`GET /health`**
    *   **Description**: Verify application health and timestamp.
    *   **Authentication**: None.

---

### User Endpoints (`/users`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/users` | None | Fetch all registered users in the database. |
| **GET** | `/users/:id` | None | Fetch a user profile by ID. |
| **POST** | `/users/createUser` | None | Create a new user account (Validated via [createUserSchema](file:///Users/nil09/Desktop/Lambda5/Event-Scheduler/src/dtos/user.dto.ts#L4-L9)). |
| **PUT** | `/users/:id` | None | Update an existing user profile. |
| **DELETE** | `/users/:id` | None | Remove a user and cascade delete their events/rules. |

#### Create User Payload Examples
`POST /users/createUser`
```json
{
  "Email": "alex.green@example.com",
  "name": "Alex Green",
  "slug": "alex-green-scheduling",
  "timezone": "America/New_York"
}
```

---

### Event Type Endpoints (`/event-types`)

*Note: Mutation requests require a valid user session. This is verified using the `x-user-id` HTTP header passing the authenticated user's ID.*

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/event-types/user/:hostId` | None | Get all event types configured by a host ID. |
| **GET** | `/event-types/:eventId` | None | Get specific event type details by ID. |
| **POST** | `/event-types` | `x-user-id` | Create a bookable event type (Validated via [createEventTypeSchema](file:///Users/nil09/Desktop/Lambda5/Event-Scheduler/src/dtos/event-type.dto.ts#L4-L14)). |
| **PUT** | `/event-types/:eventId` | `x-user-id` | Modify parameters of an existing event type. |
| **DELETE** | `/event-types/:eventId` | `x-user-id` | Delete an event type. |

#### Create Event Type Payload Examples
`POST /event-types`
*Header: `x-user-id: 1`*
```json
{
  "title": "45 Min Consultation",
  "description": "One-on-one consultation slot.",
  "locationType": "online",
  "locationValue": "Google Meet",
  "durationMin": 45,
  "isActive": true,
  "bufferBeforeMin": 5,
  "bufferAfterMin": 5,
  "slug": "consultation-45"
}
```

---

### Public Scheduling Page Endpoint

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/users/:userId/event-types/:slug` | None | Retrieve active event type details for booking pages (e.g. for widgets/calendars). |

---

## 🛠️ Development Scripts Reference

Defined scripts inside [package.json](file:///Users/nil09/Desktop/Lambda5/Event-Scheduler/package.json):

*   `npm run dev`: Runs the compiler in watch mode via `nodemon` and executes typescript code files instantly with `tsx`.
*   `npm run prisma:format`: Formats Prisma model configurations.
*   `npm run prisma:migrate`: Creates and applies a SQL schema migration based on [schema.prisma](file:///Users/nil09/Desktop/Lambda5/Event-Scheduler/prisma/schema.prisma).
*   `npm run prisma:generate`: Re-generates the local Prisma Client definitions.
*   `npm run prisma:all`: Format -> Migrate -> Re-generate all schemas sequentially.
*   `npm run prisma:seed`: Populates the PostgreSQL database with seed files for local testing.
