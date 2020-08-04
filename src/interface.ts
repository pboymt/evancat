import { IncomingHttpHeaders } from "http";

export type IDingTalkResponse = IDingTalkResponseMarkdown | IDingTalkResponseText;

interface IDingTalkResponseText {
    msgtype: 'text';
    text: IDingTalkResponseTextContent;
    at: IDingTalkResponseAt;
}

interface IDingTalkResponseTextContent {
    content: string;
}

interface IDingTalkResponseMarkdown {
    msgtype: 'markdown';
    markdown: IDingTalkResponseMarkdownContent;
    at: IDingTalkResponseAt;
}

interface IDingTalkResponseMarkdownContent {
    title: string;
    text: string;
}

interface IDingTalkResponseAt {
    atMobiles: string[];
    isAtAll: boolean;
}

export interface IConfig {
    agent_id: string;
    app_key: string;
    app_secret: string;
}

export interface IDingTalkRequestHeader extends IncomingHttpHeaders {
    timestamp?: string;
    sign?: string;
}

export interface IDingTalkRequestBody {
    msgtype: 'text';
    text: IDingTalkRequestBodyText;
    msgId: string;
    createAt: number; // ms
    sessionWebhookExpiredTime: number; // ms
    sessionWebhook: string;
    conversationType: '1' | '2';
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

export interface IDingTalkRequestBodyText {
    content: string;
}

export interface IDingTalkRequestBodyAtUser {
    dingtalkId: string;
    staffId: string;
}