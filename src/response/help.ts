import { IDingTalkResponse } from "../interface";
import { get_command_list, get_command_help, register_help } from "../modules/help";

register_help('帮助', '帮助 [指令名称]', '获取指令列表或者获取单独指令用法，但是你为什么在套娃？')
export function response_help(args: string[]): IDingTalkResponse {
    if (args.length === 1) {
        return {
            msgtype: 'markdown',
            markdown: {
                title: '指令列表',
                text: get_command_list()
            },
            at: {
                atMobiles: [],
                isAtAll: false
            }
        };
    } else if (args.length > 1) {
        let command = args[1];
        let command_help = get_command_help(command);
        console.log(command_help);
        if (command_help) {
            return {
                msgtype: 'markdown',
                markdown: command_help,
                at: {
                    atMobiles: [],
                    isAtAll: false
                }
            };
        } else {
            return {
                msgtype: 'text',
                text: {
                    content: `不存在指令 "${command}"`
                },
                at: {
                    atMobiles: [],
                    isAtAll: false
                }
            };
        }
    } else {
        return {
            msgtype: 'text',
            text: {
                content: '非法请求！'
            },
            at: {
                atMobiles: [],
                isAtAll: false
            }
        }
    }
}