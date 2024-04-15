import { Router} from "express";
import { getUsers, getUserById, saveUser, updateUser } from "../src/controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", saveUser);

router.get("/:uid", getUserById);
router.put("/:uid", updateUser);



export default router;