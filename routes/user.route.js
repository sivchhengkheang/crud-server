import e from "express";

import { login, register } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.middleware.js";

const router = e.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "access grandted to protected route!!",
    user: req.user,
  });
});

export default router;
