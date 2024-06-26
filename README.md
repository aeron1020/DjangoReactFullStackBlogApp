# Final Project: Single-Page Web Application

## Distinctiveness and Complexity

This project stands out due to its integration of React and Django REST Framework, providing a seamless user experience. The use of JWT tokens for authentication enhances security. The inclusion of a comment and liking system promotes user interaction and feedback. Full CRUD functionality for posts and projects, along with the ability to add multimedia content, showcases the application's complexity. The like system limits users to one like per session, ensuring proper session management. Additionally, the admin dashboard for content management highlights the project's real-world applicability and comprehensive feature set.

## Overview

This single-page web app, which includes features from previous projects, is built with React and Django REST Framework. It features JWT token authentication for secure login. Users can create, update, and delete posts and projects, add videos or links, and like posts once per session. The app includes a unique comment system with cryptic names derived from session cookies. Unauthenticated users can also like and comment for better reader interactions. An admin dashboard allows for easy management of posts, showcasing a blend of modern web development and complex functionalities.

## Features

### Single-Page Web Application

- Built with React and Django REST Framework (DRF).
- Communicates via RESTful API calls for a seamless user experience.

### JWT Token Authentication & Session Cookies

- Session cookies for all users.
- JWT token authentication for authenticated users.

### CRUD for Posts

- Users can create, update, and delete posts.
- Authors can add video frames or links to posts.
- Admin dashboard for post management.

### Like Function

- Users can like a post once per session.
- Like count increases/decreases accordingly.

### Comments

- Users can leave comments and reply to comments.
- Unauthenticated users can interact with likes and comments.
- Cryptic names in comments derived from session cookie keys.

### Projects

- Similar CRUD system for posts.

## Usage

1. Navigate to the application in your web browser.
2. Register or log in to access all features, especially writing blogs.
3. Explore posts, like, comment, and manage your content.

## File Descriptions

### Frontend

- **`frontend/`**: Contains all React frontend code.

  - **`src/`**: Main source directory.

    - **`Admin.js`**: Component for the admin dashboard.
    - **`App.css`**: Global CSS styles for the application.
    - **`App.js`**: Main application component that sets up routing.
    - **`App.test.js`**: Tests for the main application component.
    - **`AuthCheck.js`**: Component for checking user authentication.
    - **`Axios.js`**: Axios instance for making API calls.
    - **`LoginForm.js`**: Component for the login form.
    - **`MacBook.png`**: Image file used in the application.
    - **`index.css`**: Global CSS styles for the index file.
    - **`index.js`**: Entry point for the React application.
    - **`logo.svg`**: Logo image used in the application.
    - **`olsenxangela-rbg.png`**: Image file used in the application.
    - **`olsenxangela.png`**: Image file used in the application.
    - **`reportWebVitals.js`**: Tool for measuring performance of the application.
    - **`setupTests.js`**: Configuration for setting up tests.
    - **`theme.js`**: Configuration for theme settings (e.g., light/dark mode).

    - **`components/`**: Contains reusable React components.
      - **`BackButton.js`**: Component for navigating back to the previous page.
      - **`Blogs.js`**: Component for displaying a list of blog posts.
      - **`CommentSection.js`**: Component for displaying and handling comments on a post.
      - **`CustomSnackBar.js`**: Custom snackbar component for displaying notifications.
      - **`Footer.js`**: Component for the site footer.
      - **`GithubCard.js`**: Component for displaying GitHub profile information.
      - **`Header.js`**: Component for the site header and navigation.
      - **`Home.js`**: Home page component.
      - **`HomeAvatar.js`**: Component for displaying the home page avatar.
      - **`LikePostButton.js`**: Button component for liking a post.
      - **`Logo.js`**: Component for the site logo.
      - **`Notes.js`**: Component for displaying notes or annotations.
      - **`PopularPost.js`**: Component for displaying popular posts.
      - **`PostLoading.js`**: Component for displaying a loading indicator for posts.
      - **`PostsList.js`**: Component for displaying a list of posts.
      - **`SearchBar.js`**: Component for searching posts.
      - **`SinglePost.js`**: Component for displaying a single post.
      - **`SwitchTheme.js`**: Component for toggling between light and dark themes.
      - **`Technologies.js`**: Component for displaying technologies used.
      - **`User.js`**: Component for displaying user information.
      - **`admin/`**: Components related to admin functionality.
        - **`AdminDashboard.js`**: Component for the admin dashboard.
      - **`auth/`**: Components related to authentication.
        - **`Login.js`**: Component for the login page.
        - **`Register.js`**: Component for the registration page.
      - **`projects/`**: Components related to projects.
        - **`ProjectList.js`**: Component for displaying a list of projects.
        - **`ProjectItem.js`**: Component for displaying a single project.

### Backend

- **`personal_portfolio/`**: Contains all Django backend code.

  - **`api/`**:

    - **`__init__.py`**: Initializes the `api` module.
    - **`__pycache__/`**: Directory containing compiled Python files.
    - **`admin.py`**: Configures the Django admin interface for managing API-related models.
    - **`apps.py`**: Configuration file for the API app, specifying its properties.
    - **`migrations/`**: Directory containing database migration files, which track changes to the models.
    - **`models.py`**: Defines the database models used in the API, such as posts, comments, and likes.
    - **`serializers.py`**: Defines serializers that convert between Django models and JSON format for API responses.
    - **`session_middleware.py`**: Custom middleware for handling session-related operations.
    - **`tests.py`**: Contains unit tests for the API, ensuring its functionality.
    - **`urls.py`**: URL routing for the API, mapping URL patterns to views.
    - **`views.py`**: Contains API views that handle HTTP requests and provide responses, implementing the core logic.

  - **`media/`**: Directory for user-uploaded media files.
  - **`db.sqlite3`**: SQLite database file containing all the data.
  - **`personal_portfolio/`**: Django project directory.

  - **`users/`**: Django app directory for user management.

    - **`__init__.py`**: Initializes the `users` module.
    - **`__pycache__/`**: Directory containing compiled Python files.
    - **`admin.py`**: Configures the Django admin interface for managing user-related models.
    - **`apps.py`**: Configuration file for the users app, specifying its properties.
    - **`migrations/`**: Directory containing database migration files, which track changes to the models related to users.
    - **`models.py`**: Defines the database models used in the users app, such as `User`, `Profile`, etc.
    - **`serializers.py`**: Defines serializers that convert between Django models and JSON format for API responses related to users.
    - **`tests.py`**: Contains unit tests for the users app, ensuring its functionality related to user management.
    - **`urls.py`**: URL routing for the users app, mapping URL patterns to views specific to users.
    - **`views.py`**: Contains views that handle HTTP requests and provide responses related to users, implementing the core logic for user management operations.

  - **`manage.py`**: Command-line utility for interacting with the Django project.

### How to Run Your Application

1. **Clone the Repository**:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Set Up the Backend**:
   - Navigate to the backend directory:
     ```bash
     cd personal_portfolio
     ```
   - Create a virtual environment and activate it:
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```

`
` - Install the dependencies:
`bash
pip install -r requirements.txt
` - Apply migrations:
`bash
python manage.py migrate
` - Create a superuser for the admin dashboard:
`bash
python manage.py createsuperuser
` - Run the development server:
`bash
python manage.py runserver

````

3. **Set Up the Frontend**:

   - Open a new terminal window and navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

4. **Access the Application**:
   - Open your web browser and navigate to `http://localhost:3000` for the frontend.
   - Access the admin dashboard at `http://127.0.0.1:8000/admin` for backend management.


## Additional Information

- The application uses SQLite as the default database. You can change the database settings in `personal_portfolio/settings.py` if needed.
- Ensure that the frontend and backend servers are running simultaneously for full functionality.
- The project structure follows best practices for both Django and React applications, making it easy to understand and extend.

````
