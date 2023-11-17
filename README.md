# Simple User Registration and Fetch API

## Overview

This project presents a simple API for registering and fetching users from a mongo database. The API provides endpoints for creating and retrieving users with necessary security measures.

## Endpoints

### Create User

- **Endpoint:** `POST /user`
- **Request Body:**
  ```json
  {
    "firstName": "Michael",
    "lastName": "Knight",
    "email": "info@saqaya.com",
    "marketingConsent": false
  }

- **Response Body:**
  ```json
  {
  "id": "553ae7da92f5505a92bbb8c9d47be76ab9f65bc2",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}

### Fetch User

- **Endpoint:** `GET /user/:id`
- **Request Header:**
- **Response:**
- If `marketingConsent` is `true`:
  ```json
  {
    "id": "553ae7da92f5505a92bbb8c9d47be76ab9f65bc2",
    "firstName": "Michael",
    "lastName": "Knight",
    "email": "info@saqaya.com",
    "marketingConsent": true
  }
  ```
- If `marketingConsent` is `false`, the user's email property will be omitted:
  ```json
  {
    "id": "553ae7da92f5505a92bbb8c9d47be76ab9f65bc2",
    "firstName": "Michael",
    "lastName": "Knight",
    "marketingConsent": false
  }
  ```
## API Documentation

This project includes Swagger documentation for the API endpoints. Swagger provides an interactive and visual representation of the API, allowing for easy exploration and testing of the available endpoints.

### Swagger Documentation

- Access the Swagger documentation at `http://localhost:8080/docs` after starting the server.
- Use this documentation to explore and test the API endpoints.


  
