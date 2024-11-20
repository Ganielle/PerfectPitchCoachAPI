const routers = app => {
    console.log("Routers are all available");

    app.use("/auth", require("./auth"))
    app.use("/score", require("./score"))
    app.use("/ai", require("./ai"))
    app.use("/users", require("./users"))
}

module.exports = routers