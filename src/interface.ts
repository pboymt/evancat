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