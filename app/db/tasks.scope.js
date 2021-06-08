
module.exports = function (db) {
   
    const scope = { 
      include: [{
        model: db.projects, // *** PROJECTS ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt', 'clientId']
        },
        include: [{
            model: db.clients,
            attributes: {
              exclude: ['deletedAT', 'updatedAt', 'createdAt']
            }
          }]
      },
      {
        model: db.users, // *** TASK PARTICIPANT ***
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt', 'PositionId', 'positionId']
        },
        as: "participantsTask",
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
    ]
    };
    return scope;
}
