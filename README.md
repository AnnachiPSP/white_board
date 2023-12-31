# Whiteboard Interaction

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Common Issues](#common-issues)
6. [Future Improvements](#future-improvements)
7. [Contributing](#contributing)
8. [Screenshots](#screenshots)

## 1. Introduction

**Whiteboard Interaction** is a collaborative drawing application that allows users to create and join drawing rooms. It features a host-user system, where a host can create a room and non-hosts can join. The application uses React for the frontend, Node.js and Express for the backend, Keycloak for authentication using Docker containers, and Rough.js for drawing.

## 2. Features

### Key Features

- **Host and Non-Host Users**: Hosts can create rooms and have full control, while non-hosts can join and participate in the drawing session.

- **Real-time Drawing**: Users can draw on a shared canvas in real-time, making it ideal for collaborative brainstorming and sketching.

- **Real-time ChatRoom**: Users cn chat among theselves by clicking on the button" ChatRoom".

- **Authentication**: The application uses Keycloak for user authentication, ensuring secure access to rooms.

## 3. Tech Stack

- Frontend:
  - React

- Backend:
  - Node.js
  - Express

- Authentication:
  - Keycloak

- Drawing:
  - Rough.js

- Containers:
  - Docker

## 4. Getting Started

To run the Whiteboard Interaction project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/AnnachiPSP/white_board.git
   ```
2. Navigate to the project directory:

    ```
    cd white_board
    ```
3. Install dependencies for both the frontend and backend:

    ```
    # Install frontend dependencies
    cd frontend
    npm install

    # Install backend dependencies
    cd ../backend
    npm install
    ```

4. Set up Keycloak for authentication using Docker containers:

    Follow the youtube [link](https://www.youtube.com/watch?v=5z6gy4WGnUs) to get guided about how to initialize and setup keycloak for this project!
    
    - Please, don't forget to add .env files according to your keycloak configurations!
  
5. After running the docker server for Keycloak, start the front-end and back-end servers.

    ```
    cd /backend
    node server.mjs

    cd ../../frontend/white-board
    npm run init
    ```

6. Finally access the application through the link: http://localhost:5173

## 5. Common Issues

- **Data loss on Refresh**: One of the main issues is data loss when refreshing the page. To resolve this, consider implementing a database backend to store room states and chat history.

- **Responsiveness**: Improve the application's responsiveness to make it accessible and user-friendly on various devices and screen sizes.

- **Save Canvas**:  Debug the "Save Canvas" functionality for non-host users to ensure it works as expected.

- **Database Backend**: Plan and implement a database backend to achieve data persistence and better room management.

- **Non-Host Drawing**: Allow non-host users to draw and access drawing functionalities. Currently, they have limited capabilities.

- **Zoom In-Out**: Implement zoom functionality to enhance the drawing experience.

- **Copy Button**: Resolve issues related to the copy button and address performance concerns related to callbacks and rerendering.

There are few more debugging and improvements left like, Undo-Redo, ChatRoom button that doesn't work as expected!

## 6. Future Improvements  

Here are some future improvements that can be made to enhance the Whiteboard Interaction project apart from debuggingand errors!

- **Recording**: Add the ability to record video and audio of the drawing session for later review and collaboration.

- **Erasing**: Implement an eraser feature to allow users to correct mistakes or remove unwanted content easily.

- **User Roles**: Define different roles for users, such as authorized presenters, hosts and users to manage the drawing session more effectively.

- **Sketch Recognizing Tool**: A button which on clicked should be able to guess the object present on the whiteboard based on a pretrained ML model.

## 7. Contributing

Contributions to the Whiteboard Interaction project are welcome! Feel free to analyze the code, submit bug reports, and propose new features or improvements. Follow the guidelines provided in the project's documentation for contributing.

## 8. Screenshots

Here are some screenshots on how the UI looks explaining how the white-board app works!!

- Authentication page

![split screen view of registering as host and common user](./screenshots/sc-1.png)

- User Session displayed in keycloak console

![Key Cloak Console](./screenshots/sc-1a.png)

- The page that arrives once you authenticates

![User page](./screenshots/sc-2.png)

- The page that appears once "Create Room" is clicked!

![Create Room Page](./screenshots/sc-3.png)

- The page that appears once "Join Room" is clicked!

![Join Room Page](./screenshots/sc-4.png)

- Split screen view of a host and a non-host in the same room!

![white board split screen](./screenshots/sc-5.png)

- Full-screen mode of a non-host user including the Chat Room preview!

![non-host user screen](./screenshots/sc-6.png)

- Full-screen mode of a host user including the Chat Room preview!

![host user screen](./screenshots/sc-7.png)