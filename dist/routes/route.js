"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contoller_1 = require("../controller/contoller");
const routes = (0, express_1.Router)();
routes.route("/").get(contoller_1.GetAllOrders);
routes.route("/admin").post(contoller_1.createAdmin);
routes.route("/login").post(contoller_1.loginAdmin);
routes.route("/admin/:id").get(contoller_1.getAdmin);
routes.route("/admin/:id").patch(contoller_1.updateAdmin);
routes.route("/").post(contoller_1.CreateOrder);
routes.route("/:trackingId/:id").patch(contoller_1.EditOrder);
routes.route("/:orderId").delete(contoller_1.DeleteOrder);
routes.route("/:trackingId").get(contoller_1.GetOneOrder);
exports.default = routes;
