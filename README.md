# League of Legends App

This application is a CRUD (Create, Read, Update, Delete) API for League of Legends champions. It uses Express, MySQL, and Prisma.

## Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file with the following content:

```js
PORT = 3000;
JWT_SECRET = "d0nt_T3lL_4ny0n3";
DATABASE_URL = "mysql://user:password@localhost:3306/league_of_legends_app";
SHADOW_DATABASE_URL = "mysql://user:password@localhost:3306/league_of_legends_app_shadow";
```

4. Set up the database with `npx prisma migrate dev`.
5. Seed the database with `npm run seed`.
6. Build the server with `npm run build`.
7. Start the server with `npm start`.

Alternatively, you can skip steps 6 and 7 and start the server in development mode with `npm run dev`.

## Usage

The application serves static files from the `public` directory. You can access the application at `http://localhost:3000` in your browser.

On the server side, the application provides the following endpoints for champions:

-   `POST /api/champions`: Create a new champion.
-   `GET /api/champions`: Retrieve all champions.
-   `GET /api/champions/:id`: Retrieve a single champion by ID.
-   `PUT /api/champions/:id`: Update a champion by ID.
-   `DELETE /api/champions/:id`: Delete a champion by ID.

And the following endpoints for users:

-   `POST /api/users/register`: Register a new user.
-   `POST /api/users/login`: Log in and get an authentication token.
