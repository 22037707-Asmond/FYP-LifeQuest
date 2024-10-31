"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const documentstore_1 = __importDefault(require("../../services/documentstore"));
const DocumentStore_1 = require("../../database/entities/DocumentStore");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const Interface_1 = require("../../Interface");
const createDocumentStore = async (req, res, next) => {
    try {
        if (typeof req.body === 'undefined') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.createDocumentStore - body not provided!`);
        }
        const body = req.body;
        const docStore = Interface_1.DocumentStoreDTO.toEntity(body);
        const apiResponse = await documentstore_1.default.createDocumentStore(docStore);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getAllDocumentStores = async (req, res, next) => {
    try {
        const apiResponse = await documentstore_1.default.getAllDocumentStores();
        return res.json(Interface_1.DocumentStoreDTO.fromEntities(apiResponse));
    }
    catch (error) {
        next(error);
    }
};
const deleteLoaderFromDocumentStore = async (req, res, next) => {
    try {
        const storeId = req.params.id;
        const loaderId = req.params.loaderId;
        if (!storeId || !loaderId) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.deleteLoaderFromDocumentStore - missing storeId or loaderId.`);
        }
        const apiResponse = await documentstore_1.default.deleteLoaderFromDocumentStore(storeId, loaderId);
        return res.json(Interface_1.DocumentStoreDTO.fromEntity(apiResponse));
    }
    catch (error) {
        next(error);
    }
};
const getDocumentStoreById = async (req, res, next) => {
    try {
        if (typeof req.params.id === 'undefined' || req.params.id === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.getDocumentStoreById - id not provided!`);
        }
        const apiResponse = await documentstore_1.default.getDocumentStoreById(req.params.id);
        if (apiResponse && apiResponse.whereUsed) {
            apiResponse.whereUsed = JSON.stringify(await documentstore_1.default.getUsedChatflowNames(apiResponse));
        }
        return res.json(Interface_1.DocumentStoreDTO.fromEntity(apiResponse));
    }
    catch (error) {
        next(error);
    }
};
const getDocumentStoreFileChunks = async (req, res, next) => {
    try {
        if (typeof req.params.storeId === 'undefined' || req.params.storeId === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.getDocumentStoreFileChunks - storeId not provided!`);
        }
        if (typeof req.params.fileId === 'undefined' || req.params.fileId === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.getDocumentStoreFileChunks - fileId not provided!`);
        }
        const page = req.params.pageNo ? parseInt(req.params.pageNo) : 1;
        const apiResponse = await documentstore_1.default.getDocumentStoreFileChunks(req.params.storeId, req.params.fileId, page);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const deleteDocumentStoreFileChunk = async (req, res, next) => {
    try {
        if (typeof req.params.storeId === 'undefined' || req.params.storeId === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.deleteDocumentStoreFileChunk - storeId not provided!`);
        }
        if (typeof req.params.loaderId === 'undefined' || req.params.loaderId === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.deleteDocumentStoreFileChunk - loaderId not provided!`);
        }
        if (typeof req.params.chunkId === 'undefined' || req.params.chunkId === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.deleteDocumentStoreFileChunk - chunkId not provided!`);
        }
        const apiResponse = await documentstore_1.default.deleteDocumentStoreFileChunk(req.params.storeId, req.params.loaderId, req.params.chunkId);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const editDocumentStoreFileChunk = async (req, res, next) => {
    try {
        if (typeof req.params.storeId === 'undefined' || req.params.storeId === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.editDocumentStoreFileChunk - storeId not provided!`);
        }
        if (typeof req.params.loaderId === 'undefined' || req.params.loaderId === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.editDocumentStoreFileChunk - loaderId not provided!`);
        }
        if (typeof req.params.chunkId === 'undefined' || req.params.chunkId === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.editDocumentStoreFileChunk - chunkId not provided!`);
        }
        const body = req.body;
        if (typeof body === 'undefined') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.editDocumentStoreFileChunk - body not provided!`);
        }
        const apiResponse = await documentstore_1.default.editDocumentStoreFileChunk(req.params.storeId, req.params.loaderId, req.params.chunkId, body.pageContent, body.metadata);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const processFileChunks = async (req, res, next) => {
    try {
        if (typeof req.body === 'undefined') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.processFileChunks - body not provided!`);
        }
        const body = req.body;
        const apiResponse = await documentstore_1.default.processAndSaveChunks(body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const updateDocumentStore = async (req, res, next) => {
    try {
        if (typeof req.params.id === 'undefined' || req.params.id === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.updateDocumentStore - storeId not provided!`);
        }
        if (typeof req.body === 'undefined') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.updateDocumentStore - body not provided!`);
        }
        const store = await documentstore_1.default.getDocumentStoreById(req.params.id);
        if (!store) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: documentStoreController.updateDocumentStore - DocumentStore ${req.params.id} not found in the database`);
        }
        const body = req.body;
        const updateDocStore = new DocumentStore_1.DocumentStore();
        Object.assign(updateDocStore, body);
        const apiResponse = await documentstore_1.default.updateDocumentStore(store, updateDocStore);
        return res.json(Interface_1.DocumentStoreDTO.fromEntity(apiResponse));
    }
    catch (error) {
        next(error);
    }
};
const deleteDocumentStore = async (req, res, next) => {
    try {
        if (typeof req.params.id === 'undefined' || req.params.id === '') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.deleteDocumentStore - storeId not provided!`);
        }
        const apiResponse = await documentstore_1.default.deleteDocumentStore(req.params.id);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const previewFileChunks = async (req, res, next) => {
    try {
        if (typeof req.body === 'undefined') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: documentStoreController.previewFileChunks - body not provided!`);
        }
        const body = req.body;
        body.preview = true;
        const apiResponse = await documentstore_1.default.previewChunks(body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const getDocumentLoaders = async (req, res, next) => {
    try {
        const apiResponse = await documentstore_1.default.getDocumentLoaders();
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    deleteDocumentStore,
    createDocumentStore,
    getAllDocumentStores,
    deleteLoaderFromDocumentStore,
    getDocumentStoreById,
    getDocumentStoreFileChunks,
    updateDocumentStore,
    processFileChunks,
    previewFileChunks,
    getDocumentLoaders,
    deleteDocumentStoreFileChunk,
    editDocumentStoreFileChunk
};
//# sourceMappingURL=index.js.map