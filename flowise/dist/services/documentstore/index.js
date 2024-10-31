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
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const DocumentStore_1 = require("../../database/entities/DocumentStore");
// @ts-ignore
const flowise_components_1 = require("flowise-components");
const Interface_1 = require("../../Interface");
const DocumentStoreFileChunk_1 = require("../../database/entities/DocumentStoreFileChunk");
const uuid_1 = require("uuid");
const utils_1 = require("../../utils");
const logger_1 = __importDefault(require("../../utils/logger"));
const nodes_1 = __importDefault(require("../nodes"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const utils_2 = require("../../errors/utils");
const ChatFlow_1 = require("../../database/entities/ChatFlow");
const DOCUMENT_STORE_BASE_FOLDER = 'docustore';
const createDocumentStore = async (newDocumentStore) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const documentStore = appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).create(newDocumentStore);
        const dbResponse = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(documentStore);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.createDocumentStore - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getAllDocumentStores = async () => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const entities = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).find();
        return entities;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.getAllDocumentStores - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const deleteLoaderFromDocumentStore = async (storeId, loaderId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const entity = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).findOneBy({
            id: storeId
        });
        if (!entity) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: documentStoreServices.deleteLoaderFromDocumentStore - Document store ${storeId} not found`);
        }
        const existingLoaders = JSON.parse(entity.loaders);
        const found = existingLoaders.find((uFile) => uFile.id === loaderId);
        if (found) {
            if (found.files?.length) {
                for (const file of found.files) {
                    if (file.name) {
                        await (0, flowise_components_1.removeSpecificFileFromStorage)(DOCUMENT_STORE_BASE_FOLDER, storeId, file.name);
                    }
                }
            }
            const index = existingLoaders.indexOf(found);
            if (index > -1) {
                existingLoaders.splice(index, 1);
            }
            // remove the chunks
            await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).delete({ docId: found.id });
            entity.loaders = JSON.stringify(existingLoaders);
            const results = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(entity);
            return results;
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Unable to locate loader in Document Store ${entity.name}`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.deleteLoaderFromDocumentStore - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getDocumentStoreById = async (storeId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const entity = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).findOneBy({
            id: storeId
        });
        if (!entity) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: documentStoreServices.getDocumentStoreById - Document store ${storeId} not found`);
        }
        return entity;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.getDocumentStoreById - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getUsedChatflowNames = async (entity) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (entity.whereUsed) {
            const whereUsed = JSON.parse(entity.whereUsed);
            const updatedWhereUsed = [];
            for (let i = 0; i < whereUsed.length; i++) {
                const associatedChatflow = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow).findOne({
                    where: { id: whereUsed[i] },
                    select: ['id', 'name']
                });
                if (associatedChatflow) {
                    updatedWhereUsed.push({
                        id: whereUsed[i],
                        name: associatedChatflow.name
                    });
                }
            }
            return updatedWhereUsed;
        }
        return [];
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.getUsedChatflowNames - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Get chunks for a specific loader or store
const getDocumentStoreFileChunks = async (storeId, fileId, pageNo = 1) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const entity = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).findOneBy({
            id: storeId
        });
        if (!entity) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: documentStoreServices.getDocumentStoreById - Document store ${storeId} not found`);
        }
        const loaders = JSON.parse(entity.loaders);
        let found;
        if (fileId !== 'all') {
            found = loaders.find((loader) => loader.id === fileId);
            if (!found) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: documentStoreServices.getDocumentStoreById - Document file ${fileId} not found`);
            }
        }
        let totalChars = 0;
        loaders.forEach((loader) => {
            totalChars += loader.totalChars;
        });
        if (found) {
            found.totalChars = totalChars;
            found.id = fileId;
            found.status = entity.status;
        }
        const PAGE_SIZE = 50;
        const skip = (pageNo - 1) * PAGE_SIZE;
        const take = PAGE_SIZE;
        let whereCondition = { docId: fileId };
        if (fileId === 'all') {
            whereCondition = { storeId: storeId };
        }
        const count = await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).count({
            where: whereCondition
        });
        const chunksWithCount = await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).find({
            skip,
            take,
            where: whereCondition,
            order: {
                chunkNo: 'ASC'
            }
        });
        if (!chunksWithCount) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `File ${fileId} not found`);
        }
        const response = {
            chunks: chunksWithCount,
            count: count,
            file: found,
            currentPage: pageNo,
            storeName: entity.name,
            description: entity.description
        };
        return response;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.getDocumentStoreFileChunks - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const deleteDocumentStore = async (storeId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        // delete all the chunks associated with the store
        await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).delete({
            storeId: storeId
        });
        // now delete the files associated with the store
        const entity = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).findOneBy({
            id: storeId
        });
        if (!entity)
            throw new Error(`Document store ${storeId} not found`);
        await (0, flowise_components_1.removeFilesFromStorage)(DOCUMENT_STORE_BASE_FOLDER, entity.id);
        // now delete the store
        const tbd = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).delete({
            id: storeId
        });
        return { deleted: tbd.affected };
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.deleteDocumentStore - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const deleteDocumentStoreFileChunk = async (storeId, docId, chunkId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const entity = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).findOneBy({
            id: storeId
        });
        if (!entity) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Document store ${storeId} not found`);
        }
        const loaders = JSON.parse(entity.loaders);
        const found = loaders.find((ldr) => ldr.id === docId);
        if (!found) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Document store loader ${docId} not found`);
        }
        const tbdChunk = await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).findOneBy({
            id: chunkId
        });
        if (!tbdChunk) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Document Chunk ${chunkId} not found`);
        }
        await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).delete(chunkId);
        found.totalChunks--;
        found.totalChars -= tbdChunk.pageContent.length;
        entity.loaders = JSON.stringify(loaders);
        await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(entity);
        return getDocumentStoreFileChunks(storeId, docId);
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.deleteDocumentStoreFileChunk - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const editDocumentStoreFileChunk = async (storeId, docId, chunkId, content, metadata) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const entity = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).findOneBy({
            id: storeId
        });
        if (!entity) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Document store ${storeId} not found`);
        }
        const loaders = JSON.parse(entity.loaders);
        const found = loaders.find((ldr) => ldr.id === docId);
        if (!found) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Document store loader ${docId} not found`);
        }
        const editChunk = await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).findOneBy({
            id: chunkId
        });
        if (!editChunk) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Document Chunk ${chunkId} not found`);
        }
        found.totalChars -= editChunk.pageContent.length;
        editChunk.pageContent = content;
        editChunk.metadata = JSON.stringify(metadata);
        found.totalChars += content.length;
        await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).save(editChunk);
        entity.loaders = JSON.stringify(loaders);
        await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(entity);
        return getDocumentStoreFileChunks(storeId, docId);
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.editDocumentStoreFileChunk - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Update documentStore
const updateDocumentStore = async (documentStore, updatedDocumentStore) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const tmpUpdatedDocumentStore = appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).merge(documentStore, updatedDocumentStore);
        const dbResponse = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(tmpUpdatedDocumentStore);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.updateDocumentStore - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const _saveFileToStorage = async (fileBase64, entity) => {
    const splitDataURI = fileBase64.split(',');
    const filename = splitDataURI.pop()?.split(':')[1] ?? '';
    const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
    const mimePrefix = splitDataURI.pop();
    let mime = '';
    if (mimePrefix) {
        mime = mimePrefix.split(';')[0].split(':')[1];
    }
    await (0, flowise_components_1.addSingleFileToStorage)(mime, bf, filename, DOCUMENT_STORE_BASE_FOLDER, entity.id);
    return {
        id: (0, uuid_1.v4)(),
        name: filename,
        mimePrefix: mime,
        size: bf.length,
        status: Interface_1.DocumentStoreStatus.NEW,
        uploaded: new Date()
    };
};
const _splitIntoChunks = async (data) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        let splitterInstance = null;
        if (data.splitterConfig && Object.keys(data.splitterConfig).length > 0) {
            const nodeInstanceFilePath = appServer.nodesPool.componentNodes[data.splitterId].filePath;
            const nodeModule = await Promise.resolve(`${nodeInstanceFilePath}`).then(s => __importStar(require(s)));
            const newNodeInstance = new nodeModule.nodeClass();
            let nodeData = {
                inputs: { ...data.splitterConfig },
                id: 'splitter_0'
            };
            splitterInstance = await newNodeInstance.init(nodeData);
        }
        const nodeInstanceFilePath = appServer.nodesPool.componentNodes[data.loaderId].filePath;
        const nodeModule = await Promise.resolve(`${nodeInstanceFilePath}`).then(s => __importStar(require(s)));
        // doc loader configs
        const nodeData = {
            credential: data.credential || undefined,
            inputs: { ...data.loaderConfig, textSplitter: splitterInstance },
            outputs: { output: 'document' }
        };
        const options = {
            chatflowid: (0, uuid_1.v4)(),
            appDataSource: appServer.AppDataSource,
            databaseEntities: utils_1.databaseEntities,
            logger: logger_1.default
        };
        const docNodeInstance = new nodeModule.nodeClass();
        let docs = await docNodeInstance.init(nodeData, '', options);
        return docs;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.splitIntoChunks - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const _normalizeFilePaths = async (data, entity) => {
    const keys = Object.getOwnPropertyNames(data.loaderConfig);
    let rehydrated = false;
    for (let i = 0; i < keys.length; i++) {
        const input = data.loaderConfig[keys[i]];
        if (!input) {
            continue;
        }
        if (typeof input !== 'string') {
            continue;
        }
        let documentStoreEntity = entity;
        if (input.startsWith('FILE-STORAGE::')) {
            if (!documentStoreEntity) {
                const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
                documentStoreEntity = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).findOneBy({
                    id: data.storeId
                });
                if (!documentStoreEntity) {
                    throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Document store ${data.storeId} not found`);
                }
            }
            const fileName = input.replace('FILE-STORAGE::', '');
            let files = [];
            if (fileName.startsWith('[') && fileName.endsWith(']')) {
                files = JSON.parse(fileName);
            }
            else {
                files = [fileName];
            }
            const loaders = JSON.parse(documentStoreEntity.loaders);
            const currentLoader = loaders.find((ldr) => ldr.id === data.id);
            if (currentLoader) {
                const base64Files = [];
                for (const file of files) {
                    const bf = await (0, flowise_components_1.getFileFromStorage)(file, DOCUMENT_STORE_BASE_FOLDER, documentStoreEntity.id);
                    // find the file entry that has the same name as the file
                    const uploadedFile = currentLoader.files.find((uFile) => uFile.name === file);
                    const mimePrefix = 'data:' + uploadedFile.mimePrefix + ';base64';
                    const base64String = mimePrefix + ',' + bf.toString('base64') + `,filename:${file}`;
                    base64Files.push(base64String);
                }
                data.loaderConfig[keys[i]] = JSON.stringify(base64Files);
                rehydrated = true;
            }
        }
    }
    data.rehydrated = rehydrated;
};
const previewChunks = async (data) => {
    try {
        if (data.preview) {
            if (data.loaderId === 'cheerioWebScraper' ||
                data.loaderId === 'puppeteerWebScraper' ||
                data.loaderId === 'playwrightWebScraper') {
                data.loaderConfig['limit'] = 3;
            }
        }
        if (!data.rehydrated) {
            await _normalizeFilePaths(data, null);
        }
        let docs = await _splitIntoChunks(data);
        const totalChunks = docs.length;
        // if -1, return all chunks
        if (data.previewChunkCount === -1)
            data.previewChunkCount = totalChunks;
        // return all docs if the user ask for more than we have
        if (totalChunks <= data.previewChunkCount)
            data.previewChunkCount = totalChunks;
        // return only the first n chunks
        if (totalChunks > data.previewChunkCount)
            docs = docs.slice(0, data.previewChunkCount);
        return { chunks: docs, totalChunks: totalChunks, previewChunkCount: data.previewChunkCount };
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.previewChunks - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const processAndSaveChunks = async (data) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const entity = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).findOneBy({
            id: data.storeId
        });
        if (!entity) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: documentStoreServices.processAndSaveChunks - Document store ${data.storeId} not found`);
        }
        const newLoaderId = data.id ?? (0, uuid_1.v4)();
        const existingLoaders = JSON.parse(entity.loaders);
        const found = existingLoaders.find((ldr) => ldr.id === newLoaderId);
        if (found) {
            // clean up the current status and mark the loader as pending_sync
            found.totalChunks = 0;
            found.totalChars = 0;
            found.status = Interface_1.DocumentStoreStatus.SYNCING;
            entity.loaders = JSON.stringify(existingLoaders);
        }
        else {
            let loader = {
                id: newLoaderId,
                loaderId: data.loaderId,
                loaderName: data.loaderName,
                loaderConfig: data.loaderConfig,
                splitterId: data.splitterId,
                splitterName: data.splitterName,
                splitterConfig: data.splitterConfig,
                totalChunks: 0,
                totalChars: 0,
                status: Interface_1.DocumentStoreStatus.SYNCING
            };
            if (data.credential) {
                loader.credential = data.credential;
            }
            existingLoaders.push(loader);
            entity.loaders = JSON.stringify(existingLoaders);
        }
        await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(entity);
        // this method will run async, will have to be moved to a worker thread
        _saveChunksToStorage(data, entity, newLoaderId).then(() => { });
        return getDocumentStoreFileChunks(data.storeId, newLoaderId);
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.processAndSaveChunks - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const _saveChunksToStorage = async (data, entity, newLoaderId) => {
    const re = new RegExp('^data.*;base64', 'i');
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        //step 1: restore the full paths, if any
        await _normalizeFilePaths(data, entity);
        //step 2: split the file into chunks
        previewChunks(data).then(async (response) => {
            //step 3: remove all files associated with the loader
            const existingLoaders = JSON.parse(entity.loaders);
            const loader = existingLoaders.find((ldr) => ldr.id === newLoaderId);
            if (data.id) {
                const index = existingLoaders.indexOf(loader);
                if (index > -1) {
                    existingLoaders.splice(index, 1);
                    if (!data.rehydrated) {
                        if (loader.files) {
                            loader.files.map(async (file) => {
                                await (0, flowise_components_1.removeSpecificFileFromStorage)(DOCUMENT_STORE_BASE_FOLDER, entity.id, file.name);
                            });
                        }
                    }
                }
            }
            //step 4: save new file to storage
            let filesWithMetadata = [];
            const keys = Object.getOwnPropertyNames(data.loaderConfig);
            for (let i = 0; i < keys.length; i++) {
                const input = data.loaderConfig[keys[i]];
                if (!input) {
                    continue;
                }
                if (typeof input !== 'string') {
                    continue;
                }
                if (input.startsWith('[') && input.endsWith(']')) {
                    const files = JSON.parse(input);
                    const fileNames = [];
                    for (let j = 0; j < files.length; j++) {
                        const file = files[j];
                        if (re.test(file)) {
                            const fileMetadata = await _saveFileToStorage(file, entity);
                            fileNames.push(fileMetadata.name);
                            filesWithMetadata.push(fileMetadata);
                        }
                    }
                    data.loaderConfig[keys[i]] = 'FILE-STORAGE::' + JSON.stringify(fileNames);
                }
                else if (re.test(input)) {
                    const fileNames = [];
                    const fileMetadata = await _saveFileToStorage(input, entity);
                    fileNames.push(fileMetadata.name);
                    filesWithMetadata.push(fileMetadata);
                    data.loaderConfig[keys[i]] = 'FILE-STORAGE::' + JSON.stringify(fileNames);
                    break;
                }
            }
            //step 5: update with the new files and loaderConfig
            if (filesWithMetadata.length > 0) {
                loader.loaderConfig = data.loaderConfig;
                loader.files = filesWithMetadata;
            }
            //step 6: update the loaders with the new loaderConfig
            if (data.id) {
                existingLoaders.push(loader);
            }
            //step 7: remove all previous chunks
            await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).delete({ docId: newLoaderId });
            if (response.chunks) {
                //step 8: now save the new chunks
                const totalChars = response.chunks.reduce((acc, chunk) => {
                    if (chunk.pageContent) {
                        return acc + chunk.pageContent.length;
                    }
                    return acc;
                }, 0);
                response.chunks.map(async (chunk, index) => {
                    const docChunk = {
                        docId: newLoaderId,
                        storeId: data.storeId || '',
                        id: (0, uuid_1.v4)(),
                        chunkNo: index + 1,
                        pageContent: chunk.pageContent,
                        metadata: JSON.stringify(chunk.metadata)
                    };
                    const dChunk = appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).create(docChunk);
                    await appServer.AppDataSource.getRepository(DocumentStoreFileChunk_1.DocumentStoreFileChunk).save(dChunk);
                });
                // update the loader with the new metrics
                loader.totalChunks = response.totalChunks;
                loader.totalChars = totalChars;
            }
            loader.status = 'SYNC';
            // have a flag and iterate over the loaders and update the entity status to SYNC
            const allSynced = existingLoaders.every((ldr) => ldr.status === 'SYNC');
            entity.status = allSynced ? Interface_1.DocumentStoreStatus.SYNC : Interface_1.DocumentStoreStatus.STALE;
            entity.loaders = JSON.stringify(existingLoaders);
            //step 9: update the entity in the database
            await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(entity);
            return;
        });
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices._saveChunksToStorage - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Get all component nodes
const getDocumentLoaders = async () => {
    const removeDocumentLoadersWithName = ['documentStore', 'vectorStoreToDocument', 'unstructuredFolderLoader', 'folderFiles'];
    try {
        const dbResponse = await nodes_1.default.getAllNodesForCategory('Document Loaders');
        return dbResponse.filter((node) => !removeDocumentLoadersWithName.includes(node.name));
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.getDocumentLoaders - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const updateDocumentStoreUsage = async (chatId, storeId) => {
    try {
        // find the document store
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        // find all entities that have the chatId in their whereUsed
        const entities = await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).find();
        entities.map(async (entity) => {
            const whereUsed = JSON.parse(entity.whereUsed);
            const found = whereUsed.find((w) => w === chatId);
            if (found) {
                if (!storeId) {
                    // remove the chatId from the whereUsed, as the store is being deleted
                    const index = whereUsed.indexOf(chatId);
                    if (index > -1) {
                        whereUsed.splice(index, 1);
                        entity.whereUsed = JSON.stringify(whereUsed);
                        await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(entity);
                    }
                }
                else if (entity.id === storeId) {
                    // do nothing, already found and updated
                }
                else if (entity.id !== storeId) {
                    // remove the chatId from the whereUsed, as a new store is being used
                    const index = whereUsed.indexOf(chatId);
                    if (index > -1) {
                        whereUsed.splice(index, 1);
                        entity.whereUsed = JSON.stringify(whereUsed);
                        await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(entity);
                    }
                }
            }
            else {
                if (entity.id === storeId) {
                    // add the chatId to the whereUsed
                    whereUsed.push(chatId);
                    entity.whereUsed = JSON.stringify(whereUsed);
                    await appServer.AppDataSource.getRepository(DocumentStore_1.DocumentStore).save(entity);
                }
            }
        });
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: documentStoreServices.updateDocumentStoreUsage - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    updateDocumentStoreUsage,
    deleteDocumentStore,
    createDocumentStore,
    deleteLoaderFromDocumentStore,
    getAllDocumentStores,
    getDocumentStoreById,
    getUsedChatflowNames,
    getDocumentStoreFileChunks,
    updateDocumentStore,
    previewChunks,
    processAndSaveChunks,
    deleteDocumentStoreFileChunk,
    editDocumentStoreFileChunk,
    getDocumentLoaders
};
//# sourceMappingURL=index.js.map