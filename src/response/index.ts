import { IDingTalkRequestBody, IDingTalkResponse } from "../interfaces";
import { response_calendar, response_today_event, response_tomorrow_event } from "./calendar";
import { response_help } from "./help";
import { response_latest_news, response_news_list } from "./news";

export async function switch_response(msg: IDingTalkRequestBody): Promise<IDingTalkResponse> {
    const msg_text = msg.text.content.trim().replace(/\s{2,}/, ' ');
    const args = msg_text.split(' ');
    if (args[0] === '') {
        return empty_response('你倒是说句话啊！');
    } else if (/^(帮助|help)/.test(args[0])) {
        return response_help(args);
    } else if (['日程表', '近期活动'].includes(args[0])) {
        return await response_calendar();
    } else if (['今天', '今日', '今天日程', '今日日程', '今天活动', '今日活动', '活动'].includes(args[0])) {
        return await response_today_event();
    } else if (['明天', '明日', '明天日程', '明日日程', '明天活动', '明日活动'].includes(args[0])) {
        return await response_tomorrow_event();
    } else if (['新闻', '最新新闻'].includes(args[0])) {
        return await response_latest_news(args);
    } else if (['新闻列表'].includes(args[0])) {
        return await response_news_list(args);
    }
    else {
        return empty_response('你在说啥？');
    }
}

function empty_response(msg: string): IDingTalkResponse {
    return {
        msgtype: 'text',
        text: {
            content: msg
        },
        at: {
            atMobiles: [],
            isAtAll: false
        }
    }
}