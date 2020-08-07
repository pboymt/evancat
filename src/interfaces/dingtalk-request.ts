import { IncomingHttpHeaders } from "http";

export interface IDingTalkRequestHeader extends IncomingHttpHeaders {
    timestamp?: string;
    sign?: string;
}

export type IDingTalkRequestBody = IDingTalkRequestBodyGroup | IDingTalkRequestBodyPrivate;

export interface IDingTalkRequestBodyGroup {
    msgtype: 'text';
    text: IDingTalkRequestBodyText;
    msgId: string;
    createAt: number; // ms
    sessionWebhookExpiredTime: number; // ms
    sessionWebhook: string;
    conversationType: '2'; // 1为私信，2为群对话
    conversationId: string;
    conversationTitle: string; // "钉钉群标题",
    senderId: string;
    senderNick: string;
    isAdmin: boolean;
    senderCorpId: string;
    senderStaffId: string; // userid
    chatbotCorpId: string;
    chatbotUserId: string;
    atUsers: IDingTalkRequestBodyAtUser[];
    isInAtList: boolean;
}

export interface IDingTalkRequestBodyPrivate {
    msgtype: 'text';
    text: IDingTalkRequestBodyText;
    msgId: string;
    createAt: number; // ms
    sessionWebhookExpiredTime: number; // ms
    sessionWebhook: string;
    conversationType: '1'; // 1为私信，2为群对话
    conversationId: string;
    senderId: string;
    senderNick: string;
    isAdmin: boolean;
    senderCorpId: string;
    senderStaffId: string; // userid
    chatbotCorpId: string;
    chatbotUserId: string;
}

export interface IDingTalkRequestBodyText {
    content: string;
}

export interface IDingTalkRequestBodyAtUser {
    dingtalkId: string;
    staffId: string;
}