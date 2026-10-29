import express from "express";
import { Router } from "express";
import { handleGoogleCallback, getGoogleAuthUrl } from "../controllers/google.controller.js";

const googleRouter: Router = express.Router();

googleRouter.get("/url", getGoogleAuthUrl);
googleRouter.get("/callback", handleGoogleCallback);

export default googleRouter;