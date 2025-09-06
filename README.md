Task Management Dashboard
Overview:
This Project is a Full-Stack Task Management Dashboard built with React for the frontend and Node.js with Express and MongoDB for the backend. It offers task tracking, mentor management, and a calendar-based daily task view, designed to help individuals and teams manage their workflow efficiently.

Features
User-friendly dashboard showing running tasks, progress, upcoming tasks, and mentor highlights.

Today’s Task section dynamically updates based on the selected date from the interactive calendar.

Mentor Management: View monthly mentors, follow/unfollow functionality with real-time UI updates.

Task Carousels: Easily browse through upcoming tasks and mentors with carousel navigation.

Secure backend powered by MongoDB Atlas with flexible task and mentor APIs.

Responsive UI built with Material UI icons and CSS styling.

Supports adding and displaying detailed task information including images, progress, deadlines, and involved team members.

Technologies Used
Frontend: React.js, Material UI icons, React Router

Backend: Node.js, Express.js, MongoDB with Mongoose

Hosting & Deployment: Render (backend), Vercel (frontend)

Environment Variables: Secure API URL handling with .env files

Getting Started
Prerequisites
Node.js and npm installed locally

MongoDB Atlas account with a cluster setup

Vercel and Render accounts for deployment (optional)

Installation
Clone the repository:

bash
git clone https://github.com/sivakirlampalli/arqonz-task-dashboard.git
Backend setup:

bash
cd arqonz-task-dashboard/server
npm install
Frontend setup:

bash
cd ../client
npm install
Configuration
Create a .env file in the backend directory (server) and set:

text
MONGO_URI=your_mongodb_connection_string
PORT=5000
Create a .env file in the frontend directory (client) and set:

text
REACT_APP_API_URL=https://your-backend-domain.com
Replace connection strings and URLs with your actual deployment URLs or localhost addresses for development.

Running Locally
Start backend server:

text
cd server
npm run dev
Backend will run on http://localhost:5000 or your configured port.

Start frontend development server:

text
cd client
npm start
Frontend will open in browser at http://localhost:3000.

Seed Sample Data
A seed script (seed.js) is provided to populate the MongoDB database with sample tasks and mentors. Run it by:

bash
node seed.js
This ensures the dashboard has meaningful data to display, including tasks matching calendar dates.

Deployment
Backend: Deploy on Render with environment variables for MongoDB URI.

Frontend: Deploy on Vercel with environment variable for backend API URL.

After pushing updates to GitHub, both platforms auto-deploy the latest code.

Code Structure
client/: React frontend source code (src/, public assets, components, pages)

server/: Backend Express API, models, routes, and seed scripts

.env: Environment variables for secure config separate for frontend and backend

Usage Guide
Navigate tasks using the side menu and interact with the dashboard widgets.

Select dates on the calendar to view tasks scheduled for that day.

Use mentor carousel arrows to browse and follow/unfollow mentors dynamically.

View detailed task information by clicking "Go To Detail" on tasks.

Contributing
Fork the repository.

Create feature branches.

Submit pull requests for review.

Issues and feature requests are welcome.

License
This project is licensed under the MIT License.

Acknowledgements
React and Express communities for their open-source tools.

Material UI for icons.

Inspiration from modern admin dashboard patterns.

