"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
const userService_1 = require("../services/userService");
async function registerUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ error: "All fields are required." });
        return;
    }
    try {
        const newUser = await (0, userService_1.createUser)({ name, email, password });
        res.status(201).json(newUser);
        return;
    }
    catch (err) {
        console.error("Error registering user:", err);
        if (err.code === "23505") {
            res.status(409).json({ error: "Email already registered." });
            return;
        }
        res.status(500).json({ error: "Internal server error." });
        return;
    }
}
