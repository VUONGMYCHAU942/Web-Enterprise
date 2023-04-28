"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var morgan_1 = require("morgan");
var compression_1 = require("compression");
var fs_extra_1 = require("fs-extra");
var dotenv_1 = require("dotenv");
var cookie_parser_1 = require("cookie-parser");
var routes_1 = require("./routes");
var mongodb_1 = require("./config/mongodb");
// Checking if .env file is available
if (fs_extra_1["default"].existsSync('.env')) {
    dotenv_1["default"].config();
}
else {
    console.error('.env file not found.');
}
var app = express_1["default"]();
var port = process.env.PORT || 8080;
// Logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1["default"]('dev'));
}
// Use proxy for express server
app.set('trust proxy', true);
// Gzip
app.use(compression_1["default"]({
    level: 6,
    threshold: 10 * 1000,
    filter: function (req, res) {
        if (req.headers['x-no-compression']) {
            return false;
        }
        else {
            return compression_1["default"].filter(req, res);
        }
    }
}));
// Public
app.use('/lib', [
    express_1["default"].static(path_1["default"].join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css')),
    express_1["default"].static(path_1["default"].join(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')),
    express_1["default"].static(path_1["default"].join(__dirname, '../node_modules/jquery/dist/jquery.min.js')),
    express_1["default"].static(path_1["default"].join(__dirname, '../node_modules/@fortawesome/fontawesome-free'))
]);
app.use(express_1["default"].static(path_1["default"].join(__dirname, '../public')));
//app.use(favicon(path.join(__dirname, '../public', 'img/favicon.png')));
// Middleware
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(cookie_parser_1["default"]());
app.use(express_1["default"].json());
// Route Init
routes_1["default"](app);
//Set  the viiew engine to ejs
app.set('view engine', 'ejs');
// Connect db
mongodb_1.connectDB();
app.listen(port, function () {
    console.log("Server is running on port " + port);
});
