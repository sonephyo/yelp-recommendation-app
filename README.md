# Recommendation Store App

<small>Note: The program will be online asap when funding is recieved for Google Maps API.</small>

## Overview
The Recommendation Store App is a full stack application, designed with the idea of how users can explore and experience business stores (restaurants, utilites, etc). Unlike Google Maps, where it focuses on getting to destination, this app will allow users to select a store they want, and the system recommend a store that users will want to experience, based on the review. By categorizing based on different customer reviews, the app is able to provide more customer focused recommendation. We leverage the information provided generously by Yelp Company here, integraitng with Google Maps API to provide a value to the people who use the app.

## Features
- Similar Stores - Users can select the stores that are available on the map and based on the selected store, top 10 stores similar to selected store will be displayed.
- Search For Store - Users can search the stores they have in mind, and choose the store from the result panel.

## Technology Features
- Scalable Integration - The website is built considering decision decision to make the app scalabe. (Scalable described here indicates that the app is ready to integrate more features)
- Dockerized Components - Frontend, Backend, and database are integrated with docker to ensure reliability and portability.


## Tech Stack
| Technology | Purpose |
|------------|---------|
| **Next.js** | Frontend UI & Google Maps API Integration |
| **Spring Boot** | Backend API for fetching recommendations |
| **MongoDB** | Database for storing business data |
| **Docker** | Containerized deployment|
| **Google Maps API** | Displaying businesses & recommendations visually |

## Installation & Setup
### Prerequisites
Please make sure that the following technologies are installed on your machine or your server you want to host on
- **Docker** (currently - only for MongoDB container)
- **Node.js & npm** (for Next.js frontend)
- **Java & Maven** (for Spring Boot backend)

### Running the project locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/sonephyo/yelp-recommendation-app
   cd ./yelp-recommendation-app
   ```
2. **Setting up mongodb on Docker**
    ```
    docker pull monogo:4.0.4 # Feel free to use other mongo version 
    ```
    Fix the docker-compose.yml in database accoridng to your configuration
    Notes on docker-compose.yml
    - Line 5 - image: mongo:<version> 
    - Line 6 - remove --auth if you want to make it publicly available at first for ease of use (Please refer to MongoDB user setup to secure your database
    - Line 8: Feel free to change the port according to your need (Changes in port will need configuration in the backend Springboot - application.properties)
   ```
   # make sure you are in the directory of docker-compose.yml
   docker-compose up
   ```
   Your database should be all set to be used

3. **Start the Backend** (Spring Boot)
   In the resource folder (path - backend/src/main/resources), please add application properties with following information.
  ```
  spring.application.name=backend

spring.data.mongodb.database = YelpBusinessData
spring.data.mongodb.uri= <mongodb-uri> # Based on your database configuration, the uri can be different. Note - Do not share this information public.
  ```
   ```sh
   # make sure that you are in the backend folder
   ./mvnw spring-boot:run # will default to localhost:8080
   ```


1. **Start the Frontend** (Next.js)
   Inside ./frontend, create .env
   ```
   NEXT_PUBLIC_GOOGLE_MAP_API_KEY = <api-key>
   NEXT_PUBLIC_BACKEND_URL = http://localhost:8080 # Config needed if you are using different port or ip address
   ``` 
   Note: To secure Google Map API key, please refer to the following documentation  - [Use API Keys](https://developers.google.com/maps/documentation/embed/get-api-key)
   ```sh
   # make sure that you are in the frontend folder
   npm install  # or yarn install
   npm run dev  # or yarn dev
   ```
2. **Access the Application**
   Open `http://localhost:3000` in your browser.

Congrats🎉!! You can now start accessing the web page.

## Usage
1. Search for a store using the Google Maps interface.
2. Click on a store to view details and similar recommended stores.
3. Navigate through different store suggestions based on customer reviews.

## Future Improvements
- Implementing user authentication for limitation on usage
- Enhancing recommendation logic for further accuracy
- Adding filtering and categorizing based on the business

## License
This project is licensed under the **MIT License**

## Reference

- [Google Map Platform](https://developers.google.com/maps)
- [Creating Clusters on Google Maps](https://www.youtube.com/watch?v=ZvoMak9yApU)
- [NextJS Documentation](https://nextjs.org/docs)
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
- [Docker](https://www.docker.com/)

---
<i>Developers' Note 💡</i>
This is an open source project where you are able to contribute as you would like to give suggestions. Feel free to open issues or pull request if there is anything you want to point out or say. We are learning, growing, making mistakes and recovering from it. 🧑🏻‍💻

