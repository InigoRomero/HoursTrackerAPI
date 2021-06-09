# HoursTrackerAPI
<b>Api made to be able to record the hours of your workers and keep track of the hours / money invested in a project and task</b>
<br>
## Usage
```shell
docker-compose up -d
cd app
npm install
node index.js
```
The server should be launched on localhost:3000

## BD Diagram
![alt text](https://github.com/InigoRomero/HoursTrackerAPI/blob/main/utils/Untitled%20Diagram.png)
## technologies
- Node JS
- Express
- Sequelize
## DOC
### POSTMAN 
[Here](https://github.com/InigoRomero/HoursTrackerAPI/blob/main/utils/HoursTracking.postman_collection.json) you can export the calls of the api on Postman
### Calls
Some example of the applications calls

#### /api/users/:id   Get data of specific User
```json
{
    "id": 3,
    "email": "example@example.com",
    "name": "Elena",
    "createdAt": "2021-06-07T15:05:52.000Z",
    "updatedAt": "2021-06-07T15:05:52.000Z",
    "Position": {
        "id": 7,
        "title": "Division Lead",
        "eurosPerHour": 45
    },
    "hours": [
        {
            "id": 5,
            "startDate": "2021-06-08T06:21:13.000Z",
            "endDate": "2021-06-08T15:21:13.000Z",
            "taskId": 3,
            "task": {
                "id": 3,
                "name": "Create DB Diagram",
                "description": "Create DB Diagram",
                "status": 1,
                "projectId": 2
            }
        }
    ],
    "taskCreator": [
        {
            "id": 2,
            "name": "Create DB Diagram",
            "description": "Create DB Diagram",
            "status": 1,
            "projectId": 1,
            "userId": 3
        },
        {
            "id": 3,
            "name": "Create DB Diagram",
            "description": "Create DB Diagram",
            "status": 1,
            "projectId": 2,
            "userId": 3
        }
    ],
    "participantTask": [
        {
            "id": 2,
            "name": "Create DB Diagram",
            "description": "Create DB Diagram",
            "status": 1,
            "projectId": 1,
            "userId": 3
        }
    ],
    "participantProject": [
        {
            "id": 1,
            "name": "new Amazon",
            "description": "amazon wants a new page",
            "budget": 1000000,
            "client": {
                "id": 1,
                "name": "Amazon"
            }
        }
    ]
}
```
#### /api/porject/:id  Get data of specific project
```json 
{
    "id": 1,
    "name": "new Amazon",
    "description": "amazon wants a new page",
    "budget": 1000000,
    "createdAt": "2021-06-08T08:13:12.000Z",
    "updatedAt": "2021-06-08T08:13:12.000Z",
    "client": {
        "id": 1,
        "name": "Amazon"
    },
    "participantsProject": [
        {
            "id": 2,
            "email": "igoromero@gmail.com",
            "name": "Iñigo",
            "hours": [
                {
                    "id": 3,
                    "startDate": "2021-06-08T06:21:13.000Z",
                    "endDate": "2021-06-08T15:21:13.000Z",
                    "taskId": 3
                },
                {
                    "id": 2,
                    "startDate": "2021-06-08T06:21:13.000Z",
                    "endDate": "2021-06-08T15:21:13.000Z",
                    "taskId": 2
                }
            ]
        },
        {
            "id": 3,
            "email": "example@example.com",
            "name": "Elena",
            "hours": [
                {
                    "id": 5,
                    "startDate": "2021-06-08T06:21:13.000Z",
                    "endDate": "2021-06-08T15:21:13.000Z",
                    "taskId": 3
                }
            ]
        }
    ],
    "tasks": [
        {
            "id": 2,
            "name": "Create DB Diagram",
            "description": "Create DB Diagram",
            "status": 1,
            "projectId": 1,
            "userId": 3
        }
    ]
}
```
#### /api/task/:id  Get data of specific task
```json
{
    "id": 2,
    "name": "Create DB Diagram",
    "description": "Create DB Diagram",
    "status": 1,
    "createdAt": "2021-06-08T08:21:13.000Z",
    "updatedAt": "2021-06-08T08:21:13.000Z",
    "deletedAT": null,
    "projectId": 1,
    "userId": 3,
    "project": {
        "id": 1,
        "name": "new Amazon",
        "description": "amazon wants a new page",
        "budget": 1000000,
        "client": {
            "id": 1,
            "name": "Amazon"
        }
    },
    "participantsTask": [
        {
            "id": 2,
            "email": "igoromero@gmail.com",
            "name": "Iñigo",
            "hours": [
                {
                    "id": 3,
                    "startDate": "2021-06-08T06:21:13.000Z",
                    "endDate": "2021-06-08T15:21:13.000Z",
                    "taskId": 3
                },
                {
                    "id": 2,
                    "startDate": "2021-06-08T06:21:13.000Z",
                    "endDate": "2021-06-08T15:21:13.000Z",
                    "taskId": 2
                }
            ]
        },
        {
            "id": 3,
            "email": "example@example.com",
            "name": "Elena",
            "hours": [
                {
                    "id": 5,
                    "startDate": "2021-06-08T06:21:13.000Z",
                    "endDate": "2021-06-08T15:21:13.000Z",
                    "taskId": 3
                }
            ]
        }
    ]
}
```
## TEST API WITH JEST
 ```shel
    cd app
    npm run test
 ```
 ### JEST TEST COVERAGE
 ```shell
--------------------------|---------|----------|---------|---------|------------------------------------------------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------|---------|----------|---------|---------|------------------------------------------------------------
All files                 |   56.43 |     4.88 |   23.45 |   56.33 | 
 app                      |     100 |      100 |     100 |     100 | 
  index.js                |     100 |      100 |     100 |     100 | 
 app/controllers          |   29.15 |     3.31 |    8.33 |   29.15 | 
  clients.controller.js   |    22.5 |        0 |       0 |    22.5 | 8-26,35-43,52-59,67-83,91-107,115-123
  hours.controller.js     |    32.5 |     5.26 |   11.11 |    32.5 | 8-30,47,56-63,71-87,95-111,119-127
  positions.controller.js |    22.5 |        0 |       0 |    22.5 | 8-27,36-44,53-60,68-84,92-108,116-124
  projects.controller.js  |   26.23 |     3.33 |    7.41 |   26.23 | 8-29,46,55-64,72-88,96-112,120-128,138-155,163-179,187-195
  tasks.controller.js     |   29.17 |        4 |    9.52 |   29.17 | 8-30,47,56-64,72-88,96-112,120-128,138-155
  users.controller.js     |   42.86 |     5.88 |   22.22 |   42.86 | 9-29,49,67,75-91,99-115,123-131
 app/db                   |     100 |      100 |     100 |     100 | 
  db.config.js            |     100 |      100 |     100 |     100 | 
  projects.scope.js       |     100 |      100 |     100 |     100 | 
  tasks.scope.js          |     100 |      100 |     100 |     100 | 
  users.scope.js          |     100 |      100 |     100 |     100 | 
 app/models               |     100 |      100 |     100 |     100 | 
  clients.model.js        |     100 |      100 |     100 |     100 | 
  hours.model.js          |     100 |      100 |     100 |     100 | 
  index.js                |     100 |      100 |     100 |     100 | 
  positions.model.js      |     100 |      100 |     100 |     100 | 
  projects.model.js       |     100 |      100 |     100 |     100 | 
  tasks.model.js          |     100 |      100 |     100 |     100 | 
  users.model.js          |     100 |      100 |     100 |     100 | 
  usersOnProject.model.js |     100 |      100 |     100 |     100 | 
  usersOnTasks.model.js   |     100 |      100 |     100 |     100 | 
 app/routes               |     100 |      100 |     100 |     100 | 
  clients.routes.js       |     100 |      100 |     100 |     100 | 
  hours.routes.js         |     100 |      100 |     100 |     100 | 
  positions.routes.js     |     100 |      100 |     100 |     100 | 
  projects.routes.js      |     100 |      100 |     100 |     100 | 
  tasks.routes.js         |     100 |      100 |     100 |     100 | 
  users.routes.js         |     100 |      100 |     100 |     100 | 
 app/tests                |   91.67 |      100 |   85.71 |   90.91 | 
  calls.js                |   91.67 |      100 |   85.71 |   90.91 | 14
--------------------------|---------|----------|---------|---------|------------------------------------------------------------
 ```
## To Do
 - create data without ID posibility, searching in back
 - accept bulk uploads
 - add JWT auth
