import express from "express";
import { handleGoogleCallback, getGoogleAuthUrl } from "../controllers/google.controller.js";
const googleRouter = express.Router();
googleRouter.get("/url", getGoogleAuthUrl);
googleRouter.get("/callback", handleGoogleCallback);
export default googleRouter;
//# sourceMappingURL=google.routes.js.map