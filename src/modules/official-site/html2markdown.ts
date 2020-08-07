import TurndownService from "turndown";

const service = new TurndownService();

service.addRule('calendar-title', {
    filter: (node, options) => node.classList.contains('cl-t'),
    replacement: (content, node, options,) => `**${content}**\n\n`
});

service.addRule('calendar-date', {
    filter: (node, options) => node.classList.contains('cl-d'),
    replacement: (content, node, options,) => `*${content}*\n\n`
});

service.addRule('images', {
    filter: ['img'],
    replacement: (content, node, options) => {
        let src = (node as HTMLElement).getAttribute('src');
        if (src) {
            if (/^\/\//.test(src)) {
                src = 'https:' + src;
            }
            const url = new URL(src);
            return `![](${url.toString()})`
        } else {
            return '';
        }
    }
});

export function html2md(html: string) {
    return service.turndown(html);
}