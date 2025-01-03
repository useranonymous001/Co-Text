# **CoText**

CoText is a collaborative text editor designed for seamless real-time text editing. Users can create or join rooms, collaborate with others, and have their content saved securely in the database. It is lightweight, user-friendly, and built for collaboration.

---

## **Available Features**

### **1. Test Users**
- No login required to explore basic functionalities.
- Join or create a room for real-time text editing.
- Collaborate with others and view text changes instantly.

### **2. Logged-In Users**
- Save content in the database.
- Access your saved content anytime.
- Enhanced security and personalized experience.

---

## **Tech Stack Used**
- **Backend:** Node.js, Express.js
- **Frontend:** HTML, EJS
- **Database:** MongoDB
- **Real-Time Communication:** Socket.IO

---

## **NPM Packages Used**
- `socket.io`  
- `express`  
- `mongoose`  
- `dotenv`  
- `ejs`  
- `body-parser`  
- `cors`  
- `path`
- `bcrypt`
- `socket.io-client`

---

## **How to Install and Use on Your Local Machine**

### **Prerequisites**
1. Node.js installed on your machine.
2. MongoDB set up and running locally or on the cloud.

### **Steps**
1. Clone the repository:  
   ```bash
   git clone https://github.com/useranonymous001/Co-Text.git
2. Navigate to the project directory:
    ```bash
    cd CoText
3. Install Dependencies
    ```bash
    npm install <all packages stated above>
4. Set up Environment Variables:
- Create a .env file in the root directory.
- Add the following:
    ```bash
    PORT=9090
    MONGO_URI= <your_mongodb_connection_string>
    PORT=1010
    CORS_ORIGIN= <http://example.com>
    SALT_ROUNT= <int>
    JWT_SECRET_KEY= <some-secret-key>\
5. Start the server
    ```bash
    npm start
6. Open your browser and navigate to:
    ```bash
    http://localhost:9090/

## **Features in Development**
- `Rich Text Editor`
- `File Upload and Editing`
- `Dark / Light Mode`
- `Multi Server/Adapter`
- `Admin UI`
- `Plans And Subscription`

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or fix:
    ```bash
    git checkout -b feature-name
3. Commit your changes and push to your forked repository:
    ```bash
    git commit -m "Add your message here"
    git push origin feature-name
4. Open a pull request in the original repository.

Feel free to open an issue for discussions or to report bugs.

## **License**
This project is licensed under the [MIT License](https://opensource.org/license/simpl-2-0-html)




