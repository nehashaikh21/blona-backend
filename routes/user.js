import { Router } from "express";
const router = new Router();
import { getUsers } from "../controllers/users.js";

router.route("/").get(getUsers);

export default router;
