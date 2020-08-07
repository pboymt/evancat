import { IDingTalkResponse, IDingTalkResponseActionCard, IDingTalkResponseFeedCardLink } from "../interfaces";
import { get_official_news, NewsType } from "../modules/official-site/news";
import { register_help } from "../modules/help";

register_help(
    '最新新闻',
    '新闻 或 最新新闻',
    '获取国服官网最新一则消息'
)
export async function response_latest_news(args: string[]): Promise<IDingTalkResponse> {
    // https://game.bilibili.com/pcr/news.html#news_detail_id=5826
    const list = await get_official_news(NewsType.ALL, 1);
    if (list.length) {
        const news = list[0];
        return {
            msgtype: 'actionCard',
            actionCard: {
                title: news.title,
                text: news.markdown(),
                singleTitle: '阅读全文',
                singleURL: `https://game.bilibili.com/pcr/news.html#news_detail_id=${news.id}`
            }
        }
    } else {
        return {
            msgtype: 'text',
            text: {
                content: '没有抓取到新闻！'
            },
            at: {
                atMobiles: [],
                isAtAll: false
            }
        }
    }
}

register_help(
    '新闻列表',
    '新闻列表 [全部|公告|新闻|活动|本地化笔记]',
    '获取国服官网最新的几则新闻'
)
export async function response_news_list(args: string[]): Promise<IDingTalkResponse> {
    let news_type: NewsType;
    switch (args[1]) {
        case '公告':
            news_type = NewsType.NOTICE
            break;
        case '新闻':
            news_type = NewsType.NEWS
            break;
        case '活动':
            news_type = NewsType.EVENT
            break;
        case '本地化笔记':
            news_type = NewsType.NOTE
            break;
        case '全部':
        default:
            news_type = NewsType.ALL
            break;
    }
    const list = await get_official_news(news_type, 1);
    if (list.length) {
        const feed_links: IDingTalkResponseFeedCardLink[] = [];
        for (const news of list) {
            const feed = {
                title: news.title,
                messageURL: `https://game.bilibili.com/pcr/news.html#news_detail_id=${news.id}`,
                picURL: await news.image()
            }
            feed_links.push(feed)
        }
        return {
            msgtype: 'feedCard',
            feedCard: {
                links: feed_links
            }
        }
    } else {
        return {
            msgtype: 'text',
            text: {
                content: '没有抓取到新闻！'
            },
            at: {
                atMobiles: [],
                isAtAll: false
            }
        }
    }
}