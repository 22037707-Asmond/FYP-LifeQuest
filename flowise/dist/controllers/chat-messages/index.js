"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../Interface");
const chatflows_1 = __importDefault(require("../../services/chatflows"));
const chat_messages_1 = __importDefault(require("../../services/chat-messages"));
const utils_1 = require("../../utils");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const createChatMessage = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, 'Error: chatMessagesController.createChatMessage - request body not provided!');
        }
        const apiResponse = await chat_messages_1.default.createChatMessage(req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAllChatMessages = async (req, res, next) => {
    try {
        let chatTypeFilter = req.query?.chatType;
        if (chatTypeFilter) {
            try {
                const chatTypeFilterArray = JSON.parse(chatTypeFilter);
                if (chatTypeFilterArray.includes(Interface_1.chatType.EXTERNAL) && chatTypeFilterArray.includes(Interface_1.chatType.INTERNAL)) {
                    chatTypeFilter = undefined;
                }
                else if (chatTypeFilterArray.includes(Interface_1.chatType.EXTERNAL)) {
                    chatTypeFilter = Interface_1.chatType.EXTERNAL;
                }
                else if (chatTypeFilterArray.includes(Interface_1.chatType.INTERNAL)) {
                    chatTypeFilter = Interface_1.chatType.INTERNAL;
                }
            }
            catch (e) {
                return res.status(500).send(e);
            }
        }
        const sortOrder = req.query?.order;
        const chatId = req.query?.chatId;
        const memoryType = req.query?.memoryType;
        const sessionId = req.query?.sessionId;
        const messageId = req.query?.messageId;
        const startDate = req.query?.startDate;
        const endDate = req.query?.endDate;
        const feedback = req.query?.feedback;
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: chatMessageController.getAllChatMessages - id not provided!`);
        }
        const apiResponse = await chat_messages_1.default.getAllChatMessages(req.params.id, chatTypeFilter, sortOrder, chatId, memoryType, sessionId, startDate, endDate, messageId, feedback);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAllInternalChatMessages = async (req, res, next) => {
    try {
        const sortOrder = req.query?.order;
        const chatId = req.query?.chatId;
        const memoryType = req.query?.memoryType;
        const sessionId = req.query?.sessionId;
        const messageId = req.query?.messageId;
        const startDate = req.query?.startDate;
        const endDate = req.query?.endDate;
        const feedback = req.query?.feedback;
        const apiResponse = await chat_messages_1.default.getAllInternalChatMessages(req.params.id, Interface_1.chatType.INTERNAL, sortOrder, chatId, memoryType, sessionId, startDate, endDate, messageId, feedback);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
//Delete all chatmessages from chatId
const removeAllChatMessages = async (req, res, next) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, 'Error: chatMessagesController.removeAllChatMessages - id not provided!');
        }
        const chatflowid = req.params.id;
        const chatflow = await chatflows_1.default.getChatflowById(req.params.id);
        if (!chatflow) {
            return res.status(404).send(`Chatflow ${req.params.id} not found`);
        }
        const chatId = req.query?.chatId;
        const memoryType = req.query?.memoryType;
        const sessionId = req.query?.sessionId;
        const chatType = req.query?.chatType;
        const isClearFromViewMessageDialog = req.query?.isClearFromViewMessageDialog;
        const flowData = chatflow.flowData;
        const parsedFlowData = JSON.parse(flowData);
        const nodes = parsedFlowData.nodes;
        try {
            await (0, utils_1.clearSessionMemory)(nodes, appServer.nodesPool.componentNodes, chatId, appServer.AppDataSource, sessionId, memoryType, isClearFromViewMessageDialog);
        }
        catch (e) {
            return res.status(500).send('Error clearing chat messages');
        }
        const deleteOptions = { chatflowid };
        if (chatId)
            deleteOptions.chatId = chatId;
        if (memoryType)
            deleteOptions.memoryType = memoryType;
        if (sessionId)
            deleteOptions.sessionId = sessionId;
        if (chatType)
            deleteOptions.chatType = chatType;
        const apiResponse = await chat_messages_1.default.removeAllChatMessages(chatId, chatflowid, deleteOptions);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const abortChatMessage = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.chatflowid || !req.params.chatid) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: chatMessagesController.abortChatMessage - chatflowid or chatid not provided!`);
        }
        await chat_messages_1.default.abortChatMessage(req.params.chatid, req.params.chatflowid);
        return res.json({ status: 200, message: 'Chat message aborted' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createChatMessage,
    getAllChatMessages,
    getAllInternalChatMessages,
    removeAllChatMessages,
    abortChatMessage
};
//# sourceMappingURL=index.js.map