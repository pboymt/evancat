import { IDingTalkRequestBody, IDingTalkResponse } from "../interface";
import { response_calendar, response_today_event } from "./calendar";

export async function switch_response(msg: IDingTalkRequestBody): Promise<IDingTalkResponse> {
    const msg_text = msg.text.content.trim();
    if (msg_text === '') {
        return empty_response('你倒是说句话啊！');
    } else if (['日程表', '近期活动'].includes(msg_text)) {
        return await response_calendar();
    } else if (['今天', '今日', '今天日程', '今日日程', '今天活动', '今日活动', '活动'].includes(msg_text)) {
        return await response_today_event();
    } else if (['明天', '明日', '明天日程', '明日日程', '明天活动', '明日活动'].includes(msg_text)) {
        return await response_today_event();
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