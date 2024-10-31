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
exports.utilBuildChatflow = void 0;
const flowise_components_1 = require("flowise-components");
const http_status_codes_1 = require("http-status-codes");
const Interface_1 = require("../Interface");
const internalFlowiseError_1 = require("../errors/internalFlowiseError");
const ChatFlow_1 = require("../database/entities/ChatFlow");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
const utils_1 = require("../utils");
const validateKey_1 = require("./validateKey");
const _1 = require(".");
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const fs = __importStar(require("fs"));
const logger_1 = __importDefault(require("./logger"));
const addChatMesage_1 = require("./addChatMesage");
const buildAgentGraph_1 = require("./buildAgentGraph");
const utils_2 = require("../errors/utils");
const ChatMessage_1 = require("../database/entities/ChatMessage");
/**
 * Build Chatflow
 * @param {Request} req
 * @param {Server} socketIO
 * @param {boolean} isInternal
 */
const utilBuildChatflow = async (req, socketIO, isInternal = false) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const chatflowid = req.params.id;
        const httpProtocol = req.get('x-forwarded-proto') || req.protocol;
        const baseURL = `${httpProtocol}://${req.get('host')}`;
        let incomingInput = req.body;
        let nodeToExecuteData;
        const chatflow = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOneBy({
            id: chatflowid
        });
        if (!chatflow) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Chatflow ${chatflowid} not found`);
        }
        const chatId = incomingInput.chatId ?? incomingInput.overrideConfig?.sessionId ?? (0, uuid_1.v4)();
        const userMessageDateTime = new Date();
        if (!isInternal) {
            const isKeyValidated = await (0, validateKey_1.utilValidateKey)(req, chatflow);
            if (!isKeyValidated) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `Unauthorized`);
            }
        }
        let fileUploads = [];
        if (incomingInput.uploads) {
            fileUploads = incomingInput.uploads;
            for (let i = 0; i < fileUploads.length; i += 1) {
                const upload = fileUploads[i];
                if ((upload.type === 'file' || upload.type === 'audio') && upload.data) {
                    const filename = upload.name;
                    const splitDataURI = upload.data.split(',');
                    const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                    const mime = splitDataURI[0].split(':')[1].split(';')[0];
                    await (0, flowise_components_1.addSingleFileToStorage)(mime, bf, filename, chatflowid, chatId);
                    upload.type = 'stored-file';
                    // Omit upload.data since we don't store the content in database
                    fileUploads[i] = (0, lodash_1.omit)(upload, ['data']);
                }
                if (upload.type === 'url' && upload.data) {
                    const filename = upload.name;
                    const urlData = upload.data;
                    fileUploads[i] = { data: urlData, name: filename, type: 'url', mime: upload.mime ?? 'image/png' };
                }
                // Run Speech to Text conversion
                if (upload.mime === 'audio/webm' || upload.mime === 'audio/mp4' || upload.mime === 'audio/ogg') {
                    logger_1.default.debug(`Attempting a speech to text conversion...`);
                    let speechToTextConfig = {};
                    if (chatflow.speechToText) {
                        const speechToTextProviders = JSON.parse(chatflow.speechToText);
                        for (const provider in speechToTextProviders) {
                            const providerObj = speechToTextProviders[provider];
                            if (providerObj.status) {
                                speechToTextConfig = providerObj;
                                speechToTextConfig['name'] = provider;
                                break;
                            }
                        }
                    }
                    if (speechToTextConfig) {
                        const options = {
                            chatId,
                            chatflowid,
                            appDataSource: appServer.AppDataSource,
                            databaseEntities: _1.databaseEntities
                        };
                        const speechToTextResult = await (0, flowise_components_1.convertSpeechToText)(upload, speechToTextConfig, options);
                        logger_1.default.debug(`Speech to text result: ${speechToTextResult}`);
                        if (speechToTextResult) {
                            incomingInput.question = speechToTextResult;
                        }
                    }
                }
            }
        }
        let isStreamValid = false;
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
                socketIOClientId: req.body.socketIOClientId
            };
        }
        /*** Get chatflows and prepare data  ***/
        const flowData = chatflow.flowData;
        const parsedFlowData = JSON.parse(flowData);
        const nodes = parsedFlowData.nodes;
        const edges = parsedFlowData.edges;
        /*** Get session ID ***/
        const memoryNode = (0, utils_1.findMemoryNode)(nodes, edges);
        const memoryType = memoryNode?.data.label;
        let sessionId = (0, utils_1.getMemorySessionId)(memoryNode, incomingInput, chatId, isInternal);
        /*** Get Ending Node with Directed Graph  ***/
        const { graph, nodeDependencies } = (0, utils_1.constructGraphs)(nodes, edges);
        const directedGraph = graph;
        const endingNodes = (0, utils_1.getEndingNodes)(nodeDependencies, directedGraph, nodes);
        /*** If the graph is an agent graph, build the agent response ***/
        if (endingNodes.filter((node) => node.data.category === 'Multi Agents' || node.data.category === 'Sequential Agents').length) {
            return await utilBuildAgentResponse(chatflow, isInternal, chatId, memoryType ?? '', sessionId, userMessageDateTime, fileUploads, incomingInput, nodes, edges, socketIO, baseURL);
        }
        // Get prepend messages
        const prependMessages = incomingInput.history;
        /*   Reuse the flow without having to rebuild (to avoid duplicated upsert, recomputation, reinitialization of memory) when all these conditions met:
         * - Reuse of flows is not disabled
         * - Node Data already exists in pool
         * - Still in sync (i.e the flow has not been modified since)
         * - Existing overrideConfig and new overrideConfig are the same
         * - Flow doesn't start with/contain nodes that depend on incomingInput.question
         ***/
        const isFlowReusable = () => {
            return (process.env.DISABLE_CHATFLOW_REUSE !== 'true' &&
                Object.prototype.hasOwnProperty.call(appServer.chatflowPool.activeChatflows, chatflowid) &&
                appServer.chatflowPool.activeChatflows[chatflowid].inSync &&
                appServer.chatflowPool.activeChatflows[chatflowid].endingNodeData &&
                (0, utils_1.isSameOverrideConfig)(isInternal, appServer.chatflowPool.activeChatflows[chatflowid].overrideConfig, incomingInput.overrideConfig) &&
                !(0, utils_1.isStartNodeDependOnInput)(appServer.chatflowPool.activeChatflows[chatflowid].startingNodes, nodes));
        };
        if (isFlowReusable()) {
            nodeToExecuteData = appServer.chatflowPool.activeChatflows[chatflowid].endingNodeData;
            isStreamValid = (0, utils_1.isFlowValidForStream)(nodes, nodeToExecuteData);
            logger_1.default.debug(`[server]: Reuse existing chatflow ${chatflowid} with ending node ${nodeToExecuteData.label} (${nodeToExecuteData.id})`);
        }
        else {
            const isCustomFunctionEndingNode = endingNodes.some((node) => node.data?.outputs?.output === 'EndingNode');
            for (const endingNode of endingNodes) {
                const endingNodeData = endingNode.data;
                const isEndingNode = endingNodeData?.outputs?.output === 'EndingNode';
                // Once custom function ending node exists, no need to do follow-up checks.
                if (isEndingNode)
                    continue;
                if (endingNodeData.outputs &&
                    Object.keys(endingNodeData.outputs).length &&
                    !Object.values(endingNodeData.outputs ?? {}).includes(endingNodeData.name)) {
                    throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Output of ${endingNodeData.label} (${endingNodeData.id}) must be ${endingNodeData.label}, can't be an Output Prediction`);
                }
                isStreamValid = (0, utils_1.isFlowValidForStream)(nodes, endingNodeData);
            }
            // Once custom function ending node exists, flow is always unavailable to stream
            isStreamValid = isCustomFunctionEndingNode ? false : isStreamValid;
            let chatHistory = [];
            // When {{chat_history}} is used in Format Prompt Value, fetch the chat conversations from memory node
            for (const endingNode of endingNodes) {
                const endingNodeData = endingNode.data;
                if (!endingNodeData.inputs?.memory)
                    continue;
                const memoryNodeId = endingNodeData.inputs?.memory.split('.')[0].replace('{{', '');
                const memoryNode = nodes.find((node) => node.data.id === memoryNodeId);
                if (!memoryNode)
                    continue;
                chatHistory = await (0, utils_1.getSessionChatHistory)(chatflowid, (0, utils_1.getMemorySessionId)(memoryNode, incomingInput, chatId, isInternal), memoryNode, appServer.nodesPool.componentNodes, appServer.AppDataSource, _1.databaseEntities, logger_1.default, prependMessages);
            }
            /*** Get Starting Nodes with Reversed Graph ***/
            const constructedObj = (0, utils_1.constructGraphs)(nodes, edges, { isReversed: true });
            const nonDirectedGraph = constructedObj.graph;
            let startingNodeIds = [];
            let depthQueue = {};
            const endingNodeIds = endingNodes.map((n) => n.id);
            for (const endingNodeId of endingNodeIds) {
                const resx = (0, utils_1.getStartingNodes)(nonDirectedGraph, endingNodeId);
                startingNodeIds.push(...resx.startingNodeIds);
                depthQueue = Object.assign(depthQueue, resx.depthQueue);
            }
            startingNodeIds = [...new Set(startingNodeIds)];
            const startingNodes = nodes.filter((nd) => startingNodeIds.includes(nd.id));
            logger_1.default.debug(`[server]: Start building chatflow ${chatflowid}`);
            /*** BFS to traverse from Starting Nodes to Ending Node ***/
            const reactFlowNodes = await (0, utils_1.buildFlow)({
                startingNodeIds,
                reactFlowNodes: nodes,
                reactFlowEdges: edges,
                graph,
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
                isUpsert: false,
                uploads: incomingInput.uploads,
                baseURL,
                socketIO,
                socketIOClientId: incomingInput.socketIOClientId
            });
            const nodeToExecute = endingNodeIds.length === 1
                ? reactFlowNodes.find((node) => endingNodeIds[0] === node.id)
                : reactFlowNodes[reactFlowNodes.length - 1];
            if (!nodeToExecute) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Node not found`);
            }
            if (incomingInput.overrideConfig) {
                nodeToExecute.data = (0, utils_1.replaceInputsWithConfig)(nodeToExecute.data, incomingInput.overrideConfig);
            }
            const reactFlowNodeData = (0, utils_1.resolveVariables)(nodeToExecute.data, reactFlowNodes, incomingInput.question, chatHistory);
            nodeToExecuteData = reactFlowNodeData;
            appServer.chatflowPool.add(chatflowid, nodeToExecuteData, startingNodes, incomingInput?.overrideConfig);
        }
        logger_1.default.debug(`[server]: Running ${nodeToExecuteData.label} (${nodeToExecuteData.id})`);
        const nodeInstanceFilePath = appServer.nodesPool.componentNodes[nodeToExecuteData.name].filePath;
        const nodeModule = await Promise.resolve(`${nodeInstanceFilePath}`).then(s => __importStar(require(s)));
        const nodeInstance = new nodeModule.nodeClass({ sessionId });
        let result = isStreamValid
            ? await nodeInstance.run(nodeToExecuteData, incomingInput.question, {
                chatId,
                chatflowid,
                logger: logger_1.default,
                appDataSource: appServer.AppDataSource,
                databaseEntities: _1.databaseEntities,
                analytic: chatflow.analytic,
                uploads: incomingInput.uploads,
                socketIO,
                socketIOClientId: incomingInput.socketIOClientId,
                prependMessages
            })
            : await nodeInstance.run(nodeToExecuteData, incomingInput.question, {
                chatId,
                chatflowid,
                logger: logger_1.default,
                appDataSource: appServer.AppDataSource,
                databaseEntities: _1.databaseEntities,
                analytic: chatflow.analytic,
                uploads: incomingInput.uploads,
                prependMessages
            });
        result = typeof result === 'string' ? { text: result } : result;
        // Retrieve threadId from assistant if exists
        if (typeof result === 'object' && result.assistant) {
            sessionId = result.assistant.threadId;
        }
        const userMessage = {
            role: 'userMessage',
            content: incomingInput.question,
            chatflowid,
            chatType: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
            chatId,
            memoryType,
            sessionId,
            createdDate: userMessageDateTime,
            fileUploads: incomingInput.uploads ? JSON.stringify(fileUploads) : undefined,
            leadEmail: incomingInput.leadEmail
        };
        await (0, addChatMesage_1.utilAddChatMessage)(userMessage);
        let resultText = '';
        if (result.text)
            resultText = result.text;
        else if (result.json)
            resultText = '```json\n' + JSON.stringify(result.json, null, 2);
        else
            resultText = JSON.stringify(result, null, 2);
        const apiMessage = {
            role: 'apiMessage',
            content: resultText,
            chatflowid,
            chatType: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
            chatId,
            memoryType,
            sessionId
        };
        if (result?.sourceDocuments)
            apiMessage.sourceDocuments = JSON.stringify(result.sourceDocuments);
        if (result?.usedTools)
            apiMessage.usedTools = JSON.stringify(result.usedTools);
        if (result?.fileAnnotations)
            apiMessage.fileAnnotations = JSON.stringify(result.fileAnnotations);
        const chatMessage = await (0, addChatMesage_1.utilAddChatMessage)(apiMessage);
        logger_1.default.debug(`[server]: Finished running ${nodeToExecuteData.label} (${nodeToExecuteData.id})`);
        await appServer.telemetry.sendTelemetry('prediction_sent', {
            version: await (0, utils_1.getAppVersion)(),
            chatflowId: chatflowid,
            chatId,
            type: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
            flowGraph: (0, utils_1.getTelemetryFlowObj)(nodes, edges)
        });
        // Prepare response
        // return the question in the response
        // this is used when input text is empty but question is in audio format
        result.question = incomingInput.question;
        result.chatId = chatId;
        result.chatMessageId = chatMessage?.id;
        if (sessionId)
            result.sessionId = sessionId;
        if (memoryType)
            result.memoryType = memoryType;
        return result;
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
exports.utilBuildChatflow = utilBuildChatflow;
const utilBuildAgentResponse = async (agentflow, isInternal, chatId, memoryType, sessionId, userMessageDateTime, fileUploads, incomingInput, nodes, edges, socketIO, baseURL) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const streamResults = await (0, buildAgentGraph_1.buildAgentGraph)(agentflow, chatId, sessionId, incomingInput, isInternal, baseURL, socketIO);
        if (streamResults) {
            const { finalResult, finalAction, sourceDocuments, usedTools, agentReasoning } = streamResults;
            const userMessage = {
                role: 'userMessage',
                content: incomingInput.question,
                chatflowid: agentflow.id,
                chatType: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
                chatId,
                memoryType,
                sessionId,
                createdDate: userMessageDateTime,
                fileUploads: incomingInput.uploads ? JSON.stringify(fileUploads) : undefined,
                leadEmail: incomingInput.leadEmail
            };
            await (0, addChatMesage_1.utilAddChatMessage)(userMessage);
            const apiMessage = {
                role: 'apiMessage',
                content: finalResult,
                chatflowid: agentflow.id,
                chatType: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
                chatId,
                memoryType,
                sessionId
            };
            if (sourceDocuments.length)
                apiMessage.sourceDocuments = JSON.stringify(sourceDocuments);
            if (usedTools.length)
                apiMessage.usedTools = JSON.stringify(usedTools);
            if (agentReasoning.length)
                apiMessage.agentReasoning = JSON.stringify(agentReasoning);
            if (Object.keys(finalAction).length)
                apiMessage.action = JSON.stringify(finalAction);
            const chatMessage = await (0, addChatMesage_1.utilAddChatMessage)(apiMessage);
            await appServer.telemetry.sendTelemetry('agentflow_prediction_sent', {
                version: await (0, utils_1.getAppVersion)(),
                agentflowId: agentflow.id,
                chatId,
                type: isInternal ? Interface_1.chatType.INTERNAL : Interface_1.chatType.EXTERNAL,
                flowGraph: (0, utils_1.getTelemetryFlowObj)(nodes, edges)
            });
            // Find the previous chat message with the same action id and remove the action
            if (incomingInput.action && Object.keys(incomingInput.action).length) {
                let query = await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage)
                    .createQueryBuilder('chat_message')
                    .where('chat_message.chatId = :chatId', { chatId })
                    .orWhere('chat_message.sessionId = :sessionId', { sessionId })
                    .orderBy('chat_message.createdDate', 'DESC')
                    .getMany();
                for (const result of query) {
                    if (result.action) {
                        try {
                            const action = JSON.parse(result.action);
                            if (action.id === incomingInput.action.id) {
                                const newChatMessage = new ChatMessage_1.ChatMessage();
                                Object.assign(newChatMessage, result);
                                newChatMessage.action = null;
                                const cm = await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).create(newChatMessage);
                                await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).save(cm);
                                break;
                            }
                        }
                        catch (e) {
                            // error converting action to JSON
                        }
                    }
                }
            }
            // Prepare response
            let result = {};
            result.text = finalResult;
            result.question = incomingInput.question;
            result.chatId = chatId;
            result.chatMessageId = chatMessage?.id;
            if (sessionId)
                result.sessionId = sessionId;
            if (memoryType)
                result.memoryType = memoryType;
            if (agentReasoning.length)
                result.agentReasoning = agentReasoning;
            if (Object.keys(finalAction).length)
                result.action = finalAction;
            return result;
        }
        return undefined;
    }
    catch (e) {
        logger_1.default.error('[server]: Error:', e);
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, (0, utils_2.getErrorMessage)(e));
    }
};
//# sourceMappingURL=buildChatflow.js.map