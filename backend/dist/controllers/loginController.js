"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
exports.checkLogin = checkLogin;
const loginService_1 = require("../services/loginService");
async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required." });
        return;
    }
    try {
        const { token, user } = await (0, loginService_1.login)({ email, password });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000
        }).json({ succes: true, user });
        return;
    }
    catch (err) {
        res.status(401).json({ error: err.message });
        return;
    }
}
function checkLogin(req, res) {
    res.status(200).json({
        id: req.user.id,
        email: req.user.email
    });
}
