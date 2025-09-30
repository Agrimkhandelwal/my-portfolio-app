My Full-Stack Developer Portfolio API & Frontend
This project is a personal portfolio playground that stores candidate information (profile, skills, projects, and experiences) in a MongoDB database and exposes it via a Node.js/Express.js backend API. A minimal, server-rendered frontend built with Next.js and React is provided to interact with and display the data.

🚀 Live Demo
Frontend URL: [Your Deployed Frontend URL Here]

Backend API URL: [Your Deployed Backend URL Here]

🛠️ Architecture & Tech Stack
This project follows a standard MERN-like stack, chosen for its robustness, developer-friendliness, and strong TypeScript support.

Frontend:

Framework: Next.js (React)

Language: TypeScript

Styling: Tailwind CSS

UI/Icons: Lucide React

Backend:

Runtime: Node.js

Framework: Express.js

Language: TypeScript

Database: MongoDB (with Mongoose ODM)

Deployment: Vercel (or your chosen platform)

⚙️ Local Setup
To run this project locally, you will need to run the backend and frontend services separately.

Prerequisites
Node.js (v18 or later)

npm or yarn

MongoDB Atlas account or a local MongoDB instance

1. Backend Setup
# 1. Clone the repository
git clone [Your Repository URL Here]
cd ME-API-BACKGROUND/backend

# 2. Install dependencies
npm install

# 3. Create a .env file in the /backend directory
# Add your MongoDB connection string
MONGODB_URL="your_mongodb_connection_string"
PORT=5000

# 4. Seed the database with initial data (optional, but recommended)
npm run seed

# 5. Start the development server
npm run dev

The backend API will be running at http://localhost:5000.

2. Frontend Setup
# 1. Navigate to the frontend directory from the root
cd ../frontend

# 2. Install dependencies
npm install

# 3. Create a .env.local file in the /frontend directory
# Point it to your local backend server
NEXT_PUBLIC_API_URL="http://localhost:5000/api"

# 4. Start the development server
npm run dev

The frontend application will be running at http://localhost:3000.

🗂️ Database Schema (MongoDB)
The database is structured into four main collections:

profiles: Stores a single document containing the main profile information.

name: String

email: String

education: String

links: Object (github, linkedin, portfolio)

projects: A collection of project documents.

title: String

description: String

skills: Array of Strings

link: String

skills: A collection of skill documents.

name: String (unique)

level: String (e.g., "Intermediate")

experiences: A collection of work/internship/project experience documents.

title: String

organization: String

type: String (e.g., "Internship", "Academic Project")

duration: String

description: Array of Strings

link: String (optional)

All collections include createdAt and updatedAt timestamps.

🔗 API Endpoints & Sample curl Commands
Here are some of the main endpoints exposed by the API.

Health Check

curl http://localhost:5000/api/health

Get Profile

curl http://localhost:5000/api/profile

Get All Projects

curl http://localhost:5000/api/projects

Filter Projects by Skill

curl http://localhost:5000/api/projects?skill=React

General Search

curl http://localhost:5000/api/search?q=clone

📄 My Resume
You can view my full resume here:
[Link to Your Resume - PDF, Google Doc, etc.]

🚧 Known Limitations
No Authentication: The CRUD endpoints are not protected. This is a "nice-to-have" feature that could be added in the future.

No Pagination: API endpoints that return lists (e.g., /projects) do not currently support pagination.

Basic Search: The search functionality uses a simple regex match and does not have advanced ranking or filtering.