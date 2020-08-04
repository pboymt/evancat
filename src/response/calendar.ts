import { IDingTalkResponse } from "../interface";
import { get_canlendar } from "../modules/news/calendar";

export async function response_calendar(): Promise<IDingTalkResponse> {
    const calendar = await get_canlendar();
    let content = '获取失败';
    if (calendar) {
        content = '';
        const today = new Date();
        try {
            const today_events = calendar[today.getFullYear()][today.getMonth() + 1][today.getDate()];
            content += `今日\n`;
            if (today_events.qdhd.length) {
                content += `庆典活动：\n${today_events.qdhd}\n`;
            }
            if (today_events.jqhd.length) {
                content += `剧情活动：\n${today_events.jqhd}\n`;
            }
            if (today_events.tbhd.length) {
                content += `特别活动：\n${today_events.tbhd}\n`;
            }
            if (today_events.tdz.length) {
                content += `团队战：\n${today_events.tdz}\n`;
            }
            if (today_events.jssr.length) {
                content += `角色生日：\n${today_events.jssr}\n`;
            }
        } catch {

        }
        for (let index = 0; index < 6; index++) {
            today.setTime(today.getTime() + 86400000);
            const today_events = calendar[today.getFullYear()][today.getMonth() + 1][today.getDate()];
            content += `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}\n`;
            if (today_events.qdhd.length) {
                content += `庆典活动：\n${today_events.qdhd}\n`;
            }
            if (today_events.jqhd.length) {
                content += `剧情活动：\n${today_events.jqhd}\n`;
            }
            if (today_events.tbhd.length) {
                content += `特别活动：\n${today_events.tbhd}\n`;
            }
            if (today_events.tdz.length) {
                content += `团队战：\n${today_events.tdz}\n`;
            }
            if (today_events.jssr.length) {
                content += `角色生日：\n${today_events.jssr}\n`;
            }
        }
    }
    return {
        msgtype: 'text',
        text: {
            content
        },
        at: {
            atMobiles: [],
            isAtAll: false
        }
    }
}