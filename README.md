# DevConnector MERN Demo Project


## Environment Variables

The project uses the below listed environment variables that are not in the repo. You can add a file `.env` containing the variable values in the project root folder.

```bash
NODE_ENV=development
LOG_LEVEL=debug
MONGO_URI=mongodb+srv://user:pwd@somecluster.mongodb.net/dbname?retryWrites=true&w=majority
COOKIE_SECRET=someverylongrandomstring
```

## Tasks

- [x] Express and Mongoose setup
  - [x] Initial Server Setup
  - [x] Add .vscode launch file
  - [x] Add logging util, db connection and environment variables
  - [x] Setup basic routes
- [] User routes and authentication
  - [] Create user model
  - [] Data validation
  - [] User Registration
  - [] JWT
  - [] Auth Middleware
  - [] User auth and Login route
- [] The Profile API
