import { IDingTalkResponseMarkdownContent } from "../../interfaces";

interface IHelp {
    usage: string;
    name: string;
    description: string;
}
const helps: IHelp[] = [];

export function register_help(name: string, usage: string, description: string) {
    if (!helps.find(h => h.name === name)) {
        helps.push({
            name,
            usage,
            description
        });
        console.log(`注册帮助 "${name}"`);
    }
}

export function get_command_list() {
    let help = '';
    help += helps.map(h => {
        return `**${h.name}** ${h.description}\n`;
    }).join('\n');
    return help;
}


export function get_command_help(command: string): IDingTalkResponseMarkdownContent | null {
    const command_help = helps.find(h => h.name === command);
    if (command_help) {
        return {
            title: `${command_help.name} 帮助`,
            text: `**功能：** ${command_help.description}\n\n**用法：** ${command_help.usage}`
        };
    } else {
        return null;
    }
}