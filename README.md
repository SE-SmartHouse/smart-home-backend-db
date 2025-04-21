# SmartHome Backend Controllers
![image](https://github.com/user-attachments/assets/f678931b-50b2-4fd9-87eb-932dced41665)


This is how the backend for the SmartHomeApp, built with Node.js, Express, and MongoDB will look like.
To test controllers you need to import /db folder in your project. Otherwise you can use the routers i created below for testing.

Project Structure


![image](https://github.com/user-attachments/assets/e2c0a6e7-cfbc-46e5-a5e0-306a152a5a92)



Setup

1. Install Dependencies:
   npm install

2. Configure Environment:
   - Create a `.env` file:
     
     MONGO_URI=mongodb+srv://<<db_username>>:<db_password>@smarthomecluster.yjqefe7.mongodb.net/?retryWrites=true&w=majority&appName=SmartHomeCluster
     
     PORT=4000

     DB_NAME=SmartHomeCluster

4. Input DB credentials:
   npm start
   - Replace username_db, and password_db with provided credentials.

5. Start Server:
   npm start
   - Expected output: `MongoDB connected` and `Server running on port 4000`.

API Endpoints

Test these endpoints using Postman or a similar tool.
*******************************************
![image](https://github.com/user-attachments/assets/e8d2b8e8-7249-4ff3-9cb0-c7f15944a192)
![image](https://github.com/user-attachments/assets/ea28b26d-63c2-4758-a311-abfd69c01292)
![image](https://github.com/user-attachments/assets/17d33b58-9fe3-4164-8d43-90f3075edf30)
![image](https://github.com/user-attachments/assets/f6574074-db87-4346-b129-d413d1a54f80)
![image](https://github.com/user-attachments/assets/d1a8dd17-f764-462e-872f-623a3605b484)


Testing Tips
- MongoDB Compass: Use to view changes in the `smarthomecluster` database (`homes`, `users`, `devices` collections).

Notes
- Authentication (e.g., JWT) is implemented at server side.

