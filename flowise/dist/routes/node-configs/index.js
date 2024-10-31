"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_configs_1 = __importDefault(require("../../controllers/node-configs"));
const router = express_1.default.Router();
// CREATE
router.post('/', node_configs_1.default.getAllNodeConfigs);
exports.default = router;
//# sourceMappingURL=index.js.map