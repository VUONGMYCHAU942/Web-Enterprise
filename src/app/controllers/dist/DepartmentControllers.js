"use strict";
exports.__esModule = true;
var express_1 = require("express");
var DepartmentController = /** @class */ (function () {
    function DepartmentController() {
        this.router = express_1.Router();
        this.createDepartment = function () {
            try {
            }
            catch (error) {
            }
        };
        this.updateDepartment = function () {
            try {
            }
            catch (error) {
            }
        };
        this.deleteDepartment = function () {
            try {
            }
            catch (error) {
            }
        };
        this.getAllDepartment = function () {
            try {
            }
            catch (error) {
            }
        };
        this.getOneDepartment = function () {
            try {
            }
            catch (error) {
            }
        };
        this.router;
        this.initRoutes();
    }
    DepartmentController.prototype.initRoutes = function () {
        this.router.route('/:id')
            .get()
            .patch()["delete"]();
        this.router.route('/')
            .get()
            .post();
    };
    return DepartmentController;
}());
exports["default"] = new DepartmentController;
