import { IDingTalkRequestBody, IDingTalkResponse } from "../interface";
import { response_calendar } from "./calendar";

export async function switch_response(msg: IDingTalkRequestBody): Promise<IDingTalkResponse> {
    const msg_text = msg.text.content.trim();
    if (msg_text === '') {
        return {
            msgtype: 'text',
            text: {
                content: '你倒是说句话啊！'
            },
            at: {
                atMobiles: [],
                isAtAll: false
            }
        }
    } else if (/^日程表/.test(msg_text)) {
        return await response_calendar();
    } else {
        return {
            msgtype: 'text',
            text: {
                content: '你在说啥？'
            },
            at: {
                atMobiles: [],
                isAtAll: false
            }
        }
    }
}