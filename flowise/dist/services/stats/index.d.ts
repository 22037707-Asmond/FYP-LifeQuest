import { chatType } from '../../Interface';
declare const _default: {
    getChatflowStats: (chatflowid: string, chatTypeFilter: chatType | undefined, startDate?: string, endDate?: string, messageId?: string, feedback?: boolean) => Promise<any>;
};
export default _default;
