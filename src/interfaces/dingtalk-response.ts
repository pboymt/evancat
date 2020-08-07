import { IncomingHttpHeaders } from "http";

export type IDingTalkResponse = IDingTalkResponseMarkdown | IDingTalkResponseText | IDingTalkResponseActionCard | IDingTalkResponseFeedCard;

/**
 * Response通用字段at
 */
export interface IDingTalkResponseAt {
    atMobiles: string[];
    isAtAll: boolean;
}

/**
 * text类型
 */
export interface IDingTalkResponseText {
    msgtype: 'text';
    text: IDingTalkResponseTextContent;
    at: IDingTalkResponseAt;
}

export interface IDingTalkResponseTextContent {
    content: string;
}

/**
 * markdown类型
 */
export interface IDingTalkResponseMarkdown {
    msgtype: 'markdown';
    markdown: IDingTalkResponseMarkdownContent;
    at: IDingTalkResponseAt;
}

export interface IDingTalkResponseMarkdownContent {
    title: string;
    text: string;
}

/**
 * actionCard类型
 */
export interface IDingTalkResponseActionCard {
    msgtype: 'actionCard';
    actionCard: IDingTalkResponseActionCardContentWithOneButton | IDingTalkResponseActionCardContentWithManyButtons;
}

export interface IDingTalkResponseActionCardContentWithOneButton {
    title: string; // 首屏会话透出的展示内容
    text: string; // markdown格式的消息内容
    singleTitle: string; // 单个按钮的标题
    singleURL: string; // 单个按钮的跳转链接
}

export interface IDingTalkResponseActionCardContentWithManyButtons {
    title: string; // 首屏会话透出的展示内容
    text: string; // markdown格式的消息内容
    hideAvatar: '0';
    btns: IDingTalkResponseActionCardButton[];
    btnOrientation?: '0' | '1'; // 0-按钮竖直排列，1-按钮横向排列
}

export interface IDingTalkResponseActionCardButton {
    title: string; // 点击标题
    actionURL: string; // 点击按钮触发的UR
}

/**
 * feedCard类型
 */
export interface IDingTalkResponseFeedCard {
    msgtype: 'feedCard';
    feedCard: IDingTalkResponseFeedCardContent;
}

export interface IDingTalkResponseFeedCardContent {
    links: IDingTalkResponseFeedCardLink[];
}

export interface IDingTalkResponseFeedCardLink {
    title: string;
    messageURL: string;
    picURL: string;
}