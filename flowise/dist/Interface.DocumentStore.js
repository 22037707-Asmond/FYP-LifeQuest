"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentStoreDTO = exports.DocumentStoreStatus = void 0;
const DocumentStore_1 = require("./database/entities/DocumentStore");
var DocumentStoreStatus;
(function (DocumentStoreStatus) {
    DocumentStoreStatus["EMPTY_SYNC"] = "EMPTY";
    DocumentStoreStatus["SYNC"] = "SYNC";
    DocumentStoreStatus["SYNCING"] = "SYNCING";
    DocumentStoreStatus["STALE"] = "STALE";
    DocumentStoreStatus["NEW"] = "NEW";
})(DocumentStoreStatus || (exports.DocumentStoreStatus = DocumentStoreStatus = {}));
class DocumentStoreDTO {
    constructor() { }
    static fromEntity(entity) {
        let documentStoreDTO = new DocumentStoreDTO();
        Object.assign(documentStoreDTO, entity);
        documentStoreDTO.id = entity.id;
        documentStoreDTO.name = entity.name;
        documentStoreDTO.description = entity.description;
        documentStoreDTO.status = entity.status;
        documentStoreDTO.totalChars = 0;
        documentStoreDTO.totalChunks = 0;
        if (entity.whereUsed) {
            documentStoreDTO.whereUsed = JSON.parse(entity.whereUsed);
        }
        else {
            documentStoreDTO.whereUsed = [];
        }
        if (entity.loaders) {
            documentStoreDTO.loaders = JSON.parse(entity.loaders);
            documentStoreDTO.loaders.map((loader) => {
                documentStoreDTO.totalChars += loader.totalChars;
                documentStoreDTO.totalChunks += loader.totalChunks;
                switch (loader.loaderId) {
                    case 'pdfFile':
                        loader.source = loader.loaderConfig.pdfFile.replace('FILE-STORAGE::', '');
                        break;
                    case 'apiLoader':
                        loader.source = loader.loaderConfig.url + ' (' + loader.loaderConfig.method + ')';
                        break;
                    case 'cheerioWebScraper':
                        loader.source = loader.loaderConfig.url;
                        break;
                    case 'playwrightWebScraper':
                        loader.source = loader.loaderConfig.url;
                        break;
                    case 'puppeteerWebScraper':
                        loader.source = loader.loaderConfig.url;
                        break;
                    case 'jsonFile':
                        loader.source = loader.loaderConfig.jsonFile.replace('FILE-STORAGE::', '');
                        break;
                    case 'docxFile':
                        loader.source = loader.loaderConfig.docxFile.replace('FILE-STORAGE::', '');
                        break;
                    case 'textFile':
                        loader.source = loader.loaderConfig.txtFile.replace('FILE-STORAGE::', '');
                        break;
                    case 'unstructuredFileLoader':
                        loader.source = loader.loaderConfig.filePath;
                        break;
                    default:
                        loader.source = 'None';
                        break;
                }
                if (loader.status !== 'SYNC') {
                    documentStoreDTO.status = DocumentStoreStatus.STALE;
                }
            });
        }
        return documentStoreDTO;
    }
    static fromEntities(entities) {
        return entities.map((entity) => this.fromEntity(entity));
    }
    static toEntity(body) {
        const docStore = new DocumentStore_1.DocumentStore();
        Object.assign(docStore, body);
        docStore.loaders = '[]';
        docStore.whereUsed = '[]';
        // when a new document store is created, it is empty and in sync
        docStore.status = DocumentStoreStatus.EMPTY_SYNC;
        return docStore;
    }
}
exports.DocumentStoreDTO = DocumentStoreDTO;
//# sourceMappingURL=Interface.DocumentStore.js.map