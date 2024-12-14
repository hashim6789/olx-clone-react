import { Router } from "express";
// import { Request, Response } from "express";

import { login } from "../controllers/AuthController";

const authRouter = Router();

// const test = (req: Request, res: Response): void => {
//   console.log(req.body);
// };

// Google login route
authRouter.post("/google", login);

export default authRouter;
