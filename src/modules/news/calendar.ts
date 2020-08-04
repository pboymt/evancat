import axios from "axios";

interface IEventDay {
    qdhd: string; // 庆典活动
    tdz: string; // 团队战
    tbhd: string; // 特别活动
    jqhd: string; // 剧情活动
    jssr: string; // 角色生日
}

interface IEventMonth {
    year: string;
    month: string;
    day: {
        [day: string]: IEventDay;
    }
}

interface IEventCalendar { [year: number]: IEventCalendarYear; }
interface IEventCalendarYear { [month: number]: IEventCalendarMonth; }
interface IEventCalendarMonth { [day: number]: IEventCalendarDay; }
interface IEventCalendarDay {
    qdhd: string; // 庆典活动
    tdz: string; // 团队战
    tbhd: string; // 特别活动
    jqhd: string; // 剧情活动
    jssr: string; // 角色生日
}
interface IEventCalendarType {
    name: string;
    date: string;
}

const event_regexp = /<div class='cl-t'>(?<name>.+)<\/div><div class='cl-d'>(?<date>.+)<\/div>/g;

function parse_event(str: string): string {
    const result = str
        .replace(/<div class='cl-t'>([^<>]+)<\/div>/g, '$1\n')
        .replace(/<div class='cl-d'>([^<>]+)<\/div>/g, '$1\n');
    return result;
}

export async function get_canlendar() {
    const response = await axios.get<string>(`https://static.biligame.com/pcr/gw/calendar.js?ct=${Date.now()}`);
    if (response.status == 200) {
        const body = response.data;
        const sandbox = Function(`let window = {}; \n${body} return window.__calendar;`);
        const calendar_raw: IEventMonth[] = sandbox();
        const calendar: IEventCalendar = {};
        for (const month_obj of calendar_raw) {
            const year = Number(month_obj.year);
            const month = Number(month_obj.month);
            if (typeof calendar[year] !== 'object') {
                calendar[year] = {};
            }
            if (typeof calendar[year][month] !== 'object') {
                calendar[year][month] = {};
            }
            for (const day_obj in month_obj.day) {
                if (Object.prototype.hasOwnProperty.call(month_obj.day, day_obj)) {
                    const events = month_obj.day[day_obj];
                    const day = Number(day_obj);
                    const day_events: IEventCalendarDay = {
                        qdhd: '',
                        tdz: '',
                        tbhd: '',
                        jqhd: '',
                        jssr: '',
                    };
                    if (events.qdhd && events.qdhd.length > 0) {
                        day_events.qdhd = parse_event(events.qdhd);
                    }
                    if (events.tdz && events.tdz.length > 0) {
                        day_events.tdz = parse_event(events.tdz);
                    }
                    if (events.tbhd && events.tbhd.length > 0) {
                        day_events.tbhd = parse_event(events.tbhd);
                    }
                    if (events.jqhd && events.jqhd.length > 0) {
                        day_events.jqhd = parse_event(events.jqhd);
                    }
                    if (events.jssr && events.jssr.length > 0) {
                        day_events.jssr = parse_event(events.jssr);
                    }
                    calendar[year][month][day] = day_events;
                }
            }
        }
        return calendar;
    } else {
        return null;
    }
}

// "6": {
//     "qdhd": "<div class='cl-t'>探索掉落量2倍</div><div class='cl-d'>6/6-6/16</div>",
//     "tdz": "",
//     "tbhd": "",
//     "jqhd": "",
//     "jssr": ""
// },