
# Learn APIs — Full Stack Project (Angular + Spring Boot + MySQL)

A tiny full-stack app to understand how APIs work. You'll build:
- An **Angular** frontend with two pages (Add User, View Users) and navigation.
- A **Spring Boot** backend that exposes a REST API.
- A **MySQL** database that stores the data.

The frontend talks to the backend over HTTP. The backend talks to MySQL through JPA. Once you wire it up and watch data flow end-to-end, APIs will click for you.

---

## The big picture (the part you really want to understand)

```
┌─────────────┐    HTTP request     ┌─────────────┐    SQL    ┌──────────┐
│  Angular    │ ──────────────────▶ │ Spring Boot │ ────────▶ │  MySQL   │
│  (browser)  │ ◀────────────────── │  (API)      │ ◀──────── │          │
└─────────────┘    HTTP response    └─────────────┘           └──────────┘
   port 4200       (JSON body)         port 8080               port 3306
```

When you click **Save user** on the form:

1. Angular reads the form values and calls `userService.addUser({name, age})`.
2. The service uses `HttpClient` to send a `POST` request to `http://localhost:8080/api/users` with JSON body `{"name": "Aman", "age": 22}`.
3. Spring Boot's `UserController` receives the request. `@RequestBody` converts the JSON into a `User` Java object.
4. The controller calls `userRepository.save(user)`. JPA generates an SQL `INSERT` and runs it against MySQL.
5. MySQL returns the new row (now with an auto-generated `id`).
6. Spring Boot serializes the saved `User` object back to JSON and sends it as the response.
7. Angular's `.subscribe()` callback runs with the response — and we log it to the console.

That round trip is **what an API is**. Everything else is detail.

---

## Project structure

```
learn-api-project/
├── backend/                          ← Spring Boot
│   ├── pom.xml                        Maven config + dependencies
│   └── src/main/
│       ├── java/com/example/userapp/
│       │   ├── UserAppApplication.java   App entry point
│       │   ├── User.java                 Entity (= one row in `users`)
│       │   ├── UserRepository.java       DB access (auto-generated SQL)
│       │   └── UserController.java       THE API — endpoints live here
│       └── resources/
│           └── application.properties    DB connection settings
│
├── frontend/                         ← Angular
│   └── src/app/
│       ├── app.component.{ts,html,css}   Shell + navigation bar
│       ├── app.config.ts                 Enables HttpClient & routing
│       ├── app.routes.ts                 URL → component mapping
│       ├── services/
│       │   └── user.service.ts           HTTP calls live here
│       └── pages/
│           ├── add-user/                 The form
│           └── user-list/                The list view
│
└── database/
    └── schema.sql                    One-time DB setup
```

---

## Prerequisites

Install these once:
- **Java 17+** — `java -version`
- **Maven** — `mvn -v` (or use the wrapper Spring Initializr provides)
- **Node.js 18+** & **npm** — `node -v`
- **Angular CLI** — `npm install -g @angular/cli`
- **MySQL 8+** — running locally on port 3306

---

## Setup — step by step

### 1. MySQL

Open the MySQL CLI (or MySQL Workbench) and run:

```sql
CREATE DATABASE userapp;
```

That's it. The `users` table gets created automatically by JPA the first time the backend runs.

### 2. Backend (Spring Boot)

```bash
cd backend
```

Open `src/main/resources/application.properties` and change `your_password` to your real MySQL password.

Then run:

```bash
mvn spring-boot:run
```

When you see `Started UserAppApplication in X seconds`, the API is live at `http://localhost:8080`.

**Test it from the terminal before touching the frontend:**

```bash
# Should return [] (empty array)
curl http://localhost:8080/api/users

# Add a user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Aman","age":22}'

# Should now return the user you just added
curl http://localhost:8080/api/users
```

If those work, **the API is working**. The frontend is just a prettier way to do the same thing.

### 3. Frontend (Angular)

Since this folder only contains the files specific to this app, scaffold a fresh Angular project and copy the files in:

```bash
# Create a new Angular app (say "no" to SSR, defaults are fine for the rest)
ng new frontend-app --standalone --routing --style=css

cd frontend-app
```

Then **replace the contents of `src/app/`** with the files from the `frontend/src/app/` folder in this project. The files map 1-to-1.

You'll need three files specifically:
- `src/app/app.config.ts` — replaced (adds `provideHttpClient`)
- `src/app/app.routes.ts` — replaced (adds the two routes)
- `src/app/app.component.{ts,html,css}` — replaced (adds the nav bar)

And add these new files:
- `src/app/services/user.service.ts`
- `src/app/pages/add-user/*` (3 files)
- `src/app/pages/user-list/*` (3 files)

Then run:

```bash
ng serve
```

Open `http://localhost:4200`.

---

## Try it

1. Open `http://localhost:4200`.
2. Open your browser's **DevTools** (F12) → **Console** tab and **Network** tab. Keep them open.
3. Enter a name and age, click **Save user**.
   - Console shows the values being logged (frontend logging — as you asked).
   - Console shows what the server returned (with the new `id`).
   - **Network tab** shows the actual HTTP request — click it, look at the Request and Response. **This is what an API call literally is.**
4. Click **View Users** → you see the user you just added, fetched fresh from MySQL.
5. Open MySQL: `SELECT * FROM userapp.users;` — your data is really in the database.

---

## The 5 things to internalize from this project

1. **An API is just HTTP endpoints.** `GET /api/users` and `POST /api/users` are the entire API in this project. That's all an API is — URLs that accept requests and return responses.

2. **JSON is the format.** Frontend and backend speak JSON. Angular's `HttpClient` and Spring's `@RequestBody`/`@RestController` handle the conversion automatically.

3. **CORS is a real thing.** The frontend runs on port `4200`, the backend on `8080`. Browsers block cross-port requests by default — that's why `@CrossOrigin(origins = "http://localhost:4200")` is on the controller.

4. **The frontend never talks to the database.** It can't. It only talks to the API. The API decides what to do with the data. This separation is the whole point of full-stack architecture.

5. **Services exist so URLs live in one place.** Notice how `UserService` has the API URL once, and components just call `userService.addUser(...)`. If the API URL changes, you change it in one file.

---

## Things to try next (in order of difficulty)

1. Add a **DELETE** endpoint: `DELETE /api/users/{id}` in the backend, then add a delete button to each row in the user list.
2. Add an **edit** flow: click a row → goes to `/edit/:id` → form pre-filled → `PUT /api/users/{id}` to save.
3. Add **validation**: backend rejects ages < 0 or empty names with a `400 Bad Request`. Show that error in the UI.
4. Add a **third page** that shows stats (`GET /api/users/stats` → returns average age, count, etc.).
5. Replace MySQL with **PostgreSQL** — change one dependency and one URL in `application.properties`. Notice how nothing else changes. That's the power of JPA.

---

## Was your learning approach the right one?

**Yes, with one tweak.** You said: build a form, log values in frontend, send to DB. That's good. The tweak I'd add (and built in here): **also read the data back**. APIs are bidirectional. Sending data without reading it back means you only experience half of what an API does. The "View Users" page is the other half.

The other thing this project teaches that pure "send to DB" wouldn't:
- Browser DevTools → Network tab. **Always have this open while learning APIs.** Every clicked button, every page load, every form submit — you can see the actual request and response. This is the single most useful habit when learning web development.
#   D e m o 
 
 #   L e a r n   a p i   p r o j e c t 
 
 
