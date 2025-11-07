# Project & Task Management System with AI Integration

A full-featured project and task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with Google's Gemini AI for intelligent assistance.

## Features

### Project Management
- Create, read, update, and delete projects
- View project details and creation dates
- Organize tasks within projects

### Task Management
- Create, read, update, and delete tasks
- Drag and drop tasks between Kanban board columns (To Do, In Progress, Done)
- Task status tracking
- Task creation dates

### AI Integration
- AI-powered project summarization
- Intelligent Q&A assistant for projects and tasks
- Actionable recommendations for project improvement

### User Interface
- Modern, responsive design
- Intuitive Kanban board interface
- Beautiful modals and forms
- Real-time drag and drop functionality

## Tech Stack

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI**: Google Gemini API
- **Drag & Drop**: @dnd-kit library
- **State Management**: React Context API
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd project-management-system
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

## Usage

1. Start the backend server:
   ```bash
   node server.js
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get a specific project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Tasks
- `GET /api/tasks/project/:projectId` - Get all tasks for a project
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/move` - Move a task to a different status

### AI
- `GET /api/ai/summarize/:projectId` - Get AI summary for a project
- `POST /api/ai/question/:taskId` - Ask AI a question about a task or project

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for the intelligent features
- @dnd-kit for the drag and drop functionality
- MongoDB for the database solution