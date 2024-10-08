# Project Name: MuZikNet

## Description

MuZikNet is a social media platform for musicians, enabling them to network, share content, access educational resources, and discover career opportunities. This project is built using PHP (with XAMPP for local development), HTML, CSS, JavaScript, and MySQL.

This guide will walk you through the process of setting up and running the ZikNet project on your local machine.

## Prerequisites
Before you start, ensure that your machine has the following software installed:

- Node.js (v14+)
- XAMPP (for Apache and MySQL)
- MongoDB (installed locally or using MongoDB Atlas)
- Git (to clone the repository)

1. **Clone the GitHub Repository**
First, you'll need to clone the project repository from GitHub. Open your terminal or command prompt and run:

```
git clone https://github.com/your-username/ZikNet.git
```

```
cd myapp
```

2. **Install Node.js Dependencies**
In the root of the project directory, install the required Node.js packages by running:

```
npm install
```

3. Set Up Environment Variables
Create a .env file in the root directory and add the following environment variables:


```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ziknet
SESSION_SECRET=your_secret_key
NODE_ENV=development
MONGODB_URI: The URI for your MongoDB instance (use mongodb://localhost:27017/ziknet if running locally).
SESSION_SECRET: A unique secret key for securing sessions (choose a strong value).
```

4. **Configure XAMPP**

**Step 1:** Start Apache and MySQL
Open XAMPP Control Panel.
Start both the Apache and MySQL services.

**Step 2:** Move PHP Files to htdocs
Move the PHP files (register.php, login.php, etc.) into XAMPP's htdocs directory, typically found at:

```C:/xampp/htdocs/ZikNet```

5. **Create MySQL Database**

**Step 1:** Open phpMyAdmin
Open a browser and go to http://localhost/phpmyadmin.
Create a new database named ziknet.

**Step 2:** Create the users Table
Run the following SQL query in the sql tab within phpMyAdmin to create the users table:

```
sql
Copy code
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    profile_photo VARCHAR(255),
    bio TEXT,
    username VARCHAR(255),
    posts_count INT DEFAULT 0,
    followers_count INT DEFAULT 0,
    following_count INT DEFAULT 0
);
```

6. **Configure MongoDB**

**Step 1:** If MongoDB is Installed Locally
Ensure that MongoDB is running on your machine. The default MongoDB URI will be:

```
mongodb://localhost:27017/ziknet
```

If you are using MongoDB Atlas or another service, update the MONGODB_URI in your .env file accordingly.

7. **Start the Node.js Server**
Start the server by running the following command in the terminal:


```
npm start
```

The server should now be running at http://localhost:3000.

8. **Accessing the Application**

**Step 1:** API and Frontend
Visit http://localhost:3000 in your browser to access the main application, where you can register, log in, and navigate through the platform.

**Step 2:** PHP Pages
To access the PHP pages (for user registration, login, etc.), visit the following:

Registration Page: http://localhost/ziknet/register.php
Login Page: http://localhost/ziknet/login.php

9. **Debugging**

**Node.js Logs:** Monitor the terminal where the Node.js server is running for any errors or logs.
**XAMPP Logs:** If you encounter issues with Apache or MySQL, check the XAMPP Control Panel logs.
**MongoDB:** Verify that your MongoDB instance is running and accessible via the URI provided in the .env file.

10. **Troubleshooting**

**Port Conflicts:** If port 3000 is in use, you can change the port in the .env file or stop any conflicting processes.
**Database Errors:** If there are issues with the database connection, ensure that MongoDB and MySQL services are running and properly configured.