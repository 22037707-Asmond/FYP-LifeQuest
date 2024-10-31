"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentstore_1 = __importDefault(require("../../controllers/documentstore"));
const router = express_1.default.Router();
/** Document Store Routes */
// Create document store
router.post('/store', documentstore_1.default.createDocumentStore);
// List all stores
router.get('/stores', documentstore_1.default.getAllDocumentStores);
// Get specific store
router.get('/store/:id', documentstore_1.default.getDocumentStoreById);
// Update documentStore
router.put('/store/:id', documentstore_1.default.updateDocumentStore);
// Delete documentStore
router.delete('/store/:id', documentstore_1.default.deleteDocumentStore);
/** Component Nodes = Document Store - Loaders */
// Get all loaders
router.get('/loaders', documentstore_1.default.getDocumentLoaders);
// delete loader from document store
router.delete('/loader/:id/:loaderId', documentstore_1.default.deleteLoaderFromDocumentStore);
// chunking preview
router.post('/loader/preview', documentstore_1.default.previewFileChunks);
// chunking process
router.post('/loader/process', documentstore_1.default.processFileChunks);
/** Document Store - Loaders - Chunks */
// delete specific file chunk from the store
router.delete('/chunks/:storeId/:loaderId/:chunkId', documentstore_1.default.deleteDocumentStoreFileChunk);
// edit specific file chunk from the store
router.put('/chunks/:storeId/:loaderId/:chunkId', documentstore_1.default.editDocumentStoreFileChunk);
// Get all file chunks from the store
router.get('/chunks/:storeId/:fileId/:pageNo', documentstore_1.default.getDocumentStoreFileChunks);
exports.default = router;
//# sourceMappingURL=index.js.map