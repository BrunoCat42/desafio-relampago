"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const loginRoutes_1 = __importDefault(require("./loginRoutes"));
const assetsRoutes_1 = __importDefault(require("./assetsRoutes"));
const maintenanceRoutes_1 = __importDefault(require("./maintenanceRoutes"));
const router = (0, express_1.Router)();
router.use("/users", userRoutes_1.default);
router.use("/login", loginRoutes_1.default);
router.use("/assets", assetsRoutes_1.default);
router.use("/maintenances", maintenanceRoutes_1.default);
exports.default = router;
