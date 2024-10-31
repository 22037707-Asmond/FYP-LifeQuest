"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilValidateKey = void 0;
const apiKey_1 = require("./apiKey");
/**
 * Validate API Key
 * @param {Request} req
 * @param {Response} res
 * @param {ChatFlow} chatflow
 */
const utilValidateKey = async (req, chatflow) => {
    const chatFlowApiKeyId = chatflow.apikeyid;
    if (!chatFlowApiKeyId)
        return true;
    const authorizationHeader = req.headers['Authorization'] ?? req.headers['authorization'] ?? '';
    if (chatFlowApiKeyId && !authorizationHeader)
        return false;
    const suppliedKey = authorizationHeader.split(`Bearer `).pop();
    if (suppliedKey) {
        const keys = await (0, apiKey_1.getAPIKeys)();
        const apiSecret = keys.find((key) => key.id === chatFlowApiKeyId)?.apiSecret;
        if (!(0, apiKey_1.compareKeys)(apiSecret, suppliedKey))
            return false;
        return true;
    }
    return false;
};
exports.utilValidateKey = utilValidateKey;
//# sourceMappingURL=validateKey.js.map