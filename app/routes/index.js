module.exports = app => {
    require("./users.routes.js")(app);
    require("./positions.routes.js")(app);
    require("./clients.routes.js")(app);
    require("./projects.routes.js")(app);
    require("./tasks.routes.js")(app);
    require("./hours.routes.js")(app);
    require("./usersTime.routes.js")(app);
}