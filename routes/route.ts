import { Router } from "express";
import {
  loginAdmin,
  CreateOrder,
  DeleteOrder,
  EditOrder,
  GetAllOrders,
  GetOneOrder,
  createAdmin,
  getAdmin,
  updateAdmin
} from "../controller/contoller";

const routes = Router();

routes.route("/").get(GetAllOrders);
routes.route("/admin").post(createAdmin);
routes.route("/login").post(loginAdmin);
routes.route("/admin/:id").get(getAdmin);
routes.route("/admin/:id").patch(updateAdmin);
routes.route("/").post(CreateOrder);
routes.route("/:trackingId/:id").patch(EditOrder);
routes.route("/:orderId").delete(DeleteOrder);
routes.route("/:trackingId").get(GetOneOrder);

export default routes;
