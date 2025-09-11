
Meetup App – Backend API

This is the backend service for the Meetup App.
It’s built using Node.js, Express.js and MongoDB (Mongoose).
It provides RESTful APIs to create, retrieve, search, and filter events.

🚀 Features

Connects to MongoDB using Mongoose

CRUD operations for events

Filter events by type (Online/Offline/Workshop etc.)

Search events by name/title

Get event by ID

🛠️ Tech Stack

Node.js – server runtime

Express.js – HTTP framework

MongoDB – database

Mongoose – ODM

dotenv – environment variable management

CORS – cross-origin resource sharing

⚙️ Installation

1️⃣ Clone the repository

   git clone <repo-url>
   cd Meetup-Backend

2️⃣ Install dependencies

   npm install

3️⃣ Setup environment variables
Create a .env file in the root of the backend directory:

   MONGODB=<your-mongodb-connection-string>

4️⃣ Run the server

   node index.js

APIS:
| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| `POST` | `/events`                      | Add a new event           |
| `GET`  | `/events`                      | Fetch all events          |
| `GET`  | `/events/eventType/:eventType` | Fetch events by type      |
| `GET`  | `/events/eventName/:eventName` | Fetch event by name/title |
| `GET`  | `/events/:eventId`             | Fetch event by ID         |


📂 Folder Structure

Meetup-Backend/
 ├── db/
 │   └── db.connect.js        # MongoDB connection
 ├── models/
 │   └── event.model.js       # Event schema & model
 ├── index.js                 # Express app & routes
 ├── package.json
 └── .env

📝 How It Works

Database Connection:
initializeDatabase() from db/db.connect.js connects to MongoDB using your connection string.

Event Model:
models/event.model.js defines the schema for events (eventType, date, time, etc.).

Routes:
Defined in index.js using Express. Includes:

POST /events to add a new event

GET /events to fetch all events

GET /events/eventType/:eventType to fetch events by type

GET /events/eventName/:eventName to fetch event by title

GET /events/:eventId to fetch event by ID
