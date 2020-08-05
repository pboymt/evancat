import { IDingTalkResponse } from "../interface";
import { get_canlendar } from "../modules/news/calendar";
import moment from "moment";

export async function response_calendar(): Promise<IDingTalkResponse> {
    const calendar = await get_canlendar();
    let content = '获取失败';
    if (calendar) {
        content = '';
        const today = moment().utcOffset(480).hours(4);
        const now = moment().utcOffset(480);
        if (now.isBefore(today, 'hour')) { // 判断是否到4点
            now.subtract(1, "day");
            content += '现在还未到下一个PCR日期\n\n';
        }
        try {
            const today_events = calendar[now.year()][now.month() + 1][now.date()];
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
            now.add(1, 'day');
            const today_events = calendar[now.year()][now.month() + 1][now.date()];
            content += `${now.format('YYYY-MM-DD')}\n`;
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