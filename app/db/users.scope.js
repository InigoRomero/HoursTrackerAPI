
module.exports = function (db) {
   
    const scope = { include: [{
        model: db.positions, // *** POSITIONS ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt', 'PositionId']
        },
        as: "Position"
      },
      {
        model: db.hours, // *** HOURS ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt', 'userId', 'projectId']
        },
        include: [{
          model: db.projects,
          attributes: {
            exclude: ['deletedAT', 'updatedAt', 'createdAt', 'clientId']
          },
          include: [{
            model: db.clients,
            attributes: {
              exclude: ['deletedAT', 'updatedAt', 'createdAt']
            },
            required: true
          }]
        }],
        include: [{
          model: db.tasks,
          attributes: {
            exclude: ['deletedAT', 'updatedAt', 'createdAt', 'userId']
          }
        }]
      },
      {
        model: db.tasks, // *** TASKS CREATOR ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt']
        },
        as: "taskCreator",
      },
      {
        model: db.tasks, // *** TASKS PARTICIPANT ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt']
        },
        as: "participantTask",
      },
      {
        model: db.projects, // *** PROJECTS PARTICIPANT ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt', 'clientId']
        },
        as: "participantProject",
        include: [{
          model: db.clients,
          attributes: {
            exclude: ['deletedAT', 'updatedAt', 'createdAt']
          },
          required: true
        }]
      }
    ]
    };
    return scope;
}
