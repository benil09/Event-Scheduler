import { unauthorized } from "../utils/api-error.js";
import { getUserById } from "../repositories/user.repository.js";
export async function authenticate(req, _res, next) {
    const userIdHeader = req.headers["x-user-id"];
    if (!userIdHeader || Array.isArray(userIdHeader) || typeof userIdHeader !== "string") {
        throw unauthorized("Authentication required. Please provide x-user-id header.");
    }
    const userId = Number(userIdHeader);
    if (isNaN(userId)) {
        throw unauthorized("Invalid User ID format.");
    }
    // check if the user is valid or not
    const user = await getUserById(userId);
    if (!user) {
        throw unauthorized("User not found.");
    }
    // Attach authenticated details to request so that we can use it in the controllers and dont need to check everytime
    req.userId = user.id;
    req.user = user;
    next();
}
//# sourceMappingURL=auth.js.map