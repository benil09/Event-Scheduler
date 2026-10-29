import { getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from "../services/users.service.js";
import { sendSuccess } from "../utils/api-response.js";
export async function getAllUsers(_req, res) {
    const response = await getAllUsersService();
    sendSuccess(res, response);
}
export async function getUserById(req, res) {
    const { id } = req.params;
    const response = await getUserByIdService(Number(id));
    sendSuccess(res, response);
}
export async function createUser(req, res) {
    try {
        const response = await createUserService(req.body);
        sendSuccess(res, response, 201, "User created successfully");
    }
    catch (error) {
        console.log("Error in create user controller");
        res.status(500).json({ success: false, message: error.message });
    }
}
export async function updateUser(req, res) {
    const { id } = req.params;
    const response = await updateUserService(Number(id), req.body);
    sendSuccess(res, response, 200, "User updated successfully");
}
export async function deleteUser(req, res) {
    const { id } = req.params;
    const response = await deleteUserService(Number(id));
    sendSuccess(res, response, 200, "User deleted successfully");
}
//# sourceMappingURL=user.controller.js.map