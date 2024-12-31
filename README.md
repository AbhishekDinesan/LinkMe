# LinkMe

Making plans can be tough. Or at least I've heard 🥲

LinkMe is a Full-stack Web Application designed to help you and your friends effortlessly find and schedule activities together.

## 🎥 Video Walkthrough

<p align="center">

Curious to see LinkMe in action? Check out a walkthrough here (2024/12/31):

[![LinkMe Walkthrough](https://img.youtube.com/vi/JdPL27TJK6c/0.jpg)](https://www.youtube.com/watch?v=JdPL27TJK6c)

</p>

## 🚀 Features

- **Group Planning:** Create groups, compile everyone’s schedules, and plan events effortlessly.

- **Google Calendar Integration:** Automatically sync calendars to find shared free time among group members.

- **Event Discovery:** Search for local events using the TicketMaster API and add to Calendar

- **User-Friendly Interface:** Intuitive and visually appealing design using Material-UI.

- **Secure Authentication:** Leverages Google OAuth 2 for seamless and secure login.


## 💻 Technology

### Frontend:
- React
- Material-UI
- Axios

### Backend:
- Node.js
- Express

### Database:
- SQL
- Sequelize ORM
- PostgreSQL

### Other stuff
- Google Calendar API
- Google OAuth 2
- TicketMaster API

## Database Diagram

![alt text](image.png)


## 🌟 Next Steps
Creating a proprietary API. As is, this project doesn't create much value as it relies on the TicketMaster API and the TM team could incorporate a feature similiar to this project. But by creating an API for small business availability (such as escape rooms, axe throwing etc.) where TM doesn't have event data, value can be created. From here, it would make sense to book/pay for events in the web app. Also, the app could look prettier, but that's not a priority.
