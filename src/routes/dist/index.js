"use strict";
exports.__esModule = true;
var api_1 = require("./api");
// import adminRouter from './admin';
var routes = function (app) {
    app.use('/api', api_1["default"]);
    // app.use('/admin', adminRouter)
    // app.use('/', )
    // app.use('*', )
};
exports["default"] = routes;
