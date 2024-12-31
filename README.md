# LinkMe

Making plans can be tough. Or at least I've heard.

LinkMe is a Full-stack Web Application designed to help you and your friends effortlessly find and schedule activities together.
With seamless integration into your Google Calendar and access to events through TicketMaster, planning quality time with friends has never been easier.

## 🎥 Video Walkthrough

Curious to see LinkMe in action? Check out the full walkthrough here: Watch the Video from 2024/12/31.

https://www.youtube.com/watch?v=JdPL27TJK6c


🚀 Features

- Group Planning: Create groups, compile everyone’s schedules, and plan events effortlessly.

- Google Calendar Integration: Automatically sync calendars to find shared free time among group members.

- Event Discovery: Search for local events using the TicketMaster API and book activities directly.

- User-Friendly Interface: Intuitive and visually appealing design using Material-UI.

- Secure Authentication: Leverages Google OAuth 2 for seamless and secure login.


## 💻 Technology

Frontend:

React: For building an interactive and dynamic user interface.

Material-UI: For a polished, modern design.


React Router: For smooth navigation between pages.

Axios: For efficient API communication.

Backend:

Node.js: For a robust and scalable server-side environment.

Express: To handle API requests and server logic.

Database:

Lots, and lots of SQL Queries

PostgreSQL: For reliable and powerful data management.

Sequelize ORM: For simplified database interaction.

External APIs:

Google Calendar API: For calendar synchronization.

Google OAuth 2: For secure user authentication.

TicketMaster API: For discovering and hosting local events

- **Frontend:** React, Material-UI, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Sequelize ORM
- **Other stuff:** Google Calendar API, Google OAuth 2, TicketMaster API


## Database Diagram

![alt text](image.png)

## W.I.P
1. Recongifuring fetchEvents to fetch on interval queries once clicking on a card
2. find overlapping events, user associated, and map that onto the card
3. add the add to calendar featuree

🌟 Where do we go from here?

Proprietary API.