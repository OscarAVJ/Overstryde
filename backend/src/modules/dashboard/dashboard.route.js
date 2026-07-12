import { Router } from "express";
import dashboardController from "./dashboard.controller.js";
import { validateAuthCookie } from "../../middlewares/validateAuthCookie.js";

const dashboardRouter = Router();

dashboardRouter.get("/summary", validateAuthCookie(["admin"]), dashboardController.getSummary);

export default dashboardRouter;
