Full Stack Exercise
===

We would like you to build a hotel room reservation app (client and server).

Time Investment
---

There is no hard time limit but we'd like for you to spend around 8 hours on the project.

Functionality
---

## Business Logic

Your application will display a list of room reservations for a hotel, allowing users to reserve one or more rooms.

- Users will identify themselves by a "name" which will serve as an ID
- Once a room is reserved by a user, (with the reservation based on the "Name"), another user should not be able to reserve the room
- Users should be able to cancel their existing reservations and have the rooms become available for others

### Views

- Login
  - Provide users a way to specify a "name" that will identify them (serving as an ID on the backend)
  - You are free to rely on a client side session for storing the name
- Reserve a room
  - Dropdown for room selection
    -  Display only currently available rooms
  - Button to submit the reservation.
- Reservations for current user
  - List of currently reserved rooms
  - Each reservation should have a button/action that allows it to be cancelled
- Top level navigation
  - There should be a top level navigation element that houses links for each view
    -  The link to the view that displays reservations for the current user should include a count of the user's reservations
       - E.g. "View reservations (2)" for a user with two reservations "View Reservations (0)" for no reservations
  - There should be a link to "logout"

Please optimize your code layout for component reuse and testability.

## Running

Your project should support the following commands:

- Dependencies and initial setup handled by `sh install.sh`
- Server and client started by running `sh start.sh`
- Tests run by `sh test.sh`

The client should be accessible at http://localhost:3000

Architecture
---

### Server

- Language: Use Node.js or a JVM based language
- Framework: Any major web framework (e.g. express/hapi for Node, Spring Boot/Dropwizard for Java)
- Persistence: use _in-memory_ DB or your own data structures.

### Client

- Framework: Please use React, Vue, Angular, or a similar client side framework. A React based boilerplate is included but you can use whatever framework you'd like.
- Styling: Please use a component library that you are familiar with (semantic, boostrap, material, or others). You do not need to use extensive styling but something more than default styles is preferred.

### Boilerplate

This project comes with a basic boilerplate for a full-stack application built on in React and Express. You are free to use as much or as little of the boilerplate as possible.

#### Structure

- `src`: client side application
  - [`create-react-app`](https://facebook.github.io/create-react-app/) for client build and testing
  - Styling via [`material-ui`](https://material-ui.com/)
  - Routing via [`react-router`](https://github.com/ReactTraining/react-router)
  - [jest](https://jestjs.io/) for testing
- `server`: server side application
  - `express` for API
  - [jest](https://jestjs.io/) for testing
  - [supertest](https://github.com/visionmedia/supertest) for http assertions

#### Usage

```
# install dependencies
npm install

# start the client/server and serve the project
npm start

# run the client/server tests
npm test

# view all commands
npm run
```

Again, You are free to use as much or as little of the boilerplate as possible. It is entirely acceptable to use different tools for client and server, as long as the server uses a node or JVM based solution.

Questions
---

0. Does the application need to handle authentication or user identification?
  - Users should be identified by their name which can be held on the client, there is no need to handle server side authorization or authentication beyond preserving the business requirement that users cannot book reserved rooms and can cancel their own (but not others) reservations
1. What browsers should my application support?
  - The most recent versions of all major browsers are a good target. You do not need to worry too much about handling implementation differences
