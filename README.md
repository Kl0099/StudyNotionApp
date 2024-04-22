# StudyNotion Online Education Platform (MERN App)

![Main Page](images/mainpage.png)


## Project Description

StudyNotion is a fully functional ed-tech platform that enables users to create, consume,
and rate educational content. The platform is built using the MERN stack, which includes
ReactJS, NodeJS, MongoDB, and ExpressJS.
StudyNotion aims to provide:
* A seamless and interactive learning experience for students, making education
more accessible and engaging.
* A platform for instructors to showcase their expertise and connect with learners
across the globe.
In the following sections, we will cover the technical details of the platform, including:
1. System architecture: The high-level overview of the platform's components and
diagrams of the architecture.
2. Front-end: The description of the front-end architecture, user interface design,
features, and functionalities of the front-end, and frameworks, libraries, and tools
used.
3. Back-end: The description of the back-end architecture, features and functionalities of
the back-end, frameworks, libraries, tools used, and data models and database schema.
4. API Design: The description of the API design, list of API endpoints, their
functionalities, and sample API requests and responses.
<hr>
### Front-end 

The front end of the platform is built using ReactJS, ReactJS allows for the creation of dynamic and responsive user
interfaces, which are critical for providing an engaging learning experience to the students.
The front end communicates with the back end using RESTful API calls

### Back-end 

The back end of the platform is built using NodeJS and ExpressJS,. The back end
provides APIs for the front end to consume, which include functionalities such as user
authentication, course creation, and course consumption. The back end also handles the
logic for processing and storing the course content and user data.


### Database

The database for the platform is built using MongoDB, which is a NoSQL database that
provides a flexible and scalable data storage solution. MongoDB allows for the storage of
unstructured and semi-structured data. The database stores the course content, user data, and other
relevant information related to the platform.

## API Design

The StudyNotion platform's API is designed following the REST architectural style. The
API is implemented using Node.js and Express.js. It uses JSON for data exchange and
follows standard HTTP request methods such as GET, POST, PUT, and DELETE.
Sample list of API endpoints and their functionalities: 
1. /api/auth/signup (POST) - Create a new user (student or instructor) account.
2. /api/auth/login (POST) – Log in using existing credentials and generate a JWT
token.
3. /api/auth/verify-otp (POST) - Verify the OTP sent to the user's registered email.
4. /api/auth/forgot-password (POST) - Send an email with a password reset link to
the registered email.
5. /api/courses (GET) - Get a list of all available courses.
6. /api/courses/:id (GET) - Get details of a specific course by ID.
7. /api/courses (POST) - Create a new course.
8. /api/courses/:id (PUT) - Update an existing course by ID.
9. /api/courses/:id (DELETE) - Delete a course by ID.
10. /api/courses/:id/rate (POST) - Add a rating (out of 5) to a course.
Sample API requests and responses: 
1. GET /api/courses: Get all courses
   * Response: A list of all courses in the database
2. GET /api/courses/:id: Get a single course by ID
   * Response: The course with the specified ID
3. POST /api/courses: Create a new course
   * Request: The course details in the request body
   * Response: The newly created course
4. PUT /api/courses/:id: Update an existing course by ID
   * Request: The updated course details in the request body
   * Response: The updated course
5. DELETE /api/courses/:id: Delete a course by ID
   * Response: A success message indicating that the course has been deleted.
