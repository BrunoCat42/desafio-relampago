"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", loginController_1.loginUser);
router.get("/check", authMiddleware_1.authMiddleware, loginController_1.checkLogin);
exports.default = router;
