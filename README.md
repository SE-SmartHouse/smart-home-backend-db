# SmartHome Backend

This is the backend for the SmartHomeApp, built with Node.js, Express, and MongoDB. It handles home creation, device management, user registration, and device control for a smart home system.

Project Structure


![image](https://github.com/user-attachments/assets/73dfa8d1-6b05-43a6-bcff-5510971818ec)


Setup

1. Install Dependencies:
   npm install

2. Configure Environment:
   - Create a `.env` file:
     MONGO_URI=mongodb://localhost:27017/smarthome
     PORT=3000

3. Start MongoDB:
   - Run MongoDB locally (Windows example):
     "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"

4. Start Server:
   npm start
   - Expected output: `MongoDB connected` and `Server running on port 3000`.

API Endpoints

Test these endpoints using Postman or a similar tool.

Generate Home ID (For Hardware Server)
Creates a new home in the database and returns a `homeId`.
- Request:
  POST http://localhost:3000/api/generate-home
  - Body: (empty)
- Expected Response:
  {"homeId": "some-id"}

Save Devices (For Hardware Server)
Saves devices under a specified `homeId`.
- Request:
  POST http://localhost:3000/api/save-devices
  - Body:
    {
        "homeId": "some-id",
        "devices": [
            {"device_name": "Living Room Light", "device_type": "light", "status": "Off"}
        ]
    }

Register User
Registers a user and links them to a `homeId`. The first user for a home becomes the `Admin`.
- Request:
  POST http://localhost:3000/api/register
  - Body:
    {
        "name": "Alice",
        "email": "alice@example.com",
        "password": "secret123",
        "homeId": "some-id"
    }

Control Device (After Registration)
Updates the status of a device (e.g., "On", "Off", "Standby").
- Request:
  POST http://localhost:3000/api/control-device
  - Body:
    {
        "userId": "user-id-from-registration",
        "deviceId": "device-id-from-get-devices",
        "status": "On"
    }

Example: Test Device Control
Use this example to test controlling a device with Alice’s `userId` and a known `deviceId`.
- Request:
  POST http://localhost:3000/api/control-device
  - Body:
    {
        "userId": "67ec0c4a4c8f64374250de04",
        "deviceId": "67ec08e34c8f64374250ddff",
        "status": "On"
    }
  - Note: Replace `deviceId` with an actual ID from your `devices` collection under `homeId: "67ec03dc85998f49ad05f7f0"`.

Testing Tips
- MongoDB Compass: Use to view changes in the `smarthome` database (`homes`, `users`, `devices` collections).
- MongoDB Shell: Query with:
  use smarthome
  db.devices.find({ _id: ObjectId("67ec08e34c8f64374250ddff") })
- Postman: Import requests from this README for quick testing.

Notes
- Passwords are stored in plain text—add hashing (e.g., bcrypt) for production.
- Authentication (e.g., JWT) is not yet implemented.
- Ensure MongoDB is running before starting the server.
