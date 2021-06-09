# HoursTrackerAPI
<b>Api made to be able to record the hours of your workers and keep track of the hours / money invested in a project and task</b>
<br>
## Usage
```shell
docker-compose up -d
node ./app/index.js
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
## To Do
 - Make tester with Mocha
 - kick user from project or task
 - create data without ID posibility, searching in back
 - accept bulk uploads
 - add JWT auth
