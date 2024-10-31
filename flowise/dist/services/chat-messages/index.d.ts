import { DeleteResult, FindOptionsWhere } from 'typeorm';
import { chatType, IChatMessage } from '../../Interface';
import { ChatMessage } from '../../database/entities/ChatMessage';
declare const _default: {
    createChatMessage: (chatMessage: Partial<IChatMessage>) => Promise<ChatMessage>;
    getAllChatMessages: (chatflowId: string, chatTypeFilter: chatType | undefined, sortOrder?: string, chatId?: string, memoryType?: string, sessionId?: string, startDate?: string, endDate?: string, messageId?: string, feedback?: boolean) => Promise<ChatMessage[]>;
    getAllInternalChatMessages: (chatflowId: string, chatTypeFilter: chatType | undefined, sortOrder?: string, chatId?: string, memoryType?: string, sessionId?: string, startDate?: string, endDate?: string, messageId?: string, feedback?: boolean) => Promise<ChatMessage[]>;
    removeAllChatMessages: (chatId: string, chatflowid: string, deleteOptions: FindOptionsWhere<ChatMessage>) => Promise<DeleteResult>;
    abortChatMessage: (chatId: string, chatflowid: string) => Promise<void>;
};
export default _default;
