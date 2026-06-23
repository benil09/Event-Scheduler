import express from "express"
import { getAllUsers,getUserById,createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../dtos/user.dto.js";

 const userRouter  = express.Router();


userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUserById);
userRouter.post("/createUser",validate(createUserSchema),createUser)
userRouter.put("/:id",validate(updateUserSchema),updateUser)
userRouter.delete("/:id",deleteUser)


export default userRouter;