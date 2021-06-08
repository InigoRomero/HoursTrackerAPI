
module.exports = function (db) {
   
    const scope = { 
      include: [{
        model: db.clients, // *** CLIENT ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt']
        }
      },
      {
        model: db.users, // *** PROJECTS PARTICIPANT ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt', 'PositionId', 'positionId']
        },
        as: "participantsProject",
        through: {attributes: []},
        include: [{
          model: db.positions,
          attributes: {
            exclude: ['deletedAT', 'updatedAt', 'createdAt']
          },
          required: true,
          as: "Position"
        }],
        include: [{
          model: db.hours, // *** HOURS ***
          attributes: {
            exclude: ['deletedAT', 'updatedAt', 'createdAt', 'userId', 'projectId']
          },
        }]
      },

      {
        model: db.tasks, // *** TASKS PARTICIPANT ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt']
        }
      }
    ]
    };
    return scope;
}
