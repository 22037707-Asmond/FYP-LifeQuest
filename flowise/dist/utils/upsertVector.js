"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertVector = void 0;
const fs = __importStar(require("fs"));
const lodash_1 = require("lodash");
const flowise_components_1 = require("flowise-components");
const telemetry_1 = __importDefault(require("../services/telemetry"));
const logger_1 = __importDefault(require("../utils/logger"));
const utils_1 = require("../utils");
const validateKey_1 = require("./validateKey");
const Interface_1 = require("../Interface");
const ChatFlow_1 = require("../database/entities/ChatFlow");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
const UpsertHistory_1 = require("../database/entities/UpsertHistory");
const internalFlowiseError_1 = require("../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const utils_2 = require("../errors/utils");
/**
 * Upsert documents
 * @param {Request} req
 * @param {boolean} isInternal
 */
const upsertVector = async (req, isInternal = false) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const chatflowid = req.params.id;
        let incomingInput = req.body;
        const chatflow = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOneBy({
            id: chatflowid
        });
        if (!chatflow) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowid} not found`);
        }
        if (!isInternal) {
            const isKeyValidated = await (0, validateKey_1.utilValidateKey)(req, chatflow);
            if (!isKeyValidated) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `Unauthorized`);
            }
        }
        const files = req.files || [];
        if (files.length) {
            const overrideConfig = { ...req.body };
            const fileNames = [];
            for (const file of files) {
                const fileBuffer = fs.readFileSync(file.path);
                const storagePath = await (0, flowise_components_1.addArrayFilesToStorage)(file.mimetype, fileBuffer, file.originalname, fileNames, chatflowid);
                const fileInputField = (0, utils_1.mapMimeTypeToInputField)(file.mimetype);
                overrideConfig[fileInputField] = storagePath;
                fs.unlinkSync(file.path);
            }
            incomingInput = {
                question: req.body.question ?? 'hello',
                overrideConfig,
                stopNodeId: req.body.stopNodeId
            };
        }
        /*** Get chatflows and prepare data  ***/
        const flowData = chatflow.flowData;
        const parsedFlowData = JSON.parse(flowData);
        const nodes = parsedFlowData.nodes;
        const edges = parsedFlowData.edges;
        let stopNodeId = incomingInput?.stopNodeId ?? '';
        let chatHistory = [];
        let chatId = incomingInput.chatId ?? '';
        let isUpsert = true;
        // Get session ID
        const memoryNode = (0, utils_1.findMemoryNode)(nodes, edges);
        let sessionId = (0, utils_1.getMemorySessionId)(memoryNode, incomingInput, chatId, isInternal);
        const vsNodes = nodes.filter((node) => node.data.category === 'Vector Stores' && !node.data.label.includes('Upsert') && !node.data.label.includes('Load Existing'));
        // Check if multiple vector store nodes exist, and if stopNodeId is specified
        if (vsNodes.length > 1 && !stopNodeId) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'There are multiple vector nodes, please provide stopNodeId in body request');
        }
        else if (vsNodes.length === 1 && !stopNodeId) {
            stopNodeId = vsNodes[0].data.id;
        }
        else if (!vsNodes.length && !stopNodeId) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, 'No vector node found');
        }
        const { graph } = (0, utils_1.constructGraphs)(nodes, edges, { isReversed: true });
        const nodeIds = (0, utils_1.getAllConnectedNodes)(graph, stopNodeId);
        const filteredGraph = {};
        for (const key of nodeIds) {
            if (Object.prototype.hasOwnProperty.call(graph, key)) {
                filteredGraph[key] = graph[key];
            }
        }
        const { startingNodeIds, depthQueue } = (0, utils_1.getStartingNodes)(filteredGraph, stopNodeId);
        const upsertedResult = await (0, utils_1.buildFlow)({
            startingNodeIds,
            reactFlowNodes: nodes,
            reactFlowEdges: edges,
            graph: filteredGraph,
            depthQueue,
            componentNodes: appServer.nodesPool.componentNodes,
            question: incomingInput.question,
            chatHistory,
            chatId,
            sessionId: sessionId ?? '',
            chatflowid,
            appDataSource: appServer.AppDataSource,
            overrideConfig: incomingInput?.overrideConfig,
            cachePool: appServer.cachePool,
            isUpsert,
            stopNodeId
        });
        const startingNodes = nodes.filter((nd) => startingNodeIds.includes(nd.data.id));
        await appServer.chatflowPool.add(chatflowid, undefined, startingNodes, incomingInput?.overrideConfig);
        // Save to DB
        if (upsertedResult['flowData'] && upsertedResult['result']) {
            const result = (0, lodash_1.cloneDeep)(upsertedResult);
            result['flowData'] = JSON.stringify(result['flowData']);
            result['result'] = JSON.stringify((0, lodash_1.omit)(result['result'], ['totalKeys', 'addedDocs']));
            result.chatflowid = chatflowid;
            const newUpsertHistory = new UpsertHistory_1.UpsertHistory();
            Object.assign(newUpsertHistory, result);
            const upsertHistory = appServer.AppDataSource.getRepository(UpsertHistory_1.UpsertHistory).create(newUpsertHistory);
            await appServer.AppDataSource.getRepository(UpsertHistory_1.UpsertHistory).save(upsertHistory);
        }
        await telemetry_1.default.createEvent({
            name: `vector_upserted`,
            data: {
                version: await (0, utils_1.getAppVersion)(),
                chatlowId: chatflowid,
                type: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
                flowGraph: (0, utils_1.getTelemetryFlowObj)(nodes, edges),
                stopNodeId
            }
        });
        return upsertedResult['result'] ?? { result: 'Successfully Upserted' };
    }
    catch (e) {
        logger_1.default.error('[server]: Error:', e);
        if (e instanceof internalFlowiseError_1.InternalFlowiseError && e.statusCode === http_status_codes_1.StatusCodes.UNAUTHORIZED) {
            throw e;
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, (0, utils_2.getErrorMessage)(e));
        }
    }
};
exports.upsertVector = upsertVector;
//# sourceMappingURL=upsertVector.js.map