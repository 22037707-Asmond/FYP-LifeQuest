import { DocumentStore } from '../../database/entities/DocumentStore';
import { ICommonObject, IDocument } from 'flowise-components';
import { IDocumentStoreFileChunkPagedResponse, IDocumentStoreLoaderForPreview, IDocumentStoreWhereUsed } from '../../Interface';
declare const _default: {
    updateDocumentStoreUsage: (chatId: string, storeId: string | undefined) => Promise<void>;
    deleteDocumentStore: (storeId: string) => Promise<{
        deleted: number | null | undefined;
    }>;
    createDocumentStore: (newDocumentStore: DocumentStore) => Promise<DocumentStore>;
    deleteLoaderFromDocumentStore: (storeId: string, loaderId: string) => Promise<DocumentStore>;
    getAllDocumentStores: () => Promise<DocumentStore[]>;
    getDocumentStoreById: (storeId: string) => Promise<DocumentStore>;
    getUsedChatflowNames: (entity: DocumentStore) => Promise<IDocumentStoreWhereUsed[]>;
    getDocumentStoreFileChunks: (storeId: string, fileId: string, pageNo?: number) => Promise<IDocumentStoreFileChunkPagedResponse>;
    updateDocumentStore: (documentStore: DocumentStore, updatedDocumentStore: DocumentStore) => Promise<DocumentStore>;
    previewChunks: (data: IDocumentStoreLoaderForPreview) => Promise<{
        chunks: IDocument<Record<string, any>>[];
        totalChunks: number;
        previewChunkCount: number;
    }>;
    processAndSaveChunks: (data: IDocumentStoreLoaderForPreview) => Promise<IDocumentStoreFileChunkPagedResponse>;
    deleteDocumentStoreFileChunk: (storeId: string, docId: string, chunkId: string) => Promise<IDocumentStoreFileChunkPagedResponse>;
    editDocumentStoreFileChunk: (storeId: string, docId: string, chunkId: string, content: string, metadata: ICommonObject) => Promise<IDocumentStoreFileChunkPagedResponse>;
    getDocumentLoaders: () => Promise<import("flowise-components").INode[]>;
};
export default _default;
