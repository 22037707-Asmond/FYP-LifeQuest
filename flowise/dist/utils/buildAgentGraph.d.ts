import { Server } from 'socket.io';
import { IChatFlow, IncomingInput } from '../Interface';
/**
 * Build Agent Graph
 * @param {IChatFlow} chatflow
 * @param {string} chatId
 * @param {string} sessionId
 * @param {ICommonObject} incomingInput
 * @param {boolean} isInternal
 * @param {string} baseURL
 * @param {Server} socketIO
 */
export declare const buildAgentGraph: (chatflow: IChatFlow, chatId: string, sessionId: string, incomingInput: IncomingInput, isInternal: boolean, baseURL?: string, socketIO?: Server) => Promise<any>;
