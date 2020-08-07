import Axios from "axios";
import { html2md } from "./html2markdown";
import { JSDOM } from "jsdom";
import { static_url } from "../statics";

/**
 * 1. 公告
 * 2. 新闻
 * 4. 活动
 * 6. 本地化笔记
 */
export enum NewsType {
    ALL = '',
    NOTICE = '1',
    NEWS = '2',
    EVENT = '4',
    NOTE = '6'
}

function get_news_list_url(news_type: NewsType, page: number) {
    const url = new URL('https://api.biligame.com/news/list');
    url.searchParams.append('gameExtensionId', '267'); // Bilibili游戏库ID
    url.searchParams.append('positionId', '2');
    url.searchParams.append('pageNum', page.toString());
    url.searchParams.append('pageSize', '5');
    url.searchParams.append('typeId', news_type);
    return url.toString()
}

interface IOfficialResponse {
    code: number;
    data: IOfficialNews[];
    pageNo: string;
    "request-id": string;
    totalNum: number;
}

interface IOfficialNews {
    content: string;
    createTime: string;
    ctime: string;
    id: number;
    modifyTime: string;
    mtime: string;
    title: string;
    typeId: string;
}

interface IOfficialNewsDetail {
    code: number;
    data: IOfficialNewsDetailData;
    gameInfo: object;
    "request-id": string;
}

interface IOfficialNewsDetailData {
    author: string;
    commentId: string;
    content: string;
    gameExtensionId: number;
    id: number;
    modifyTime: string;
    site: string;
    title: string;
    typeId: '1' | '2' | '4' | '6';
    typeName: string;
}

export class OfficialNews {

    content: string;
    createTime: Date;
    id: number;
    modifyTime: Date;
    title: string;
    typeId: string;

    constructor(raw: IOfficialNews) {
        this.content = raw.content;
        this.createTime = new Date(raw.createTime);
        this.id = raw.id;
        this.modifyTime = new Date(raw.modifyTime);
        this.title = raw.title;
        this.typeId = raw.typeId;
    }

    markdown() {
        return html2md(this.content);
    }

    async image() {
        const detail = await this.detail();
        if (detail && detail.data && detail.data.content) {
            const dom = new JSDOM(this.content);
            const img = dom.window.document.querySelector('img');
            if (img) {
                return img.src;
            }
        }
        return static_url('images/official-site-notice.jpg');
    }

    async detail() {
        const url = new URL(`https://api.biligame.com/news/${this.id}`);
        const response = await Axios.get<IOfficialNewsDetail>(url.toString());
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    }

}

export async function get_official_news(news_type: NewsType = NewsType.ALL, page = 1) {
    const response = await Axios.get<IOfficialResponse>(get_news_list_url(news_type, page));
    if (response.status === 200) {
        const news_list = response.data.data.map(v => new OfficialNews(v));
        if (news_list.length && page === 1 && news_list[0].id === 5048) {
            news_list.shift();
        }
        return news_list;
    } else {
        return [];
    }
}