import express from "express"
import {Router} from 'express'
import { handleGoogleCallback } from "../controllers/google.controller.js";
 const googleRouter: Router  = express.Router();


googleRouter.get("/callback",handleGoogleCallback);


export default googleRouter;