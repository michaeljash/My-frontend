
# Survey Management System

- These Survey Management System is a web application designed to facilitate the creation, management, and analysis of surveys. It allows users to create surveys, collect responses, and analyze the results efficiently.

# Features
- Create Surveys: Users can create surveys with customizable titles, descriptions, and questions.
- Manage Surveys: Edit existing surveys, add or remove questions, and delete surveys.
- Collect Responses: Participants can respond to surveys online.
- View Responses: Survey creators can view and analyze responses in real-time.
- Export Data: Export survey responses for further analysis or reporting.

# Technologies Used

- Frontend: React.js, HTML, CSS
- Backend: Python (Flask), SQLAlchemy (for database ORM)
- Database: SQLite (for local development), PostgreSQL (for production)
- API: RESTful API using Flask-RESTful
- Deployment: Docker, Heroku (for deployment)
- Getting Started
- To run the Survey Management System locally, follow these steps:

# Clone the repository:

- bash
- Copy code
- git clone <repository-url>
- cd survey-management-system

# Install frontend dependencies:

bash

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install
Set up the database:

bash

# Create database tables (using Flask-Migrate)
flask db upgrade
Run the application:

bash
Copy code
# Start the Flask backend (make sure you are in the root directory)
flask run

# Start the React frontend (in a separate terminal)
cd frontend
npm start

# Access the application:
Open your web browser and go to https://github.com/michaeljash/My-frontend to access the Survey Management System for frontend 
Open your web browser and go to https://github.com/Gideonkamaumacharia/phase-4-flaskproject-backend to access the Survey Management System for backend 


# Usage
Creating a Survey: Click on "Create Survey" and fill in the required fields. Add questions using the form provided.
Managing Surveys: Edit or delete existing surveys from the main dashboard.
Analyzing Responses: View survey responses and export data as needed for further analysis.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

# License
This project is licensed under the MIT License.

# Contact
For any inquiries or support, please contact Michael Jashon and Gideon Macharia.

Adjust the placeholders (<repository-url>, [Your Name], your-email@example.com, etc.) with your actual information. This README provides an overview of the system, installation instructions, usage guidelines, and information on how to contribute and contact the project maintainers. Adjust the technologies section and steps based on your specific implementation details.