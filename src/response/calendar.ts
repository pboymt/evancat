import { IDingTalkResponse } from "../interfaces";
import { get_canlendar } from "../modules/official-site/calendar";
import moment from "moment";
import { register_help } from "../modules/help";


register_help(
    '日程表',
    ['日程表', '近期活动'].join('|'),
    '获取近期游戏日程'
)
export async function response_calendar(): Promise<IDingTalkResponse> {
    const calendar = await get_canlendar();
    let content = '获取失败';
    if (calendar) {
        content = '';
        const today = moment().utcOffset(480).hours(4);
        const now = moment().utcOffset(480);
        if (now.isBefore(today, 'hour')) { // 判断是否到4点
            now.subtract(1, "day");
            content += '现在是凌晨时段，现在还未到下一个PCR日期，请注意休息\n\n';
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

register_help(
    '今日日程',
    ['今天', '今日', '今天日程', '今日日程', '今天活动', '今日活动', '活动'].join('|'),
    '获取今日日程'
)
export async function response_today_event(): Promise<IDingTalkResponse> {
    const calendar = await get_canlendar();
    let content = '获取失败';
    if (calendar) {
        content = '';
        const today = moment().utcOffset(480).hours(4);
        const now = moment().utcOffset(480);
        if (now.isBefore(today, 'hour')) { // 判断是否到4点
            now.subtract(1, "day");
            content += '现在是凌晨时段，还未到下一个PCR日期，请注意休息\n\n';
        }
        try {
            const today_events = calendar[now.year()][now.month() + 1][now.date()];
            content += `今日活动\n`;
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

register_help(
    '明日日程',
    ['明天', '明日', '明天日程', '明日日程', '明天活动', '明日活动'].join('|'),
    '获取明日日程'
)
export async function response_tomorrow_event(): Promise<IDingTalkResponse> {
    const calendar = await get_canlendar();
    let content = '获取失败';
    if (calendar) {
        content = '';
        const today = moment().utcOffset(480).hours(4);
        const tomorrow = moment().utcOffset(480);
        if (tomorrow.isAfter(today, 'hour')) { // 判断是否到4点
            tomorrow.add(1, "day");
        }
        try {
            const tomorrow_events = calendar[tomorrow.year()][tomorrow.month() + 1][tomorrow.date()];
            content += `明日活动\n`;
            if (tomorrow_events.qdhd.length) {
                content += `庆典活动：\n${tomorrow_events.qdhd}\n`;
            }
            if (tomorrow_events.jqhd.length) {
                content += `剧情活动：\n${tomorrow_events.jqhd}\n`;
            }
            if (tomorrow_events.tbhd.length) {
                content += `特别活动：\n${tomorrow_events.tbhd}\n`;
            }
            if (tomorrow_events.tdz.length) {
                content += `团队战：\n${tomorrow_events.tdz}\n`;
            }
            if (tomorrow_events.jssr.length) {
                content += `角色生日：\n${tomorrow_events.jssr}\n`;
            }
        } catch {

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