"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const http_status_codes_1 = require("http-status-codes");
const lodash_1 = require("lodash");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const Assistant_1 = require("../../database/entities/Assistant");
const Credential_1 = require("../../database/entities/Credential");
const utils_1 = require("../../utils");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
const createAssistant = async (requestBody) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (!requestBody.details) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Invalid request body`);
        }
        const assistantDetails = JSON.parse(requestBody.details);
        try {
            const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
                id: requestBody.credential
            });
            if (!credential) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${requestBody.credential} not found`);
            }
            // Decrpyt credentialData
            const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData);
            const openAIApiKey = decryptedCredentialData['openAIApiKey'];
            if (!openAIApiKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `OpenAI ApiKey not found`);
            }
            const openai = new openai_1.default({ apiKey: openAIApiKey });
            // Prepare tools
            let tools = [];
            if (assistantDetails.tools) {
                for (const tool of assistantDetails.tools ?? []) {
                    tools.push({
                        type: tool
                    });
                }
            }
            // Save tool_resources to be stored later into database
            const savedToolResources = (0, lodash_1.cloneDeep)(assistantDetails.tool_resources);
            // Cleanup tool_resources for creating assistant
            if (assistantDetails.tool_resources) {
                for (const toolResource in assistantDetails.tool_resources) {
                    if (toolResource === 'file_search') {
                        assistantDetails.tool_resources['file_search'] = {
                            vector_store_ids: assistantDetails.tool_resources['file_search'].vector_store_ids
                        };
                    }
                    else if (toolResource === 'code_interpreter') {
                        assistantDetails.tool_resources['code_interpreter'] = {
                            file_ids: assistantDetails.tool_resources['code_interpreter'].file_ids
                        };
                    }
                }
            }
            // If the assistant doesn't exist, create a new one
            if (!assistantDetails.id) {
                const newAssistant = await openai.beta.assistants.create({
                    name: assistantDetails.name,
                    description: assistantDetails.description,
                    instructions: assistantDetails.instructions,
                    model: assistantDetails.model,
                    tools,
                    tool_resources: assistantDetails.tool_resources,
                    temperature: assistantDetails.temperature,
                    top_p: assistantDetails.top_p
                });
                assistantDetails.id = newAssistant.id;
            }
            else {
                const retrievedAssistant = await openai.beta.assistants.retrieve(assistantDetails.id);
                let filteredTools = (0, lodash_1.uniqWith)([...retrievedAssistant.tools.filter((tool) => tool.type === 'function'), ...tools], lodash_1.isEqual);
                // Remove empty functions
                filteredTools = filteredTools.filter((tool) => !(tool.type === 'function' && !tool.function));
                await openai.beta.assistants.update(assistantDetails.id, {
                    name: assistantDetails.name,
                    description: assistantDetails.description ?? '',
                    instructions: assistantDetails.instructions ?? '',
                    model: assistantDetails.model,
                    tools: filteredTools,
                    tool_resources: assistantDetails.tool_resources,
                    temperature: assistantDetails.temperature,
                    top_p: assistantDetails.top_p
                });
            }
            const newAssistantDetails = {
                ...assistantDetails
            };
            if (savedToolResources)
                newAssistantDetails.tool_resources = savedToolResources;
            requestBody.details = JSON.stringify(newAssistantDetails);
        }
        catch (error) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error creating new assistant - ${(0, utils_2.getErrorMessage)(error)}`);
        }
        const newAssistant = new Assistant_1.Assistant();
        Object.assign(newAssistant, requestBody);
        const assistant = appServer.AppDataSource.getRepository(Assistant_1.Assistant).create(newAssistant);
        const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).save(assistant);
        await appServer.telemetry.sendTelemetry('assistant_created', {
            version: await (0, utils_1.getAppVersion)(),
            assistantId: dbResponse.id
        });
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.createAssistant - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const deleteAssistant = async (assistantId, isDeleteBoth) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const assistant = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).findOneBy({
            id: assistantId
        });
        if (!assistant) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Assistant ${assistantId} not found`);
        }
        try {
            const assistantDetails = JSON.parse(assistant.details);
            const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
                id: assistant.credential
            });
            if (!credential) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${assistant.credential} not found`);
            }
            // Decrpyt credentialData
            const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData);
            const openAIApiKey = decryptedCredentialData['openAIApiKey'];
            if (!openAIApiKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `OpenAI ApiKey not found`);
            }
            const openai = new openai_1.default({ apiKey: openAIApiKey });
            const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).delete({ id: assistantId });
            if (isDeleteBoth)
                await openai.beta.assistants.del(assistantDetails.id);
            return dbResponse;
        }
        catch (error) {
            if (error.status === 404 && error.type === 'invalid_request_error') {
                return 'OK';
            }
            else {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error deleting assistant - ${(0, utils_2.getErrorMessage)(error)}`);
            }
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.deleteAssistant - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getAllAssistants = async () => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).find();
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.getAllAssistants - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getAssistantById = async (assistantId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).findOneBy({
            id: assistantId
        });
        if (!dbResponse) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Assistant ${assistantId} not found`);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.getAssistantById - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const updateAssistant = async (assistantId, requestBody) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const assistant = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).findOneBy({
            id: assistantId
        });
        if (!assistant) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Assistant ${assistantId} not found`);
        }
        try {
            const openAIAssistantId = JSON.parse(assistant.details)?.id;
            const body = requestBody;
            const assistantDetails = JSON.parse(body.details);
            const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
                id: body.credential
            });
            if (!credential) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${body.credential} not found`);
            }
            // Decrpyt credentialData
            const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData);
            const openAIApiKey = decryptedCredentialData['openAIApiKey'];
            if (!openAIApiKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `OpenAI ApiKey not found`);
            }
            const openai = new openai_1.default({ apiKey: openAIApiKey });
            let tools = [];
            if (assistantDetails.tools) {
                for (const tool of assistantDetails.tools ?? []) {
                    tools.push({
                        type: tool
                    });
                }
            }
            // Save tool_resources to be stored later into database
            const savedToolResources = (0, lodash_1.cloneDeep)(assistantDetails.tool_resources);
            // Cleanup tool_resources before updating
            if (assistantDetails.tool_resources) {
                for (const toolResource in assistantDetails.tool_resources) {
                    if (toolResource === 'file_search') {
                        assistantDetails.tool_resources['file_search'] = {
                            vector_store_ids: assistantDetails.tool_resources['file_search'].vector_store_ids
                        };
                    }
                    else if (toolResource === 'code_interpreter') {
                        assistantDetails.tool_resources['code_interpreter'] = {
                            file_ids: assistantDetails.tool_resources['code_interpreter'].file_ids
                        };
                    }
                }
            }
            const retrievedAssistant = await openai.beta.assistants.retrieve(openAIAssistantId);
            let filteredTools = (0, lodash_1.uniqWith)([...retrievedAssistant.tools.filter((tool) => tool.type === 'function'), ...tools], lodash_1.isEqual);
            filteredTools = filteredTools.filter((tool) => !(tool.type === 'function' && !tool.function));
            await openai.beta.assistants.update(openAIAssistantId, {
                name: assistantDetails.name,
                description: assistantDetails.description,
                instructions: assistantDetails.instructions,
                model: assistantDetails.model,
                tools: filteredTools,
                tool_resources: assistantDetails.tool_resources,
                temperature: assistantDetails.temperature,
                top_p: assistantDetails.top_p
            });
            const newAssistantDetails = {
                ...assistantDetails,
                id: openAIAssistantId
            };
            if (savedToolResources)
                newAssistantDetails.tool_resources = savedToolResources;
            const updateAssistant = new Assistant_1.Assistant();
            body.details = JSON.stringify(newAssistantDetails);
            Object.assign(updateAssistant, body);
            appServer.AppDataSource.getRepository(Assistant_1.Assistant).merge(assistant, updateAssistant);
            const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).save(assistant);
            return dbResponse;
        }
        catch (error) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error updating assistant - ${(0, utils_2.getErrorMessage)(error)}`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.updateAssistant - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    createAssistant,
    deleteAssistant,
    getAllAssistants,
    getAssistantById,
    updateAssistant
};
//# sourceMappingURL=index.js.map